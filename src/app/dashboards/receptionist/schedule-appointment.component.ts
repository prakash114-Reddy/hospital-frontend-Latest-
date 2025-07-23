import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-schedule-appointment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './schedule-appointment.component.html'
})
export class ScheduleAppointmentComponent implements OnInit {
  appointment = {
    doctorId: null,
    patientId: null,
    appointmentDate: '',
    appointmentTime: '',
    reason: ''
  };

  doctors: any[] = [];
  patients: any[] = [];

  today: string = new Date().toISOString().split('T')[0]; // today's date
  minTime: string = '09:00';
  maxTime: string = '18:00';
  timeInvalid: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadDoctors();
    this.loadPatients();
  }

  loadDoctors() {
    this.http.get<any>('http://localhost:8080/api/doctors').subscribe({
      next: res => this.doctors = res.data,
      error: err => console.error('❌ Failed to load doctors', err)
    });
  }

  loadPatients() {
    this.http.get<any>('http://localhost:8080/api/patients').subscribe({
      next: res => this.patients = res.data,
      error: err => console.error('❌ Failed to load patients', err)
    });
  }

  validateTime() {
    const t = this.appointment.appointmentTime;
    this.timeInvalid = t < this.minTime || t > this.maxTime;
  }

  onSubmit() {
    this.validateTime();

    if (this.timeInvalid) {
      alert("❌ Appointment time must be between 09:00 and 18:00.");
      return;
    }

    const body = {
      doctorId: this.appointment.doctorId,
      patientId: this.appointment.patientId,
      appointmentDate: this.appointment.appointmentDate,
      appointmentTime: this.appointment.appointmentTime,
      reason: this.appointment.reason
    };

    this.http.post('http://localhost:8080/api/appointments/book', body).subscribe({
      next: () => alert('✅ Appointment Scheduled!'),
      error: (err) => {
        console.error(err);
        alert('❌ Failed to schedule appointment!');
      }
    });
  }
}
