import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-doctor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-doctor.component.html',
  styleUrls: ['./edit-doctor.component.css']
})
export class EditDoctorComponent implements OnInit {
  doctorId: number = 0;
  doctor: any = {};

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.doctorId = Number(this.route.snapshot.paramMap.get('doctorId'));
    this.http.get<any>(`http://localhost:8080/api/doctors/${this.doctorId}`).subscribe({
      next: res => this.doctor = res.data,
      error: () => alert('❌ Failed to load doctor')
    });
  }

  updateDoctor(): void {
    this.http.put(`http://localhost:8080/api/doctors/${this.doctorId}`, this.doctor).subscribe({
      next: () => {
        alert('✅ Doctor updated successfully');
        this.router.navigate(['/admin/view-doctors']);
      },
      error: () => alert('❌ Update failed')
    });
  }
}
