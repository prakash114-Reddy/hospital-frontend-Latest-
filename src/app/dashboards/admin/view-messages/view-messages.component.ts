import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-messages',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-messages.component.html'
})
export class ViewMessagesComponent implements OnInit {
  messages: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:8080/api/contact').subscribe({
      next: (data) => this.messages = data,
      error: () => alert('❌ Failed to load messages.')
    });
  }
}
