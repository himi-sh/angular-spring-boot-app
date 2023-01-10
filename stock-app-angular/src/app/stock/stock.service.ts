import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  private BASE_URL = 'http://localhost:8080/api/stocks';

  private GET_URL = 'http://localhost:6868/api/stocks?currentPage=:currentPage&stocksPerPage=:stocksPerPage';

  constructor(private http: HttpClient) {}

  getStocks(currentPage = '1', stocksPerPage = '10') {
    const httpOptions = {
      headers: new HttpHeaders({
       'Content-Type': 'application/json'
      }),
    };
    
    const URL = `${this.BASE_URL}?currentPage=${currentPage}&stocksPerPage=${stocksPerPage}`;
    return this.http.get(URL, httpOptions);
  }


}
