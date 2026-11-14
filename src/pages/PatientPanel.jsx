import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Globe, ChevronDown, LogOut, Pill, Star, Phone, CheckCircle, XCircle, MessageSquare, KeyRound, Hash } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function PatientPanel() {
  const { t, i18n } = useTranslation();
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [user, setUser] = useState(null); // Kirgan bemor
  const [rating, setRating] = useState(4);
  
  // Kirish formasi holatlari
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsLangOpen(false);
  };

  // Bemorning tizimga kirishi
  const handlePatientLogin = (e) => {
    e.preventDefault();
    const savedPatients = JSON.parse(localStorage.getItem('mahalla_patients') || '[]');
    
    // Doktor yaratgan ID va Parolni tekshirish
    const foundPatient = savedPatients.find(p => p.loginId === loginId.trim() && p.loginPassword === password.trim());

    if (foundPatient) {
      setUser(foundPatient);
    } else {
      setError("ID yoki parol xato! Iltimos, doktoringiz bergan ma'lumotlarni kiriting.");
    }
  };

  // Agar bemor kirmagan bo'lsa, Kirish oynasini ko'rsatamiz
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 p-4 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/10 rounded-full blur-[120px]"></div>

        <div className="relative z-10 w-full max-w-md p-8 bg-slate-900/80 backdrop-blur-xl border border-purple-500/30 rounded-3xl shadow-2xl">
          <h1 className="text-3xl font-black text-center text-purple-400 mb-2">Tizimga Kirish</h1>
          <p className="text-center text-slate-400 text-sm mb-6">Bemor Portali (ID va Parol doktor tomonidan beriladi)</p>
          
          {error && <div className="bg-red-500/20 text-red-400 p-3 rounded-xl mb-4 text-sm text-center border border-red-500/30">{error}</div>}

          <form onSubmit={handlePatientLogin} className="space-y-4">
            <div className="relative">
              <Hash className="absolute left-3 top-3.5 text-slate-400 w-5 h-5" />
              <input type="text" placeholder="Doktor bergan ID (PAT-XXXX)" required value={loginId} onChange={e => setLoginId(e.target.value)} className="w-full bg-slate-800 text-white p-3 pl-10 rounded-xl outline-none border border-slate-700 focus:border-purple-500" />
            </div>
            <div className="relative">
              <KeyRound className="absolute left-3 top-3.5 text-slate-400 w-5 h-5" />
              <input type="password" placeholder="Parol" required value={password} onChange={e => setPassword(e.target.value)} className="w-full bg-slate-800 text-white p-3 pl-10 rounded-xl outline-none border border-slate-700 focus:border-purple-500" />
            </div>
            <button type="submit" className="w-full bg-gradient-to-r from-purple-500 to-orange-500 text-white font-bold p-3 rounded-xl hover:opacity-90 transition-all">
              Kirish
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <Link to="/admin" className="text-slate-400 hover:text-white text-sm transition-colors">Admin panelga o'tish</Link>
          </div>
        </div>
      </div>
    );
  }

  // Agar bemor kirgan bo'lsa, asosiy panelni ko'rsatamiz
  return (
    <div className="min-h-screen relative overflow-hidden bg-patient font-sans text-white">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-orange-500/20 rounded-full blur-[120px] animate-pulse"></div>

      <header className="relative z-50 flex justify-between items-center p-6 bg-slate-900/60 backdrop-blur-md border-b border-purple-500/20">
        <h1 className="text-2xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-orange-400">Sog'lom Mahalla - Bemor</h1>

        <div className="flex items-center gap-4">
          <div className="relative z-50">
            <button onClick={() => setIsLangOpen(!isLangOpen)} className="flex items-center gap-2 px-4 py-2 bg-slate-800/80 rounded-full border border-purple-500/30 hover:bg-slate-700 transition-all">
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

          <button onClick={() => setUser(null)} className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-400 border border-red-500/30 rounded-xl hover:bg-red-500/20 transition-all">
            <LogOut className="w-5 h-5" /> Chiqish
          </button>
        </div>
      </header>

      <main className="relative z-10 p-6 max-w-7xl mx-auto mt-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-slate-900/50 backdrop-blur-xl border border-purple-500/20 p-8 rounded-3xl shadow-lg">
            <h2 className="text-xl font-bold flex items-center gap-3 mb-6 text-purple-300"><Pill className="w-6 h-6" /> Mening Dorilarim</h2>
            <div className="bg-slate-950/60 border border-slate-700/50 rounded-2xl p-5 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-white text-lg">{user.medicine}</h3>
                <p className="text-sm text-slate-400">Vaqti: {user.time}</p>
                <p className="text-sm text-slate-500 mt-1 flex items-center gap-1"><Utensils className="w-4 h-4"/> Parxez: {user.diet || "Yo'q"}</p>
              </div>
              {user.taken ? (
                <button className="flex items-center gap-2 px-4 py-2 bg-green-500/20 text-green-400 border border-green-500/30 rounded-xl font-bold text-sm"><CheckCircle className="w-4 h-4" /> Ichdim</button>
              ) : (
                <button className="flex items-center gap-2 px-4 py-2 bg-red-500/20 text-red-400 border border-red-500/30 rounded-xl font-bold text-sm"><XCircle className="w-4 h-4" /> Ichmadim</button>
              )}
            </div>
          </div>

          <div className="bg-slate-900/50 backdrop-blur-xl border border-orange-500/20 p-8 rounded-3xl shadow-lg">
            <h2 className="text-xl font-bold flex items-center gap-3 mb-6 text-orange-300"><Star className="w-6 h-6" /> Mening Shifokorim</h2>
            <div className="flex items-center gap-4 mb-6 bg-slate-950/40 p-4 rounded-2xl border border-slate-700/50">
              <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center text-orange-400 text-2xl font-bold">D</div>
              <div>
                <h3 className="font-bold text-white text-xl">Dr. Alisher Qodirov</h3>
                <p className="text-sm text-slate-400 flex items-center gap-1 mt-1"><Phone className="w-4 h-4" /> +998 90 123 45 67</p>
              </div>
            </div>
            <div className="mb-6">
              <p className="text-sm text-slate-300 mb-2">Shifokorga baho bering:</p>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} onClick={() => setRating(star)} className={`w-8 h-8 cursor-pointer transition-all hover:scale-110 ${star <= rating ? 'text-yellow-400 fill-current' : 'text-slate-600'}`} />
                ))}
              </div>
              <p className="text-xs text-slate-500 mt-2">Reyting: {rating * 20}%</p>
            </div>
            <div>
              <p className="text-sm text-slate-300 mb-2 flex items-center gap-2"><MessageSquare className="w-4 h-4" /> Shikoyat yoki minnatdorchilik:</p>
              <textarea placeholder="Fikringizni yozib qoldiring..." className="w-full bg-slate-950/50 border border-slate-700 rounded-xl p-3 text-sm text-white placeholder-slate-500 focus:border-orange-500 outline-none h-24 resize-none"></textarea>
              <button className="mt-3 w-full py-3 bg-gradient-to-r from-purple-500 to-orange-500 rounded-xl font-bold text-white transition-all">Yuborish</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
