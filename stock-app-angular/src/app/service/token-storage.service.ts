import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  isLoggedIn = false;
  isAdminLoggedIn = true;
  
  constructor() { }

  signOut(): void {
    this.isLoggedIn = false;
    window.sessionStorage.clear();
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    let item = sessionStorage.getItem(TOKEN_KEY) || ''
    return item;
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    let item = sessionStorage.getItem(USER_KEY) || '';
    if (item) {
      return JSON.parse(item);
    }
  }
}
