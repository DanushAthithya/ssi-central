package com.stackroute.ssimanagement.repository;

import java.math.BigDecimal;
import java.sql.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.stackroute.ssimanagement.model.SSI;

@Repository
public interface SSIRepository extends JpaRepository<SSI, Integer>{
    @Query("SELECT s FROM SSI s WHERE s.deadlineDate BETWEEN :approachingDate AND :currentDate")
    List<SSI> findWithApproachingDeadlines(@Param("currentDate") java.util.Date currentDate, @Param("approachingDate") java.util.Date approachingDate);

    @Query("SELECT s FROM SSI s WHERE s.createdDate BETWEEN :startDate AND :endDate")
    List<SSI> filterSSIByDate(@Param("startDate") Date startDate, @Param("endDate") Date endDate);

    List<SSI> findByCounterPartyNameIgnoreCase(String counterPartyName);

    List<SSI> findByAmountBetween(BigDecimal minAmount, BigDecimal maxAmount);
}
