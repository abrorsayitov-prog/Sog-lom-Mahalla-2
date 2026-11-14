import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LogOut, Users, Activity } from 'lucide-react';

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin-login');
  };

  return (
    <div className="min-h-screen bg-slate-950 p-6 text-white">
      <header className="flex justify-between items-center bg-slate-900 p-4 rounded-xl border border-cyan-500/20 mb-8">
        <h1 className="text-2xl font-bold text-cyan-400">Admin Boshqaruvi</h1>
        <button onClick={handleLogout} className="flex gap-2 text-red-400 bg-red-400/10 px-4 py-2 rounded-lg hover:bg-red-400/20"><LogOut/> Chiqish</button>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
          <Users className="text-cyan-400 w-8 h-8 mb-4"/>
          <h2 className="text-xl font-bold">Vrachlar</h2>
          <p className="text-3xl text-cyan-300 mt-2">12 ta</p>
        </div>
        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
          <Activity className="text-emerald-400 w-8 h-8 mb-4"/>
          <h2 className="text-xl font-bold">Bemorlar</h2>
          <p className="text-3xl text-emerald-300 mt-2">145 ta</p>
        </div>
      </div>
    </div>
  );
}
