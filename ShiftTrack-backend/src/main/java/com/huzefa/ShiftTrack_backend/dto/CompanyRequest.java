package com.huzefa.ShiftTrack_backend.dto;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class CompanyRequest {
    @NotBlank(message="company name is required")
    private String name;
    @NotNull(message = "weekday rate is required")
    @DecimalMin(value = "0.0", inclusive = true, message = "Weekday rate must be 0 or more")
    private BigDecimal weekdayRate;
    @NotNull(message = "tax rate is required in percentage")
    @DecimalMin(value = "0.0", inclusive = true, message = "Tax rate must be 0 or more")
    @DecimalMax(value = "100.0", inclusive = true)
    private BigDecimal taxRate;
    @NotNull(message = "Saturday rate is required")
    private BigDecimal saturdayRate;
    @NotNull(message = "Sunday rate is required")
    private BigDecimal sundayRate;



}
