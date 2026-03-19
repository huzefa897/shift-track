package com.huzefa.ShiftTrack_backend.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Setter
@Getter
public class FilterRequest {
    private LocalDate from;
    private LocalDate to;
    private Long companyId;
}
