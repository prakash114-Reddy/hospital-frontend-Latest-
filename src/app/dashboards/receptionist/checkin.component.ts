import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../services/appointment.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../header/header.component';

@Component({
  selector: 'app-checkin',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent],
  templateUrl: './checkin.component.html'
})
export class CheckinComponent implements OnInit {
  appointments: any[] = [];

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit(): void {
    this.loadAppointments();
  }

  loadAppointments(): void {
    this.appointmentService.getAllAppointments().subscribe({
      next: (res) => {
        this.appointments = res.data;
      },
      error: () => {
        alert('❌ Failed to load appointments.');
      }
    });
  }

  checkIn(appointmentId: number): void {
    this.appointmentService.checkInAppointment(appointmentId).subscribe({
      next: () => {
        alert('✔️ Appointment checked in successfully!');
        this.loadAppointments(); // refresh list
      },
      error: () => {
        alert('❌ Failed to check in appointment.');
      }
    });
  }
}
