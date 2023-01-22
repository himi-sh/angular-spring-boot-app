import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private BASE_URL = 'http://localhost:8080/users';

  constructor(private http: HttpClient) {}

  login(request: any) {
    const URL = `${this.BASE_URL}/login`;
    return this.http.post(URL, request);
  }

}
