import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../header/header.component';

@Component({
  selector: 'app-doctor',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent],
  templateUrl: './doctor.component.html'
})
export class DoctorComponent {
  constructor(private router: Router) {}

  logout(): void {
    this.router.navigate(['']);
  }
}
