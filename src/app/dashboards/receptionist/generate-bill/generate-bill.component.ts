import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-generate-bill',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './generate-bill.component.html'
})
export class GenerateBillComponent {
  bill = {
    appointmentId: null,
    testCharge: null,
    medicineCharge: null
  };

  totalAmount: number | null = null;

  constructor(private http: HttpClient) {}

  generateBill() {
    const { appointmentId, testCharge, medicineCharge } = this.bill;

    if (!appointmentId || testCharge === null || medicineCharge === null) {
      alert('❗ Please fill all fields');
      return;
    }

    this.http.post<any>(`http://localhost:8080/api/bills/${appointmentId}`, {
      testCharge,
      medicineCharge
    }).subscribe({
      next: (res) => {
        this.totalAmount = res.data.totalAmount;
        alert('✅ Bill generated successfully!');
      },
      error: (err) => {
        console.error(err);
        alert('❌ Failed to generate bill!');
      }
    });
  }
}
