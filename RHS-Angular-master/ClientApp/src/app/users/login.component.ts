import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from './user.service';

@Component({
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;
  errorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void { }

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.loading = true;

    this.userService.login({
      email: this.f.username.value,
      password: this.f.password.value
    }).subscribe({
      next: (response: any) => {
        this.userService.setUser(response.user);
        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        this.router.navigateByUrl(returnUrl);
      },
      error: (error: any) => {
        if (error.status === 401) {
          this.errorMessage = 'Invalid credentials. Please try again.';
        } else if (error.status === 404) {
          this.errorMessage = 'User not found. Please register.';
        } else if (error.status === 403) {
          this.errorMessage = 'Incorrect password. Please try again.';
        } else if (error.status === 500) {
          this.errorMessage = 'Server error. Please try again later.';
          console.error('Server error:', error);
        } else {
          this.errorMessage = 'An unexpected error occurred';
          console.error('An unexpected error occurred:', error);
        }

        this.loading = false;
      }
    });
  }
}
