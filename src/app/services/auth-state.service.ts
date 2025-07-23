// src/app/services/auth-state.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthStateService {
  private _isLoggedIn = new BehaviorSubject<boolean>(this.hasValidLoginInfo());
  isLoggedIn$: Observable<boolean> = this._isLoggedIn.asObservable();

  constructor() {
    console.log('AuthStateService: Constructor. Initial login check result:', this.hasValidLoginInfo());
  }

  private hasValidLoginInfo(): boolean {
    const email = localStorage.getItem('loggedInUserEmail');
    const role = localStorage.getItem('loggedInUserRole');
    const token = localStorage.getItem('token');
    const isValid = !!email && !!role && !!token;
    console.log(`AuthStateService: hasValidLoginInfo check: Email=${!!email}, Role=${!!role}, Token=${!!token}. Result=${isValid}`);
    return isValid;
  }

  // ✅ NEW METHOD: Provides the current login status synchronously
  getLoginStatus(): boolean {
    return this._isLoggedIn.value; // Access .value directly on the BehaviorSubject
  }

  setLoginState(email: string, role: string, token: string): void {
    localStorage.setItem('loggedInUserEmail', email);
    localStorage.setItem('loggedInUserRole', role);
    localStorage.setItem('token', token);
    this._isLoggedIn.next(true);
    console.log('AuthStateService: Login state SET. localStorage items:', { email, role, token: token ? 'PRESENT' : 'MISSING' });
  }

  clearLoginState(): void {
    localStorage.removeItem('loggedInUserEmail');
    localStorage.removeItem('loggedInUserRole');
    localStorage.removeItem('token');
    this._isLoggedIn.next(false);
    console.log('AuthStateService: Login state CLEARED. localStorage items removed.');
  }

  getUserRole(): string | null {
    const role = localStorage.getItem('loggedInUserRole');
    console.log('AuthStateService: getUserRole called. Role:', role);
    return role;
  }

  getUserEmail(): string | null {
    const email = localStorage.getItem('loggedInUserEmail');
    console.log('AuthStateService: getUserEmail called. Email:', email);
    return email;
  }
}
