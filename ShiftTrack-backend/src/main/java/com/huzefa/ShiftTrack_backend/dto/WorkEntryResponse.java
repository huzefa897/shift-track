package com.huzefa.ShiftTrack_backend.dto;

import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Builder
public class WorkEntryResponse {
    private Long id;
    private LocalDate workDate;
    private LocalTime startTime;
    private LocalTime endTime;
    private BigDecimal breakHours;
    private BigDecimal totalHours;
    private BigDecimal calculatedPay;
    private String notes;
    private Long companyId;
    private String companyName;
}
