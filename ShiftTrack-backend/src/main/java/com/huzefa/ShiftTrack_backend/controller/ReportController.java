package com.huzefa.ShiftTrack_backend.controller;

import com.huzefa.ShiftTrack_backend.dto.SummaryResponse;
import com.huzefa.ShiftTrack_backend.dto.WeeklyIncomeResponse;
import com.huzefa.ShiftTrack_backend.repository.CompanyRepository;
import com.huzefa.ShiftTrack_backend.repository.WorkEntryRepository;
import com.huzefa.ShiftTrack_backend.service.WorkEntryService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("api/reports")
public class ReportController {

    private final WorkEntryService workEntryService;

    public ReportController(WorkEntryService workEntryService) {
        this.workEntryService = workEntryService;
    }
    @GetMapping("/summary")
    public SummaryResponse getSummary(
            @RequestParam LocalDate from,
            @RequestParam LocalDate to,
            @RequestParam(required = false) Long companyId
    ) {
        return workEntryService.getSummaryBetweenDates(from, to, companyId);
    }
    @GetMapping("/analytics/weekly-income")
    public List<WeeklyIncomeResponse> getWeeklyIncome(
            @RequestParam LocalDate from,
            @RequestParam LocalDate to,
            @RequestParam(required = false) Long companyId
    ){
        return workEntryService.getWeeklyIncomeBetweenDates(from,to,companyId);
    }
}
