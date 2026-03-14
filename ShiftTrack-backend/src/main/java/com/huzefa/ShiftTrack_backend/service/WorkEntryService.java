package com.huzefa.ShiftTrack_backend.service;

import com.huzefa.ShiftTrack_backend.dto.SummaryResponse;
import com.huzefa.ShiftTrack_backend.dto.WorkEntryRequest;
import com.huzefa.ShiftTrack_backend.dto.WorkEntryResponse;
import com.huzefa.ShiftTrack_backend.entity.Company;
import com.huzefa.ShiftTrack_backend.entity.WorkEntry;
import com.huzefa.ShiftTrack_backend.repository.CompanyRepository;
import com.huzefa.ShiftTrack_backend.repository.WorkEntryRepository;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import org.hibernate.jdbc.Work;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Service
public class WorkEntryService {
    private final WorkEntryRepository workEntryRepository;
    private final CompanyRepository companyRepository;
    private final PayCalculationService payCalculationService;

    public WorkEntryService(PayCalculationService payCalculationService,WorkEntryRepository workEntryRepository,CompanyRepository companyRepository){
        this.workEntryRepository = workEntryRepository;
        this.companyRepository = companyRepository;
        this.payCalculationService = payCalculationService;


    }

    public List<WorkEntryResponse>getAllWorkEntries(){
        return workEntryRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }
    public WorkEntryResponse getWorkEntryById(Long id) {
        WorkEntry workEntry = workEntryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Work entry not found with id: " + id));

        return mapToResponse(workEntry);
    }


    public WorkEntryResponse createWorkEntryRequest(WorkEntryRequest request) {
        Company company = companyRepository.findById(request.getCompanyId())
                .orElseThrow(() -> new RuntimeException("Company not found with id: " + request.getCompanyId()));

        BigDecimal totalHours = calculateTotalHours(
                request.getStartTime(),
                request.getEndTime(),
                request.getBreakHours()
        );
        BigDecimal calculatedPay =payCalculationService.calculatedPay(
                request.getWorkDate(),
                totalHours,
                company
        );

        WorkEntry workEntry = WorkEntry.builder()
                .workDate(request.getWorkDate())
                .startTime(request.getStartTime())
                .endTime(request.getEndTime())
                .breakHours(request.getBreakHours())
                .totalHours(totalHours)
                .calculatedPay(calculatedPay)
                .notes(request.getNotes())
                .company(company)
                .build();

        WorkEntry savedWorkEntry = workEntryRepository.save(workEntry);
        return mapToResponse(savedWorkEntry);
    }


    private WorkEntryResponse mapToResponse(WorkEntry workEntry) {
    return WorkEntryResponse.builder()
            .id(workEntry.getId())
            .companyId(workEntry.getCompany().getId())
            .companyName(workEntry.getCompany().getName())
            .workDate(workEntry.getWorkDate())
            .startTime(workEntry.getStartTime())
            .endTime(workEntry.getEndTime())
            .breakHours(workEntry.getBreakHours())
            .totalHours(workEntry.getTotalHours())
            .notes(workEntry.getNotes())
            .calculatedPay(workEntry.getCalculatedPay())
            .build();
    }

    private BigDecimal calculateTotalHours(java.time.LocalTime startTime,java.time.LocalTime endTime, BigDecimal breakHours) {
        long minutesWorked = Duration.between(startTime, endTime).toMinutes();
        BigDecimal hoursWorked = BigDecimal.valueOf(minutesWorked)
                .divide(BigDecimal.valueOf(60),2, RoundingMode.HALF_UP);
        return hoursWorked.subtract(breakHours).setScale(2, RoundingMode.HALF_UP);
    }

    public List<WorkEntryResponse> getWorkEntriesBetweenDates(java.time.LocalDate from, java.time.LocalDate to){
        return workEntryRepository.findByWorkDateBetween(from,to)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }
    public SummaryResponse getSummaryBetweenDates(LocalDate from, LocalDate to){
            List<WorkEntry> entries = workEntryRepository.findByWorkDateBetween(from, to);
            BigDecimal totalHours = entries.stream()
                    .map(WorkEntry::getTotalHours)
                    .reduce(BigDecimal.ZERO, BigDecimal::add)
                    .setScale(2,RoundingMode.HALF_UP);

            BigDecimal totalPay = entries.stream()
                    .map(WorkEntry::getCalculatedPay)
                    .reduce(BigDecimal.ZERO,BigDecimal::add)
                    .setScale(2,RoundingMode.HALF_UP);

            long totalEntries = entries.size();
            return SummaryResponse.builder()
                    .totalHours(totalHours)
                    .totalPay(totalPay)
                    .totalEntries(totalEntries)
                    .build();


    }
}
