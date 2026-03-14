package com.huzefa.ShiftTrack_backend.dto;

import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Builder
public class CompanyResponse {

    private Long id;
    private String name;
    private BigDecimal weekdayRate;
    private BigDecimal saturdayRate;
    private BigDecimal sundayRate;
    private LocalDateTime createdAt;

}
