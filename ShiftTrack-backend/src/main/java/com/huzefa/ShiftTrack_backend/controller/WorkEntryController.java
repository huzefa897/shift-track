package com.huzefa.ShiftTrack_backend.controller;

import com.huzefa.ShiftTrack_backend.dto.WorkEntryRequest;
import com.huzefa.ShiftTrack_backend.dto.WorkEntryResponse;
import com.huzefa.ShiftTrack_backend.service.WorkEntryService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.security.Provider;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("api/work-entries")
public class WorkEntryController {
    private final WorkEntryService workEntryService;
    public WorkEntryController(WorkEntryService workEntryService){
        this.workEntryService=workEntryService;
    }

    @PostMapping
    public WorkEntryResponse createWorkEntry(@Valid @RequestBody WorkEntryRequest workEntryRequest){
        return workEntryService.createWorkEntryRequest(workEntryRequest);
    }

    @GetMapping
    public List<WorkEntryResponse> getAllWorkEntries(){
        return workEntryService.getAllWorkEntries();
    }
    @GetMapping("/{id}")
    public WorkEntryResponse getWorkEntryById(Long id){
        return workEntryService.getWorkEntryById(id);
    }
    @GetMapping("/filter")
    public List<WorkEntryResponse> getWorkEntriesBetweenDates(@RequestParam LocalDate from,
                                                              @RequestParam LocalDate to){

    return workEntryService.getWorkEntriesBetweenDates(from,to);
    }
}
