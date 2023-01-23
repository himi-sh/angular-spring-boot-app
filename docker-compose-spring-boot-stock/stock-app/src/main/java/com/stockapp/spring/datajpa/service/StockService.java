package com.stockapp.spring.datajpa.service;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

import com.stockapp.spring.datajpa.dto.StockDTO;
import com.stockapp.spring.datajpa.exception.DuplicateException;
import com.stockapp.spring.datajpa.exception.ResourceNotFoundException;
import com.stockapp.spring.datajpa.model.Stock;
import com.stockapp.spring.datajpa.model.StockResponse;
import com.stockapp.spring.datajpa.repository.StockRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

@Service
public class StockService {

    @Autowired
    private StockRepository stockRepository;

    public StockResponse getStocks(Integer currentPage, Integer stocksPerPage) {
        if (currentPage == null) {
            List<Stock> stocks = stockRepository.findAll();
            return new StockResponse(stocks, stocks.size());
        } else {
            Pageable pageable = PageRequest.of(currentPage - 1, stocksPerPage, Sort.by("name").ascending());
            Page<Stock> page = stockRepository.findAll(pageable);
            StockResponse response = new StockResponse(page.getContent(), page.getTotalPages());
            return response;
        }
    }

    public Optional<Stock> getStocksByID(long id) {
        Optional<Stock> _stock = stockRepository.findById(id);
        if (!_stock.isPresent()) {
            throw new ResourceNotFoundException("Stock " + id + " is not available");
        }
        return _stock;
    }

    public Optional<Stock> deleteStockByID(long id) {
        Optional<Stock> _stock = stockRepository.findById(id);
        if (_stock.isPresent()) {
            stockRepository.deleteById(id);
            return _stock;
        } else {
            throw new ResourceNotFoundException("Stock " + id + " is not available");
        }
    }

    public Stock patchStock(long id, Stock _stock) {
        Optional<Stock> stock = stockRepository.findById(id);
        if (stock.isPresent()) {
            Stock currentStock = stock.get();
            currentStock.setCurrentPrice(_stock.getCurrentPrice());
            currentStock.setLastUpdate(new Timestamp(System.currentTimeMillis()));
            return stockRepository.saveAndFlush(currentStock);
        } else {
            throw new ResourceNotFoundException("Stock " + id + " is not available");
        }
    }

    public Stock addStocks(StockDTO stock) {
        Optional<Stock> _stock = stockRepository.findByName(stock.getName());
        
        if (!_stock.isPresent()) {
            Stock stockToSave = new Stock(stock.getName(), stock.getCurrentPrice().doubleValue());
            return stockRepository.save(stockToSave);
        } else {
            throw new DuplicateException("Stock " +stock.getName()+ " already exists.");
        }
    }
}
