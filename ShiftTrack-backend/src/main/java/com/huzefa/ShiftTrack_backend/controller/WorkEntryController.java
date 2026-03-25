package com.huzefa.ShiftTrack_backend.controller;

import com.huzefa.ShiftTrack_backend.dto.WorkEntryRequest;
import com.huzefa.ShiftTrack_backend.dto.WorkEntryResponse;
import com.huzefa.ShiftTrack_backend.service.WorkEntryService;
import jakarta.validation.Valid;
import org.aspectj.lang.annotation.RequiredTypes;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

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
        return workEntryService.createWorkEntry(workEntryRequest);
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
    public List<WorkEntryResponse> getWorkEntriesBetweenDates(
            @RequestParam LocalDate from,
            @RequestParam LocalDate to,
            @RequestParam(required = false) Long companyId
    ) {
        return workEntryService.getWorkEntriesBetweenDates(from, to, companyId);
    }
    @PutMapping("/{id}")
    public WorkEntryResponse updateWorkEntry(@PathVariable Long id,
                                             @Valid @RequestBody WorkEntryRequest request) {
        return workEntryService.updateWorkEntry(id, request);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteWorkEntry(@PathVariable Long id) {
        workEntryService.deleteWorkEntry(id);
        return ResponseEntity.noContent().build();
    }
    @GetMapping("/paginated")
    public Page<WorkEntryResponse> getPaginatedEntries(
            @RequestParam LocalDate from,
            @RequestParam LocalDate to,
            @RequestParam(required = false) Long companyId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size


    ){
        return workEntryService.getPaginatedWorkEntriesBetweenDates(
                from,
                to,
                companyId,
                page,
                size
                );
    }
}
