// src/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component'; // Import AppComponent from src/app/
import { appConfig } from './app/app.config';       // Import appConfig from src/app/app.config.ts

// This line is the "front door" that starts your Angular application
bootstrapApplication(AppComponent, appConfig)
  .catch(err => console.error(err));
