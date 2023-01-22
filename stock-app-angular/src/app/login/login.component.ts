import { Component } from '@angular/core';
import { UserService } from './user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { TokenStorageService } from '../service/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';
  loginForm: FormGroup;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  successMessage = '';
  roles: string[] = [];

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, 
    private router: Router) {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }

  login(): void {
    this.authService.login(this.loginForm.value).subscribe(
      (response: any) => {
        this.tokenStorage.saveToken(response.accessToken);
        this.tokenStorage.saveUser(response);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        // this.reloadPage();
        this.router.navigate(['/dashboard']);
      },
      (err:any) => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  reloadPage(): void {
    window.location.reload();
  }
}
