package com.huzefa.ShiftTrack_backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;

@Table(name = "work_entry")
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WorkEntry {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;
    @Column(nullable = false)
    public LocalDate workDate;

    @Column(nullable = false)
    public LocalTime startTime;

    @Column(nullable = false)
    public LocalTime endTime;

    @Column(nullable = false, precision = 5, scale = 2)
    public BigDecimal breakHours;

    @Column(precision = 5, scale = 2)
    private BigDecimal totalHours;

    @Column(precision = 5, scale = 2)
    private BigDecimal calculatedPay;

    @Column(nullable = false)
    public String notes;
    @Column(name = "tax_amount", precision = 10, scale = 2)
    private BigDecimal taxAmount;

    @Column(name = "net_pay", precision = 10, scale = 2)
    private BigDecimal netPay;


    @ManyToOne
    @JoinColumn(name = "company_id", nullable = false)
    private Company company;





}
