import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  credentials: { Email: string; Password: string } = { Email: '', Password: '' };
  loading = false;
  errorMessage = '';

  constructor(private userService: UserService, private router: Router) { }

  onSubmit() {
    this.loading = true;

    this.userService.login(this.credentials).subscribe({
      next: (response: any) => {
        if (response && response.message === 'Login successful') {
          this.userService.setUser(response.user);
          this.router.navigateByUrl('/');
          alert('Login successful!');
        } else {
          this.errorMessage = 'Invalid email or password.';
        }
        this.loading = false;
      },
      error: (error: any) => {
        this.errorMessage = 'An unexpected error occurred';
        console.error('An unexpected error occurred:', error);
        this.loading = false;
      },
    });
  }
}
