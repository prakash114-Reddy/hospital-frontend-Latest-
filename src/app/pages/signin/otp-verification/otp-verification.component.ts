// src/app/pages/signin/otp-verification/otp-verification.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { AuthStateService } from '../../../services/auth-state.service'; // ✅ Import AuthStateService

@Component({
  selector: 'app-otp-verification',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './otp-verification.component.html',
  styleUrls: ['./otp-verification.component.css']
})
export class OtpVerificationComponent implements OnInit {
  email: string = '';
  otp: string = '';
  message: string = '';

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private authStateService: AuthStateService // ✅ Inject AuthStateService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.email = params['email'] || '';
      console.log('OTPVerificationComponent: ngOnInit - Initializing with email from query params:', this.email); // DEBUG
      if (!this.email) {
        this.message = 'Email not provided. Please go back to the sign-in page.';
      }
    });
  }

  verifyOtp(): void {
    this.message = '';
    console.log('OTPVerificationComponent: verifyOtp called for email:', this.email, 'OTP:', this.otp); // DEBUG
    if (!this.otp) {
      this.message = 'Please enter the OTP.';
      return;
    }
    if (!this.email) {
      this.message = 'Email is missing. Please go back and try again.';
      return;
    }

    // The backend's verifyOtp method MUST return a 'token' property for this to work.
    this.authService.verifyOtp(this.email, this.otp).subscribe({
      next: (response: { message: string, role: string, token?: string }) => {
        console.log('OTPVerificationComponent: Received response from verifyOtp:', response); // AGGRESSIVE DEBUG: Inspect full response
        this.message = response.message;
        const role = response.role;
        const token = response.token; // Get the token from the response

        console.log('OTPVerificationComponent: Extracted Role:', role, 'Extracted Token (presence):', !!token); // DEBUG

        if (token) {
          // ✅ Use AuthStateService to set the login state.
          // This ensures AuthStateService's internal state is updated.
          this.authStateService.setLoginState(this.email, role, token);
          console.log('OTPVerificationComponent: AuthStateService.setLoginState called successfully.'); // DEBUG
        } else {
          // If backend doesn't provide a token, it's a critical issue for protected routes.
          console.error('OTPVerificationComponent: CRITICAL - Backend did NOT provide a JWT token in verifyOtp response, even though expected.'); // DEBUG
          this.message = 'Login successful, but security token missing. Please try again or contact support.';
          // You might want to prevent redirection here if a token is absolutely mandatory
          return;
        }

        // Redirect to the appropriate dashboard based on the role
        console.log('OTPVerificationComponent: Redirecting to dashboard based on role:', role); // DEBUG
        switch (role) {
          case 'ADMIN':
            this.router.navigate(['/admin']);
            break;
          case 'DOCTOR':
            this.router.navigate(['/doctor']);
            break;
          case 'PATIENT':
            this.router.navigate(['/patient']);
            break;
          case 'RECEPTIONIST':
            this.router.navigate(['/receptionist']);
            break;
          case 'SUPERADMIN':
            this.router.navigate(['/superadmin']);
            break;
          default:
            this.message = 'OTP verified, but unknown role. Redirecting to default.';
            this.router.navigate(['/signin']);
            break;
        }
      },
      error: (error: any) => {
        console.error('OTPVerificationComponent: Error verifying OTP:', error); // DEBUG
        this.message = `OTP verification failed: ${error.error?.message || error.message}`;
      }
    });
  }

  goBackToSignIn(): void {
    console.log('OTPVerificationComponent: Navigating back to signin.'); // DEBUG
    this.router.navigate(['/signin']);
  }
}
