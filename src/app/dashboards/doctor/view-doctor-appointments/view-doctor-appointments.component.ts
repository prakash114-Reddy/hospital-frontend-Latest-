import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-doctor-appointments',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-doctor-appointments.component.html'
})
export class ViewDoctorAppointmentsComponent implements OnInit {
  appointments: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');

    if (!token) {
      alert("❌ Token not found. Please log in.");
      return;
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    this.http.get<any>('http://localhost:8080/api/appointments/doctor/me/appointments', { headers })
      .subscribe({
        next: res => {
          this.appointments = res.data;
        },
        error: err => {
          alert("❌ Failed to load appointments");
          console.error(err);
        }
      });
  }
}
