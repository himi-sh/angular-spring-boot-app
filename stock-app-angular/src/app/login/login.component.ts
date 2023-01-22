import { Component } from '@angular/core';
import { UserService } from './user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';
  loginForm: FormGroup;

  constructor(private userService: UserService) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  login() {
    this.userService.login(this.loginForm.value).subscribe(
      (response: any) => {
        // handle successful login
      },
      (error: any) => {
        // handle login error
      }
    );
  }

}
