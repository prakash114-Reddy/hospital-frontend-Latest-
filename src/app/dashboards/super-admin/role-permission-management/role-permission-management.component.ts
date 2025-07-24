import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../../header/header.component';

@Component({
  selector: 'app-role-permission-management',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent],
  templateUrl: './role-permission-management.component.html',
  styleUrls: ['./role-permission-management.component.css']
})
export class RolePermissionManagementComponent implements OnInit {

  roles: string[] = ['SUPERADMIN', 'ADMIN', 'DOCTOR', 'PATIENT', 'RECEPTIONIST'];
  selectedRole: string = 'ADMIN';
  permissions: any[] = [];
  selectedPermissions: number[] = [];
  loggedInUserRole: string = '';

  // DIRECT URL so it actually hits Spring without a proxy
  private baseUrl = 'http://localhost:8080/api/superadmin';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadAllPermissions();
    this.loadRolePermissions();
  }

  loadAllPermissions(): void {
    console.log('Calling:', `${this.baseUrl}/permissions`);
    this.http.get<any>(`${this.baseUrl}/permissions`).subscribe({
      next: (res) => {
        console.log('ALL perms res:', res);
        this.permissions = res?.data || [];
      },
      error: (err) => {
        console.error('Error fetching permissions:', err);
        this.permissions = [];
      }
    });
  }

  loadRolePermissions(): void {
    console.log('Calling:', `${this.baseUrl}/roles/${this.selectedRole}/permissions`);
    this.http.get<any>(`${this.baseUrl}/roles/${this.selectedRole}/permissions`).subscribe({
      next: (res) => {
        console.log('ROLE perms res:', res);
        this.selectedPermissions = (res?.data || []).map((p: any) => p.id);
      },
      error: (err) => {
        console.error(`Error fetching permissions for ${this.selectedRole}:`, err);
        this.selectedPermissions = [];
      }
    });
  }

  onRoleChange(): void {
    this.loadRolePermissions();
  }

  isPermissionSelected(permissionId: number): boolean {
    return this.selectedPermissions.includes(permissionId);
  }

  togglePermission(permissionId: number, event: any): void {
    if (event.target.checked) {
      if (!this.selectedPermissions.includes(permissionId)) {
        this.selectedPermissions.push(permissionId);
      }
    } else {
      this.selectedPermissions = this.selectedPermissions.filter(id => id !== permissionId);
    }
  }

  savePermissions(): void {
    console.log('PUT:', `${this.baseUrl}/roles/${this.selectedRole}/permissions`, this.selectedPermissions);
    this.http.put(`${this.baseUrl}/roles/${this.selectedRole}/permissions`, this.selectedPermissions).subscribe({
      next: () => {
        alert(`Permissions updated for ${this.selectedRole}`);
      },
      error: (err) => {
        console.error('Error updating permissions:', err);
        alert('Failed to update permissions');
      }
    });
  }
}
