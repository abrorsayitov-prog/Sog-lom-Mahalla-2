import React, { useState } from 'react';
import { Globe, ChevronDown, UserPlus, Users, LogOut, Trash2, ShieldCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function AdminPanel() {
  const { t, i18n } = useTranslation();
  const [isLangOpen, setIsLangOpen] = useState(false);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsLangOpen(false);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-slate-950 font-sans text-white">
      {/* 5D Fon effekti */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/40 via-slate-950 to-slate-950"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/20 rounded-full blur-[120px] animate-pulse"></div>

      {/* Tepa qismi (Header) */}
      <header className="relative z-50 flex justify-between items-center p-6 bg-slate-900/60 backdrop-blur-md border-b border-white/10">
        <h1 className="text-2xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
          Sog'lom Mahalla
        </h1>

        {/* Globus va Tillar - To'g'rilangan qism */}
        <div className="relative z-50">
          <button 
            onClick={() => setIsLangOpen(!isLangOpen)}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800/80 rounded-full border border-cyan-500/30 hover:bg-slate-700 transition-all shadow-[0_0_15px_rgba(6,182,212,0.2)]"
          >
            <Globe className="w-5 h-5 text-cyan-400 animate-[spin_4s_linear_infinite]" />
            <span className="uppercase text-sm font-bold text-cyan-100">{i18n.language}</span>
            <ChevronDown className={`w-4 h-4 text-cyan-100 transition-transform ${isLangOpen ? 'rotate-180' : ''}`} />
          </button>

          {isLangOpen && (
            <div className="absolute right-0 mt-2 w-44 bg-slate-800 border border-cyan-500/40 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] overflow-hidden z-50">
              <button onClick={() => changeLanguage('uz')} className="w-full text-left px-4 py-3 hover:bg-cyan-500/20 text-sm transition-colors border-b border-white/5 flex items-center gap-2">🇺🇿 O'zbekcha</button>
              <button onClick={() => changeLanguage('ru')} className="w-full text-left px-4 py-3 hover:bg-cyan-500/20 text-sm transition-colors border-b border-white/5 flex items-center gap-2">🇷🇺 Русский</button>
              <button onClick={() => changeLanguage('en')} className="w-full text-left px-4 py-3 hover:bg-cyan-500/20 text-sm transition-colors flex items-center gap-2">🇬🇧 English</button>
            </div>
          )}
        </div>
      </header>

      {/* Asosiy qism */}
      <main className="relative z-10 p-6 max-w-7xl mx-auto mt-4">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-500 drop-shadow-[0_0_15px_rgba(6,182,212,0.6)]">
              {t('admin_panel')}
            </h1>
            <p className="text-slate-400 mt-2">Vrachlarni ro'yxatga olish va tizimni boshqarish paneli</p>
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-red-500/10 text-red-400 border border-red-500/30 rounded-xl hover:bg-red-500/20 hover:shadow-[0_0_20px_rgba(239,68,68,0.4)] transition-all">
            <LogOut className="w-5 h-5" /> {t('logout')}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Yangi Vrach Qo'shish */}
          <div className="bg-slate-900/50 backdrop-blur-xl border border-cyan-500/20 p-8 rounded-3xl shadow-[0_0_30px_rgba(0,0,0,0.5)] relative overflow-hidden group hover:border-cyan-500/50 transition-all duration-500">
            <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl group-hover:bg-cyan-500/20 transition-all"></div>
            <h2 className="text-xl font-bold flex items-center gap-3 mb-6 text-cyan-300 relative z-10">
              <UserPlus className="w-6 h-6" /> Yangi Vrach Qo'shish
            </h2>
            <form className="space-y-5 relative z-10">
              <input type="text" placeholder="F.I.Sh (Dr. Sobir Alimov)" className="w-full bg-slate-950/50 border border-slate-700 rounded-xl p-4 text-sm focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all placeholder-slate-500 text-white" />
              <input type="text" placeholder="Mutaxassisligi (Kardiolog)" className="w-full bg-slate-950/50 border border-slate-700 rounded-xl p-4 text-sm focus:border-cyan-500 outline-none transition-all placeholder-slate-500 text-white" />
              <input type="text" placeholder="Telefon raqam (+998 90 123 45 67)" className="w-full bg-slate-950/50 border border-slate-700 rounded-xl p-4 text-sm focus:border-cyan-500 outline-none transition-all placeholder-slate-500 text-white" />
              <button type="button" className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-bold shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] transition-all transform hover:-translate-y-1">
                Ro'yxatga Olish
              </button>
            </form>
          </div>

          {/* Vrachlar Ro'yxati */}
          <div className="bg-slate-900/50 backdrop-blur-xl border border-cyan-500/20 p-8 rounded-3xl shadow-[0_0_30px_rgba(0,0,0,0.5)]">
            <h2 className="text-xl font-bold flex items-center gap-3 mb-6 text-cyan-300">
              <Users className="w-6 h-6" /> Ro'yxatdan O'tgan Vrachlar (1)
            </h2>
            <div className="space-y-4">
              <div className="bg-slate-950/60 border border-slate-700/50 rounded-2xl p-5 flex justify-between items-center hover:border-cyan-500/50 hover:shadow-[0_0_15px_rgba(6,182,212,0.2)] transition-all group">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-cyan-500/10 rounded-full flex items-center justify-center text-cyan-400 border border-cyan-500/30 group-hover:scale-110 transition-transform">
                    <ShieldCheck className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg">Dr. Alisher Qodirov</h3>
                    <div className="flex gap-3 text-xs text-slate-400 mt-1">
                      <span className="bg-slate-800 px-2 py-1 rounded-md text-cyan-300 border border-cyan-500/20">Terapevt</span>
                      <span>+998 90 123 45 67</span>
                    </div>
                  </div>
                </div>
                <button className="p-3 bg-red-500/10 text-red-400 rounded-xl hover:bg-red-500 hover:text-white transition-all">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
