import { Injectable } from '@angular/core';
import { UserService } from '../users/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userEmail: string | null = null;
  private _isAuthenticated: boolean = false;

  constructor(private userService: UserService) {
    this.updateAuthState();
    this.userService.userChanged.subscribe(() => {
      this.updateAuthState();
    });
  }

  private updateAuthState() {
    const user = this.userService.getUser();
    this.userEmail = user ? user.Email : null;
    this._isAuthenticated = !!this.userEmail;
  }

  isAuthenticated(): boolean {
    return this._isAuthenticated;
  }

  isAdmin(): boolean {
    return this._isAuthenticated && this.userEmail === 'admin@rhs.com';
  }
}
