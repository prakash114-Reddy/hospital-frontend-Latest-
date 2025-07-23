import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-doctor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.css']
})
export class AddDoctorComponent {
doctor = {
  doctorName: '',
  specialization: '',
  experience: 0,
  timings: '',
  user: {
    username: '',
    password: '',
    role: 'DOCTOR',
    email: ''  // ✅ Add this field
  }
};

  constructor(private http: HttpClient, private router: Router) {}

  addDoctor() {
    this.http.post('http://localhost:8080/api/doctors', this.doctor).subscribe({
      next: res => {
        alert('✅ Doctor added successfully!');
        this.router.navigate(['/admin']);
      },
      error: err => {
        console.error(err);
        alert('❌ Failed to add doctor');
      }
    });
  }
}
