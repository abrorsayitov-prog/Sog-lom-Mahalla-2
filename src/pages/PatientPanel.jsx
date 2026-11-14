import React, { useState } from 'react';
import { Globe, ChevronDown, LogOut, Pill, Star, Phone, CheckCircle, XCircle, MessageSquare } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function PatientPanel() {
  const { t, i18n } = useTranslation();
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [rating, setRating] = useState(4); // Namuna uchun 4 yulduzcha

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsLangOpen(false);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-patient font-sans text-white">
      {/* 3-rasmdagi Olov va DNK 5D effekti (CSS orqali) */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-purple-950/40 to-orange-950/20"></div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-orange-500/20 rounded-full blur-[120px] animate-[pulseGlow_5s_ease-in-out_infinite_alternate]"></div>
      <div className="absolute top-20 right-10 w-80 h-80 bg-purple-500/20 rounded-full blur-[100px] animate-pulse"></div>

      {/* Tepa qismi */}
      <header className="relative z-50 flex justify-between items-center p-6 bg-slate-900/60 backdrop-blur-md border-b border-purple-500/20">
        <h1 className="text-2xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-orange-400">
          Sog'lom Mahalla - Bemor
        </h1>

        <div className="relative z-50">
          <button 
            onClick={() => setIsLangOpen(!isLangOpen)}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800/80 rounded-full border border-purple-500/30 hover:bg-slate-700 transition-all shadow-[0_0_15px_rgba(168,85,247,0.2)]"
          >
            <Globe className="w-5 h-5 text-purple-400 animate-[spin_4s_linear_infinite]" />
            <span className="uppercase text-sm font-bold text-purple-100">{i18n.language}</span>
            <ChevronDown className={`w-4 h-4 text-purple-100 transition-transform ${isLangOpen ? 'rotate-180' : ''}`} />
          </button>

          {isLangOpen && (
            <div className="absolute right-0 mt-2 w-44 bg-slate-800 border border-purple-500/40 rounded-xl shadow-2xl overflow-hidden z-50">
              <button onClick={() => changeLanguage('uz')} className="w-full text-left px-4 py-3 hover:bg-purple-500/20 text-sm border-b border-white/5">🇺🇿 O'zbekcha</button>
              <button onClick={() => changeLanguage('ru')} className="w-full text-left px-4 py-3 hover:bg-purple-500/20 text-sm border-b border-white/5">🇷🇺 Русский</button>
              <button onClick={() => changeLanguage('en')} className="w-full text-left px-4 py-3 hover:bg-purple-500/20 text-sm">🇬🇧 English</button>
            </div>
          )}
        </div>
      </header>

      {/* Asosiy qism */}
      <main className="relative z-10 p-6 max-w-7xl mx-auto mt-4">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-orange-400 drop-shadow-[0_0_15px_rgba(168,85,247,0.6)]">
              {t('patient_panel')}
            </h1>
            <p className="text-slate-400 mt-2">Sizning dorilaringiz, shifokoringiz va sog'ligingiz nazorati</p>
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-red-500/10 text-red-400 border border-red-500/30 rounded-xl hover:bg-red-500/20 hover:shadow-[0_0_20px_rgba(239,68,68,0.4)] transition-all">
            <LogOut className="w-5 h-5" /> {t('logout')}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Chap tomon: Mening Dorilarim */}
          <div className="bg-slate-900/50 backdrop-blur-xl border border-purple-500/20 p-8 rounded-3xl shadow-[0_0_30px_rgba(0,0,0,0.5)]">
            <h2 className="text-xl font-bold flex items-center gap-3 mb-6 text-purple-300">
              <Pill className="w-6 h-6" /> Mening Dorilarim
            </h2>
            
            <div className="space-y-4">
              {/* Dori 1 - Ichilgan */}
              <div className="bg-slate-950/60 border border-slate-700/50 rounded-2xl p-5 flex justify-between items-center hover:border-green-500/50 transition-all">
                <div>
                  <h3 className="font-bold text-white text-lg">Paracetamol</h3>
                  <p className="text-sm text-slate-400">1 dona, ertalab 08:00</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-green-500/20 text-green-400 border border-green-500/30 rounded-xl font-bold text-sm hover:bg-green-500/30 transition-all">
                  <CheckCircle className="w-4 h-4" /> Ichdim
                </button>
              </div>

              {/* Dori 2 - Ichilmagan */}
              <div className="bg-slate-950/60 border border-slate-700/50 rounded-2xl p-5 flex justify-between items-center hover:border-red-500/50 transition-all">
                <div>
                  <h3 className="font-bold text-white text-lg">Vitamin C</h3>
                  <p className="text-sm text-slate-400">1 dona, kechqurun 20:00</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-red-500/20 text-red-400 border border-red-500/30 rounded-xl font-bold text-sm hover:bg-red-500/30 transition-all">
                  <XCircle className="w-4 h-4" /> Ichmadim
                </button>
              </div>
            </div>
          </div>

          {/* O'ng tomon: Shifokor va Baholash */}
          <div className="bg-slate-900/50 backdrop-blur-xl border border-orange-500/20 p-8 rounded-3xl shadow-[0_0_30px_rgba(0,0,0,0.5)]">
            <h2 className="text-xl font-bold flex items-center gap-3 mb-6 text-orange-300">
              <Star className="w-6 h-6" /> Mening Shifokorim
            </h2>
            
            <div className="flex items-center gap-4 mb-6 bg-slate-950/40 p-4 rounded-2xl border border-slate-700/50">
              <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center text-orange-400 text-2xl font-bold border border-orange-500/30">
                A
              </div>
              <div>
                <h3 className="font-bold text-white text-xl">Dr. Alisher Qodirov</h3>
                <p className="text-sm text-slate-400 flex items-center gap-1 mt-1">
                  <Phone className="w-4 h-4" /> +998 90 123 45 67
                </p>
              </div>
            </div>

            {/* Yulduzchalar bilan baholash */}
            <div className="mb-6">
              <p className="text-sm text-slate-300 mb-2">Shifokorga baho bering:</p>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star 
                    key={star}
                    onClick={() => setRating(star)}
                    className={`w-8 h-8 cursor-pointer transition-all hover:scale-110 ${star <= rating ? 'text-yellow-400 fill-current' : 'text-slate-600'}`}
                  />
                ))}
              </div>
              <p className="text-xs text-slate-500 mt-2">Reyting: {rating * 20}%</p>
            </div>

            {/* Shikoyat/Minntdorchilik yozish */}
            <div>
              <p className="text-sm text-slate-300 mb-2 flex items-center gap-2">
                <MessageSquare className="w-4 h-4" /> Shikoyat yoki minnatdorchilik:
              </p>
              <textarea 
                placeholder="Fikringizni yozib qoldiring..." 
                className="w-full bg-slate-950/50 border border-slate-700 rounded-xl p-3 text-sm text-white placeholder-slate-500 focus:border-orange-500 outline-none h-24 resize-none"
              ></textarea>
              <button className="mt-3 w-full py-3 bg-gradient-to-r from-purple-500 to-orange-500 rounded-xl font-bold text-white shadow-[0_0_20px_rgba(249,115,22,0.3)] hover:shadow-[0_0_30px_rgba(249,115,22,0.5)] transition-all">
                Yuborish
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
