package com.huzefa.ShiftTrack_backend.controller;

import com.huzefa.ShiftTrack_backend.dto.CompanyRequest;
import com.huzefa.ShiftTrack_backend.dto.CompanyResponse;
import com.huzefa.ShiftTrack_backend.service.CompanyService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
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

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> DeleteCompany(@PathVariable Long id){
        companyService.deleteCompany(id);
        return ResponseEntity.noContent().build();
    }
    @PutMapping("/{id}")
    public CompanyResponse UpdateCompany(
            @PathVariable Long id,
            @RequestBody @Valid CompanyRequest companyRequest) {
        return companyService.updateCompany(id,companyRequest);
    }
}
