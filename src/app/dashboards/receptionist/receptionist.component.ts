import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../header/header.component'; 

@Component({
  selector: 'app-receptionist',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent], // ✅ Include header
  templateUrl: './receptionist.component.html'
})
export class ReceptionistComponent {
  constructor(private router: Router) {}

  logout(): void {
    this.router.navigate(['']); // ✅ Navigates to landing page
  }
}
