import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import AdminDashboard from './pages/admin/admindashboard';
import Overview from './pages/admin/overview';
import Patients from './pages/admin/patients';
import Settings from './pages/admin/settings';
import DoctorDashboard from './pages/doctor/doctordashboard';
import NotFound from './pages/NotFound';
import Layout from './components/Layout/Layout';
import ErrorBoundary from './components/ErrorBoundary';
import ProtectedRoute from './components/ProtectedRoute';
import PatientDashboard from './pages/patient/patientdashboard';
import BookAppointment from './pages/patient/bookappoitment';

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
            <Route path="/admin" element={<Layout />}>
              <Route index element={<Overview />} />
              <Route path="doctors" element={<AdminDashboard />} />
              <Route path="patients" element={<Patients />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Route>

          <Route element={<ProtectedRoute allowedRoles={['doctor']} />}>
            <Route path="/doctor" element={<DoctorDashboard />} />
          </Route>
<Route element={<ProtectedRoute allowedRoles={['patient']} />}>
  <Route path="/patient" element={<PatientDashboard />} />
  <Route path="/patient/book/:doctorId" element={<BookAppointment />} />
</Route>
         <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}