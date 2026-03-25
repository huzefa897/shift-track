package com.huzefa.ShiftTrack_backend.repository;

import com.huzefa.ShiftTrack_backend.entity.WorkEntry;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Page;
import java.time.LocalDate;
import java.util.List;

public interface WorkEntryRepository extends JpaRepository<WorkEntry,Long> {
    List<WorkEntry> findByWorkDateBetween(LocalDate from, LocalDate to);
    List<WorkEntry> findByWorkDateBetweenAndCompanyId(LocalDate from, LocalDate to, Long companyId);
    Page<WorkEntry> findByWorkDateBetween(LocalDate from, LocalDate to, Pageable pageable);
    Page<WorkEntry> findByWorkDateBetweenAndCompanyId(
            LocalDate from,
            LocalDate to,
            Long companyId,
            Pageable pageable
    );

}
