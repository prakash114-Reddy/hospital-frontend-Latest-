import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-view-admins',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './view-admins.component.html',
  styleUrls: ['./view-admins.component.css']
})
export class ViewAdminsComponent implements OnInit {
  admins: any[] = [];
  loading = true;
  errorMessage = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchAdmins();
  }

 fetchAdmins() {
  const token = localStorage.getItem('token');

  const headers = {
    Authorization: `Bearer ${token}`
  };

  this.http.get<any>('http://localhost:8080/api/superadmin/admins', { headers })
    .subscribe({
      next: (res) => {
        this.admins = res.data;
      },
      error: (err) => {
        console.error('Error fetching admins:', err);
      }
    });
}


  onDeleteAdmin(adminId: number): void {
    if (!adminId) {
      alert('❌ Invalid admin ID.');
      return;
    }

    if (confirm('Are you sure you want to delete this admin?')) {
      this.http.delete(`http://localhost:8080/api/admins/${adminId}`).subscribe({
        next: () => {
          alert('✅ Admin deleted successfully');
          this.fetchAdmins();
        },
        error: () => {
          alert('❌ Failed to delete admin.');
        }
      });
    }
  }
}
