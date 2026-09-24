import React from 'react';
import { useI18n } from '../../locales/i18n';
import { SERVICES_LIST } from '../../data/services';
import { ArrowUp, Star, Sparkles, Layers, Globe } from 'lucide-react';
import { EditorialBarcode } from './GraphicDoodles';

export const Footer: React.FC = () => {
  const { t, language, toggleLanguage } = useI18n();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#0D0D0D] text-white border-t-[3px] border-black pt-16 pb-12 px-4 sm:px-6 lg:px-8 select-none">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Top Colophon Masthead */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start pb-12 border-b-2 border-white/20">
          {/* Brand info */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-[#E8FF54] text-black flex items-center justify-center font-black text-base border-2 border-black shadow-[2px_2px_0px_#FF2A85]">
                ✦
              </span>
              <span className="text-2xl font-black font-display tracking-tight uppercase text-white">
                ATELIER BRIEF
              </span>
              <span className="bg-[#FF2A85] text-white text-[10px] font-black uppercase px-2 py-0.5 rounded-full border border-black shadow-[1.5px_1.5px_0px_#000]">
                VOL. 2026
              </span>
            </div>

            <p className="text-sm font-sans text-white/70 max-w-md leading-relaxed">
              {language === 'fa'
                ? 'پلتفرم ادیتوریال و معاصر برای ثبت، چیدمان بصری و اشتراک‌گذاری بریف پروژه‌های طراحی با تمرکز بر بوم بصری وب‌سایت، تایپوگرافی جسورانه و دیالوگ مستقیم با طراح.'
                : 'A contemporary digital publication and visual briefing environment inspired by dynamic cultural art direction.'}
            </p>

            <div className="pt-2">
              <EditorialBarcode className="bg-white p-2 rounded-lg" />
            </div>
          </div>

          {/* Quick Track Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-[#E8FF54]">
              {language === 'fa' ? 'مسیرهای طراحی' : 'DISCIPLINES'}
            </h4>
            <ul className="space-y-2 text-xs font-sans text-white/75">
              {SERVICES_LIST.slice(0, 5).map((s) => (
                <li key={s.id} className="hover:text-[#FF2A85] transition-colors">
                  <a href="#service-tracks">
                    {language === 'fa' ? s.titleFa : s.titleEn}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Studio Philosophy & Tools */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-[#FF2A85]">
              {language === 'fa' ? 'ابزارها و استانداردها' : 'STUDIO SPECS'}
            </h4>
            <ul className="space-y-2 text-xs font-sans text-white/75">
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E8FF54]" />
                <span>Widescreen Canvas (16:10 / 16:9)</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF2A85]" />
                <span>Tactical KPI Questioning</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF4D00]" />
                <span>Permalink Living Dossier</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-white" />
                <span>Anti-AI Slop & Zero Dry Forms</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Colophon Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-white/60 font-mono">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#E8FF54]" />
              <span>ISSUE 24 · PUBLISHED 2026</span>
            </div>
            <span>·</span>
            <span>DESIGNED WITH THE ART 24 ART-DIRECTION SPIRIT</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/30 hover:border-white text-white/80 hover:text-white transition-colors"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{t('lang_toggle')}</span>
            </button>

            <button
              onClick={scrollToTop}
              className="w-10 h-10 rounded-full bg-[#E8FF54] text-black hover:bg-white flex items-center justify-center border-2 border-black shadow-[2px_2px_0px_#FF2A85] neo-button-hover cursor-pointer"
              title="Return to top"
            >
              <ArrowUp className="w-4 h-4 stroke-[3]" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
