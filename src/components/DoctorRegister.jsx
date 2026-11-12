import React, { useState } from 'react';
import { UserPlus, Stethoscope, Phone, Mail, Trash2, LogOut } from 'lucide-react';

export default function DoctorRegister({ onLogout }) {
  const [doctors, setDoctors] = useState([
    { id: 1, name: "Dr. Alisher Qodirov", specialty: "Terapevt", phone: "+998 90 123 45 67", email: "alisher@mahalla.uz" }
  ]);

  const [formData, setFormData] = useState({ name: '', specialty: '', phone: '', email: '' });

  const handleAddDoctor = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.specialty) return;

    setDoctors([...doctors, { ...formData, id: Date.now() }]);
    setFormData({ name: '', specialty: '', phone: '', email: '' });
  };

  const handleDelete = (id) => {
    setDoctors(doctors.filter(d => d.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 sm:p-8 font-sans">
      {/* Yuqori Panel */}
      <div className="max-w-6xl mx-auto flex justify-between items-center mb-8 bg-slate-900/80 p-6 rounded-2xl border border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.15)]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
            Sog'lom Mahalla 2 — Admin Boshqaruvi
          </h1>
          <p className="text-xs sm:text-sm text-cyan-200/70">Vrachlarni ro'yxatga olish va tizimni boshqarish paneli</p>
        </div>
        <button
          onClick={onLogout}
          className="flex items-center gap-2 px-4 py-2 bg-red-600/20 hover:bg-red-600 border border-red-500/40 rounded-xl text-red-300 hover:text-white transition-all text-sm font-semibold"
        >
          <LogOut className="w-4 h-4" />
          <span>Chiqish</span>
        </button>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Vrach qo'shish formasi */}
        <div className="bg-slate-900/80 p-6 rounded-2xl border border-cyan-500/30 h-fit">
          <h2 className="text-xl font-bold text-cyan-300 mb-6 flex items-center gap-2">
            <UserPlus className="w-5 h-5" />
            Yangi Vrach Qo'shish
          </h2>
          <form onSubmit={handleAddDoctor} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-cyan-200/80 mb-1">F.I.SH</label>
              <input
                type="text"
                required
                placeholder="Dr. Sobir Alimov"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-800 border border-cyan-500/20 rounded-xl text-white text-sm focus:outline-none focus:border-cyan-400"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-cyan-200/80 mb-1">Mutaxassisligi</label>
              <input
                type="text"
                required
                placeholder="Kardiolog"
                value={formData.specialty}
                onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-800 border border-cyan-500/20 rounded-xl text-white text-sm focus:outline-none focus:border-cyan-400"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-cyan-200/80 mb-1">Telefon Nomeri</label>
              <input
                type="text"
                placeholder="+998 9x xxx xx xx"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-800 border border-cyan-500/20 rounded-xl text-white text-sm focus:outline-none focus:border-cyan-400"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-cyan-200/80 mb-1">Email</label>
              <input
                type="email"
                placeholder="vrach@mahalla.uz"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-800 border border-cyan-500/20 rounded-xl text-white text-sm focus:outline-none focus:border-cyan-400"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 font-bold rounded-xl text-white shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all"
            >
              Ro'yxatga Olish
            </button>
          </form>
        </div>

        {/* Vrachlar jadvali */}
        <div className="lg:col-span-2 bg-slate-900/80 p-6 rounded-2xl border border-cyan-500/30">
          <h2 className="text-xl font-bold text-cyan-300 mb-6 flex items-center gap-2">
            <Stethoscope className="w-5 h-5" />
            Ro'yxatdan O'tgan Vrachlar ({doctors.length})
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-cyan-100">
              <thead className="bg-slate-800/80 text-cyan-300 uppercase text-xs">
                <tr>
                  <th className="p-3 rounded-l-xl">F.I.SH</th>
                  <th className="p-3">Mutaxassislik</th>
                  <th className="p-3">Aloqa</th>
                  <th className="p-3 text-right rounded-r-xl">Amal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {doctors.map((doc) => (
                  <tr key={doc.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-3 font-semibold text-white">{doc.name}</td>
                    <td className="p-3"><span className="px-2.5 py-1 bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 rounded-lg text-xs">{doc.specialty}</span></td>
                    <td className="p-3 text-xs text-cyan-200/80">
                      <div>{doc.phone}</div>
                      <div>{doc.email}</div>
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => handleDelete(doc.id)}
                        className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
