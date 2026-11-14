import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { User, Lock, ArrowRight } from 'lucide-react';

export default function AdminLogin() {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Backendga so'rov (Ishlamasa test uchun pastdagi qatorni oching)
      const res = await axios.post('http://localhost:5000/api/auth/login', { phone, password });
      if (res.data.user.role === 'admin') {
        login(res.data.user);
        navigate('/admin');
      } else {
        setError("Siz admin emassiz!");
      }
    } catch (err) {
      // TEST REJIMI (Backend ishlamasa)
      if (phone === 'admin' && password === '123') {
        login({ role: 'admin', name: 'Bosh Admin' });
        navigate('/admin');
      } else {
        setError("Telefon yoki parol xato!");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">
      <div className="p-8 bg-slate-900 border border-cyan-500/30 rounded-3xl w-full max-w-md shadow-2xl">
        <h1 className="text-3xl text-cyan-400 font-bold text-center mb-6">Admin Panel</h1>
        {error && <p className="text-red-400 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <User className="absolute left-3 top-3.5 text-cyan-400 w-5 h-5"/>
            <input type="text" placeholder="Telefon raqam" value={phone} onChange={e => setPhone(e.target.value)} className="w-full bg-slate-800 text-white p-3 pl-10 rounded-xl outline-none focus:border-cyan-500 border border-slate-700" required />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-3.5 text-cyan-400 w-5 h-5"/>
            <input type="password" placeholder="Parol" value={password} onChange={e => setPassword(e.target.value)} className="w-full bg-slate-800 text-white p-3 pl-10 rounded-xl outline-none focus:border-cyan-500 border border-slate-700" required />
          </div>
          <button type="submit" className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold p-3 rounded-xl flex justify-center items-center gap-2 hover:opacity-90 transition-all">
            Kirish <ArrowRight className="w-5 h-5"/>
          </button>
        </form>
      </div>
    </div>
  );
}
