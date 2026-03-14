package com.huzefa.ShiftTrack_backend.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@Builder
public class SummaryResponse {
    private BigDecimal totalHours;
    private BigDecimal totalPay;
    private long totalEntries;
}
