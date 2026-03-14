package com.huzefa.ShiftTrack_backend.service;

import com.huzefa.ShiftTrack_backend.dto.SummaryResponse;
import com.huzefa.ShiftTrack_backend.dto.WorkEntryRequest;
import com.huzefa.ShiftTrack_backend.dto.WorkEntryResponse;
import com.huzefa.ShiftTrack_backend.entity.Company;
import com.huzefa.ShiftTrack_backend.entity.WorkEntry;
import com.huzefa.ShiftTrack_backend.exception.BadRequestException;
import com.huzefa.ShiftTrack_backend.exception.ResourceNotFoundException;
import com.huzefa.ShiftTrack_backend.repository.CompanyRepository;
import com.huzefa.ShiftTrack_backend.repository.WorkEntryRepository;
import com.huzefa.ShiftTrack_backend.service.PayCalculationService;
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

    public WorkEntryService(WorkEntryRepository workEntryRepository,
                            CompanyRepository companyRepository,
                            PayCalculationService payCalculationService) {
        this.workEntryRepository = workEntryRepository;
        this.companyRepository = companyRepository;
        this.payCalculationService = payCalculationService;
    }

    public WorkEntryResponse createWorkEntry(WorkEntryRequest request) {
        validateWorkEntryRequest(request);

        Company company = companyRepository.findById(request.getCompanyId())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Company not found with id: " + request.getCompanyId()
                ));

        BigDecimal totalHours = calculateTotalHours(
                request.getStartTime(),
                request.getEndTime(),
                request.getBreakHours()
        );

        BigDecimal calculatedPay = payCalculationService.calculatedPay(
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

    public List<WorkEntryResponse> getAllWorkEntries() {
        return workEntryRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    public WorkEntryResponse getWorkEntryById(Long id) {
        WorkEntry workEntry = workEntryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Work entry not found with id: " + id));

        return mapToResponse(workEntry);
    }

    public WorkEntryResponse updateWorkEntry(Long id, WorkEntryRequest request) {
        validateWorkEntryRequest(request);

        WorkEntry existingWorkEntry = workEntryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Work entry not found with id: " + id));

        Company company = companyRepository.findById(request.getCompanyId())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Company not found with id: " + request.getCompanyId()
                ));

        BigDecimal totalHours = calculateTotalHours(
                request.getStartTime(),
                request.getEndTime(),
                request.getBreakHours()
        );

        BigDecimal calculatedPay = payCalculationService.calculatedPay(
                request.getWorkDate(),
                totalHours,
                company
        );

        existingWorkEntry.setWorkDate(request.getWorkDate());
        existingWorkEntry.setStartTime(request.getStartTime());
        existingWorkEntry.setEndTime(request.getEndTime());
        existingWorkEntry.setBreakHours(request.getBreakHours());
        existingWorkEntry.setTotalHours(totalHours);
        existingWorkEntry.setCalculatedPay(calculatedPay);
        existingWorkEntry.setNotes(request.getNotes());
        existingWorkEntry.setCompany(company);

        WorkEntry updatedWorkEntry = workEntryRepository.save(existingWorkEntry);
        return mapToResponse(updatedWorkEntry);
    }

    public void deleteWorkEntry(Long id) {
        WorkEntry workEntry = workEntryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Work entry not found with id: " + id));

        workEntryRepository.delete(workEntry);
    }

    public List<WorkEntryResponse> getWorkEntriesBetweenDates(LocalDate from, LocalDate to) {
        validateDateRange(from, to);

        return workEntryRepository.findByWorkDateBetween(from, to)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    public SummaryResponse getSummaryBetweenDates(LocalDate from, LocalDate to) {
        validateDateRange(from, to);

        List<WorkEntry> entries = workEntryRepository.findByWorkDateBetween(from, to);

        BigDecimal totalHours = entries.stream()
                .map(WorkEntry::getTotalHours)
                .reduce(BigDecimal.ZERO, BigDecimal::add)
                .setScale(2, RoundingMode.HALF_UP);

        BigDecimal totalPay = entries.stream()
                .map(WorkEntry::getCalculatedPay)
                .reduce(BigDecimal.ZERO, BigDecimal::add)
                .setScale(2, RoundingMode.HALF_UP);

        long totalEntries = entries.size();

        return SummaryResponse.builder()
                .totalHours(totalHours)
                .totalPay(totalPay)
                .totalEntries(totalEntries)
                .build();
    }

    private void validateDateRange(LocalDate from, LocalDate to) {
        if (from.isAfter(to)) {
            throw new BadRequestException("'from' date cannot be after 'to' date");
        }
    }

    private void validateWorkEntryRequest(WorkEntryRequest request) {
        if (!request.getEndTime().isAfter(request.getStartTime())) {
            throw new BadRequestException("End time must be after start time");
        }

        BigDecimal rawHours = BigDecimal.valueOf(Duration.between(
                request.getStartTime(),
                request.getEndTime()
        ).toMinutes()).divide(BigDecimal.valueOf(60), 2, RoundingMode.HALF_UP);

        if (request.getBreakHours().compareTo(rawHours) > 0) {
            throw new BadRequestException("Break hours cannot be greater than total worked hours");
        }
    }

    private BigDecimal calculateTotalHours(LocalTime startTime,
                                           LocalTime endTime,
                                           BigDecimal breakHours) {

        long minutesWorked = Duration.between(startTime, endTime).toMinutes();

        BigDecimal hoursWorked = BigDecimal.valueOf(minutesWorked)
                .divide(BigDecimal.valueOf(60), 2, RoundingMode.HALF_UP);

        return hoursWorked.subtract(breakHours).setScale(2, RoundingMode.HALF_UP);
    }

    private WorkEntryResponse mapToResponse(WorkEntry workEntry) {
        return WorkEntryResponse.builder()
                .id(workEntry.getId())
                .workDate(workEntry.getWorkDate())
                .startTime(workEntry.getStartTime())
                .endTime(workEntry.getEndTime())
                .breakHours(workEntry.getBreakHours())
                .totalHours(workEntry.getTotalHours())
                .calculatedPay(workEntry.getCalculatedPay())
                .notes(workEntry.getNotes())
                .companyId(workEntry.getCompany().getId())
                .companyName(workEntry.getCompany().getName())
                .build();
    }
}