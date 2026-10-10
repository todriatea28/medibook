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

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* მთავარი გვერდი */}
        <Route path="/" element={<Home />} />
        
        {/* ავტორიზაცია და რეგისტრაცია */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* მართვის პანელები და განრიგი */}
        <Route path="/dashboard" element={<Layout />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/doctor" element={<DoctorDashboard />} />
        <Route path="/schedule" element={<Schedule />} />
      </Routes>
    </BrowserRouter>
  );
}