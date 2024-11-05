import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      Username: ['', [Validators.required]],
      UserEmail: ['', [Validators.required, Validators.email]],
      Password: ['', [Validators.required, Validators.minLength(6)]],
      UserListings: [[]],
      UserFavorites: [[]],
    });
  }

  ngOnInit(): void {}

  getErrorMessage(controlName: string): string {
    const control = this.loginForm.get(controlName);
    if (control?.hasError('required')) {
      return 'This field is required.';
    }
    if (control?.hasError('email')) {
      return 'Please enter a valid email address.';
    }
    if (control?.hasError('minlength')) {
      return 'Password must be at least 6 characters long.';
    }
    return '';
  }

  checkLogin(): void {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.valid) {
      this.loginService.addUser(this.loginForm.value).subscribe((user: any) => {
        if (user) {
          this.errorMessage = '';
          console.log('Registration successful!');
          this.router.navigate(['login']);
        } else {
          this.errorMessage = 'Invalid email or password.';
        }
      });
    } else {
      this.errorMessage = 'Please correct the errors in the form.';
    }
  }
}
