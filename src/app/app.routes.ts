// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard'; // ✅ Import AuthGuard (ensure this file exists!)

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
  // ✅ Apply AuthGuard to all protected dashboard routes
  {
    path: 'superadmin',
    loadComponent: () => import('./dashboards/super-admin/super-admin.component')
      .then(m => m.SuperadminComponent),
    canActivate: [AuthGuard] // ✅ Add AuthGuard
  },
  {
    path: 'add-admin',
    loadComponent: () => import('./dashboards/super-admin/add-admin/add-admin.component')
      .then(m => m.AddAdminComponent),
    canActivate: [AuthGuard] // ✅ Add AuthGuard
  },
  {
    path: 'superadmin/view-admins',
    loadComponent: () => import('./dashboards/super-admin/view-admins/view-admins.component')
      .then(m => m.ViewAdminsComponent),
    canActivate: [AuthGuard] // ✅ Add AuthGuard
  },
  {
    path: 'admin',
    loadComponent: () => import('./dashboards/admin/admin.component')
      .then(m => m.AdminComponent),
    canActivate: [AuthGuard] // ✅ Add AuthGuard
  },
  {
    path: 'admin/view-messages',
    loadComponent: () => import('./dashboards/admin/view-messages/view-messages.component')
      .then(m => m.ViewMessagesComponent),
    canActivate: [AuthGuard] // ✅ Add AuthGuard
  },
  {
    path: 'admin/add-doctor',
    loadComponent: () => import('./dashboards/admin/add-doctor/add-doctor.component')
      .then(m => m.AddDoctorComponent),
    canActivate: [AuthGuard] // ✅ Add AuthGuard
  },
  {
    path: 'admin/view-doctors',
    loadComponent: () =>
      import('./dashboards/admin/view-doctors/view-doctors.component')
        .then(m => m.ViewDoctorsComponent),
    canActivate: [AuthGuard] // ✅ Add AuthGuard
  },
  {
    path: 'admin/edit-doctor/:doctorId',
    loadComponent: () => import('./pages/edit-doctors/edit-doctor.component')
      .then(m => m.EditDoctorComponent),
    canActivate: [AuthGuard] // ✅ Add AuthGuard
  },
  {
    path: 'admin/add-patient',
    loadComponent: () =>
      import('./dashboards/admin/add-patients/add-patients.component')
        .then(m => m.AddPatientComponent),
    canActivate: [AuthGuard] // ✅ Add AuthGuard
  },
  {
    path: 'admin/view-patients',
    loadComponent: () =>
      import('./dashboards/admin/view-patients/view-patients.component')
        .then(m => m.ViewPatientsComponent),
    canActivate: [AuthGuard] // ✅ Add AuthGuard
  },
  {
    path: 'admin/edit-patient/:patientId',
    loadComponent: () => import('./pages/edit-patients/edit-patient.component')
      .then(m => m.EditPatientComponent),
    canActivate: [AuthGuard] // ✅ Add AuthGuard
  },
  {
    path: 'admin/upload-medicines',
    loadComponent: () =>
      import('./dashboards/admin/upload-medicines/upload-medicines.component')
        .then(m => m.UploadMedicinesComponent),
    canActivate: [AuthGuard] // ✅ Add AuthGuard
  },
  {
    path: 'doctor',
    loadComponent: () => import('./dashboards/doctor/doctor.component')
      .then(m => m.DoctorComponent),
    canActivate: [AuthGuard] // ✅ Add AuthGuard
  },
  {
    path: 'doctor/view-appointments',
    loadComponent: () => import('./dashboards/doctor/view-doctor-appointments/view-doctor-appointments.component')
      .then(m => m.ViewDoctorAppointmentsComponent),
    canActivate: [AuthGuard] // ✅ Add AuthGuard
  },
  {
    path: 'doctor/prescribe',
    loadComponent: () => import('./dashboards/doctor/prescribe-medicine/prescribe-medicine.component')
      .then(m => m.PrescribeMedicineComponent),
    canActivate: [AuthGuard] // ✅ Add AuthGuard
  },
  {
    path: 'receptionist',
    loadComponent: () => import('./dashboards/receptionist/receptionist.component')
      .then(m => m.ReceptionistComponent),
    canActivate: [AuthGuard] // ✅ Add AuthGuard
  },
  {
    path: 'receptionist/schedule',
    loadComponent: () => import('./dashboards/receptionist/schedule-appointment.component')
      .then(m => m.ScheduleAppointmentComponent),
    canActivate: [AuthGuard] // ✅ Add AuthGuard
  },
  {
    path: 'receptionist/view',
    loadComponent: () => import('./dashboards/receptionist/view-appointments.component')
      .then(m => m.ViewAppointmentsComponent),
    canActivate: [AuthGuard] // ✅ Add AuthGuard
  },
  {
    path: 'receptionist/generate-bill',
    loadComponent: () => import('./dashboards/receptionist/generate-bill/generate-bill.component')
      .then(m => m.GenerateBillComponent),
    canActivate: [AuthGuard] // ✅ Add AuthGuard
  },
  {
    path: 'patient',
    loadComponent: () => import('./dashboards/patient/patient.component')
      .then(m => m.PatientComponent),
    canActivate: [AuthGuard] // ✅ Add AuthGuard
  },
  {
    path: 'patient/book-appointment',
    loadComponent: () => import('./dashboards/patient/book-appointment/book-appointment.component')
      .then(m => m.BookAppointmentComponent),
    canActivate: [AuthGuard] // ✅ Add AuthGuard
  },
  {
    path: 'patient/view-records',
    loadComponent: () => import('./dashboards/patient/view-records/view-records.component')
      .then(m => m.ViewRecordsComponent),
    canActivate: [AuthGuard] // ✅ Add AuthGuard
  },
  {
    path: 'patient/view-bills',
    loadComponent: () => import('./dashboards/patient/view-bills/view-bills.component')
      .then(m => m.ViewBillsComponent),
    canActivate: [AuthGuard] // ✅ Add AuthGuard
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact.component')
      .then(m => m.ContactComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
