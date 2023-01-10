package com.stockapp.spring.datajpa.model;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "stocks")
@Setter
@Getter
public class Stock {

	@Id
	@Column
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	@Column
	private String name;

	@Column
	private double currentPrice;

	@Column(nullable = false)
	@CreationTimestamp
    private Timestamp lastUpdate;

	public Stock() {}

	public Stock(String name, double currentPrice) {
		this.name = name;
		this.currentPrice = currentPrice;
	}

	public Long getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	public double getCurrentPrice() {
		return currentPrice;
	}

	public Timestamp getLastUpdate() {
		return lastUpdate;
	}

	public void setId(Long id) {
		this.id = id;
	}
	
	public void setCurrentPrice(double currentPrice) {
		this.currentPrice = currentPrice;
	}

	public void setLastUpdate(Timestamp lastUpdate) {
		this.lastUpdate = lastUpdate;
	}

	@java.lang.Override
	public java.lang.String toString() {
		return "Stock{" +
				"id=" + id +
				", name='" + name + '\'' +
				", currentPrice=" + currentPrice +
				", lastUpdate=" + lastUpdate +
				'}';
	}
}
