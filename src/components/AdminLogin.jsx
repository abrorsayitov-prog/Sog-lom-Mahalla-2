import React, { useState } from 'react';
import { User, Lock, ArrowRight } from 'lucide-react';

export default function AdminLogin({ onLoginSuccess }) {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login && password) {
      onLoginSuccess();
    }
  };

  return (
    <div 
      className="relative min-h-screen w-full flex items-center justify-center bg-cover bg-center bg-no-repeat font-sans select-none overflow-hidden"
      style={{ backgroundImage: `url('/bg-medical.jpg')` }}
    >
      <div className="absolute inset-0 bg-slate-950/75 backdrop-blur-[2px]"></div>

      <div className="relative z-10 w-full max-w-md p-6 sm:p-8 mx-4 bg-slate-900/85 backdrop-blur-md rounded-3xl border border-cyan-500/30 shadow-[0_0_50px_rgba(6,182,212,0.25)]">
        
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-400 to-blue-500 animate-pulse drop-shadow-[0_5px_15px_rgba(56,189,248,0.8)]">
            Xush kelibsiz
          </h1>
          <p className="mt-2 text-sm text-cyan-200/80 font-medium">
            Sog'lom Mahalla 2 — Admin Portali
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative group">
            <label className="block text-xs font-semibold text-cyan-300 uppercase tracking-wider mb-2">
              Login (Foydalanuvchi nomi)
            </label>
            <div className="relative flex items-center">
              <User className="absolute left-4 w-5 h-5 text-cyan-400" />
              <input
                type="text"
                required
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                placeholder="Loginni kiriting..."
                className="w-full pl-12 pr-4 py-3.5 bg-slate-800/80 border border-cyan-500/30 rounded-xl text-white placeholder-cyan-200/40 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50 transition-all"
              />
            </div>
          </div>

          <div className="relative group">
            <label className="block text-xs font-semibold text-cyan-300 uppercase tracking-wider mb-2">
              Parol
            </label>
            <div className="relative flex items-center">
              <Lock className="absolute left-4 w-5 h-5 text-cyan-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-12 pr-4 py-3.5 bg-slate-800/80 border border-cyan-500/30 rounded-xl text-white placeholder-cyan-200/40 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50 transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 px-6 flex items-center justify-center gap-3 bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-lg rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.5)] active:scale-[0.98] transition-all duration-300 cursor-pointer"
          >
            <span>KIRISH</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </form>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm border-t border-cyan-500/20 pt-6">
          <a
            href="#register"
            className="text-cyan-300 hover:text-white font-semibold transition-all duration-300 animate-pulse"
          >
            ✨ Registratsiya
          </a>

          <a
            href="#forgot-password"
            className="text-cyan-400/80 hover:text-cyan-200 font-medium transition-all duration-300 hover:underline"
          >
            Parolingizni unutdingizmi?
          </a>
        </div>

      </div>
    </div>
  );
}
