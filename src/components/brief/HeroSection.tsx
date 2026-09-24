import React, { useState } from 'react';
import { useI18n } from '../../locales/i18n';
import { ServiceType } from '../../types/brief';
import { SERVICES_LIST } from '../../data/services';
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  ArrowUpRight,
  Zap,
  Star,
  CheckCircle2,
  XCircle,
  Maximize2,
  Move,
  Layers,
  Palette,
  Eye,
  Flame,
} from 'lucide-react';
import studioHeroImg from '../../assets/images/hero_editorial_studio_1790256419733.jpg';
import {
  DoodleArrow,
  DoodleCircleHighlight,
  DoodleSquiggle,
  DoodleStar,
  EditorialBarcode,
} from '../common/GraphicDoodles';

interface HeroSectionProps {
  onSelectService: (service: ServiceType) => void;
  onOpenDirectBuilder: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onSelectService,
  onOpenDirectBuilder,
}) => {
  const { t, language, direction } = useI18n();
  const ArrowIcon = direction === 'rtl' ? ArrowLeft : ArrowRight;

  // State for interactive mini-artboard preview in Spotlight section
  const [activeMiniTab, setActiveMiniTab] = useState<'editorial' | 'magazine' | 'minimal'>('editorial');

  return (
    <div className="w-full overflow-hidden">
      {/* ========================================================================= */}
      {/* 1. TOP MARQUEE TICKER (Neo-Brutalist High-Energy Ribbon)                   */}
      {/* ========================================================================= */}
      <div className="w-full bg-[#0D0D0D] text-[#E8FF54] py-2.5 border-b-[3px] border-black overflow-hidden select-none">
        <div className="flex items-center gap-8 whitespace-nowrap text-xs font-mono font-bold tracking-widest uppercase animate-marquee">
          <span>✦ ATELIER BRIEFING SYSTEM</span>
          <span>·</span>
          <span>POP EDITORIAL & NEO-BRUTALIST VIBE</span>
          <span>·</span>
          <span>ZERO DRY QUESTIONNAIRES</span>
          <span>·</span>
          <span>ISSUE // 2026</span>
          <span>·</span>
          <span>WIDESCREEN VISUAL CANVAS FOR WEBSITES</span>
          <span>·</span>
          <span>DIRECT DIALOGUE WITH DESIGNER</span>
          <span>·</span>
          <span>✦ SHAPING CONTEMPORARY EXPERIENCES</span>
          <span>·</span>
          <span>POP EDITORIAL & NEO-BRUTALIST VIBE</span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. HERO EDITORIAL COVER (Warm Pale Cream #FAF7EF)                         */}
      {/* ========================================================================= */}
      <section className="relative pt-10 pb-16 sm:pt-16 sm:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Floating Decorative Pop Stickers with Hard Drop Shadows */}
        <div className="hidden lg:block absolute top-12 left-16 rotate-6 z-10 pointer-events-none select-none">
          <div className="bg-[#FF2A85] text-white px-3.5 py-1.5 rounded-full border-2 border-black font-black text-xs uppercase shadow-[3px_3px_0px_#000] flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>100% BESPOKE</span>
          </div>
        </div>

        <div className="hidden lg:block absolute top-16 right-16 -rotate-6 z-10 pointer-events-none select-none">
          <div className="bg-[#E8FF54] text-black px-4 py-1.5 rounded-full border-2 border-black font-black text-xs uppercase shadow-[3px_3px_0px_#000] flex items-center gap-1.5">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span>ZERO SAAS SLOP ✱</span>
          </div>
        </div>

        {/* Hero Asymmetrical Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-12">
          {/* Left Column: Bold Typography & Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex flex-wrap items-center gap-2 text-xs font-black uppercase">
              <span className="bg-black text-white px-3 py-1 rounded-full border-2 border-black shadow-[2px_2px_0px_#FF2A85]">
                {language === 'fa' ? 'نسخه ادیتوریال ۲۰۲۶' : 'VOL. 2026 EDITION'}
              </span>
              <span className="bg-[#E8FF54] text-black px-3 py-1 rounded-full border-2 border-black shadow-[2px_2px_0px_#000]">
                {t('hero_eyebrow')}
              </span>
              <span className="hidden sm:inline-block bg-[#FF4D00] text-white px-3 py-1 rounded-full border-2 border-black shadow-[2px_2px_0px_#000]">
                ISSUE 24
              </span>
            </div>

            {/* Massive Bold Hybrid Typography */}
            <div>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black font-display text-black tracking-tight leading-[1.08] mb-4 text-balance">
                {t('hero_title')}
              </h1>
              <div className="relative inline-block mt-1">
                <p className="text-xl sm:text-2xl font-editorial-serif italic text-black/85 font-normal leading-relaxed">
                  «دیالوگ مستقیم و خلاقانه میان شما و طراح، بدون فرم‌های اداری و کلیشه‌ای.»
                </p>
                <DoodleSquiggle className="hidden sm:block absolute -bottom-3 left-4 w-32 h-4" color="#FF2A85" />
              </div>
            </div>

            <p className="text-base sm:text-lg text-black/75 font-sans max-w-xl leading-relaxed pt-2">
              {t('hero_subtitle')}
            </p>

            {/* Action Buttons with Neo-Brutalist Hard Drop Shadows */}
            <div className="flex flex-wrap items-center gap-4 pt-3">
              <a
                href="#service-tracks"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#FF2A85] hover:bg-[#e02072] text-white font-black text-sm uppercase tracking-wider border-2 border-black shadow-[4px_4px_0px_#000] neo-button-hover cursor-pointer"
              >
                <span>{language === 'fa' ? 'انتخاب مسیر پروژه' : 'Choose Project Track'}</span>
                <ArrowIcon className="w-4 h-4 stroke-[3]" />
              </a>

              <button
                onClick={onOpenDirectBuilder}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white hover:bg-[#FAF7EF] text-black font-black text-sm uppercase tracking-wider border-2 border-black shadow-[4px_4px_0px_#000] neo-button-hover cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#FF2A85]" />
                <span>{t('nav_builder')}</span>
              </button>

              <a
                href="#canvas-spotlight"
                className="inline-flex items-center gap-1.5 px-4 py-3.5 text-xs font-mono font-bold text-black underline underline-offset-4 hover:text-[#FF2A85] transition-colors"
              >
                <span>{language === 'fa' ? 'دیدن بوم بصری ➔' : 'Preview Visual Canvas ➔'}</span>
              </a>
            </div>
          </div>

          {/* Right Column: Art-Directed Dossier Collage Box */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl border-3 border-black bg-white p-6 sm:p-7 shadow-[8px_8px_0px_#000] overflow-hidden">
              {/* Tilted washi tape decoration */}
              <div className="washi-tape washi-tape-pink font-mono text-[9px] font-bold text-center flex items-center justify-center">
                ARCHIVE SPEC
              </div>

              {/* Atelier Frame Image */}
              <div className="relative rounded-2xl overflow-hidden border-2 border-black aspect-4/3 mb-5 group">
                <img
                  src={studioHeroImg}
                  alt="Contemporary Atelier"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent flex items-end p-4">
                  <div className="text-white">
                    <span className="text-[10px] font-mono tracking-widest uppercase bg-[#FF2A85] px-2 py-0.5 rounded font-bold">
                      FIG 01.0 // ATELIER
                    </span>
                    <p className="text-sm font-editorial-serif font-normal mt-1 text-white/95">
                      فضای خلق فرم‌ها و استانداردهای نوین بصری
                    </p>
                  </div>
                </div>
              </div>

              {/* Manifesto & Quick Stats */}
              <div className="space-y-3">
                <div className="p-3.5 rounded-xl bg-[#FAF7EF] border-2 border-black text-xs text-black/85 font-editorial-serif leading-relaxed">
                  {t('hero_editorial_note')}
                </div>

                <div className="flex items-center justify-between text-xs font-mono font-bold pt-2 border-t-2 border-black">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#E8FF54] border border-black" />
                    <span>07 SERVICE TRACKS</span>
                  </span>
                  <EditorialBarcode />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. GRAPHIC SECTION DIVIDER 01 (Stark Black Transition Bar)                */}
      {/* ========================================================================= */}
      <div className="w-full bg-black py-4 border-y-[3px] border-black text-white px-4 sm:px-8 flex items-center justify-between font-mono font-black text-xs uppercase tracking-widest select-none">
        <div className="flex items-center gap-3">
          <span className="w-3 h-3 rounded-full bg-[#FF2A85] border border-white animate-pulse" />
          <span>SECTION 02 // DYNAMIC TRACK SELECTION</span>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-[#E8FF54]">
          <span>SELECT YOUR DISCIPLINE ➔</span>
          <span>[01 — 07]</span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. SERVICE TRACKS SECTION (STARK INK BLACK #0D0D0D BACKDROP)              */}
      {/* ========================================================================= */}
      <section id="service-tracks" className="bg-[#0D0D0D] py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b-[3px] border-black text-white">
        <div className="max-w-7xl mx-auto">
          {/* Section Editorial Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#FF2A85] text-white text-xs font-black uppercase px-3 py-1 rounded-full border-2 border-white shadow-[3px_3px_0px_#E8FF54] mb-3">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span>{language === 'fa' ? 'انتخاب مسیر دیزاین' : 'CHOOSE YOUR PATH'}</span>
              </div>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black font-display uppercase tracking-tight text-white">
                {language === 'fa' ? 'چه پروژه‌ای در ذهن داری؟' : 'WHAT ARE WE CRAFTING?'}
              </h2>
            </div>
            <p className="text-sm sm:text-base text-white/70 max-w-md font-sans leading-relaxed">
              {language === 'fa'
                ? 'هر کارت یک ساختار و زبان بصری منحصر‌به‌فرد دارد. با انتخاب هر بخش، فقط پرسش‌های ضروری همان محور برای شما باز می‌شود.'
                : 'Each track features distinct editorial art-direction. Select your project type to open its adaptive questionnaire.'}
            </p>
          </div>

          {/* DYNAMIC ASYMMETRICAL SERVICE CARDS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8">
            {SERVICES_LIST.map((service, index) => {
              const title = language === 'fa' ? service.titleFa : service.titleEn;
              const tagline = language === 'fa' ? service.taglineFa : service.taglineEn;
              const numberFormatted = String(index + 1).padStart(2, '0');

              // 1. FEATURED WEBSITE CARD (Dominant 2-Column Hero Card)
              if (service.id === 'website') {
                return (
                  <div
                    key={service.id}
                    onClick={() => onSelectService(service.id)}
                    className="md:col-span-12 lg:col-span-8 rounded-[32px] border-3 border-white bg-white text-black p-6 sm:p-8 shadow-[8px_8px_0px_#FF2A85] hover:shadow-[12px_12px_0px_#FF2A85] hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between group overflow-hidden relative"
                  >
                    {/* Top Sticker Ribbon */}
                    <div className="flex items-center justify-between pb-6 border-b-2 border-black">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="bg-[#FF2A85] text-white text-xs font-black uppercase px-3 py-1 rounded-full border-2 border-black shadow-[2px_2px_0px_#000]">
                          TRACK {numberFormatted}
                        </span>
                        <span className="bg-[#E8FF54] text-black text-xs font-black uppercase px-3 py-1 rounded-full border-2 border-black shadow-[2px_2px_0px_#000]">
                          INCLUDES VISUAL CANVAS ✦
                        </span>
                      </div>
                      <span className="text-xs font-mono font-bold text-black/70">
                        {service.estimatedTime}
                      </span>
                    </div>

                    {/* Middle: Editorial Image + Giant Headline */}
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 my-6 items-center">
                      <div className="sm:col-span-7 space-y-3">
                        <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display tracking-tight text-black group-hover:text-[#FF2A85] transition-colors">
                          {title}
                        </h3>
                        <p className="text-base text-black/80 font-sans leading-relaxed">
                          {tagline}
                        </p>
                        <p className="text-xs text-black/60 font-editorial-serif italic">
                          طراحی وب‌سایت‌های ادیتوریال، مگزین معاصر و آتلیه با همنشینی تایپوگرافی سریف، فضای تنفس و بوم بصری تعاملی.
                        </p>
                      </div>

                      <div className="sm:col-span-5">
                        <div className="rounded-2xl border-2 border-black overflow-hidden shadow-[4px_4px_0px_#000] aspect-4/3 group-hover:rotate-1 transition-transform">
                          <img
                            src={service.image}
                            alt={title}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Bottom CTA Pill */}
                    <div className="pt-4 border-t-2 border-black flex items-center justify-between">
                      <span className="text-xs font-black uppercase tracking-wider text-black">
                        {language === 'fa' ? 'شروع بریف وب‌سایت + بوم بصری' : 'Start Website Brief + Canvas'}
                      </span>
                      <span className="w-10 h-10 rounded-full bg-black text-white group-hover:bg-[#FF2A85] flex items-center justify-center border-2 border-black shadow-[2px_2px_0px_#000] group-hover:translate-x-[-2px] transition-all">
                        <ArrowUpRight className="w-5 h-5" />
                      </span>
                    </div>
                  </div>
                );
              }

              // 2. LOGO DESIGN (Electric Acid-Yellow Card)
              if (service.id === 'logo') {
                return (
                  <div
                    key={service.id}
                    onClick={() => onSelectService(service.id)}
                    className="md:col-span-6 lg:col-span-4 rounded-[28px] border-3 border-black bg-[#E8FF54] text-black p-6 sm:p-7 shadow-[8px_8px_0px_#FFFFFF] hover:shadow-[12px_12px_0px_#FFFFFF] hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="bg-black text-[#E8FF54] text-xs font-black uppercase px-2.5 py-1 rounded-full border-1.5 border-black shadow-[1.5px_1.5px_0px_#000]">
                          {numberFormatted}
                        </span>
                        <span className="text-xs font-mono font-bold text-black/70">
                          {service.estimatedTime}
                        </span>
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-black font-display uppercase tracking-tight text-black mb-2 group-hover:underline">
                        {title}
                      </h3>
                      <p className="text-xs sm:text-sm text-black/80 font-sans leading-relaxed mb-4">
                        {tagline}
                      </p>
                    </div>

                    <div>
                      <div className="rounded-xl border-2 border-black overflow-hidden mb-4 aspect-16/10">
                        <img
                          src={service.image}
                          alt={title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t-2 border-black text-xs font-black uppercase">
                        <span>{language === 'fa' ? 'ورود به بریف' : 'Open Brief'}</span>
                        <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform" />
                      </div>
                    </div>
                  </div>
                );
              }

              // 3. BRAND IDENTITY (Vivid Hot-Pink Card)
              if (service.id === 'brand_identity') {
                return (
                  <div
                    key={service.id}
                    onClick={() => onSelectService(service.id)}
                    className="md:col-span-6 lg:col-span-4 rounded-[28px] border-3 border-white bg-[#FF2A85] text-white p-6 sm:p-7 shadow-[8px_8px_0px_#E8FF54] hover:shadow-[12px_12px_0px_#E8FF54] hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="bg-white text-black text-xs font-black uppercase px-2.5 py-1 rounded-full border-1.5 border-black shadow-[1.5px_1.5px_0px_#000]">
                          {numberFormatted}
                        </span>
                        <span className="text-xs font-mono font-bold text-white/80">
                          {service.estimatedTime}
                        </span>
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-black font-display uppercase tracking-tight text-white mb-2 group-hover:underline">
                        {title}
                      </h3>
                      <p className="text-xs sm:text-sm text-white/90 font-sans leading-relaxed mb-4">
                        {tagline}
                      </p>
                    </div>

                    <div>
                      <div className="rounded-xl border-2 border-black overflow-hidden mb-4 aspect-16/10">
                        <img
                          src={service.image}
                          alt={title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t-2 border-white text-xs font-black uppercase">
                        <span>{language === 'fa' ? 'تدوین هویت بصری' : 'Define Identity'}</span>
                        <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform" />
                      </div>
                    </div>
                  </div>
                );
              }

              // 4. APP DESIGN (Stark Clean White Neo-Box)
              if (service.id === 'app') {
                return (
                  <div
                    key={service.id}
                    onClick={() => onSelectService(service.id)}
                    className="md:col-span-6 lg:col-span-4 rounded-[28px] border-3 border-white bg-white text-black p-6 sm:p-7 shadow-[8px_8px_0px_#000000] hover:shadow-[12px_12px_0px_#FF2A85] hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="bg-black text-white text-xs font-black uppercase px-2.5 py-1 rounded-full border-1.5 border-black shadow-[1.5px_1.5px_0px_#000]">
                          {numberFormatted}
                        </span>
                        <span className="text-xs font-mono font-bold text-black/70">
                          {service.estimatedTime}
                        </span>
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-black font-display uppercase tracking-tight text-black mb-2 group-hover:text-[#FF2A85] transition-colors">
                        {title}
                      </h3>
                      <p className="text-xs sm:text-sm text-black/80 font-sans leading-relaxed mb-4">
                        {tagline}
                      </p>
                    </div>

                    <div>
                      <div className="rounded-xl border-2 border-black overflow-hidden mb-4 aspect-16/10">
                        <img
                          src={service.image}
                          alt={title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t-2 border-black text-xs font-black uppercase">
                        <span>{language === 'fa' ? 'شروع بریف UI/UX' : 'Launch UI/UX Brief'}</span>
                        <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform" />
                      </div>
                    </div>
                  </div>
                );
              }

              // 5. PACKAGING DESIGN (Pale Vanilla Cream with Washi Tape)
              if (service.id === 'packaging') {
                return (
                  <div
                    key={service.id}
                    onClick={() => onSelectService(service.id)}
                    className="md:col-span-6 lg:col-span-4 rounded-[28px] border-3 border-black bg-[#FAF7EF] text-black p-6 sm:p-7 shadow-[8px_8px_0px_#FF4D00] hover:shadow-[12px_12px_0px_#FF4D00] hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between group relative"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="bg-[#FF4D00] text-white text-xs font-black uppercase px-2.5 py-1 rounded-full border-1.5 border-black shadow-[1.5px_1.5px_0px_#000]">
                          {numberFormatted}
                        </span>
                        <span className="text-xs font-mono font-bold text-black/70">
                          {service.estimatedTime}
                        </span>
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-black font-display uppercase tracking-tight text-black mb-2 group-hover:text-[#FF4D00] transition-colors">
                        {title}
                      </h3>
                      <p className="text-xs sm:text-sm text-black/80 font-sans leading-relaxed mb-4">
                        {tagline}
                      </p>
                    </div>

                    <div>
                      <div className="rounded-xl border-2 border-black overflow-hidden mb-4 aspect-16/10">
                        <img
                          src={service.image}
                          alt={title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t-2 border-black text-xs font-black uppercase">
                        <span>{language === 'fa' ? 'بریف بسته‌بندی' : 'Packaging Brief'}</span>
                        <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform" />
                      </div>
                    </div>
                  </div>
                );
              }

              // 6 & 7. GRAPHIC DESIGN & OTHER (Asymmetric Wide Horizontal Cards)
              return (
                <div
                  key={service.id}
                  onClick={() => onSelectService(service.id)}
                  className="md:col-span-6 rounded-[28px] border-3 border-white bg-[#1A1A1A] text-white p-6 sm:p-7 shadow-[6px_6px_0px_#E8FF54] hover:shadow-[10px_10px_0px_#E8FF54] hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="bg-[#E8FF54] text-black text-xs font-black uppercase px-2.5 py-1 rounded-full border-1.5 border-black shadow-[1.5px_1.5px_0px_#000]">
                      {numberFormatted}
                    </span>
                    <span className="text-xs font-mono font-bold text-white/70">
                      {service.estimatedTime}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 my-2 items-center">
                    <div className="sm:col-span-8">
                      <h3 className="text-2xl font-black font-display uppercase tracking-tight text-white mb-1.5 group-hover:text-[#E8FF54] transition-colors">
                        {title}
                      </h3>
                      <p className="text-xs sm:text-sm text-white/70 font-sans leading-relaxed">
                        {tagline}
                      </p>
                    </div>
                    <div className="sm:col-span-4 rounded-xl border-2 border-white overflow-hidden aspect-4/3">
                      <img
                        src={service.image}
                        alt={title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-white/20 text-xs font-black uppercase">
                    <span>{language === 'fa' ? 'آغاز گفتگو' : 'Start Track'}</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. GRAPHIC SECTION DIVIDER 02 (Electric Pink & Black High-Energy Tape)    */}
      {/* ========================================================================= */}
      <div className="w-full bg-[#FF2A85] text-white py-3 border-b-[3px] border-black select-none overflow-hidden">
        <div className="flex items-center gap-6 whitespace-nowrap text-xs font-black tracking-widest uppercase animate-marquee">
          <span>✦ TRANSLATING BRAIN TO ARTIFACT</span>
          <span>·</span>
          <span>THE THREE-PILLAR METHODOLOGY</span>
          <span>·</span>
          <span>DIRECT STUDIO TRANSMISSION</span>
          <span>·</span>
          <span>NO 40-PAGE PDFS</span>
          <span>·</span>
          <span>✦ TRANSLATING BRAIN TO ARTIFACT</span>
          <span>·</span>
          <span>THE THREE-PILLAR METHODOLOGY</span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 6. METHODOLOGY ZINE SPREAD (Vivid Pop Pink #FF2A85 Background)           */}
      {/* ========================================================================= */}
      <section className="bg-[#FF2A85] py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b-[3px] border-black text-white relative">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 bg-white text-black text-xs font-black uppercase px-3 py-1 rounded-full border-2 border-black shadow-[3px_3px_0px_#000] mb-3">
                <Flame className="w-3.5 h-3.5 text-[#FF2A85]" />
                <span>{language === 'fa' ? 'متدولوژی آتلیه' : 'METHODOLOGY // 03'}</span>
              </div>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black font-display uppercase tracking-tight text-white leading-tight">
                {language === 'fa' ? 'از ایده تا سند زنده دیزاین' : 'FROM BRAIN DUMP TO ARTIFACT'}
              </h2>
            </div>
            <p className="text-sm sm:text-base text-white/90 max-w-md font-sans leading-relaxed">
              {language === 'fa'
                ? 'سه گام دقیق و روان برای تبدیل نیازمندی‌های پیچیده کسب‌وکار شما به یک بریف ساخت‌یافته و قابل اجرا توسط طراحان ارشد.'
                : 'A three-stage expressive transmission process designed to eliminate ambiguity and elevate design clarity.'}
            </p>
          </div>

          {/* Asymmetrical 3-Card Editorial Spread */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Step 01: Deep Tactical Probing (White Card) */}
            <div className="rounded-[30px] border-3 border-black bg-white text-black p-7 shadow-[8px_8px_0px_#000] flex flex-col justify-between relative group hover:-translate-y-1 transition-transform">
              <div className="washi-tape washi-tape-yellow font-mono text-[9px] font-bold text-center flex items-center justify-center">
                PHASE 01
              </div>

              <div>
                <div className="flex items-center justify-between mb-6 pt-2">
                  <span className="w-12 h-12 rounded-2xl bg-black text-[#E8FF54] flex items-center justify-center font-black text-xl font-mono border-2 border-black shadow-[2px_2px_0px_#FF2A85]">
                    01
                  </span>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-[#FAF7EF] px-2.5 py-1 rounded-full border border-black">
                    DEEP PROBING
                  </span>
                </div>

                <h3 className="text-2xl font-black font-display tracking-tight text-black mb-3">
                  {language === 'fa' ? 'پرسشگری هوشمند و هدفمند' : 'Tactical KPI Questioning'}
                </h3>
                <p className="text-sm text-black/75 font-sans leading-relaxed mb-4">
                  {language === 'fa'
                    ? 'به جای پرسشنامه‌های خسته‌کننده ۵۰ سوالی، تنها چند سوال استراتژیک درباره ارزش تمایز، پرسونای مخاطب، خطوط قرمز و نبایدهای طراحی مطرح می‌شود.'
                    : 'We replaced bureaucratic questionnaires with laser-focused prompts covering KPIs, redlines, audience mindset, and core identity.'}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#FAF7EF] border-2 border-black text-xs font-mono font-bold text-black/80 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#FF2A85]" />
                <span>{language === 'fa' ? 'بدون اتلاف وقت و اصطکاک' : 'Zero fluff · High precision'}</span>
              </div>
            </div>

            {/* Step 02: Widescreen Visual Canvas (Stark Black Card) */}
            <div className="rounded-[30px] border-3 border-black bg-[#0D0D0D] text-white p-7 shadow-[8px_8px_0px_#E8FF54] flex flex-col justify-between relative group hover:-translate-y-1 transition-transform">
              <div className="washi-tape washi-tape-pink font-mono text-[9px] font-bold text-center flex items-center justify-center">
                PHASE 02
              </div>

              <div>
                <div className="flex items-center justify-between mb-6 pt-2">
                  <span className="w-12 h-12 rounded-2xl bg-[#E8FF54] text-black flex items-center justify-center font-black text-xl font-mono border-2 border-black shadow-[2px_2px_0px_#000]">
                    02
                  </span>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-[#FF2A85] text-white px-2.5 py-1 rounded-full border border-black">
                    WEBSITES ONLY
                  </span>
                </div>

                <h3 className="text-2xl font-black font-display tracking-tight text-white mb-3">
                  {language === 'fa' ? 'بوم بصری افقی وب‌سایت' : 'Widescreen Visual Canvas'}
                </h3>
                <p className="text-sm text-white/80 font-sans leading-relaxed mb-4">
                  {language === 'fa'
                    ? 'مخصوص سرویس وب‌سایت؛ یک استودیوی بصری باز و بدون محدودیت کادرهای عمودی موبایلی. المان‌های نویگیشن، هیرو، گرید و مقالات را بچینید و ابعادشان را تغییر دهید.'
                    : 'A dedicated workspace tailored to real display aspect ratios (16:10 / 16:9). Drag, resize, and structure your visual architecture.'}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#1A1A1A] border-2 border-white/40 text-xs font-mono font-bold text-[#E8FF54] flex items-center gap-2">
                <Maximize2 className="w-3.5 h-3.5" />
                <span>{language === 'fa' ? 'منطبق با رزولوشن واقعی نمایشگر' : 'Screen resolution auto-fit'}</span>
              </div>
            </div>

            {/* Step 03: The Artifact Dossier (Pale Vanilla Cream Card) */}
            <div className="rounded-[30px] border-3 border-black bg-[#FAF7EF] text-black p-7 shadow-[8px_8px_0px_#000] flex flex-col justify-between relative group hover:-translate-y-1 transition-transform">
              <div className="washi-tape washi-tape-yellow font-mono text-[9px] font-bold text-center flex items-center justify-center">
                PHASE 03
              </div>

              <div>
                <div className="flex items-center justify-between mb-6 pt-2">
                  <span className="w-12 h-12 rounded-2xl bg-[#FF4D00] text-white flex items-center justify-center font-black text-xl font-mono border-2 border-black shadow-[2px_2px_0px_#000]">
                    03
                  </span>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-white px-2.5 py-1 rounded-full border border-black">
                    PERMALINK DOSSIER
                  </span>
                </div>

                <h3 className="text-2xl font-black font-display tracking-tight text-black mb-3">
                  {language === 'fa' ? 'سند نهایی و لینک اختصاصی' : 'The Living Artifact'}
                </h3>
                <p className="text-sm text-black/75 font-sans leading-relaxed mb-4">
                  {language === 'fa'
                    ? 'بریف شما بلافاصله تبدیل به یک لندینگ اختصاصی شیک با لینک پایدار می‌شود که قابل پرینت، ارسال برای تیم توسعه و اشتراک با طراح ارشد است.'
                    : 'Your completed brief transforms into an editorial dossier URL complete with visual canvas viewer, specs, and instant export.'}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-white border-2 border-black text-xs font-mono font-bold text-black/80 flex items-center gap-2">
                <ArrowUpRight className="w-3.5 h-3.5 text-[#FF2A85]" />
                <span>{language === 'fa' ? 'لینک اشتراک /brief/client/project' : 'Permanent shareable URL'}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. GRAPHIC SECTION DIVIDER 03 (Acid Yellow Bar)                           */}
      {/* ========================================================================= */}
      <div className="w-full bg-[#E8FF54] py-3.5 border-b-[3px] border-black text-black px-4 sm:px-8 flex items-center justify-between font-mono font-black text-xs uppercase tracking-widest select-none">
        <div className="flex items-center gap-3">
          <span className="w-3 h-3 rounded-full bg-black" />
          <span>SECTION 04 // THE WIDESCREEN VISUAL CANVAS SPOTLIGHT</span>
        </div>
        <div className="hidden sm:flex items-center gap-3">
          <span>✦ WEBSITE ARCHITECTURE STUDIO</span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 8. INTERACTIVE CANVAS SPOTLIGHT (Pale Acid Yellow #E8FF54 Background)    */}
      {/* ========================================================================= */}
      <section id="canvas-spotlight" className="bg-[#E8FF54] py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b-[3px] border-black text-black">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 bg-black text-[#E8FF54] text-xs font-black uppercase px-3 py-1 rounded-full border-2 border-black shadow-[2px_2px_0px_#FF2A85]">
                <Layers className="w-3.5 h-3.5" />
                <span>{language === 'fa' ? 'نوآوری استودیو برای طراحی وب' : 'FLAGSHIP TOOL'}</span>
              </div>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black font-display uppercase tracking-tight text-black leading-tight">
                {language === 'fa'
                  ? 'بوم بصری وب‌سایت؛ فراتر از کلمات'
                  : 'THE WIDESCREEN CANVAS; BEYOND WORDS'}
              </h2>
              <p className="text-base sm:text-lg text-black/80 font-sans max-w-2xl leading-relaxed">
                {language === 'fa'
                  ? 'بوم بصری فقط مخصوص پروژه‌های وب‌سایت فعال می‌شود. به جای توضیح کلامیِ ساختار پیچیده، بلوک‌های هدر، هیرو، گرید و تایپوگرافی را مانند یک صفحه واقعی وب بچینید.'
                  : 'Activated exclusively for website briefs. Allows clients and art directors to establish spatial rhythm, module hierarchy, and aesthetic tone visually.'}
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end">
              <button
                onClick={onOpenDirectBuilder}
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-black text-[#E8FF54] hover:bg-[#1A1A1A] font-black text-sm uppercase tracking-wider border-2 border-black shadow-[4px_4px_0px_#FF2A85] neo-button-hover cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#FF2A85]" />
                <span>{language === 'fa' ? 'ورود به بوم بصری وب‌سایت' : 'Open Visual Studio'}</span>
              </button>

              <button
                onClick={() => onSelectService('website')}
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-white text-black hover:bg-[#FAF7EF] font-black text-sm uppercase tracking-wider border-2 border-black shadow-[4px_4px_0px_#000] neo-button-hover cursor-pointer"
              >
                <span>{language === 'fa' ? 'شروع بریف کامل وب‌سایت' : 'Start Website Flow'}</span>
                <ArrowIcon className="w-4 h-4 stroke-[3]" />
              </button>
            </div>
          </div>

          {/* Interactive Simulation / Mock Artboard Frame */}
          <div className="rounded-[32px] border-3 border-black bg-white p-5 sm:p-8 shadow-[10px_10px_0px_#000] overflow-hidden">
            {/* Top Toolbar of the Preview Artboard */}
            <div className="flex flex-wrap items-center justify-between pb-4 mb-6 border-b-2 border-black gap-3">
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded-full bg-[#FF4D00] border border-black" />
                <span className="w-3.5 h-3.5 rounded-full bg-[#E8FF54] border border-black" />
                <span className="w-3.5 h-3.5 rounded-full bg-[#FF2A85] border border-black" />
                <span className="text-xs font-mono font-bold text-black/80 ml-2">
                  CANVAS RESOLUTION: 1280 × 800 (16:10 STUDIO LAPTOP)
                </span>
              </div>

              {/* Template Style Selector */}
              <div className="flex items-center gap-1.5 bg-[#FAF7EF] p-1 rounded-full border-2 border-black">
                <button
                  onClick={() => setActiveMiniTab('editorial')}
                  className={`px-3 py-1 rounded-full text-xs font-black uppercase transition-all ${
                    activeMiniTab === 'editorial'
                      ? 'bg-black text-[#E8FF54] shadow-xs'
                      : 'text-black hover:bg-black/5'
                  }`}
                >
                  THE ART 24 STYLE
                </button>
                <button
                  onClick={() => setActiveMiniTab('magazine')}
                  className={`px-3 py-1 rounded-full text-xs font-black uppercase transition-all ${
                    activeMiniTab === 'magazine'
                      ? 'bg-[#FF2A85] text-white shadow-xs'
                      : 'text-black hover:bg-black/5'
                  }`}
                >
                  MAGAZINE SPREAD
                </button>
                <button
                  onClick={() => setActiveMiniTab('minimal')}
                  className={`px-3 py-1 rounded-full text-xs font-black uppercase transition-all ${
                    activeMiniTab === 'minimal'
                      ? 'bg-black text-white shadow-xs'
                      : 'text-black hover:bg-black/5'
                  }`}
                >
                  MONO MINIMAL
                </button>
              </div>
            </div>

            {/* Simulated Widescreen Artboard Canvas View */}
            <div className="relative rounded-2xl border-2 border-black bg-[#FAF7EF] p-4 sm:p-6 overflow-hidden canvas-grid-pattern shadow-inner min-h-[360px] flex flex-col justify-between">
              {/* Tilted Sticker note on the artboard */}
              <div className="absolute top-4 right-4 z-20 rotate-3 pointer-events-none">
                <div className="bg-[#FF2A85] text-white px-3 py-1 rounded-lg border-2 border-black font-mono font-bold text-[11px] shadow-[2px_2px_0px_#000]">
                  ✦ LIVE SCALE & DRAG CAPABLE
                </div>
              </div>

              {/* Simulated Navigation Bar */}
              <div className="w-full bg-white rounded-xl border-2 border-black p-3 flex items-center justify-between shadow-[2px_2px_0px_#000] mb-4">
                <div className="flex items-center gap-2 font-black text-xs uppercase font-display">
                  <span className="w-5 h-5 rounded bg-black text-[#E8FF54] flex items-center justify-center text-[10px]">
                    ✦
                  </span>
                  <span>STUDIO ATELIER</span>
                </div>
                <div className="flex items-center gap-4 text-xs font-mono font-bold text-black/60">
                  <span>DISCIPLINES</span>
                  <span>ARCHIVE</span>
                  <span>CONTACT</span>
                </div>
                <span className="bg-[#FF2A85] text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-full border border-black">
                  START BRIEF
                </span>
              </div>

              {/* Dynamic Content based on Active Tab */}
              {activeMiniTab === 'editorial' && (
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 flex-1 items-center">
                  <div className="sm:col-span-7 bg-white p-5 rounded-2xl border-2 border-black shadow-[3px_3px_0px_#000] space-y-2">
                    <span className="text-[10px] font-mono font-bold text-[#FF2A85] uppercase">
                      HEADLINE MODULE
                    </span>
                    <h4 className="text-xl sm:text-2xl font-black font-display uppercase tracking-tight text-black">
                      CONTEMPORARY DIGITAL ATELIER
                    </h4>
                    <p className="text-xs text-black/70 font-editorial-serif italic">
                      «طراحی ادیتوریال فراتر از چیدمان ساده کلمات؛ همنشینی تایپوگرافی سنگین با هنر معاصر»
                    </p>
                  </div>

                  <div className="sm:col-span-5 bg-[#0D0D0D] text-white p-5 rounded-2xl border-2 border-black shadow-[3px_3px_0px_#FF2A85] flex flex-col justify-between">
                    <span className="text-[10px] font-mono font-bold text-[#E8FF54] uppercase">
                      PALETTE MODULE
                    </span>
                    <div className="flex items-center gap-2 my-2">
                      <span className="w-6 h-6 rounded-full bg-[#FF2A85] border border-white" />
                      <span className="w-6 h-6 rounded-full bg-[#E8FF54] border border-white" />
                      <span className="w-6 h-6 rounded-full bg-[#FF4D00] border border-white" />
                      <span className="w-6 h-6 rounded-full bg-white border border-white" />
                    </div>
                    <span className="text-[10px] font-mono text-white/60">
                      FOUR ACCENT HEX CODES
                    </span>
                  </div>
                </div>
              )}

              {activeMiniTab === 'magazine' && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 flex-1 items-center">
                  <div className="bg-[#FF2A85] text-white p-4 rounded-xl border-2 border-black shadow-[3px_3px_0px_#000]">
                    <span className="text-[10px] font-mono font-bold">ARTICLE 01</span>
                    <h5 className="font-black text-base mt-1">THE CULTURAL SHIFT</h5>
                  </div>
                  <div className="bg-white text-black p-4 rounded-xl border-2 border-black shadow-[3px_3px_0px_#000]">
                    <span className="text-[10px] font-mono font-bold">ARTICLE 02</span>
                    <h5 className="font-black text-base mt-1">TYPOGRAPHIC TENSION</h5>
                  </div>
                  <div className="bg-[#0D0D0D] text-[#E8FF54] p-4 rounded-xl border-2 border-black shadow-[3px_3px_0px_#000]">
                    <span className="text-[10px] font-mono font-bold">ARTICLE 03</span>
                    <h5 className="font-black text-base mt-1">WIDESCREEN RATIOS</h5>
                  </div>
                </div>
              )}

              {activeMiniTab === 'minimal' && (
                <div className="bg-white p-6 rounded-2xl border-2 border-black shadow-[3px_3px_0px_#000] flex-1 flex flex-col justify-center items-center text-center">
                  <h4 className="text-3xl font-black font-display tracking-tight text-black mb-2">
                    MONO ARCHIVE SPEC
                  </h4>
                  <p className="text-xs font-mono text-black/60 max-w-md">
                    STRUCTURED BLACK & WHITE WIREFRAME WITH EXACT COORDINATES AND FLUID RESIZING
                  </p>
                </div>
              )}

              {/* Bottom Feature Badges */}
              <div className="pt-4 mt-4 border-t-2 border-black/30 flex flex-wrap items-center justify-between text-xs font-mono font-bold text-black/80 gap-2">
                <span className="flex items-center gap-1.5">
                  <Move className="w-3.5 h-3.5" />
                  <span>{language === 'fa' ? 'درگ آزادانه المان‌ها' : 'Freeform Element Dragging'}</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>{language === 'fa' ? 'سایزبندی ۸ جهته با دستگیره‌ها' : '8-Direction Resizing'}</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Palette className="w-3.5 h-3.5" />
                  <span>{language === 'fa' ? 'تنظیم پالت رنگ و قلم' : 'Custom Palette & Typography'}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. GRAPHIC SECTION DIVIDER 04 (Monochrome Newspaper Cutout Bar)           */}
      {/* ========================================================================= */}
      <div className="w-full bg-white py-3.5 border-b-[3px] border-black text-black px-4 sm:px-8 flex items-center justify-between font-mono font-black text-xs uppercase tracking-widest select-none">
        <div className="flex items-center gap-3">
          <span className="w-3 h-3 rounded-full bg-[#FF4D00]" />
          <span>SECTION 05 // MANIFESTO: TRADITIONAL BRIEFS ARE DEAD</span>
        </div>
        <div className="hidden sm:flex items-center gap-3 text-black/70">
          <span>THE ATELIER CONTRAST</span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 10. MANIFESTO: OLD VS NEW (Pure Paper White #FFFFFF Background)            */}
      {/* ========================================================================= */}
      <section className="bg-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b-[3px] border-black text-black">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
            <div className="inline-flex items-center gap-2 bg-[#FAF7EF] text-black text-xs font-black uppercase px-3 py-1 rounded-full border-2 border-black shadow-[2px_2px_0px_#000]">
              <Sparkles className="w-3.5 h-3.5 text-[#FF2A85]" />
              <span>{language === 'fa' ? 'چرا بریف‌های سنتی شکست می‌خورند؟' : 'THE PARADIGM SHIFT'}</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black font-display uppercase tracking-tight text-black">
              {language === 'fa' ? 'بریف سنتی مُرد؛ زنده باد دیالوگ بصری' : 'TRADITIONAL BRIEFS ARE DEAD'}
            </h2>
            <p className="text-base sm:text-lg text-black/70 font-sans leading-relaxed">
              {language === 'fa'
                ? 'فرم‌های اداری خشک و فایل‌های ورد ۵۰ صفحه‌ای هیچ خلاقیتی ایجاد نمی‌کنند. ما رابطه بین کارفرما و استودیو را به یک همکاری الهام‌بخش بدل کردیم.'
                : 'Corporate questionnaires produce uninspired work. We replaced them with an art-directed dialogue platform.'}
            </p>
          </div>

          {/* Side-by-Side Zine Contrast Spread */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {/* The Old Corporate Way (Muted Gray, Strikethrough) */}
            <div className="rounded-[30px] border-3 border-black bg-[#F5F2EB] p-7 sm:p-9 shadow-[6px_6px_0px_#000] space-y-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 border-b-2 border-black/20">
                  <span className="bg-stone-300 text-stone-700 text-xs font-black uppercase px-3 py-1 rounded-full border border-stone-400">
                    {language === 'fa' ? 'روش منسوخ و اداری' : 'THE OBSOLETE WAY'}
                  </span>
                  <XCircle className="w-5 h-5 text-stone-500" />
                </div>

                <h3 className="text-2xl font-black font-display tracking-tight text-stone-800 my-4 line-through">
                  {language === 'fa' ? 'فایل‌های PDF و پرسشنامه‌های خشک' : 'Bureaucratic Word & PDF Forms'}
                </h3>

                <ul className="space-y-3.5 text-sm font-sans text-stone-600">
                  <li className="flex items-start gap-2.5">
                    <span className="text-stone-400 font-mono font-bold">✕</span>
                    <span>{language === 'fa' ? '۵۰ سوال کلیشه‌ای که هیچ‌کس حوصله خواندن و پاسخ دقیق ندارد' : 'Endless generic questions that induce client fatigue'}</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-stone-400 font-mono font-bold">✕</span>
                    <span>{language === 'fa' ? 'عدم امکان توصیف بصری و وابستگی صرف به لغات انتزاعی' : 'Abstract verbal descriptions with zero visual communication'}</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-stone-400 font-mono font-bold">✕</span>
                    <span>{language === 'fa' ? 'هفته‌ها جلسات مکرر برای درک خواسته واقعی کارفرما' : 'Weeks of misaligned meetings to decipher expectations'}</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-stone-400 font-mono font-bold">✕</span>
                    <span>{language === 'fa' ? 'بایگانی شدن بریف و فراموشی آن در طول روند طراحی' : 'Brief gets lost in email attachments and never referenced'}</span>
                  </li>
                </ul>
              </div>

              <div className="pt-4 border-t border-black/10 text-xs font-mono text-stone-500">
                RESULT: MISALIGNMENT & REVISION FATIGUE
              </div>
            </div>

            {/* The Atelier 24 Way (Deep Black + Pink & Yellow Stickers) */}
            <div className="rounded-[30px] border-3 border-black bg-[#0D0D0D] text-white p-7 sm:p-9 shadow-[8px_8px_0px_#FF2A85] space-y-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 border-b-2 border-white/20">
                  <span className="bg-[#E8FF54] text-black text-xs font-black uppercase px-3 py-1 rounded-full border border-black shadow-[2px_2px_0px_#000]">
                    {language === 'fa' ? 'استاندارد نوین آتلیه' : 'THE ATELIER STANDARD'}
                  </span>
                  <CheckCircle2 className="w-5 h-5 text-[#E8FF54]" />
                </div>

                <h3 className="text-2xl font-black font-display tracking-tight text-white my-4">
                  {language === 'fa' ? 'بوم بصری تعاملی + دیالوگ هوشمند' : 'Interactive Canvas + Strategic Brief'}
                </h3>

                <ul className="space-y-3.5 text-sm font-sans text-white/90">
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#E8FF54] font-mono font-bold">✓</span>
                    <span>{language === 'fa' ? 'سوالات عمیق و انطباقی متناسب با هر نوع پروژه (فقط موارد ضروری)' : 'Adaptive questionnaire tailored only to the chosen discipline'}</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#FF2A85] font-mono font-bold">✓</span>
                    <span>{language === 'fa' ? 'بوم بصری افقی برای چیدمان آزادانه ساختار وب‌سایت در چند دقیقه' : 'Dedicated widescreen visual canvas for website projects'}</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#E8FF54] font-mono font-bold">✓</span>
                    <span>{language === 'fa' ? 'تولید فوری لینک اختصاصی شیک برای ارسال به کارفرما و تیم' : 'Instant permalink dossier ready for client and team sharing'}</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#FF2A85] font-mono font-bold">✓</span>
                    <span>{language === 'fa' ? 'انطباق ۱۰۰٪ با چشم‌انداز هنری و هویت مدرن پروژه' : 'Complete creative alignment before the first Figma frame is drawn'}</span>
                  </li>
                </ul>
              </div>

              <div className="pt-4 border-t border-white/20 text-xs font-mono text-[#E8FF54] font-bold">
                RESULT: SHARP ART DIRECTION & PRECISE EXECUTION
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 11. GRAND FINAL CTA BANNER (Stark Black #0D0D0D Background)               */}
      {/* ========================================================================= */}
      <section className="bg-[#0D0D0D] py-20 px-4 sm:px-6 lg:px-8 text-white text-center relative overflow-hidden">
        {/* Background glow circle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#FF2A85]/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 bg-[#E8FF54] text-black text-xs font-black uppercase px-3 py-1 rounded-full border-2 border-black shadow-[3px_3px_0px_#FF2A85]">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span>START CRAFTING NOW</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-black font-display uppercase tracking-tight text-white leading-tight">
            {language === 'fa'
              ? 'آماده‌ای پروژه بعدی‌ات را خلق کنی؟'
              : 'READY TO SHAPE YOUR NEXT ARTIFACT?'}
          </h2>

          <p className="text-base sm:text-lg text-white/70 max-w-xl mx-auto font-sans leading-relaxed">
            {language === 'fa'
              ? 'یکی از مسیرهای هفت‌گانه دیزاین را برگزین، بوم بصری را بچین و بریف خود را با طراحان به اشتراک بگذار.'
              : 'Pick your discipline, shape the visual architecture, and share your living dossier.'}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <a
              href="#service-tracks"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#FF2A85] hover:bg-[#e02072] text-white font-black text-sm uppercase tracking-wider border-2 border-white shadow-[4px_4px_0px_#E8FF54] neo-button-hover cursor-pointer"
            >
              <span>{language === 'fa' ? 'انتخاب مسیر پروژه' : 'Select Service Track'}</span>
              <ArrowIcon className="w-4 h-4 stroke-[3]" />
            </a>

            <button
              onClick={onOpenDirectBuilder}
              className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-white text-black hover:bg-[#FAF7EF] font-black text-sm uppercase tracking-wider border-2 border-black shadow-[4px_4px_0px_#000] neo-button-hover cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#FF2A85]" />
              <span>{t('nav_builder')}</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
