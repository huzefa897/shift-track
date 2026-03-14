package com.huzefa.ShiftTrack_backend.controller;

import com.huzefa.ShiftTrack_backend.dto.SummaryResponse;
import com.huzefa.ShiftTrack_backend.repository.CompanyRepository;
import com.huzefa.ShiftTrack_backend.repository.WorkEntryRepository;
import com.huzefa.ShiftTrack_backend.service.WorkEntryService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.time.LocalDate;

@Controller
@RequestMapping("/api/reports")
public class ReportController {

    private final WorkEntryService workEntryService;

    public ReportController(WorkEntryService workEntryService) {
        this.workEntryService = workEntryService;
    }

    @GetMapping("/summary")
    public SummaryResponse getSummaryBetweenDates(LocalDate from, LocalDate to){
        return workEntryService.getSummaryBetweenDates(from,to);
    }
}
