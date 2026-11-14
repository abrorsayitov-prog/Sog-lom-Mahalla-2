import React, { useState } from 'react';
import { Globe, ChevronDown, LogOut, User, CheckCircle, XCircle, Activity, HeartPulse } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header'; // Agar umumiy header bo'lsa, shuni ishlatamiz

export default function DoctorPanel() {
  const { t, i18n } = useTranslation();
  const [isLangOpen, setIsLangOpen] = useState(false);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsLangOpen(false);
  };

  // Namuna sifatida bemorlar ro'yxati
  const patients = [
    { id: 1, name: "Ali Valiyev", medicine: "Paracetamol", time: "Ertalab 08:00", taken: true },
    { id: 2, name: "Zarina Karimova", medicine: "Vitamin C", time: "Kechqurun 20:00", taken: false },
    { id: 3, name: "Sardor Toshmatov", medicine: "Omeprazol", time: "Tushlik 13:00", taken: true },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-doctor font-sans text-white">
      {/* Neon Tarmoq effekti orqa fonda (CSS orqali) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/30 via-slate-950 to-slate-950"></div>
      <div className="absolute top-20 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px] animate-pulse"></div>
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-[80px] animate-pulse"></div>

      {/* Tepa qismi (Header) - Admin paneldagidek */}
      <header className="relative z-50 flex justify-between items-center p-6 bg-slate-900/60 backdrop-blur-md border-b border-blue-500/20">
        <h1 className="text-2xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
          Sog'lom Mahalla - Doktor
        </h1>

        <div className="relative z-50">
          <button 
            onClick={() => setIsLangOpen(!isLangOpen)}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800/80 rounded-full border border-blue-500/30 hover:bg-slate-700 transition-all shadow-[0_0_15px_rgba(59,130,246,0.2)]"
          >
            <Globe className="w-5 h-5 text-blue-400 animate-[spin_4s_linear_infinite]" />
            <span className="uppercase text-sm font-bold text-blue-100">{i18n.language}</span>
            <ChevronDown className={`w-4 h-4 text-blue-100 transition-transform ${isLangOpen ? 'rotate-180' : ''}`} />
          </button>

          {isLangOpen && (
            <div className="absolute right-0 mt-2 w-44 bg-slate-800 border border-blue-500/40 rounded-xl shadow-2xl overflow-hidden z-50">
              <button onClick={() => changeLanguage('uz')} className="w-full text-left px-4 py-3 hover:bg-blue-500/20 text-sm border-b border-white/5">🇺🇿 O'zbekcha</button>
              <button onClick={() => changeLanguage('ru')} className="w-full text-left px-4 py-3 hover:bg-blue-500/20 text-sm border-b border-white/5">🇷🇺 Русский</button>
              <button onClick={() => changeLanguage('en')} className="w-full text-left px-4 py-3 hover:bg-blue-500/20 text-sm">🇬🇧 English</button>
            </div>
          )}
        </div>
      </header>

      {/* Asosiy qism */}
      <main className="relative z-10 p-6 max-w-7xl mx-auto mt-4">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 drop-shadow-[0_0_15px_rgba(59,130,246,0.6)]">
              {t('doctor_panel')}
            </h1>
            <p className="text-slate-400 mt-2">Bemorlar holatini nazorat qilish va dori ichish grafigi</p>
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-red-500/10 text-red-400 border border-red-500/30 rounded-xl hover:bg-red-500/20 hover:shadow-[0_0_20px_rgba(239,68,68,0.4)] transition-all">
            <LogOut className="w-5 h-5" /> {t('logout')}
          </button>
        </div>

        {/* Statistika kartochkalari */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-slate-900/50 backdrop-blur-xl border border-blue-500/20 p-6 rounded-3xl shadow-lg flex items-center gap-4">
            <div className="w-14 h-14 bg-blue-500/10 rounded-full flex items-center justify-center text-blue-400 border border-blue-500/30">
              <User className="w-7 h-7" />
            </div>
            <div>
              <p className="text-slate-400 text-sm">Jami bemorlar</p>
              <h3 className="text-2xl font-bold text-white">24 ta</h3>
            </div>
          </div>
          <div className="bg-slate-900/50 backdrop-blur-xl border border-green-500/20 p-6 rounded-3xl shadow-lg flex items-center gap-4">
            <div className="w-14 h-14 bg-green-500/10 rounded-full flex items-center justify-center text-green-400 border border-green-500/30">
              <HeartPulse className="w-7 h-7" />
            </div>
            <div>
              <p className="text-slate-400 text-sm">Dorini ichganlar</p>
              <h3 className="text-2xl font-bold text-white">18 ta</h3>
            </div>
          </div>
          <div className="bg-slate-900/50 backdrop-blur-xl border border-red-500/20 p-6 rounded-3xl shadow-lg flex items-center gap-4">
            <div className="w-14 h-14 bg-red-500/10 rounded-full flex items-center justify-center text-red-400 border border-red-500/30">
              <Activity className="w-7 h-7" />
            </div>
            <div>
              <p className="text-slate-400 text-sm">Ichmaganlar</p>
              <h3 className="text-2xl font-bold text-white">6 ta</h3>
            </div>
          </div>
        </div>

        {/* Bemorlar Ro'yxati va Dori nazorati */}
        <div className="bg-slate-900/50 backdrop-blur-xl border border-blue-500/20 p-8 rounded-3xl shadow-[0_0_30px_rgba(0,0,0,0.5)]">
          <h2 className="text-xl font-bold flex items-center gap-3 mb-6 text-blue-300">
            <User className="w-6 h-6" /> Bemorlar ro'yxati va dori nazorati
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-slate-400 text-sm border-b border-slate-700">
                  <th className="pb-3 font-medium">Bemor Ismi</th>
                  <th className="pb-3 font-medium">Dori Nomi</th>
                  <th className="pb-3 font-medium">Vaqti</th>
                  <th className="pb-3 font-medium">Holat</th>
                </tr>
              </thead>
              <tbody>
                {patients.map((p) => (
                  <tr key={p.id} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                    <td className="py-4 font-medium text-white flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-400 text-xs">
                        {p.name.charAt(0)}
                      </div>
                      {p.name}
                    </td>
                    <td className="py-4 text-slate-300">{p.medicine}</td>
                    <td className="py-4 text-slate-400 text-sm">{p.time}</td>
                    <td className="py-4">
                      {p.taken ? (
                        <span className="flex items-center gap-1.5 w-max px-3 py-1.5 bg-green-500/10 text-green-400 border border-green-500/20 rounded-lg text-xs font-bold">
                          <CheckCircle className="w-4 h-4" /> Ichgan
                        </span>
                      ) : (
                        <span className="flex items-center gap-1.5 w-max px-3 py-1.5 bg-red-500/10 text-red-400 border border-red-500/20 rounded-lg text-xs font-bold">
                          <XCircle className="w-4 h-4" /> Ichmagan
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
