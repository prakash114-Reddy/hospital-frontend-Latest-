// src/app/services/appointment.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private baseUrl = 'http://localhost:8080/api/appointments';

  constructor(private http: HttpClient) {}

  checkInAppointment(id: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/checkin/${id}`, {}); // No need for headers
  }

  getAllAppointments(): Observable<any> {
    return this.http.get(this.baseUrl); // No need for headers
  }
}
