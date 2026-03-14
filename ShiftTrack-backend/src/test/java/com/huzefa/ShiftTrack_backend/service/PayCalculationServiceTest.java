package com.huzefa.ShiftTrack_backend.service;

import com.huzefa.ShiftTrack_backend.entity.Company;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;
import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.assertEquals;

class PayCalculationServiceTest {

    private final PayCalculationService payCalculationService = new PayCalculationService();

    private Company createCompany() {
        return Company.builder()
                .weekdayRate(new BigDecimal("30.00"))
                .saturdayRate(new BigDecimal("36.00"))
                .sundayRate(new BigDecimal("42.00"))
                .build();
    }

    @Test
    void shouldCalculateWeekdayPay() {
        Company company = createCompany();

        BigDecimal result = payCalculationService.calculatedPay(
                LocalDate.of(2026, 3, 13), // Friday
                new BigDecimal("7.5"),
                company
        );

        assertEquals(new BigDecimal("225.00"), result);
    }

    @Test
    void shouldCalculateSaturdayPay() {
        Company company = createCompany();

        BigDecimal result = payCalculationService.calculatedPay(
                LocalDate.of(2026, 3, 14), // Saturday
                new BigDecimal("7.0"),
                company
        );

        assertEquals(new BigDecimal("252.00"), result);
    }

    @Test
    void shouldCalculateSundayPay() {
        Company company = createCompany();

        BigDecimal result = payCalculationService.calculatedPay(
                LocalDate.of(2026, 3, 15), // Sunday
                new BigDecimal("5.5"),
                company
        );

        assertEquals(new BigDecimal("231.00"), result);
    }
}