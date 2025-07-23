import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-bills',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './view-bills.component.html'
})
export class ViewBillsComponent implements OnInit {
  bills: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.get<any>('http://localhost:8080/api/bills/patient', { headers })
      .subscribe({
        next: (res) => {
          this.bills = res.data;
        },
        error: (err) => {
          console.error(err);
          alert('❌ Failed to load bills.');
        }
      });
  }
}
