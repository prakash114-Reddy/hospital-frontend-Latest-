import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-view-appointments',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './view-appointments.component.html'
})
export class ViewAppointmentsComponent implements OnInit {
  appointments: any[] = [];
  searchText: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadAppointments();
  }

  loadAppointments() {
    this.http.get<any>('http://localhost:8080/api/appointments').subscribe({
      next: (response) => {
        this.appointments = response.data;
      },
      error: (err) => {
        alert('❌ Failed to fetch appointments');
        console.error(err);
      }
    });
  }

  // 🔍 Filter logic
  filteredAppointments() {
    return this.appointments.filter(app =>
      (app.patientName?.toLowerCase().includes(this.searchText.toLowerCase()) ||
      app.doctorName?.toLowerCase().includes(this.searchText.toLowerCase()) ||
      app.reason?.toLowerCase().includes(this.searchText.toLowerCase()))
    );
  }

  // 📄 Pagination logic
  paginatedAppointments() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredAppointments().slice(start, start + this.itemsPerPage);
  }

  totalPages(): number {
    return Math.ceil(this.filteredAppointments().length / this.itemsPerPage);
  }

  nextPage() {
    if (this.currentPage < this.totalPages()) this.currentPage++;
  }

  previousPage() {
    if (this.currentPage > 1) this.currentPage--;
  }

  // ❌ Cancel appointment
  cancelAppointment(id: number) {
    if (confirm('Are you sure you want to cancel this appointment?')) {
      this.http.put(`http://localhost:8080/api/appointments/cancel/${id}`, {}).subscribe({
        next: () => {
          alert('🚫 Appointment cancelled');
          this.loadAppointments(); // reload list
        },
        error: (err) => {
          alert('❌ Failed to cancel appointment');
          console.error(err);
        }
      });
    }
  }
}
