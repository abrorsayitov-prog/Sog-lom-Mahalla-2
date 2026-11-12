import React, { useState } from 'react';
import AdminLogin from './components/AdminLogin';
import DoctorRegister from './components/DoctorRegister';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div>
      {!isLoggedIn ? (
        <AdminLogin onLoginSuccess={() => setIsLoggedIn(true)} />
      ) : (
        <DoctorRegister onLogout={() => setIsLoggedIn(false)} />
      )}
    </div>
  );
}
