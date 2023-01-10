package com.stockapp.spring.datajpa.dto;

import java.math.BigDecimal;

import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;

import org.hibernate.validator.constraints.Range;

import lombok.NonNull;

public class StockDTO {

    @NotBlank(message = "Name is mandatory")
	private String name;

	// @DecimalMin("0.0")
	// @NotEmpty
	@Range(min = 0, max = 10)
	private BigDecimal currentPrice;

	public StockDTO() {}

	public StockDTO(String name, BigDecimal currentPrice) {
		this.name = name;
		this.currentPrice = currentPrice;
	}

	public String getName() {
		return name;
	}

	public BigDecimal getCurrentPrice() {
		return currentPrice;
	}

	public void setCurrentPrice(BigDecimal currentPrice) {
		this.currentPrice = currentPrice;
	}

}

