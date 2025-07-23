// src/app/dashboards/super-admin/super-admin.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HeaderComponent } from '../../header/header.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthStateService } from '../../services/auth-state.service';

@Component({
  selector: 'app-superadmin-dashboard',
  standalone: true,
  imports: [HeaderComponent, CommonModule, RouterModule],
  templateUrl: './super-admin.component.html',
  styleUrls: ['./super-admin.component.css']
})
export class SuperadminComponent implements OnInit {
  loggedInUserEmail: string = '';
  loggedInUserRole: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private authStateService: AuthStateService
  ) {}

  ngOnInit(): void {
    console.log('SuperadminComponent: ngOnInit called.');
    if (this.authStateService.getLoginStatus()) { // ✅ Use the new synchronous method
      this.loggedInUserEmail = this.authStateService.getUserEmail() || '';
      this.loggedInUserRole = this.authStateService.getUserRole() || '';
      console.log('SuperadminComponent: Logged in user:', this.loggedInUserEmail, 'Role:', this.loggedInUserRole);
    } else {
      console.warn('SuperadminComponent: AuthStateService says not logged in. Redirecting to signin.');
      this.router.navigate(['/signin']);
    }
  }

  logout(): void {
    console.log('SuperadminComponent: Logout initiated.');
    this.authStateService.clearLoginState();
    console.log('SuperadminComponent: AuthStateService.clearLoginState called.');

    this.router.navigate(['/signin']).then(() => {
      console.log('SuperadminComponent: Navigated to signin, forcing page reload.');
      window.location.reload();
    });
  }

  goToAddAdmin(): void {
    console.log('SuperadminComponent: Navigating to add-admin.');
    this.router.navigate(['/add-admin']);
  }

  goToViewAdmins(): void {
    console.log('SuperadminComponent: Navigating to view-admins.');
    this.router.navigate(['/superadmin/view-admins']);
  }
}
