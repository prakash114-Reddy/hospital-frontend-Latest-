// src/app/pages/signin/signin.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AuthStateService } from '../../services/auth-state.service';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  email: string = '';
  message: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private authStateService: AuthStateService
  ) { }

  ngOnInit(): void {
    console.log('SigninComponent: ngOnInit called.');
    if (this.authStateService.getLoginStatus()) { // ✅ Use the new synchronous method
      console.log('SigninComponent: AuthStateService indicates user is already logged in. This component should not be reached directly if guard works.');
      // Optional: if you want to force redirect here too, but AuthGuard is primary
      // const role = this.authStateService.getUserRole();
      // if (role) {
      //   this.router.navigate([`/${role.toLowerCase()}`]);
      // }
    } else {
      console.log('SigninComponent: AuthStateService says user is NOT logged in. Displaying email form.');
    }
  }

  sendOtp(): void {
    this.message = '';
    if (!this.email) {
      this.message = 'Please enter your email address.';
      return;
    }

    this.authService.sendOtp(this.email).subscribe({
      next: (response: string) => {
        this.message = response;
        console.log('SigninComponent: OTP sent successfully, navigating to verify-otp.');
        this.router.navigate(['/verify-otp'], { queryParams: { email: this.email } });
      },
      error: (error: any) => {
        console.error('SigninComponent: Error sending OTP:', error);
        this.message = `Failed to send OTP: ${error.error || error.message}`;
      }
    });
  }
}
