package com.huzefa.ShiftTrack_backend.controller;

import com.huzefa.ShiftTrack_backend.dto.CompanyRequest;
import com.huzefa.ShiftTrack_backend.dto.CompanyResponse;
import com.huzefa.ShiftTrack_backend.service.CompanyService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/companies")
public class CompanyController {

    private final CompanyService companyService;
    public CompanyController(CompanyService companyService){
        this.companyService = companyService;
    }

    @PostMapping
    public CompanyResponse createCompany(@Valid @RequestBody CompanyRequest companyRequest){
        return companyService.createCompany(companyRequest);
    }

    @GetMapping
    public List<CompanyResponse> getAllCompanies(){
        return companyService.getALlCompanies();
    }
    @GetMapping("/{id}")
    public CompanyResponse getCompanyById(@PathVariable Long id){
        return companyService.getCompanybyId(id);
    }

}
