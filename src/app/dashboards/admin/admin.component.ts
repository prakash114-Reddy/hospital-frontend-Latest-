import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../header/header.component'; // ✅ Corrected path

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent],
  templateUrl: './admin.component.html'
})
export class AdminComponent {}
