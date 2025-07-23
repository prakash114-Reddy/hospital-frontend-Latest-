import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true, // ✅ Make it standalone
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
  imports: [CommonModule, RouterModule] // ✅ Import RouterModule so routerLink works
})
export class LandingComponent {}
