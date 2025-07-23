// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:8080/api/otp';
  private authBaseUrl = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) { }

  sendOtp(email: string): Observable<string> {
    let params = new HttpParams().set('email', email);
    return this.http.post(`${this.baseUrl}/send-otp`, null, { params, responseType: 'text' });
  }

  // This method now expects a 'token' in the response from the backend.
  verifyOtp(email: string, otp: string): Observable<{ message: string, role: string, token?: string }> {
    let params = new HttpParams()
      .set('email', email)
      .set('otp', otp);

    return this.http.post<{ message: string, role: string, token?: string }>(`${this.baseUrl}/verify-otp`, null, { params }).pipe(
      catchError((error: HttpErrorResponse) => {
        // If it's a 400 Bad Request and the message indicates "already verified"
        // and a role and token are provided, treat it as a success for redirection.
        if (error.status === 400 && error.error && typeof error.error === 'object' && error.error.message && error.error.message.includes('already verified') && error.error.role && error.error.token) {
          return new Observable<{ message: string, role: string, token?: string }>(observer => {
            observer.next(error.error); // Emit the backend's JSON body as a successful value
            observer.complete();
          });
        }
        // For any other error, rethrow it.
        return throwError(() => error);
      })
    );
  }

  signup(userData: any): Observable<any> {
    return this.http.post(`${this.authBaseUrl}`, userData);
  }
}
