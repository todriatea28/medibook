import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// გვერდებისა და კომპონენტების იმპორტი
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import AdminDashboard from './pages/admin/admindashboard';
import DoctorDashboard from './pages/doctor/doctordashboard';
import Schedule from './pages/doctor/schedule';
import Layout from './components/Layout/Layout';
import ErrorBoundary from './components/ErrorBoundary';
import Overview from './pages/admin/overview';
import Patients from './pages/admin/patients';
import Settings from './pages/admin/settings';

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          {/* მთავარი გვერდი */}
          <Route path="/" element={<Home />} />
          
          {/* ავტორიზაცია და რეგისტრაცია */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* მართვის პანელები და განრიგი */}
          <Route path="/admin" element={<Layout />}>
  <Route index element={<Overview />} />
  <Route path="doctors" element={<AdminDashboard />} />
  <Route path="patients" element={<Patients />} />
  <Route path="settings" element={<Settings />} />
</Route>
          <Route path="/doctor" element={<DoctorDashboard />} />
          <Route path="/schedule" element={<Schedule />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}