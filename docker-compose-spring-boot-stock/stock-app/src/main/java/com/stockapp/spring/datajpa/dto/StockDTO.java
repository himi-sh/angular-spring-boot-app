package com.stockapp.spring.datajpa.dto;

import java.math.BigDecimal;

import javax.validation.constraints.NotBlank;

import org.hibernate.validator.constraints.Range;

public class StockDTO {

    @NotBlank(message = "Name is mandatory")
	private String name;

	// @DecimalMin("0.0")
	// @NotEmpty
	@Range(min = 0)
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

