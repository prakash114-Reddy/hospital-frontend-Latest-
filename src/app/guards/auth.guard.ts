// src/app/guards/auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthStateService } from '../services/auth-state.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authStateService: AuthStateService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    console.log('AuthGuard: canActivate called for route:', state.url);
    const isLoggedIn = this.authStateService.getLoginStatus(); // ✅ Use the new synchronous method

    if (isLoggedIn) {
      console.log('AuthGuard: User is logged in (AuthStateService says TRUE). Allowing access to', state.url);
      return true;
    } else {
      console.warn('AuthGuard: User is NOT logged in (AuthStateService says FALSE). Redirecting to signin page from', state.url);
      this.authStateService.clearLoginState(); // Ensure localStorage is cleared
      return this.router.createUrlTree(['/signin']);
    }
  }
}
