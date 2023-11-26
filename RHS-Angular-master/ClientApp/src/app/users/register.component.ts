import { Component, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  private baseUrl = 'api/user';
  user: any = {};
  confirmPassword = ''; // For password confirmation
  loading = false;
  registrationError = ''; // To display registration errors

  constructor(private http: HttpClient, private router: Router, private userService: UserService) { }

  async register(): Promise<void> {
    try {
      
      const registerUrl = `${this.baseUrl}/register`;

      const response = await this.http.post(registerUrl, {
        Name: this.user.Name,
        Email: this.user.Email.toLowerCase(),
        Phone: this.user.Phone,
        Password: this.user.Password
      }, { responseType: 'text', observe: 'response' }).toPromise();

      console.log('Server Response:', response);

      if (response?.status && response.status >= 200 && response.status < 300) {
        
        this.userService.setUser(this.user);
        this.router.navigate(['/home']);
        alert('User registered successfully!');

      } else {
        console.error('Unexpected server response:', response);
      }
    } catch (error: any) {
      console.error('Registration failed', error);
      if (error.status === 400) {
        this.registrationError = 'Invalid registration data. Please check your input.';
      } else {
        this.registrationError = 'An unexpected error occurred during registration.';
      }
    }

    finally {
      this.loading = false;
    }
  }

  cancel(): void {
    this.router.navigate(['/']);
  }
}
