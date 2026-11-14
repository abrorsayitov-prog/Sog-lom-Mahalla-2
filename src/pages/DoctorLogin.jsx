import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Stethoscope, Lock } from 'lucide-react';

export default function DoctorLogin() {
  const [phone, setPhone] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Test uchun
    login({ role: 'doctor', name: 'Dr. Alisher' });
    navigate('/doctor');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-emerald-950">
      <div className="p-8 bg-emerald-900 border border-emerald-500/30 rounded-3xl w-full max-w-md shadow-2xl">
        <div className="flex justify-center mb-4"><Stethoscope className="w-12 h-12 text-emerald-400"/></div>
        <h1 className="text-3xl text-emerald-300 font-bold text-center mb-6">Doktor Kirish</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" placeholder="Telefon raqam" value={phone} onChange={e => setPhone(e.target.value)} className="w-full bg-emerald-800/50 text-white p-3 rounded-xl outline-none border border-emerald-700 focus:border-emerald-400" required />
          <div className="relative">
            <Lock className="absolute left-3 top-3.5 text-emerald-400 w-5 h-5"/>
            <input type="password" placeholder="Parol" className="w-full bg-emerald-800/50 text-white p-3 pl-10 rounded-xl outline-none border border-emerald-700 focus:border-emerald-400" required />
          </div>
          <button type="submit" className="w-full bg-emerald-500 text-white font-bold p-3 rounded-xl hover:bg-emerald-400 transition-all">Kirish</button>
        </form>
        <div className="mt-4 text-center">
          <Link to="/admin-login" className="text-emerald-400 text-sm hover:underline">Admin panelga o'tish</Link>
        </div>
      </div>
    </div>
  );
}
