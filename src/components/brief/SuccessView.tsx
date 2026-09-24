import React, { useEffect, useState } from 'react';
import { useI18n } from '../../locales/i18n';
import { BriefSubmission } from '../../types/brief';
import confetti from 'canvas-confetti';
import { Check, Copy, ExternalLink, Sparkles, RefreshCw } from 'lucide-react';

interface SuccessViewProps {
  submission: BriefSubmission;
  onViewBrief: (slug: string) => void;
  onStartNew: () => void;
}

export const SuccessView: React.FC<SuccessViewProps> = ({
  submission,
  onViewBrief,
  onStartNew,
}) => {
  const { t, language } = useI18n();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Elegant warm confetti explosion
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#C85A32', '#171717', '#EFECE5', '#77736D'],
      });
    } catch {
      // ignore
    }
  }, []);

  const fullUrl = `${window.location.origin}/brief/${submission.slug}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-4 sm:px-6 text-center">
      {/* Decorative Star Icon */}
      <div className="w-16 h-16 rounded-full bg-[#EFECE5] text-[#C85A32] mx-auto flex items-center justify-center mb-6">
        <Sparkles className="w-8 h-8" />
      </div>

      <div className="text-xs font-mono text-[#77736D] tracking-widest uppercase mb-2">
        {t('success_eyebrow')}
      </div>

      <h2 className="text-4xl sm:text-5xl font-editorial-serif font-medium text-[#171717] mb-4">
        {t('success_title')}
      </h2>

      <p className="text-base text-[#77736D] leading-relaxed mb-8 max-w-lg mx-auto">
        {t('success_message')}
      </p>

      {/* Personalized URL Box */}
      <div className="p-5 rounded-2xl bg-white border border-[#DCD8D0] shadow-sm mb-8 text-left">
        <span className="block text-xs text-[#77736D] mb-2 font-medium">
          {t('success_url_label')}
        </span>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          <div className="flex-1 bg-[#F7F5F0] border border-[#DCD8D0] rounded-xl px-3.5 py-2.5 font-mono text-xs text-[#171717] truncate select-all">
            {fullUrl}
          </div>
          <button
            onClick={handleCopy}
            className="px-4 py-2.5 rounded-xl border border-[#DCD8D0] bg-[#EFECE5] hover:bg-[#E2DDD3] text-xs font-medium text-[#171717] transition-colors flex items-center justify-center gap-1.5 shrink-0"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? t('success_copied') : t('success_copy_url')}</span>
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <button
          onClick={() => onViewBrief(submission.slug)}
          className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-[#171717] text-white hover:bg-black font-medium text-xs tracking-wide flex items-center justify-center gap-2 transition-all"
        >
          <span>{t('success_view_brief')}</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={onStartNew}
          className="w-full sm:w-auto px-6 py-3.5 rounded-full border border-[#DCD8D0] bg-transparent text-[#77736D] hover:text-[#171717] hover:border-[#171717] font-medium text-xs tracking-wide flex items-center justify-center gap-2 transition-all"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>{t('success_new_brief')}</span>
        </button>
      </div>
    </div>
  );
};
