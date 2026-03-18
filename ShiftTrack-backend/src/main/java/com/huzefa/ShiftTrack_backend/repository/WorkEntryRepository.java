package com.huzefa.ShiftTrack_backend.repository;

import com.huzefa.ShiftTrack_backend.entity.WorkEntry;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface WorkEntryRepository extends JpaRepository<WorkEntry,Long> {
    List<WorkEntry> findByWorkDateBetween(LocalDate from, LocalDate to);
    List<WorkEntry> findByWorkDateBetweenAndCompanyId(LocalDate from, LocalDate to, Long companyId);
}
