// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard'; // ✅ Ensure AuthGuard exists

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/landing/landing.component')
      .then(m => m.LandingComponent)
  },
  {
    path: 'signin',
    loadComponent: () => import('./pages/signin/signin.component')
      .then(m => m.SigninComponent)
  },
  {
    path: 'verify-otp',
    loadComponent: () => import('./pages/signin/otp-verification/otp-verification.component')
      .then(m => m.OtpVerificationComponent)
  },
  {
    path: 'signup',
    loadComponent: () => import('./pages/signup/signup.component')
      .then(m => m.SignupComponent)
  },
  // ✅ Superadmin dashboard
  {
    path: 'superadmin',
    loadComponent: () => import('./dashboards/super-admin/super-admin.component')
      .then(m => m.SuperadminComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'add-admin',
    loadComponent: () => import('./dashboards/super-admin/add-admin/add-admin.component')
      .then(m => m.AddAdminComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'superadmin/view-admins',
    loadComponent: () => import('./dashboards/super-admin/view-admins/view-admins.component')
      .then(m => m.ViewAdminsComponent),
    canActivate: [AuthGuard]
  },
  // ✅ New Manage Roles & Permissions Route
  {
    path: 'superadmin/manage-roles',
    loadComponent: () => import('./dashboards/super-admin/role-permission-management/role-permission-management.component')
      .then(m => m.RolePermissionManagementComponent),
    canActivate: [AuthGuard]
  },

  // ---------------------- ADMIN ----------------------
  {
    path: 'admin',
    loadComponent: () => import('./dashboards/admin/admin.component')
      .then(m => m.AdminComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/view-messages',
    loadComponent: () => import('./dashboards/admin/view-messages/view-messages.component')
      .then(m => m.ViewMessagesComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/add-doctor',
    loadComponent: () => import('./dashboards/admin/add-doctor/add-doctor.component')
      .then(m => m.AddDoctorComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/view-doctors',
    loadComponent: () =>
      import('./dashboards/admin/view-doctors/view-doctors.component')
        .then(m => m.ViewDoctorsComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/edit-doctor/:doctorId',
    loadComponent: () => import('./pages/edit-doctors/edit-doctor.component')
      .then(m => m.EditDoctorComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/add-patient',
    loadComponent: () =>
      import('./dashboards/admin/add-patients/add-patients.component')
        .then(m => m.AddPatientComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/view-patients',
    loadComponent: () =>
      import('./dashboards/admin/view-patients/view-patients.component')
        .then(m => m.ViewPatientsComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/edit-patient/:patientId',
    loadComponent: () => import('./pages/edit-patients/edit-patient.component')
      .then(m => m.EditPatientComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/upload-medicines',
    loadComponent: () =>
      import('./dashboards/admin/upload-medicines/upload-medicines.component')
        .then(m => m.UploadMedicinesComponent),
    canActivate: [AuthGuard]
  },

  // ---------------------- DOCTOR ----------------------
  {
    path: 'doctor',
    loadComponent: () => import('./dashboards/doctor/doctor.component')
      .then(m => m.DoctorComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'doctor/view-appointments',
    loadComponent: () => import('./dashboards/doctor/view-doctor-appointments/view-doctor-appointments.component')
      .then(m => m.ViewDoctorAppointmentsComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'doctor/prescribe',
    loadComponent: () => import('./dashboards/doctor/prescribe-medicine/prescribe-medicine.component')
      .then(m => m.PrescribeMedicineComponent),
    canActivate: [AuthGuard]
  },

  // ---------------------- RECEPTIONIST ----------------------
  {
    path: 'receptionist',
    loadComponent: () => import('./dashboards/receptionist/receptionist.component')
      .then(m => m.ReceptionistComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'receptionist/schedule',
    loadComponent: () => import('./dashboards/receptionist/schedule-appointment.component')
      .then(m => m.ScheduleAppointmentComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'receptionist/view',
    loadComponent: () => import('./dashboards/receptionist/view-appointments.component')
      .then(m => m.ViewAppointmentsComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'receptionist/generate-bill',
    loadComponent: () => import('./dashboards/receptionist/generate-bill/generate-bill.component')
      .then(m => m.GenerateBillComponent),
    canActivate: [AuthGuard]
  },

  // ---------------------- PATIENT ----------------------
  {
    path: 'patient',
    loadComponent: () => import('./dashboards/patient/patient.component')
      .then(m => m.PatientComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'patient/book-appointment',
    loadComponent: () => import('./dashboards/patient/book-appointment/book-appointment.component')
      .then(m => m.BookAppointmentComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'patient/view-records',
    loadComponent: () => import('./dashboards/patient/view-records/view-records.component')
      .then(m => m.ViewRecordsComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'patient/view-bills',
    loadComponent: () => import('./dashboards/patient/view-bills/view-bills.component')
      .then(m => m.ViewBillsComponent),
    canActivate: [AuthGuard]
  },

  // ---------------------- CONTACT ----------------------
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact.component')
      .then(m => m.ContactComponent)
  },

  // ---------------------- DEFAULT ----------------------
  {
    path: '**',
    redirectTo: ''
  }
];
