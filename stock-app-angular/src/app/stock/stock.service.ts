import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  private BASE_URL = 'http://localhost:8080/api/stocks';

  constructor(private http: HttpClient) {}

  getStocks(currentPage = '1', stocksPerPage = '10') {
    const URL = `${this.BASE_URL}?currentPage=${currentPage}&stocksPerPage=${stocksPerPage}`;
    return this.http.get(URL);
  }

  postStocks(request: any) {
    const URL = `${this.BASE_URL}`;
    return this.http.post(URL, request);
  }

  deleteStock(rowId: Number) {
    const URL = `${this.BASE_URL}/${rowId}`;
    return this.http.delete(URL);
  }

  editStock(request: any) {
    const URL = `${this.BASE_URL}/${request.id}`;
    return this.http.patch(URL, request);
  }

}
