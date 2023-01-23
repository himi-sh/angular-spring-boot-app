import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const AUTH_API = 'http://himani.ap-south-1.elasticbeanstalk.com/api/auth';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(credentials: any) {
    const URL = `${AUTH_API}/signin`;
    // return this.http.post(URL, request);
    return this.http.post(URL, {
      username: credentials.username,
      password: credentials.password
    }, httpOptions);
  }

  register(user: any) {
    const URL = `${AUTH_API}/signup`;
    return this.http.post(URL, {
      username: user.username,
      email: user.email,
      password: user.password
    }, httpOptions);
  }
}
