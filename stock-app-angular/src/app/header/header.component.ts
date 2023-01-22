import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../service/token-storage.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isLoggedIn = false;
  showAdminBoard = false;

  constructor(private router: Router, public tokenStorage: TokenStorageService) { }

  handleLogout(): void {
    this.tokenStorage.signOut();
    this.router.navigate(['/login']);
  }

  signUp() {
    // this.router.navigate(['/register']);
  }
}
