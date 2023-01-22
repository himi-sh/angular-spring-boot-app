import { Component, Input } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  form: any = {};
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  title = 'Sign Up';
  buttonTitle = 'Register';
  showAvtar = true;

  @Input() prop: any;

  constructor(private authService: AuthService) {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
   }

  ngOnInit(): void {
    if (this.prop) {
      this.title = this.prop.title;
      this.buttonTitle = this.prop.buttonTitle;
      this.showAvtar = this.prop.showAvtar;
    }
  }

  onSubmit(): void {
    this.authService.register(this.form.value).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.form.reset();

      },
      err => {
        this.errorMessage = err.error.message;
        this.isSuccessful = false;
        this.isSignUpFailed = true;
      }
    );
  }
}
