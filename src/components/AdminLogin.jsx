
import React, { useState, useEffect } from 'react';
import { User, Lock, ArrowRight, Mail, Phone, Hash, UserPlus, ArrowLeft, CheckCircle2, Copy } from 'lucide-react';

export default function AdminLogin({ onLoginSuccess }) {
  const [isRegister, setIsRegister] = useState(false);
  
  // Login holatlari
  const [loginInput, setLoginInput] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Registratsiya holatlari
  const [regData, setRegData] = useState({
    id: '',
    fullName: '',
    email: '',
    phone: '',
    password: ''
  });
  const [regSuccess, setRegSuccess] = useState(false);
  const [copied, setCopied] = useState(false);

  // Yangi avtomatik ID generatsiya qilish
  const generateAdminId = () => {
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    return `ADM-${randomNum}`;
  };

  useEffect(() => {
    if (isRegister) {
      setRegData({
        id: generateAdminId(),
        fullName: '',
        email: '',
        phone: '',
        password: ''
      });
      setRegSuccess(false);
      setErrorMsg('');
    }
  }, [isRegister]);

  // Tizimga kirish (Login)
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    const savedAdmins = JSON.parse(localStorage.getItem('mahalla_admins') || '[]');
    
    // Ro'yxatdan o'tgan adminlar orasidan ID yoki Email bo'yicha tekshirish
    const foundAdmin = savedAdmins.find(
      (adm) => (adm.id.toLowerCase() === loginInput.trim().toLowerCase() || adm.email.toLowerCase() === loginInput.trim().toLowerCase()) && adm.password === password
    );

    if (foundAdmin || (loginInput === 'admin' && password === 'admin')) {
      onLoginSuccess(foundAdmin || { fullName: 'Bosh Admin', id: 'ADM-000001' });
    } else if (savedAdmins.length === 0 && loginInput && password) {
      // Hali hech kim ro'yxatdan o'tmagan bo'lsa, test uchun kirishga ruxsat
      onLoginSuccess({ fullName: loginInput, id: 'ADM-TEST' });
    } else {
      setErrorMsg("ID/Email yoki parol noto'g'ri! Iltimos, tekshirib qayta kiriting.");
    }
  };

  // Yangi adminni ro'yxatdan o'tkazish
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (!regData.fullName || !regData.email || !regData.phone || !regData.password) return;

    const savedAdmins = JSON.parse(localStorage.getItem('mahalla_admins') || '[]');
    savedAdmins.push(regData);
    localStorage.setItem('mahalla_admins', JSON.stringify(savedAdmins));

    setRegSuccess(true);
  };

  const copyIdToClipboard = () => {
    navigator.clipboard.writeText(regData.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      className="relative min-h-screen w-full flex items-center justify-center bg-cover bg-center bg-no-repeat font-sans select-none overflow-y-auto py-8"
      style={{ backgroundImage: `url('/bg-medical.jpg')` }}
    >
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-[3px]"></div>

      <div className="relative z-10 w-full max-w-md p-6 sm:p-8 mx-4 bg-slate-900/90 backdrop-blur-xl rounded-3xl border border-cyan-500/30 shadow-[0_0_50px_rgba(6,182,212,0.25)] transition-all duration-300">
        
        {/* Sarlavha */}
        <div className="text-center mb-6">
          <h1 className="text-3xl sm:text-4xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-400 to-blue-500 drop-shadow-[0_5px_15px_rgba(56,189,248,0.6)]">
            {isRegister ? "Ro'yxatdan O'tish" : "Xush kelibsiz"}
          </h1>
          <p className="mt-1.5 text-xs sm:text-sm text-cyan-200/80 font-medium">
            Sog'lom Mahalla 2 — {isRegister ? "Yangi Admin Yaratish" : "Admin Portali"}
          </p>
        </div>

        {/* Xatolik xabari */}
        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-red-500/20 border border-red-500/40 text-red-300 text-xs text-center">
            {errorMsg}
          </div>
        )}

        {/* 1. REGISTRATSIYA OYNASI */}
        {isRegister ? (
          regSuccess ? (
            <div className="text-center space-y-5 py-4">
              <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto animate-bounce" />
              <h2 className="text-xl font-bold text-white">Muvaffaqiyatli ro'yxatdan o'tdingiz!</h2>
              <p className="text-xs text-cyan-200/80">
                Tizimga kirish uchun quyidagi shaxsiy ID raqamingizni saqlab qo'ying:
              </p>
              
              <div className="flex items-center justify-between bg-slate-800 border border-cyan-400/50 rounded-xl p-3.5">
                <span className="text-lg font-mono font-bold text-cyan-300 tracking-wider">{regData.id}</span>
                <button
                  type="button"
                  onClick={copyIdToClipboard}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 rounded-lg text-xs font-semibold transition-all cursor-pointer"
                >
                  <Copy className="w-4 h-4" />
                  <span>{copied ? "Nusxalandi!" : "Nusxa olish"}</span>
                </button>
              </div>

              <button
                type="button"
                onClick={() => {
                  setLoginInput(regData.id);
                  setPassword('');
                  setIsRegister(false);
                }}
                className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-cyan-600 hover:from-emerald-400 hover:to-cyan-500 text-white font-bold rounded-xl shadow-lg transition-all cursor-pointer"
              >
                Kirish oynasiga o'tish
              </button>
            </div>
          ) : (
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              {/* 4. Avtomatik ID raqami */}
              <div>
                <label className="block text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1">
                  Avtomatik ID Raqamingiz
                </label>
                <div className="relative flex items-center">
                  <Hash className="absolute left-3.5 w-4 h-4 text-emerald-400" />
                  <input
                    type="text"
                    readOnly
                    value={regData.id}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-950/90 border border-emerald-500/40 rounded-xl text-emerald-300 font-mono font-bold text-sm cursor-not-allowed focus:outline-none"
                  />
                </div>
              </div>

              {/* 1. Ism Familiya */}
              <div>
                <label className="block text-xs font-semibold text-cyan-300 uppercase tracking-wider mb-1">
                  1. Ism va Familiya
                </label>
                <div className="relative flex items-center">
                  <User className="absolute left-3.5 w-4 h-4 text-cyan-400" />
                  <input
                    type="text"
                    required
                    placeholder="Masalan: Abror Sayitov"
                    value={regData.fullName}
                    onChange={(e) => setRegData({ ...regData, fullName: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-800/80 border border-cyan-500/30 rounded-xl text-white text-sm placeholder-cyan-200/40 focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              {/* 2. Email pochtasi */}
              <div>
                <label className="block text-xs font-semibold text-cyan-300 uppercase tracking-wider mb-1">
                  2. Email pochtasi
                </label>
                <div className="relative flex items-center">
                  <Mail className="absolute left-3.5 w-4 h-4 text-cyan-400" />
                  <input
                    type="email"
                    required
                    placeholder="admin@mahalla.uz"
                    value={regData.email}
                    onChange={(e) => setRegData({ ...regData, email: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-800/80 border border-cyan-500/30 rounded-xl text-white text-sm placeholder-cyan-200/40 focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              {/* 3. Telefon raqami */}
              <div>
                <label className="block text-xs font-semibold text-cyan-300 uppercase tracking-wider mb-1">
                  3. Telefon raqami
                </label>
                <div className="relative flex items-center">
                  <Phone className="absolute left-3.5 w-4 h-4 text-cyan-400" />
                  <input
                    type="tel"
                    required
                    placeholder="+998 90 123 45 67"
                    value={regData.phone}
                    onChange={(e) => setRegData({ ...regData, phone: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-800/80 border border-cyan-500/30 rounded-xl text-white text-sm placeholder-cyan-200/40 focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              {/* 5. Ixtiyoriy parol */}
              <div>
                <label className="block text-xs font-semibold text-cyan-300 uppercase tracking-wider mb-1">
                  4. Yangi parol yarating
                </label>
                <div className="relative flex items-center">
                  <Lock className="absolute left-3.5 w-4 h-4 text-cyan-400" />
                  <input
                    type="password"
                    required
                    placeholder="Ixtiyoriy parol kiriting..."
                    value={regData.password}
                    onChange={(e) => setRegData({ ...regData, password: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-800/80 border border-cyan-500/30 rounded-xl text-white text-sm placeholder-cyan-200/40 focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 mt-2 flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.5)] active:scale-[0.98] transition-all cursor-pointer"
              >
                <UserPlus className="w-5 h-5" />
                <span>RO'YXATDAN O'TISH</span>
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => setIsRegister(false)}
                  className="inline-flex items-center gap-1.5 text-xs text-cyan-300 hover:text-white font-medium transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Ortga — Kirish oynasiga qaytish</span>
                </button>
              </div>
            </form>
          )
        ) : (
          /* 2. LOGIN OYNASI */
          <>
            <form onSubmit={handleLoginSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-cyan-300 uppercase tracking-wider mb-2">
                  ID Raqam yoki Email
                </label>
                <div className="relative flex items-center">
                  <User className="absolute left-4 w-5 h-5 text-cyan-400" />
                  <input
                    type="text"
                    required
                    value={loginInput}
                    onChange={(e) => setLoginInput(e.target.value)}
                    placeholder="ADM-123456 yoki email..."
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-800/80 border border-cyan-500/30 rounded-xl text-white placeholder-cyan-200/40 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50 transition-all"
                  />
                </div>
              </div>

              <div>
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

            <div className="mt-7 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm border-t border-cyan-500/20 pt-5">
              <button
                type="button"
                onClick={() => setIsRegister(true)}
                className="text-cyan-300 hover:text-white font-semibold transition-all duration-300 animate-pulse cursor-pointer"
              >
                ✨ Registratsiya
              </button>

              <a
                href="#forgot-password"
                onClick={(e) => {
                  e.preventDefault();
                  alert("Parolni tiklash uchun tizim bosh administratoriga murojaat qiling.");
                }}
                className="text-cyan-400/80 hover:text-cyan-200 font-medium transition-all duration-300 hover:underline"
              >
                Parolingizni unutdingizmi?
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
EOF
