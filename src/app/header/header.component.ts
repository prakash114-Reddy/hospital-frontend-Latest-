// src/app/header/header.component.ts
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Input() role: string = '';

  constructor(private router: Router) {}

  logout(): void {
    this.router.navigate(['']); // redirect to landing page
  }
}
