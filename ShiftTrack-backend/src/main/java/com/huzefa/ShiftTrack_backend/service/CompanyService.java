package com.huzefa.ShiftTrack_backend.service;

import com.huzefa.ShiftTrack_backend.dto.CompanyRequest;
import com.huzefa.ShiftTrack_backend.dto.CompanyResponse;
import com.huzefa.ShiftTrack_backend.entity.Company;
import com.huzefa.ShiftTrack_backend.exception.ResourceNotFoundException;
import com.huzefa.ShiftTrack_backend.repository.CompanyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import static tools.jackson.databind.util.ClassUtil.name;


@Service
public class CompanyService {

    private final CompanyRepository companyRepository;

    public CompanyService(CompanyRepository companyRepository) {
        this.companyRepository = companyRepository;
    }


    public CompanyResponse createCompany(CompanyRequest request){
        Company company = Company.builder()
                .name(request.getName())
                .weekdayRate(request.getWeekdayRate())
                .saturdayRate(request.getSaturdayRate())
                .sundayRate(request.getSundayRate())
                .build();
        Company savedCompany = companyRepository.save(company);
        return mapToResponse(savedCompany);
    }

    public List<CompanyResponse> getALlCompanies(){
        return companyRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    public CompanyResponse getCompanybyId(Long id){
        Company company = companyRepository.findById(id)
                .orElseThrow(()->new ResourceNotFoundException("Company not Found with this Id " + id));
        return mapToResponse(company);
    }

    public CompanyResponse mapToResponse(Company company){
        return CompanyResponse.builder()
                .id(company.getId())
                .weekdayRate(company.getWeekdayRate())
                .saturdayRate(company.getSaturdayRate())
                .createdAt(company.getCreatedAt())
                .name(company.getName())
                .sundayRate(company.getSundayRate())
                .build();
    }
    public void deleteCompany(Long id){
        Company company = companyRepository.findById(id)
                .orElseThrow(()->new ResourceNotFoundException(("Company not Found with the id " + id)));
        companyRepository.delete(company);

    }
    public CompanyResponse updateCompany(Long id, CompanyRequest companyRequest){
        Company company = companyRepository.findById(id)
                .orElseThrow(()->new ResourceNotFoundException("Company not found with id " + id));
            company.setName(companyRequest.getName());
            company.setSundayRate(companyRequest.getSundayRate());
            company.setWeekdayRate(companyRequest.getWeekdayRate());
            company.setSaturdayRate(companyRequest.getWeekdayRate());
            Company updatedCompany = companyRepository.save(company);
            return mapToResponse(updatedCompany);
    }

}
