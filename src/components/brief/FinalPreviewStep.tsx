import React from 'react';
import { useI18n } from '../../locales/i18n';
import { ServiceType, VisualBriefData, AttachedFile } from '../../types/brief';
import { SERVICES_LIST } from '../../data/services';
import { SERVICE_QUESTIONS } from '../../data/questions';
import { VisualBriefCanvasViewer } from '../builder/VisualBriefCanvasViewer';
import { Edit3, CheckCircle2, ArrowRight, ArrowLeft, ExternalLink, Sparkles, Star } from 'lucide-react';

interface FinalPreviewStepProps {
  serviceType: ServiceType;
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  projectTitle: string;
  answers: Record<string, any>;
  additionalNotes?: string;
  referenceUrls?: string[];
  attachedFiles?: AttachedFile[];
  visualBrief?: VisualBriefData;
  onEditSection: (target: 'client' | 'questions' | 'visual' | 'notes') => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

export const FinalPreviewStep: React.FC<FinalPreviewStepProps> = ({
  serviceType,
  clientName,
  clientEmail,
  clientPhone,
  projectTitle,
  answers,
  additionalNotes,
  referenceUrls = [],
  attachedFiles = [],
  visualBrief,
  onEditSection,
  onSubmit,
  isSubmitting,
}) => {
  const { t, language, direction } = useI18n();
  const ArrowIcon = direction === 'rtl' ? ArrowLeft : ArrowRight;

  const currentService = SERVICES_LIST.find((s) => s.id === serviceType) || SERVICES_LIST[0];
  const serviceTitle = language === 'fa' ? currentService.titleFa : currentService.titleEn;
  const stepDefs = SERVICE_QUESTIONS[serviceType] || [];

  return (
    <div className="space-y-8">
      {/* Title Header with Sticker */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b-3 border-black gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="bg-[#FF2A85] text-white text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full border border-black shadow-[1.5px_1.5px_0px_#000]">
              FINAL DOSSIER
            </span>
            <span className="text-xs font-mono font-bold text-black/60 uppercase">
              SPEC. 2026 // ISSUE 24
            </span>
          </div>
          <h3 className="text-3xl sm:text-4xl font-black font-display text-black uppercase tracking-tight">
            {t('preview_title')}
          </h3>
          <p className="text-sm text-black/70 font-sans mt-0.5">{t('preview_subtitle')}</p>
        </div>

        <div className="w-12 h-12 rounded-2xl bg-[#E8FF54] border-2 border-black flex items-center justify-center font-black text-2xl shadow-[3px_3px_0px_#000] -rotate-3">
          ✦
        </div>
      </div>

      {/* 1. Client & Project Details Dossier */}
      <div className="p-6 sm:p-8 rounded-[28px] bg-white border-3 border-black shadow-[6px_6px_0px_#000] space-y-4">
        <div className="flex items-center justify-between pb-4 border-b-2 border-black">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#FF2A85] border border-black" />
            <h4 className="text-lg font-black font-display uppercase tracking-tight text-black">
              {t('preview_section_client')}
            </h4>
          </div>
          <button
            onClick={() => onEditSection('client')}
            className="inline-flex items-center gap-1.5 text-xs font-black uppercase text-black bg-[#E8FF54] hover:bg-[#d6f030] px-3.5 py-1.5 rounded-full border-2 border-black shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>{t('preview_edit_btn')}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-3 bg-[#FAF7EF] rounded-xl border-2 border-black shadow-[2px_2px_0px_#000]">
            <span className="block text-black/60 font-mono font-bold uppercase mb-1">{t('field_project_title')}</span>
            <span className="font-black text-sm text-black">{projectTitle || '—'}</span>
          </div>
          <div className="p-3 bg-[#FAF7EF] rounded-xl border-2 border-black shadow-[2px_2px_0px_#000]">
            <span className="block text-black/60 font-mono font-bold uppercase mb-1">{t('field_client_name')}</span>
            <span className="font-black text-sm text-black">{clientName || '—'}</span>
          </div>
          <div className="p-3 bg-[#FAF7EF] rounded-xl border-2 border-black shadow-[2px_2px_0px_#000]">
            <span className="block text-black/60 font-mono font-bold uppercase mb-1">{t('field_client_email')}</span>
            <span className="font-bold text-black font-mono">{clientEmail || '—'}</span>
          </div>
          <div className="p-3 bg-[#FAF7EF] rounded-xl border-2 border-black shadow-[2px_2px_0px_#000]">
            <span className="block text-black/60 font-mono font-bold uppercase mb-1">{t('field_client_phone')}</span>
            <span className="font-bold text-black font-mono">{clientPhone || '—'}</span>
          </div>
        </div>
      </div>

      {/* 2. Service Track Banner */}
      <div className="p-6 rounded-[28px] bg-black text-white border-3 border-black shadow-[6px_6px_0px_#FF2A85] flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img
            src={currentService.image}
            alt={serviceTitle}
            className="w-16 h-16 rounded-xl object-cover border-2 border-white"
          />
          <div>
            <span className="text-xs font-mono text-[#E8FF54] uppercase block mb-0.5">{t('preview_section_type')}</span>
            <span className="text-2xl font-black font-display uppercase tracking-tight text-white">
              {serviceTitle}
            </span>
          </div>
        </div>
        <span className="text-xs font-mono font-black uppercase text-black bg-[#E8FF54] px-3.5 py-1.5 rounded-full border border-black shadow-[2px_2px_0px_#FFF]">
          {currentService.estimatedTime}
        </span>
      </div>

      {/* 3. Answers & Requirements */}
      <div className="p-6 sm:p-8 rounded-[28px] bg-white border-3 border-black shadow-[6px_6px_0px_#000] space-y-5">
        <div className="flex items-center justify-between pb-4 border-b-2 border-black">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#E8FF54] border border-black" />
            <h4 className="text-lg font-black font-display uppercase tracking-tight text-black">
              {t('preview_section_questions')}
            </h4>
          </div>
          <button
            onClick={() => onEditSection('questions')}
            className="inline-flex items-center gap-1.5 text-xs font-black uppercase text-black bg-[#E8FF54] hover:bg-[#d6f030] px-3.5 py-1.5 rounded-full border-2 border-black shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>{t('preview_edit_btn')}</span>
          </button>
        </div>

        <div className="space-y-4">
          {stepDefs.map((step) => (
            <div key={step.id} className="space-y-3 pb-4 border-b-2 border-black/10 last:border-b-0">
              {step.questions.map((q) => {
                const ans = answers[q.id];
                if (!ans) return null;

                let renderedAnswer = '';
                if (Array.isArray(ans)) {
                  renderedAnswer = ans.map((item) => {
                    const opt = q.options?.find((o) => o.id === item);
                    return opt ? t(opt.labelKey) : item;
                  }).join(' · ');
                } else if (q.options) {
                  const opt = q.options.find((o) => o.id === ans);
                  renderedAnswer = opt ? t(opt.labelKey) : ans;
                } else {
                  renderedAnswer = String(ans);
                }

                return (
                  <div key={q.id} className="text-xs space-y-1.5">
                    <span className="font-bold text-black/70 block">{t(q.questionKey)}</span>
                    <span className="text-black font-bold bg-[#FAF7EF] px-4 py-2.5 rounded-xl border-2 border-black inline-block max-w-full shadow-[2px_2px_0px_#000]">
                      {renderedAnswer}
                    </span>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* 4. Visual Brief Canvas Preview (Website Service Only) */}
      {serviceType === 'website' && visualBrief && visualBrief.elements && visualBrief.elements.length > 0 && (
        <div className="p-6 sm:p-8 rounded-[28px] bg-white border-3 border-black shadow-[6px_6px_0px_#000] space-y-5">
          <div className="flex items-center justify-between pb-4 border-b-2 border-black">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#FF2A85] border border-black" />
              <h4 className="text-lg font-black font-display uppercase tracking-tight text-black">
                {t('preview_section_visual')}
              </h4>
            </div>
            <button
              onClick={() => onEditSection('visual')}
              className="inline-flex items-center gap-1.5 text-xs font-black uppercase text-black bg-[#E8FF54] hover:bg-[#d6f030] px-3.5 py-1.5 rounded-full border-2 border-black shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>{t('preview_edit_btn')}</span>
            </button>
          </div>

          <div className="w-full">
            <VisualBriefCanvasViewer briefData={visualBrief} className="w-full" />
          </div>
        </div>
      )}

      {/* 5. Additional Notes & Links */}
      {(additionalNotes || referenceUrls.length > 0 || attachedFiles.length > 0) && (
        <div className="p-6 sm:p-8 rounded-[28px] bg-white border-3 border-black shadow-[6px_6px_0px_#000] space-y-4">
          <div className="flex items-center justify-between pb-4 border-b-2 border-black">
            <h4 className="text-lg font-black font-display uppercase tracking-tight text-black">
              {t('preview_section_notes')}
            </h4>
            <button
              onClick={() => onEditSection('notes')}
              className="inline-flex items-center gap-1.5 text-xs font-black uppercase text-black bg-[#E8FF54] hover:bg-[#d6f030] px-3.5 py-1.5 rounded-full border-2 border-black shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>{t('preview_edit_btn')}</span>
            </button>
          </div>

          {additionalNotes && (
            <p className="text-sm font-medium text-black leading-relaxed whitespace-pre-line bg-[#FAF7EF] p-4 rounded-xl border-2 border-black shadow-[2px_2px_0px_#000]">
              {additionalNotes}
            </p>
          )}

          {referenceUrls.length > 0 && (
            <div className="space-y-1.5 pt-2">
              <span className="text-xs font-bold text-black/70 block uppercase font-mono">{t('references_label')}:</span>
              <div className="flex flex-wrap gap-2">
                {referenceUrls.map((url, i) => (
                  <a
                    key={i}
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#FF2A85] bg-[#FAF7EF] border-2 border-black px-3 py-1 rounded-full shadow-[2px_2px_0px_#000] hover:bg-white"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>{url}</span>
                  </a>
                ))}
              </div>
            </div>
          )}

          {attachedFiles.length > 0 && (
            <div className="pt-2">
              <span className="text-xs font-bold text-black/70 block uppercase font-mono mb-2">
                {language === 'fa' ? 'فایل‌های پیوست:' : 'Attached Files:'}
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {attachedFiles.map((file) => (
                  <div
                    key={file.id}
                    className="p-2.5 rounded-xl border-2 border-black bg-[#FAF7EF] text-xs font-bold truncate shadow-[2px_2px_0px_#000]"
                  >
                    {file.name}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Confirmation & Submission Callout */}
      <div className="p-8 sm:p-10 rounded-[32px] bg-[#E8FF54] text-black border-3 border-black shadow-[8px_8px_0px_#000] text-center space-y-5">
        <div className="max-w-xl mx-auto space-y-2">
          <div className="w-12 h-12 rounded-full bg-[#FF2A85] text-white border-2 border-black mx-auto flex items-center justify-center font-black text-xl shadow-[2px_2px_0px_#000]">
            ✦
          </div>
          <h4 className="text-2xl sm:text-3xl font-black font-display uppercase tracking-tight text-black">
            {language === 'fa' ? 'همه چیز برای خلق اثر آماده است؟' : 'Ready to Bring This Vision to Life?'}
          </h4>
          <p className="text-xs sm:text-sm text-black/80 font-sans leading-relaxed">
            {language === 'fa'
              ? 'پس از تأیید، بریف شما با کد اختصاصی ذخیره شده و یک لینک عمومی پرمیوم دریافت می‌کنید.'
              : 'Upon confirmation, your brief will be saved with a unique shareable slug.'}
          </p>
        </div>

        <button
          onClick={onSubmit}
          disabled={isSubmitting}
          className="px-10 py-4 rounded-full bg-[#FF2A85] hover:bg-[#e02072] text-white border-3 border-black shadow-[6px_6px_0px_#000] neo-button-hover font-black uppercase text-sm tracking-wider inline-flex items-center gap-2.5 cursor-pointer disabled:opacity-50"
        >
          {isSubmitting ? (
            <span>{language === 'fa' ? 'در حال ثبت...' : 'Publishing...'}</span>
          ) : (
            <>
              <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
              <span>{t('preview_confirm_btn')}</span>
              <ArrowIcon className="w-4 h-4 stroke-[3]" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};
