// src/app/app.config.ts
import { provideRouter } from '@angular/router';
import { provideHttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { importProvidersFrom } from '@angular/core';

// ✅ CORRECTED PATHS: These files are in the same directory as app.config.ts
import { AppComponent } from './app.component'; // Corrected from './app/app.component'
import { routes } from './app.routes';           // Corrected from './app/app.routes'
import { AuthInterceptor } from './auth.interceptor'; // Corrected from './app/auth.interceptor'

export const appConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom(FormsModule, ReactiveFormsModule),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
};
