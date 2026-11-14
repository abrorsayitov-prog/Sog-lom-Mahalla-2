import React, { useState } from 'react';
import { Globe, ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Header() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsOpen(false);
  };

  return (
    <header className="flex justify-between items-center p-4 bg-slate-900/80 backdrop-blur-md border-b border-white/10 text-white relative z-50">
      <div className="text-xl font-bold tracking-wider text-cyan-400">Sog'lom Mahalla</div>
      
      {/* Globus va Tillar menyusi */}
      <div className="relative">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10 hover:bg-white/10 transition-all"
        >
          <Globe className="w-5 h-5 text-cyan-400 animate-pulse" />
          <span className="uppercase text-sm font-bold">{i18n.language}</span>
          <ChevronDown className="w-4 h-4" />
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-slate-800 border border-white/10 rounded-xl shadow-2xl overflow-hidden">
            <button onClick={() => changeLanguage('uz')} className="w-full text-left px-4 py-3 hover:bg-cyan-500/20 text-sm transition-colors">🇺🇿 O'zbekcha</button>
            <button onClick={() => changeLanguage('ru')} className="w-full text-left px-4 py-3 hover:bg-cyan-500/20 text-sm transition-colors border-t border-white/5">🇷🇺 Русский</button>
            <button onClick={() => changeLanguage('en')} className="w-full text-left px-4 py-3 hover:bg-cyan-500/20 text-sm transition-colors border-t border-white/5">🇬🇧 English</button>
          </div>
        )}
      </div>
    </header>
  );
}
