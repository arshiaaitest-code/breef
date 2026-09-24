import React from 'react';
import { useI18n } from '../../locales/i18n';
import { Globe, LayoutDashboard, BookmarkCheck } from 'lucide-react';
import { HalftoneBadge } from './GraphicDoodles';

interface TopBarProps {
  currentView: 'home' | 'flow' | 'builder' | 'admin' | 'public_brief';
  onNavigate: (view: 'home' | 'flow' | 'builder' | 'admin') => void;
  hasDraft?: boolean;
}

export const TopBar: React.FC<TopBarProps> = ({ currentView, onNavigate, hasDraft }) => {
  const { t, language, toggleLanguage } = useI18n();

  return (
    <header className="sticky top-0 z-50 w-full bg-[#FDFBF7]/95 backdrop-blur-md border-b-3 border-[#141416] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand & Editorial Stamp */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('home')}
            className="group text-left text-inherit border-none bg-transparent p-0 cursor-pointer flex items-center gap-3"
          >
            <div className="relative w-9 h-9 rounded-xl bg-[#141416] text-[#FFC72C] flex items-center justify-center font-black text-lg border-2.5 border-[#141416] shadow-[2.5px_2.5px_0px_#FF4A3D] group-hover:rotate-6 transition-transform overflow-hidden">
              <div className="absolute inset-0 halftone-screen-fine opacity-20" />
              <span className="relative z-10">✦</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-black font-display tracking-tight text-[#141416] uppercase group-hover:text-[#FF4A3D] transition-colors">
                  ATELIER BRIEF
                </span>
                <span className="hidden sm:inline-block bg-[#FF4A3D] text-white text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full border-1.5 border-[#141416] shadow-[1.5px_1.5px_0px_#141416] -rotate-2">
                  POP 2026
                </span>
              </div>
              <span className="text-[10px] font-mono tracking-wider text-[#141416]/65 font-bold uppercase">
                {language === 'fa' ? 'آتلیه دیزاین · بریف تعاملی و ادیتوریال' : 'POP EDITORIAL BRIEF SYSTEM'}
              </span>
            </div>
          </button>
        </div>

        {/* Navigation Tabs (Neo-Brutalist Pop Controls) */}
        <nav className="hidden md:flex items-center gap-2 bg-[#F4EFE6] p-1.5 rounded-full border-2.5 border-[#141416] shadow-[3px_3px_0px_#141416]">
          <button
            onClick={() => onNavigate('home')}
            className={`px-4 py-1.5 rounded-full text-xs font-black transition-all ${
              currentView === 'home'
                ? 'bg-[#141416] text-[#FFC72C] shadow-xs'
                : 'text-[#141416] hover:bg-[#FDFBF7]'
            }`}
          >
            {t('nav_services')}
          </button>
          <button
            onClick={() => onNavigate('builder')}
            className={`px-4 py-1.5 rounded-full text-xs font-black transition-all flex items-center gap-1.5 ${
              currentView === 'builder'
                ? 'bg-[#2563EB] text-white shadow-xs'
                : 'text-[#141416] hover:bg-[#FDFBF7]'
            }`}
          >
            <span>{t('nav_builder')}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFC72C]" />
          </button>
          <button
            onClick={() => onNavigate('admin')}
            className={`px-4 py-1.5 rounded-full text-xs font-black transition-all ${
              currentView === 'admin'
                ? 'bg-[#141416] text-white shadow-xs'
                : 'text-[#141416] hover:bg-[#FDFBF7]'
            }`}
          >
            {t('nav_admin')}
          </button>
        </nav>

        {/* Action Buttons & Language */}
        <div className="flex items-center gap-3">
          {hasDraft && currentView === 'home' && (
            <span className="hidden lg:flex items-center gap-1.5 text-xs font-black text-[#141416] bg-[#FFC72C] px-3 py-1 rounded-full border-2 border-[#141416] shadow-[2px_2px_0px_#141416]">
              <BookmarkCheck className="w-3.5 h-3.5 text-[#141416]" />
              <span>{t('nav_draft_restored')}</span>
            </span>
          )}

          {/* Language Switcher Button */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border-2 border-[#141416] bg-white hover:bg-[#F4EFE6] text-xs font-black text-[#141416] shadow-[2px_2px_0px_#141416] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer"
            title="تغییر زبان / Switch Language"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{t('lang_toggle')}</span>
          </button>

          {/* Designer Desk Button (Sunshine Pop Yellow Pill) */}
          <button
            onClick={() => onNavigate(currentView === 'admin' ? 'home' : 'admin')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider border-2.5 border-[#141416] shadow-[3px_3px_0px_#141416] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer ${
              currentView === 'admin'
                ? 'bg-[#141416] text-white'
                : 'bg-[#FFC72C] text-[#141416] hover:bg-[#ffbe1a]'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{t('nav_admin')}</span>
          </button>
        </div>
      </div>
    </header>
  );
};

