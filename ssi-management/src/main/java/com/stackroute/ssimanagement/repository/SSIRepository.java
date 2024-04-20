package com.stackroute.ssimanagement.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.stackroute.ssimanagement.model.SSI;

@Repository
public interface SSIRepository extends JpaRepository<SSI, Integer>{

}
