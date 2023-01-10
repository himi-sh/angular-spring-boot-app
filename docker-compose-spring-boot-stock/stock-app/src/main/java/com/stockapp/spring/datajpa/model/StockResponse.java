package com.stockapp.spring.datajpa.model;

import java.util.List;

public class StockResponse {

    private List<Stock> stocks;
    private int totalPage;

    public List<Stock> getStocks() {
        return stocks;
    }

    public void setStocks(List<Stock> stocks) {
        this.stocks = stocks;
    }

    public int getTotalPage() {
        return totalPage;
    }

    public void setTotalPage(int totalPage) {
        this.totalPage = totalPage;
    }

    public StockResponse(List<Stock> content, int totalPages) {
        this.stocks = content;
        this.totalPage = totalPages;
    }
}
