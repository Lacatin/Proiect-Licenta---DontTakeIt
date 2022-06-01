package com.licenta.demo.repository;

import com.licenta.demo.model.Lucrare;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LucrareRepository extends JpaRepository<Lucrare, Integer> {
}
