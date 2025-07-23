import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-upload-medicines',
  standalone: true,
  imports: [CommonModule, FormsModule, MatSnackBarModule],
  templateUrl: './upload-medicines.component.html',
})
export class UploadMedicinesComponent {
  selectedFile: File | null = null;

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  uploadFile() {
    if (!this.selectedFile) {
      this.showMessage('⚠️ Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile);

    this.http.post('http://localhost:8080/api/medicines/upload', formData, { responseType: 'text' })
      .subscribe({
        next: (res) => this.showMessage('✅ ' + res),
        error: (err) => this.showMessage('❌ ' + (err.error || 'Upload failed.'))
      });
  }

  private showMessage(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 4000,
      verticalPosition: 'top'
    });
  }
}
