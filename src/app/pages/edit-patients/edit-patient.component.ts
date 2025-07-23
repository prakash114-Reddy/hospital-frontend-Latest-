import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-patient',
  standalone: true, // ✅ Standalone component
  imports: [CommonModule, FormsModule], // ✅ Required modules
  templateUrl: './edit-patient.component.html',
  styleUrls: ['./edit-patient.component.css']
})
export class EditPatientComponent implements OnInit {
  patientId: number = 0;
  patient: any = {};

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.patientId = Number(this.route.snapshot.paramMap.get('patientId'));
    this.http.get<any>(`http://localhost:8080/api/patients/${this.patientId}`).subscribe({
      next: res => this.patient = res.data,
      error: () => alert('❌ Failed to load patient')
    });
  }

  updatePatient(): void {
    this.http.put(`http://localhost:8080/api/patients/${this.patientId}`, this.patient).subscribe({
      next: () => {
        alert('✅ Patient updated successfully');
        this.router.navigate(['/admin/view-patients']);
      },
      error: () => alert('❌ Update failed')
    });
  }
}
