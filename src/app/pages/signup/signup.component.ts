    // src/app/pages/signup/signup.component.ts
    import { Component } from '@angular/core';
    import { CommonModule } from '@angular/common';
    import { FormsModule } from '@angular/forms';
    import { AuthService } from '../../services/auth.service';
    import { Router } from '@angular/router';

    @Component({
      selector: 'app-signup',
      standalone: true,
      imports: [CommonModule, FormsModule],
      templateUrl: './signup.component.html',
      styleUrls: ['./signup.component.css']
    })
    export class SignupComponent {
      user = { // Define default values for user properties
        username: '',
        password: '',
        email: '',
        role: 'PATIENT' // Default role for signup, adjust as needed
      };
      message: string = '';

      constructor(private authService: AuthService, private router: Router) { }

      onSubmit(): void {
        this.message = '';
        // Call the signup method from AuthService
        this.authService.signup(this.user).subscribe({
          next: (response: any) => { // Adjust type as per your backend signup response
            this.message = 'Signup successful! Please sign in.';
            // Optionally clear the form
            this.user = { username: '', password: '', email: '', role: 'PATIENT' };
            setTimeout(() => {
              this.router.navigate(['/signin']); // Redirect to signin after successful signup
            }, 1500);
          },
          error: (error: any) => {
            console.error('Signup error:', error);
            this.message = `Signup failed: ${error.error?.message || error.message}`;
          }
        });
      }
    }
    