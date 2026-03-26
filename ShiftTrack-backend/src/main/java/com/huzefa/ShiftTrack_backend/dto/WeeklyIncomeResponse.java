package com.huzefa.ShiftTrack_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;

@Builder
@Getter
@AllArgsConstructor
public class WeeklyIncomeResponse {
    private String label;
    private BigDecimal totalPay;
}
