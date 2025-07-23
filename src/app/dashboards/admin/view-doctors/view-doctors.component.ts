import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-view-doctors',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './view-doctors.component.html',
  styleUrls: ['./view-doctors.component.css']
})
export class ViewDoctorsComponent implements OnInit {
  doctors: any[] = [];
  loading = true;
  errorMessage = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchDoctors();
  }

  fetchDoctors(): void {
    this.http.get<any>('http://localhost:8080/api/doctors').subscribe({
      next: res => {
        this.doctors = res.data;
        this.loading = false;
      },
      error: () => {
        this.errorMessage = '❌ Failed to load doctors.';
        this.loading = false;
      }
    });
  }

  onDeleteDoctor(doctorId: number): void {
    console.log('Trying to delete doctor with ID:', doctorId);

    if (!doctorId) {
      alert('❌ Invalid doctor ID. Cannot delete.');
      return;
    }

    if (confirm('Are you sure you want to delete this doctor?')) {
      this.http.delete(`http://localhost:8080/api/doctors/${doctorId}`).subscribe({
        next: () => {
          alert('✅ Doctor deleted successfully');
          this.fetchDoctors();
        },
        error: (err) => {
          console.error('❌ Delete error:', err);
          alert('❌ Failed to delete doctor. They may have linked patients or appointments.');
        }
      });
    }
  }
}