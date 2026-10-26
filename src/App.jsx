import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import ErrorBoundary from './components/ErrorBoundary';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout/Layout';

// საჯარო გვერდები
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/auth/Login'));
const Register = lazy(() => import('./pages/auth/Register'));
const NotFound = lazy(() => import('./pages/NotFound'));

// როლების სივრცეები: იტვირთება მხოლოდ საჭიროებისას
const Overview = lazy(() => import('./pages/admin/overview'));
const AdminDashboard = lazy(() => import('./pages/admin/admindashboard'));
const Patients = lazy(() => import('./pages/admin/patients'));
const Settings = lazy(() => import('./pages/admin/settings'));
const DoctorDashboard = lazy(() => import('./pages/doctor/doctordashboard'));
const PatientDashboard = lazy(() => import('./pages/patient/patientdashboard'));
const BookAppointment = lazy(() => import('./pages/patient/bookappoitment'));

function PageLoader() {
  return (
    <div role="status" className="flex items-center justify-center min-h-screen text-sm text-teal-600">
      იტვირთება...
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Suspense fallback={<PageLoader />}>
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
        </Suspense>
      </BrowserRouter>
    </ErrorBoundary>
  );
}