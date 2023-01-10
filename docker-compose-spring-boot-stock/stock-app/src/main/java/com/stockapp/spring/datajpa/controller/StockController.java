package com.stockapp.spring.datajpa.controller;

import java.util.Optional;

import javax.validation.Valid;

import com.stockapp.spring.datajpa.dto.StockDTO;
import com.stockapp.spring.datajpa.exception.ResourceNotFoundException;
import com.stockapp.spring.datajpa.model.Stock;
import com.stockapp.spring.datajpa.model.StockResponse;
import com.stockapp.spring.datajpa.service.StockService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/stocks")
public class StockController {

    @Autowired
    private StockService stockService;

    @GetMapping
    public ResponseEntity<StockResponse> getStocks(@RequestParam(required = false) Integer currentPage,
            @RequestParam(required = false) Integer stocksPerPage) throws ResourceNotFoundException {
        StockResponse response = stockService.getStocks(currentPage, stocksPerPage);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Stock> addStock(@Valid @RequestBody StockDTO stock) {
        Stock _stock = stockService.addStocks(stock);
        return new ResponseEntity<>(_stock, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Stock> getStocks(@PathVariable long id) {
        Optional<Stock> _stock = stockService.getStocksByID(id);
        return new ResponseEntity<>(_stock.get(), HttpStatus.OK);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Stock> patchStock(@PathVariable long id, @RequestBody Stock stock) {
        Stock _stock = stockService.patchStock(id, stock);
        return new ResponseEntity<>(_stock, HttpStatus.OK);

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Stock> deleteStock(@PathVariable long id) {
        Optional<Stock> _stock = stockService.deleteStockByID(id);
        return new ResponseEntity<>(_stock.get(), HttpStatus.OK);
    }
}
