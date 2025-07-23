import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-prescribe-medicine',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule
  ],
  templateUrl: './prescribe-medicine.component.html',
})
export class PrescribeMedicineComponent implements OnInit {
  prescription = {
    patientId: 0,
    diagnosis: '',
    medicines: [] as string[]
  };

  patients: any[] = [];
  medicines: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // Load patients (assuming API returns { data: [...] })
    this.http.get<any>('http://localhost:8080/api/patients').subscribe({
      next: res => {
        this.patients = res.data || [];
      },
      error: err => console.error('❌ Failed to load patients', err)
    });

    // Load medicines (API returns direct array)
    this.http.get<any>('http://localhost:8080/api/medicines').subscribe({
      next: res => {
        this.medicines = res || [];
      },
      error: err => console.error('❌ Failed to load medicines', err)
    });
  }

  onSubmit() {
    const token = localStorage.getItem('token');
    const appointmentId = 1; // Update as needed

    const body = {
      medicineNames: this.prescription.medicines,
      dosage: '1 tablet',
      duration: '5 days'
    };

    this.http.post(`http://localhost:8080/api/prescriptions/appointment/${appointmentId}`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }).subscribe({
      next: () => alert('✅ Prescription submitted!'),
      error: err => {
        console.error('❌ Failed to submit prescription:', err);
        alert('❌ Failed to submit prescription');
      }
    });
  }
}
