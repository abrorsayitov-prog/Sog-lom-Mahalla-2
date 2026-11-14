import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Auth from '../components/Auth';
import { Globe, ChevronDown, LogOut, User, CheckCircle, XCircle, Activity, HeartPulse, PlusCircle, Utensils } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function DoctorPanel() {
  const { t, i18n } = useTranslation();
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [patients, setPatients] = useState([]);
  
  // Yangi bemor qo'shish formasi holati
  const [newPatient, setNewPatient] = useState({
    name: '',
    diseaseLevel: 'yengil', // yengil, orta, ogir
    medicine: '',
    time: '',
    diet: ''
  });

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsLangOpen(false);
  };

  // Bemorlarni yuklash
  useEffect(() => {
    const savedPatients = JSON.parse(localStorage.getItem('mahalla_patients') || '[]');
    setPatients(savedPatients);
  }, []);

  // Yangi bemor qo'shish (ID va parol generatsiyasi bilan)
  const handleAddPatient = (e) => {
    e.preventDefault();
    
    // Bemor uchun avtomatik ID va Parol yaratish
    const patientId = `PAT-${Math.floor(1000 + Math.random() * 9000)}`;
    const patientPassword = Math.floor(100000 + Math.random() * 900000).toString(); // 6 xonali parol

    const newPatientData = { 
      ...newPatient, 
      id: Date.now(), 
      taken: false,
      loginId: patientId,
      loginPassword: patientPassword
    };

    const updatedPatients = [...patients, newPatientData];
    setPatients(updatedPatients);
    localStorage.setItem('mahalla_patients', JSON.stringify(updatedPatients));
    
    // Doktorga yaratilgan ID va parolni ko'rsatish
    alert(`Bemor qo'shildi!\n\nBemorning kirish ID raqami: ${patientId}\nBemorning paroli: ${patientPassword}\n\nIltimos, ushbu ma'lumotlarni bemorga bering.`);
    
    setNewPatient({ name: '', diseaseLevel: 'yengil', medicine: '', time: '', diet: '' });
  };

  if (!user) return <Auth role="doctor" themeColor="blue" onLoginSuccess={setUser} />;

  return (
    <div className="min-h-screen relative overflow-hidden bg-doctor font-sans text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/30 via-slate-950 to-slate-950"></div>

      <header className="relative z-50 flex justify-between items-center p-6 bg-slate-900/60 backdrop-blur-md border-b border-blue-500/20">
        <h1 className="text-2xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Sog'lom Mahalla - Doktor</h1>

        <div className="flex items-center gap-4">
          <Link to="/admin" className="text-sm font-bold text-cyan-400 hover:text-white transition-all bg-cyan-500/10 px-4 py-2 rounded-xl border border-cyan-500/20">Admin Panel</Link>
          <Link to="/patient" className="text-sm font-bold text-orange-400 hover:text-white transition-all bg-orange-500/10 px-4 py-2 rounded-xl border border-orange-500/20">Bemor Panel</Link>

          <div className="relative z-50">
            <button onClick={() => setIsLangOpen(!isLangOpen)} className="flex items-center gap-2 px-4 py-2 bg-slate-800/80 rounded-full border border-blue-500/30 hover:bg-slate-700 transition-all">
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

          <button onClick={() => setUser(null)} className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-400 border border-red-500/30 rounded-xl hover:bg-red-500/20 transition-all">
            <LogOut className="w-5 h-5" /> Chiqish
          </button>
        </div>
      </header>

      <main className="relative z-10 p-6 max-w-7xl mx-auto mt-4">
        {/* Statistika */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-slate-900/50 backdrop-blur-xl border border-blue-500/20 p-6 rounded-3xl shadow-lg flex items-center gap-4">
            <div className="w-14 h-14 bg-blue-500/10 rounded-full flex items-center justify-center text-blue-400 border border-blue-500/30"><User className="w-7 h-7" /></div>
            <div><p className="text-slate-400 text-sm">Jami bemorlar</p><h3 className="text-2xl font-bold text-white">{patients.length} ta</h3></div>
          </div>
          <div className="bg-slate-900/50 backdrop-blur-xl border border-green-500/20 p-6 rounded-3xl shadow-lg flex items-center gap-4">
            <div className="w-14 h-14 bg-green-500/10 rounded-full flex items-center justify-center text-green-400 border border-green-500/30"><HeartPulse className="w-7 h-7" /></div>
            <div><p className="text-slate-400 text-sm">Dorini ichganlar</p><h3 className="text-2xl font-bold text-white">{patients.filter(p => p.taken).length} ta</h3></div>
          </div>
          <div className="bg-slate-900/50 backdrop-blur-xl border border-red-500/20 p-6 rounded-3xl shadow-lg flex items-center gap-4">
            <div className="w-14 h-14 bg-red-500/10 rounded-full flex items-center justify-center text-red-400 border border-red-500/30"><Activity className="w-7 h-7" /></div>
            <div><p className="text-slate-400 text-sm">Ichmaganlar</p><h3 className="text-2xl font-bold text-white">{patients.filter(p => !p.taken).length} ta</h3></div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Yangi Bemor Qo'shish Formasi */}
          <div className="bg-slate-900/50 backdrop-blur-xl border border-blue-500/20 p-6 rounded-3xl shadow-lg h-fit">
            <h2 className="text-xl font-bold flex items-center gap-3 mb-6 text-blue-300"><PlusCircle className="w-6 h-6" /> Yangi Bemor Qabul Qilish</h2>
            <form onSubmit={handleAddPatient} className="space-y-4">
              <input type="text" placeholder="Bemor F.I.Sh" required value={newPatient.name} onChange={e => setNewPatient({...newPatient, name: e.target.value})} className="w-full bg-slate-800 text-white p-3 rounded-xl outline-none border border-slate-700 focus:border-blue-500" />
              
              <select value={newPatient.diseaseLevel} onChange={e => setNewPatient({...newPatient, diseaseLevel: e.target.value})} className="w-full bg-slate-800 text-white p-3 rounded-xl outline-none border border-slate-700 focus:border-blue-500">
                <option value="yengil">🟢 Yengil kasallik</option>
                <option value="orta">🟡 O'rta kasallik</option>
                <option value="ogir">🔴 Og'ir kasallik</option>
              </select>

              <input type="text" placeholder="Dori nomi va dozasi (masalan: Paracetamol 500mg)" required value={newPatient.medicine} onChange={e => setNewPatient({...newPatient, medicine: e.target.value})} className="w-full bg-slate-800 text-white p-3 rounded-xl outline-none border border-slate-700 focus:border-blue-500" />
              <input type="time" required value={newPatient.time} onChange={e => setNewPatient({...newPatient, time: e.target.value})} className="w-full bg-slate-800 text-white p-3 rounded-xl outline-none border border-slate-700 focus:border-blue-500" />
              <input type="text" placeholder="Parxez stoli (masalan: 1-stol, tuzsiz)" value={newPatient.diet} onChange={e => setNewPatient({...newPatient, diet: e.target.value})} className="w-full bg-slate-800 text-white p-3 rounded-xl outline-none border border-slate-700 focus:border-blue-500" />
              
              <button type="submit" className="w-full py-3 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl font-bold hover:shadow-lg hover:shadow-blue-500/30 transition-all">
                Bemorni Saqlash
              </button>
            </form>
          </div>

          {/* Bemorlar Ro'yxati */}
          <div className="lg:col-span-2 bg-slate-900/50 backdrop-blur-xl border border-blue-500/20 p-8 rounded-3xl shadow-lg">
            <h2 className="text-xl font-bold flex items-center gap-3 mb-6 text-blue-300"><User className="w-6 h-6" /> Bemorlar ro'yxati va nazorat</h2>
            <div className="overflow-x-auto">
              {patients.length === 0 ? (
                <p className="text-slate-500 text-center py-10">Hozircha bemorlar qo'shilmagan.</p>
              ) : (
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-slate-400 text-sm border-b border-slate-700">
                      <th className="pb-3 font-medium">Bemor</th>
                      <th className="pb-3 font-medium">Kasallik</th>
                      <th className="pb-3 font-medium">Dori va Vaqt</th>
                      <th className="pb-3 font-medium">Parxez</th>
                      <th className="pb-3 font-medium">Holat</th>
                    </tr>
                  </thead>
                  <tbody>
                    {patients.map((p) => (
                      <tr key={p.id} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                        <td className="py-4 font-medium text-white">
                          {p.name}
                          <div className="text-xs text-slate-500 font-mono mt-1">ID: {p.loginId}</div>
                        </td>
                        <td className="py-4">
                          {p.diseaseLevel === 'yengil' && <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-md text-xs font-bold border border-green-500/30">🟢 Yengil</span>}
                          {p.diseaseLevel === 'orta' && <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded-md text-xs font-bold border border-yellow-500/30">🟡 O'rta</span>}
                          {p.diseaseLevel === 'ogir' && <span className="px-2 py-1 bg-red-500/20 text-red-400 rounded-md text-xs font-bold border border-red-500/30">🔴 Og'ir</span>}
                        </td>
                        <td className="py-4 text-sm">
                          <div className="text-white">{p.medicine}</div>
                          <div className="text-slate-400 text-xs">{p.time}</div>
                        </td>
                        <td className="py-4 text-sm text-slate-300 flex items-center gap-1"><Utensils className="w-4 h-4 text-slate-500"/> {p.diet || "Yo'q"}</td>
                        <td className="py-4">
                          {p.taken ? (
                            <span className="flex items-center gap-1.5 w-max px-3 py-1.5 bg-green-500/10 text-green-400 border border-green-500/20 rounded-lg text-xs font-bold"><CheckCircle className="w-4 h-4" /> Ichgan</span>
                          ) : (
                            <span className="flex items-center gap-1.5 w-max px-3 py-1.5 bg-red-500/10 text-red-400 border border-red-500/20 rounded-lg text-xs font-bold"><XCircle className="w-4 h-4" /> Ichmagan</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
