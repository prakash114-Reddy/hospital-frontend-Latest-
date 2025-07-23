import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-view-patients',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './view-patients.component.html',
  styleUrls: ['./view-patients.component.css']
})
export class ViewPatientsComponent implements OnInit {
  patients: any[] = [];
  loading = true;
  errorMessage = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchPatients();
  }

  fetchPatients(): void {
    this.http.get<any>('http://localhost:8080/api/patients').subscribe({
      next: res => {
        this.patients = res.data;
        this.loading = false;
      },
      error: () => {
        this.errorMessage = '❌ Failed to load patients.';
        this.loading = false;
      }
    });
  }

  onDeletePatient(patientId: number): void {
    if (confirm('Are you sure you want to delete this patient?')) {
      this.http.delete(`http://localhost:8080/api/patients/${patientId}`).subscribe({
        next: () => {
          alert('✅ Patient deleted successfully');
          this.fetchPatients();
        },
        error: () => alert('❌ Failed to delete patient')
      });
    }
  }
}
