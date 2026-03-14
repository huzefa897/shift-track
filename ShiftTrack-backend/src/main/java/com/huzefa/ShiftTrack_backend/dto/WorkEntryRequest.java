package com.huzefa.ShiftTrack_backend.dto;

import com.huzefa.ShiftTrack_backend.entity.Company;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
public class WorkEntryRequest {
    @NotNull(message = "Date is Required")
    public LocalDate workDate;

    @NotNull(message = "Start Time is Required")
    public LocalTime startTime;
    @NotNull(message = "End Time is Required")
    public LocalTime endTime;

    @NotNull(message = "Break hours are required")
    @DecimalMin(value = "0.0", inclusive = true, message = "Break hours must be 0 or more")
    private BigDecimal breakHours;

    public String notes;

    @NotNull(message = "Company id is required")
    private Long companyId;


}


