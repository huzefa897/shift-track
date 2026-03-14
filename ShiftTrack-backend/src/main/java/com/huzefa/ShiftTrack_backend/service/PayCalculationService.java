package com.huzefa.ShiftTrack_backend.service;

import com.huzefa.ShiftTrack_backend.entity.Company;
import com.huzefa.ShiftTrack_backend.repository.CompanyRepository;
import com.huzefa.ShiftTrack_backend.repository.WorkEntryRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.DayOfWeek;
import java.time.LocalDate;

@Service
public class PayCalculationService {
    private final WorkEntryRepository workEntryRepository;
    private final CompanyRepository companyRepository;
    public PayCalculationService(WorkEntryRepository workEntryRepository, CompanyRepository companyRepository){
        this.companyRepository = companyRepository;
        this.workEntryRepository = workEntryRepository;

    }
    public BigDecimal calculatedPay(LocalDate workDate,
                                    BigDecimal totalHours,
                                    Company company){
        BigDecimal rate = getRateForDay(company,workDate);
        return totalHours.multiply(rate).setScale(2, RoundingMode.HALF_UP);
    }
    private BigDecimal getRateForDay(Company company, LocalDate workDate) {
        DayOfWeek dayOfWeek = workDate.getDayOfWeek();

        return switch (dayOfWeek){
            case SATURDAY -> company.getSaturdayRate();
            case SUNDAY ->  company.getSundayRate();
             default-> company.getWeekdayRate();
        };
    }
}



