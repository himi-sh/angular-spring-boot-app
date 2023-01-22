package com.stockapp.spring.datajpa.repository;

import com.stockapp.spring.datajpa.model.Users;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<Users, Long> {
    Users findByName(String username);
}
