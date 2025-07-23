import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

declare var Razorpay: any;

@Component({
  selector: 'app-book-appointment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './book-appointment.component.html'
})
export class BookAppointmentComponent implements OnInit {
  doctorList: any[] = [];
  today: string = new Date().toISOString().split('T')[0];
  minTime: string = "09:00";
  maxTime: string = "18:00";

  timeTouched: boolean = false;
  timeInvalid: boolean = false;

  appointment = {
    appointmentDate: '',
    appointmentTime: '',
    reason: '',
    doctorId: '',
    patientId: 1,
    paymentMethod: ''
  };

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.loadDoctors();
    this.appointment.appointmentDate = this.today;
    this.onDateChange();
    this.loadRazorpayScript();
  }

  loadDoctors() {
    this.http.get<any>('http://localhost:8080/api/doctors').subscribe({
      next: res => this.doctorList = res.data,
      error: err => {
        alert("\u274C Failed to load doctors");
        console.error("Doctor Load Error:", err);
      }
    });
  }

  onDateChange() {
    this.minTime = "09:00";
    this.maxTime = "18:00";
    this.appointment.appointmentTime = '';
    this.timeInvalid = false;
    this.timeTouched = false;
  }

  onTimeChange() {
    this.timeTouched = true;
    const time = this.appointment.appointmentTime;
    this.timeInvalid = !time || time < this.minTime || time > this.maxTime;
  }

  bookAppointment() {
    this.onTimeChange();
    if (this.timeInvalid) {
      alert("\u2757 Please select a valid appointment time.");
      return;
    }

    if (!this.appointment.doctorId || !this.appointment.reason || !this.appointment.paymentMethod) {
      alert("\u2757 Please fill all required fields.");
      return;
    }

    if (this.appointment.paymentMethod === 'PAY_LATER') {
      this.saveAppointment();
    } else if (['CARD', 'UPI'].includes(this.appointment.paymentMethod)) {
      this.startPayment();
    } else {
      alert('\u2757 Please select a valid payment method.');
    }
  }

  loadRazorpayScript() {
    if (document.getElementById('razorpay-script')) return;

    const script = document.createElement('script');
    script.id = 'razorpay-script';
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onerror = () => alert("\u274C Razorpay script failed to load.");
    document.body.appendChild(script);
  }

  startPayment() {
    const amountInRupees = 500;

    this.http.post<any>('http://localhost:8080/api/payment/create-order', {
      amount: amountInRupees
    }).subscribe({
      next: (order) => {
        const options = {
          key: 'rzp_test_01PUUhgE2krBQm',
          amount: order.amount,
          currency: order.currency,
          name: 'Hospital Appointment',
          description: 'Consultation Fee',
          order_id: order.id,
          handler: (response: any) => {
            this.saveAppointment();
          },
          prefill: {
            name: 'Patient',
            email: 'patient@example.com',
            contact: '9353998772'
          },
          theme: {
            color: '#3399cc'
          }
        };

        const rzp = new Razorpay(options);
        rzp.on('payment.failed', function (response: any) {
          alert("\u274C Payment failed. Please try again.");
          console.error("Razorpay Error:", response.error);
        });

        rzp.open();
      },
      error: err => {
        alert("\u274C Failed to create payment order.");
        console.error("Create Order Error:", err);
      }
    });
  }

  saveAppointment() {
    this.http.post<any>('http://localhost:8080/api/appointments/book', this.appointment).subscribe({
      next: res => {
        alert("\u2705 Appointment booked successfully!");
        this.router.navigate(['/patient-dashboard']);
      },
      error: err => {
        alert("\u274C Failed to book appointment");
        console.error("Booking Error:", err);
      }
    });
  }
}
