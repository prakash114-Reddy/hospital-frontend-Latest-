import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-patient',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-patients.component.html',
  styleUrls: ['./add-patients.component.css']
})
export class AddPatientComponent {
  today: string = new Date().toISOString().split('T')[0]; // 🟢 For max date on date input

  patient = {
    fullName: '',
    age: null,
    gender: '',
    phone: '',
    address: '',
    registeredDate: '',
    user: {
      username: '',
      password: '',
      role: 'PATIENT'
    }
  };

  constructor(private http: HttpClient, private router: Router) {}

  addPatient() {
    if (!this.isValid()) {
      alert('❌ Please fill out all fields correctly.');
      return;
    }

    this.http.post('http://localhost:8080/api/patients', this.patient).subscribe({
      next: res => {
        alert('✅ Patient added successfully!');
        this.router.navigate(['/admin']);
      },
      error: err => {
        console.error(err);
        alert('❌ Failed to add patient. Please check the details and try again.');
      }
    });
  }

  // 🛡️ Basic frontend validation before sending request
 isValid(): boolean {
  const p = this.patient;
  return (
    typeof p.fullName === 'string' && p.fullName.trim().length > 0 &&
    typeof p.age === 'number' && p.age >= 1 &&
    typeof p.gender === 'string' && p.gender.trim().length > 0 &&
    typeof p.phone === 'string' && /^\d{10}$/.test(p.phone) &&
    typeof p.address === 'string' && p.address.trim().length > 0 &&
    typeof p.registeredDate === 'string' && p.registeredDate <= this.today &&
    typeof p.user.username === 'string' && p.user.username.trim().length > 0 &&
    typeof p.user.password === 'string' && p.user.password.trim().length > 0
  );
}

}
