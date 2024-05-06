package com.stackroute.ssimanagement.repository;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.stackroute.ssimanagement.model.SSI;

@Repository
public interface SSIRepository extends JpaRepository<SSI, Integer> {

    @Query("SELECT s FROM SSI s WHERE s.deadlineDate BETWEEN :approachingDate AND :currentDate")
    List<SSI> findWithApproachingDeadlines(@Param("currentDate") Date currentDate, @Param("approachingDate") Date approachingDate);

    @Query("SELECT s FROM SSI s WHERE s.createdDate BETWEEN :startDate AND :endDate")
    List<SSI> filterSSIByDate(@Param("startDate") Date startDate, @Param("endDate") Date endDate);
    @Query("SELECT s FROM SSI s WHERE s.createdDate BETWEEN :startDate AND :endDate AND s.userEmailId=:userEmailId")
    List<SSI> filterSSIByDateAndUserEmailId(@Param("startDate") Date startDate, @Param("endDate") Date endDate,String userEmailId);

    List<SSI> findByCounterPartyNameIgnoreCase(String counterPartyName);
    List<SSI> findByCounterPartyNameIgnoreCaseAndUserEmailId(String counterPartyName, String userEmailId);

    List<SSI> findByAmountBetween(BigDecimal minAmount, BigDecimal maxAmount);
    List<SSI> findByAmountBetweenAndUserEmailId(BigDecimal minAmount, BigDecimal maxAmount,String userEmailId);

    List<SSI> findByAssetType(String assetType);
    List<SSI> findByAssetTypeAndUserEmailId(String assetType,String userEmailId);

    @Query("SELECT s FROM SSI s WHERE s.numberOfAsset BETWEEN :minAssetNo AND :maxAssetNo")
    List<SSI> findByNumberOfAsset(@Param("minAssetNo") int minAssetNo, @Param("maxAssetNo") int maxAssetNo);
    @Query("SELECT s FROM SSI s WHERE s.numberOfAsset BETWEEN :minAssetNo AND :maxAssetNo AND s.userEmailId=:userEmailId")
    List<SSI> findByNumberOfAssetAndUserEmailId(@Param("minAssetNo") int minAssetNo, @Param("maxAssetNo") int maxAssetNo,String userEmailId);

    List<SSI> findByTransactionType(String transactionType);
    List<SSI> findByTransactionTypeAndUserEmailId(String transactionType,String userEmailId);
    List<SSI> findByStatus(String status);
    List<SSI> findByStatusAndUserEmailId(String status,String userEmailId);
}
