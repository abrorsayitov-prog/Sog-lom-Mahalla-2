import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Auth from '../components/Auth';
import { Globe, ChevronDown, UserPlus, Users, LogOut, Trash2, ShieldCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function AdminPanel() {
  const { t, i18n } = useTranslation();
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [user, setUser] = useState(null); // Auth tizimi uchun

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsLangOpen(false);
  };

  // Agar foydalanuvchi kirmagan bo'lsa, Kirish oynasini ko'rsat
  if (!user) return <Auth role="admin" themeColor="cyan" onLoginSuccess={setUser} />;

  return (
    <div className="min-h-screen relative overflow-hidden bg-slate-950 font-sans text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/40 via-slate-950 to-slate-950"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/20 rounded-full blur-[120px] animate-pulse"></div>

      <header className="relative z-50 flex justify-between items-center p-6 bg-slate-900/60 backdrop-blur-md border-b border-white/10">
        <h1 className="text-2xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Sog'lom Mahalla - Admin</h1>

        <div className="flex items-center gap-4">
          <Link to="/doctor" className="text-sm font-bold text-blue-400 hover:text-white transition-all bg-blue-500/10 px-4 py-2 rounded-xl border border-blue-500/20">Doktor Panel</Link>
          <Link to="/patient" className="text-sm font-bold text-orange-400 hover:text-white transition-all bg-orange-500/10 px-4 py-2 rounded-xl border border-orange-500/20">Bemor Panel</Link>

          <div className="relative z-50">
            <button onClick={() => setIsLangOpen(!isLangOpen)} className="flex items-center gap-2 px-4 py-2 bg-slate-800/80 rounded-full border border-cyan-500/30 hover:bg-slate-700 transition-all">
              <Globe className="w-5 h-5 text-cyan-400 animate-[spin_4s_linear_infinite]" />
              <span className="uppercase text-sm font-bold text-cyan-100">{i18n.language}</span>
              <ChevronDown className={`w-4 h-4 text-cyan-100 transition-transform ${isLangOpen ? 'rotate-180' : ''}`} />
            </button>
            {isLangOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-slate-800 border border-cyan-500/40 rounded-xl shadow-2xl overflow-hidden z-50">
                <button onClick={() => changeLanguage('uz')} className="w-full text-left px-4 py-3 hover:bg-cyan-500/20 text-sm border-b border-white/5">🇺🇿 O'zbekcha</button>
                <button onClick={() => changeLanguage('ru')} className="w-full text-left px-4 py-3 hover:bg-cyan-500/20 text-sm border-b border-white/5">🇷🇺 Русский</button>
                <button onClick={() => changeLanguage('en')} className="w-full text-left px-4 py-3 hover:bg-cyan-500/20 text-sm">🇬🇧 English</button>
              </div>
            )}
          </div>

          <button onClick={() => setUser(null)} className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-400 border border-red-500/30 rounded-xl hover:bg-red-500/20 transition-all">
            <LogOut className="w-5 h-5" /> Chiqish
          </button>
        </div>
      </header>

      <main className="relative z-10 p-6 max-w-7xl mx-auto mt-4">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-500 drop-shadow-[0_0_15px_rgba(6,182,212,0.6)]">{t('admin_panel')}</h1>
            <p className="text-slate-400 mt-2">Vrachlarni ro'yxatga olish va tizimni boshqarish</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-slate-900/50 backdrop-blur-xl border border-cyan-500/20 p-8 rounded-3xl shadow-lg relative overflow-hidden group">
            <h2 className="text-xl font-bold flex items-center gap-3 mb-6 text-cyan-300"><UserPlus className="w-6 h-6" /> Yangi Vrach Qo'shish</h2>
            <form className="space-y-5">
              <input type="text" placeholder="F.I.Sh (Dr. Sobir Alimov)" className="w-full bg-slate-950/50 border border-slate-700 rounded-xl p-4 text-sm focus:border-cyan-500 outline-none placeholder-slate-500 text-white" />
              <input type="text" placeholder="Mutaxassisligi (Kardiolog)" className="w-full bg-slate-950/50 border border-slate-700 rounded-xl p-4 text-sm focus:border-cyan-500 outline-none placeholder-slate-500 text-white" />
              <input type="text" placeholder="Telefon raqam (+998 90 123 45 67)" className="w-full bg-slate-950/50 border border-slate-700 rounded-xl p-4 text-sm focus:border-cyan-500 outline-none placeholder-slate-500 text-white" />
              <button type="button" className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-bold shadow-lg hover:shadow-cyan-500/50 transition-all transform hover:-translate-y-1">Ro'yxatga Olish</button>
            </form>
          </div>

          <div className="bg-slate-900/50 backdrop-blur-xl border border-cyan-500/20 p-8 rounded-3xl shadow-lg">
            <h2 className="text-xl font-bold flex items-center gap-3 mb-6 text-cyan-300"><Users className="w-6 h-6" /> Vrachlar (1)</h2>
            <div className="bg-slate-950/60 border border-slate-700/50 rounded-2xl p-5 flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-cyan-500/10 rounded-full flex items-center justify-center text-cyan-400 border border-cyan-500/30"><ShieldCheck className="w-7 h-7" /></div>
                <div>
                  <h3 className="font-bold text-white text-lg">Dr. Alisher Qodirov</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-24 h-2 bg-slate-800 rounded-full overflow-hidden"><div className="h-full bg-green-500" style={{ width: '85%' }}></div></div>
                    <span className="text-xs text-green-400 font-bold">85%</span>
                  </div>
                </div>
              </div>
              <button className="p-3 bg-red-500/10 text-red-400 rounded-xl hover:bg-red-500 hover:text-white transition-all"><Trash2 className="w-5 h-5" /></button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
