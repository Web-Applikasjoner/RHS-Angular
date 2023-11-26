import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'api/user';
  private user: any; 
  userChanged = new EventEmitter<any>();

  constructor(private http: HttpClient) { }

  async register(user: any): Promise<any> {
    try {      
      const registerUrl = `${this.baseUrl}/register`;
      const response = await this.http.post(registerUrl, user).toPromise();
      return response;
    } catch (error) {
      console.error('Registration failed', error);
      throw error; 
    }
  }

  setUser(user: any): void {
    this.user = user;
    this.userChanged.emit(this.user); 
  }

  getUser(): any {
    return this.user;
  }

  login(credentials: { Email: string, Password: string }): Observable<any> {
    const loginUrl = `${this.baseUrl}/login`;
    return this.http.post(loginUrl, credentials)
      .pipe(
        tap((response: any) => {
          console.log('Login response:', response);
          if (response && response.message === 'Login successful' && response.user) {
            this.setUser(response.user);
          }
        })
      );
  }


  logout(): void {
    this.user = null;
    this.userChanged.emit(this.user);
  } 
}
