import React from 'react';
import { useI18n } from '../../locales/i18n';
import { BriefSubmission } from '../../types/brief';
import { SERVICES_LIST } from '../../data/services';
import { SERVICE_QUESTIONS } from '../../data/questions';
import { VisualBriefCanvasViewer } from '../builder/VisualBriefCanvasViewer';
import { ArrowLeft, ArrowRight, Share2, Copy, Printer, Check, ExternalLink } from 'lucide-react';

interface PublicBriefViewProps {
  brief: BriefSubmission;
  onBack: () => void;
}

export const PublicBriefView: React.FC<PublicBriefViewProps> = ({ brief, onBack }) => {
  const { t, language, direction } = useI18n();
  const [copied, setCopied] = React.useState(false);

  const ArrowIcon = direction === 'rtl' ? ArrowLeft : ArrowRight;
  const currentService = SERVICES_LIST.find((s) => s.id === brief.serviceType) || SERVICES_LIST[0];
  const serviceTitle = language === 'fa' ? currentService.titleFa : currentService.titleEn;
  const stepDefs = SERVICE_QUESTIONS[brief.serviceType] || [];

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'new':
        return t('admin_status_new');
      case 'reviewing':
        return t('admin_status_reviewing');
      case 'in_progress':
        return t('admin_status_in_progress');
      case 'completed':
        return t('admin_status_completed');
      default:
        return status;
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      {/* Top Utilities */}
      <div className="flex items-center justify-between pb-6 mb-8 border-b border-[#DCD8D0]">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-medium text-[#77736D] hover:text-[#171717] transition-colors"
        >
          <ArrowIcon className="w-3.5 h-3.5 rotate-180" />
          <span>{language === 'fa' ? 'بازگشت به استودیو' : 'Return to Studio'}</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={handleCopyLink}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#DCD8D0] bg-white text-xs font-medium text-[#171717] hover:bg-[#EFECE5]"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? t('success_copied') : t('admin_share_link')}</span>
          </button>
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#DCD8D0] bg-white text-xs font-medium text-[#171717] hover:bg-[#EFECE5]"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>{language === 'fa' ? 'چاپ / PDF' : 'Print'}</span>
          </button>
        </div>
      </div>

      {/* Editorial Header */}
      <div className="mb-12">
        <div className="flex items-center gap-2 text-xs font-mono text-[#77736D] uppercase tracking-wider mb-2">
          <span>BRIEF NO. #{brief.id.slice(-6)}</span>
          <span>·</span>
          <span>SLUG: {brief.slug}</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-editorial-serif font-normal text-[#171717] mb-4">
          {brief.projectTitle}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-xs text-[#77736D]">
          <span>
            {language === 'fa' ? 'همکار / مشتری:' : 'Collaborator:'}{' '}
            <strong className="text-[#171717]">{brief.clientName}</strong>
          </span>
          <span>·</span>
          <span>{brief.clientEmail}</span>
          {brief.clientPhone && (
            <>
              <span>·</span>
              <span>{brief.clientPhone}</span>
            </>
          )}
          <span>·</span>
          <span className="px-2.5 py-0.5 rounded-full bg-[#EFECE5] text-[#171717] font-medium font-editorial-sans">
            {getStatusLabel(brief.status)}
          </span>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Requirements & Answers */}
        <div className="lg:col-span-7 space-y-8">
          {/* Service Banner */}
          <div className="p-6 rounded-2xl bg-white border border-[#DCD8D0] flex items-center justify-between">
            <div>
              <span className="text-xs text-[#77736D] block mb-1">
                {language === 'fa' ? 'نوع خدمات درخواستی' : 'Selected Track'}
              </span>
              <span className="text-xl font-editorial-serif font-medium text-[#171717]">
                {serviceTitle}
              </span>
            </div>
            <img
              src={currentService.image}
              alt={serviceTitle}
              className="w-16 h-16 rounded-xl object-cover border border-[#DCD8D0]"
            />
          </div>

          {/* Answers Breakdown */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#DCD8D0] space-y-6">
            <h3 className="text-xl font-editorial-serif font-medium text-[#171717] pb-3 border-b border-[#DCD8D0]">
              {language === 'fa' ? 'پاسخ‌ها و نیازمندی‌ها' : 'Brief Answers & Specifications'}
            </h3>

            <div className="space-y-6">
              {stepDefs.map((step) => (
                <div key={step.id} className="space-y-4">
                  {step.questions.map((q) => {
                    const ans = brief.answers[q.id];
                    if (!ans) return null;

                    let rendered = '';
                    if (Array.isArray(ans)) {
                      rendered = ans
                        .map((item) => {
                          const opt = q.options?.find((o) => o.id === item);
                          return opt ? t(opt.labelKey) : item;
                        })
                        .join(' · ');
                    } else if (q.options) {
                      const opt = q.options.find((o) => o.id === ans);
                      rendered = opt ? t(opt.labelKey) : ans;
                    } else {
                      rendered = String(ans);
                    }

                    return (
                      <div key={q.id} className="text-xs border-b border-[#DCD8D0]/40 pb-4 last:border-b-0">
                        <span className="text-[#77736D] block mb-1.5">{t(q.questionKey)}</span>
                        <div className="text-sm text-[#171717] font-medium leading-relaxed bg-[#F7F5F0] p-3 rounded-xl">
                          {rendered}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* Notes & References */}
          {(brief.additionalNotes || (brief.referenceUrls && brief.referenceUrls.length > 0)) && (
            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#DCD8D0] space-y-4">
              <h3 className="text-xl font-editorial-serif font-medium text-[#171717] pb-3 border-b border-[#DCD8D0]">
                {language === 'fa' ? 'یادداشت‌های تکمیلی' : 'Additional Insights'}
              </h3>

              {brief.additionalNotes && (
                <p className="text-sm text-[#171717] leading-relaxed whitespace-pre-line bg-[#F7F5F0] p-4 rounded-xl">
                  {brief.additionalNotes}
                </p>
              )}

              {brief.referenceUrls && brief.referenceUrls.length > 0 && (
                <div className="space-y-2 pt-2">
                  <span className="text-xs text-[#77736D] block">{t('references_label')}</span>
                  {brief.referenceUrls.map((url, i) => (
                    <a
                      key={i}
                      href={url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-[#C85A32] hover:underline mr-4"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>{url}</span>
                    </a>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Column: Visual Brief Canvas (Website Only) & Assets */}
        <div className="lg:col-span-5 space-y-8">
          {brief.serviceType === 'website' && brief.visualBrief && brief.visualBrief.elements && brief.visualBrief.elements.length > 0 && (
            <div className="p-6 rounded-2xl bg-white border border-[#DCD8D0] space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#DCD8D0]">
                <h4 className="text-lg font-editorial-serif font-medium text-[#171717]">
                  {t('preview_section_visual')}
                </h4>
                <span className="text-[11px] font-mono text-[#77736D]">
                  {brief.visualBrief.templateName || 'Website Studio Artboard'}
                </span>
              </div>

              {/* Render Canvas Elements with responsive scaling */}
              <div className="w-full">
                <VisualBriefCanvasViewer briefData={brief.visualBrief} className="w-full" />
              </div>
            </div>
          )}

          {/* Designer Notes Section if available */}
          {brief.designerNotes && (
            <div className="p-6 rounded-2xl bg-[#EFECE5] border border-[#DCD8D0] space-y-2">
              <span className="text-xs font-mono text-[#77736D] block">
                ✦ {t('admin_internal_notes')}
              </span>
              <p className="text-xs text-[#171717] leading-relaxed italic">
                {brief.designerNotes}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
