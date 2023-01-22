import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


const BASE_URL = 'http://localhost:8080/api/stocks';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(private http: HttpClient) {}

  getStocks(currentPage = '1', stocksPerPage = '10') {
    const URL = `${BASE_URL}?currentPage=${currentPage}&stocksPerPage=${stocksPerPage}`;
    return this.http.get(URL, httpOptions);
  }

  postStocks(request: any) {
    const URL = `${BASE_URL}`;
    return this.http.post(URL, request);
  }

  deleteStock(rowId: Number) {
    const URL = `${BASE_URL}/${rowId}`;
    return this.http.delete(URL);
  }

  editStock(request: any) {
    const URL = `${BASE_URL}/${request.id}`;
    return this.http.patch(URL, request);
  }

}
