import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../header/header.component'; // ✅ Make sure this path is correct

@Component({
  selector: 'app-patient',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent], // ✅ Include header component
  templateUrl: './patient.component.html'
})
export class PatientComponent {
  constructor(private router: Router) {}

  logout(): void {
    this.router.navigate(['']); // ✅ Redirect to landing page
  }
}
