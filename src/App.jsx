import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AdminPanel from './pages/AdminPanel';
import DoctorPanel from './pages/DoctorPanel';
import PatientPanel from './pages/PatientPanel';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/admin" replace />} />
        <Route path="/admin/*" element={<AdminPanel />} />
        <Route path="/doctor/*" element={<DoctorPanel />} />
        <Route path="/patient/*" element={<PatientPanel />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
