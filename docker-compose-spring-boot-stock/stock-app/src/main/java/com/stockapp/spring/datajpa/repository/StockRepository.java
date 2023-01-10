package com.stockapp.spring.datajpa.repository;

import java.util.Optional;

import com.stockapp.spring.datajpa.model.Stock;

import org.springframework.data.jpa.repository.JpaRepository;

public interface StockRepository extends JpaRepository<Stock, Long> {
    Optional<Stock> findByName(String name);
}
