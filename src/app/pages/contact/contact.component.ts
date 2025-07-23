import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './contact.component.html'
})
export class ContactComponent {
  contact = {
    name: '',
    email: '',
    message: ''
  };

  constructor(private http: HttpClient) {}

  onSubmit(): void {
    this.http.post('http://localhost:8080/api/contact', this.contact).subscribe({
      next: () => {
        alert(`📬 Thank you, ${this.contact.name}! We received your message.`);
        this.contact = { name: '', email: '', message: '' };
      },
      error: (err) => {
        console.error(err);
        alert('❌ Failed to send message');
      }
    });
  }
}
