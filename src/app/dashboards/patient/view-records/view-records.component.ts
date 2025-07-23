import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-view-records',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './view-records.component.html'
})
export class ViewRecordsComponent implements OnInit {

  medicalRecords: any[] = []; // you can also use typed array if you define an interface

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadRecords();
  }

  loadRecords(): void {
    const patientId = Number(localStorage.getItem('patientId')); // ✅ get dynamically
    if (!patientId) {
      alert('❌ Patient not logged in');
      return;
    }

    this.http.get<any>(`http://localhost:8080/api/appointments/patient/${patientId}/records`)
      .subscribe({
        next: res => {
          this.medicalRecords = res.data;
        },
        error: err => {
          alert('❌ Failed to load medical records');
          console.error(err);
        }
      });
  }

  deleteRecord(recordId: number): void {
    if (confirm('Are you sure you want to delete this record?')) {
      this.http.delete<any>(`http://localhost:8080/api/appointments/records/${recordId}`)
        .subscribe({
          next: () => {
            this.medicalRecords = this.medicalRecords.filter(record => record.recordId !== recordId);
            alert('✅ Record deleted successfully');
          },
          error: err => {
            alert('❌ Failed to delete record');
            console.error(err);
          }
        });
    }
  }
}
