import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { HeartPulse, Lock } from 'lucide-react';

export default function PatientLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ role: 'patient', name: 'Bemor Ali' });
    navigate('/patient');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-950">
      <div className="p-8 bg-purple-900 border border-purple-500/30 rounded-3xl w-full max-w-md shadow-2xl">
        <div className="flex justify-center mb-4"><HeartPulse className="w-12 h-12 text-purple-400"/></div>
        <h1 className="text-3xl text-purple-300 font-bold text-center mb-6">Bemor Kirish</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" placeholder="Telefon raqam" className="w-full bg-purple-800/50 text-white p-3 rounded-xl outline-none border border-purple-700 focus:border-purple-400" required />
          <div className="relative">
            <Lock className="absolute left-3 top-3.5 text-purple-400 w-5 h-5"/>
            <input type="password" placeholder="Parol" className="w-full bg-purple-800/50 text-white p-3 pl-10 rounded-xl outline-none border border-purple-700 focus:border-purple-400" required />
          </div>
          <button type="submit" className="w-full bg-purple-500 text-white font-bold p-3 rounded-xl hover:bg-purple-400 transition-all">Kirish</button>
        </form>
        <div className="mt-4 text-center">
          <Link to="/doctor-login" className="text-purple-400 text-sm hover:underline">Doktor paneliga o'tish</Link>
        </div>
      </div>
    </div>
  );
}
