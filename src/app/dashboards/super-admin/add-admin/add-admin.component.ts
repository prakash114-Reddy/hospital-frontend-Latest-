// src/app/dashboards/super-admin/add-admin/add-admin.component.ts
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
 import { HttpHeaders } from '@angular/common/http'; // Add this at the top

@Component({
  selector: 'app-add-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.css']
})
export class AddAdminComponent {

  adminUser = {
    username: '',
    password: '',
    email: '', // ✅ Added email field
    role: 'ADMIN'
  };
  message: string = ''; // For displaying success/error messages

  constructor(private http: HttpClient, private router: Router) {}

 

addAdmin() {
  this.message = ''; // Clear previous messages

  if (!this.adminUser.username || !this.adminUser.password || !this.adminUser.email) {
    this.message = 'Please fill in all fields (Username, Password, Email).';
    return;
  }

  // 🔐 Get JWT token from localStorage
  const token = localStorage.getItem('token');

  if (!token) {
    this.message = '❌ You must be logged in as SuperAdmin to perform this action.';
    return;
  }

  // ✅ Set Authorization header
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  });

  this.http.post('http://localhost:8080/api/users', this.adminUser, { headers }).subscribe({
    next: res => {
      this.message = '✅ Admin added successfully!';
      this.adminUser = { username: '', password: '', email: '', role: 'ADMIN' }; // Clear form
      setTimeout(() => {
        this.router.navigate(['/superadmin']);
      }, 1500);
    },
    error: err => {
      console.error('Error adding admin:', err);
      this.message = `❌ Failed to add admin: ${err.error?.message || err.message || 'Unknown error'}`;
    }
  });
}

}
