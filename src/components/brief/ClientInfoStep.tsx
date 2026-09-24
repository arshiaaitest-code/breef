import React from 'react';
import { useI18n } from '../../locales/i18n';
import { Sparkles, User, Mail, Phone, Bookmark, Star } from 'lucide-react';

interface ClientInfoStepProps {
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  projectTitle: string;
  onChange: (fields: {
    clientName?: string;
    clientEmail?: string;
    clientPhone?: string;
    projectTitle?: string;
  }) => void;
  errors: Record<string, string>;
}

export const ClientInfoStep: React.FC<ClientInfoStepProps> = ({
  clientName,
  clientEmail,
  clientPhone,
  projectTitle,
  onChange,
  errors,
}) => {
  const { t, language } = useI18n();

  return (
    <div className="p-6 sm:p-8 rounded-[28px] bg-white border-3 border-black shadow-[6px_6px_0px_#000] space-y-7">
      {/* Header Stamp */}
      <div className="border-b-2 border-black pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="bg-black text-[#E8FF54] text-xs font-mono font-bold uppercase px-2.5 py-0.5 rounded-full">
              STEP 01 // DOSSIER
            </span>
            <span className="text-xs font-mono font-bold text-black/60">
              SPEC. 2026
            </span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black font-display text-black uppercase tracking-tight">
            {t('client_info_step')}
          </h3>
          <p className="text-sm text-black/70 font-sans mt-0.5">{t('client_info_desc')}</p>
        </div>

        <div className="hidden sm:block">
          <div className="w-12 h-12 rounded-xl bg-[#E8FF54] border-2 border-black flex items-center justify-center font-black text-xl shadow-[2px_2px_0px_#000] -rotate-3">
            ✦
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Client Name */}
        <div>
          <label className="block text-xs font-bold text-black mb-2 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[#FF2A85]" />
              <span>{t('field_client_name')}</span>
            </span>
            <span className="bg-[#FF2A85] text-white text-[10px] font-bold px-2 py-0.5 rounded-full border border-black shadow-[1px_1px_0px_#000]">
              {t('required_tag')}
            </span>
          </label>
          <input
            type="text"
            value={clientName}
            onChange={(e) => onChange({ clientName: e.target.value })}
            placeholder={t('field_client_name_ph')}
            className={`w-full p-3.5 rounded-xl border-2 text-black text-sm bg-[#FAF7EF] focus:bg-white focus:outline-none transition-all shadow-[2px_2px_0px_#000] ${
              errors.clientName ? 'border-[#FF2A85] ring-2 ring-[#FF2A85]' : 'border-black focus:border-black'
            }`}
          />
          {errors.clientName && (
            <p className="mt-1.5 text-xs text-[#FF2A85] font-bold flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              <span>{errors.clientName}</span>
            </p>
          )}
        </div>

        {/* Project Title */}
        <div>
          <label className="block text-xs font-bold text-black mb-2 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Bookmark className="w-3.5 h-3.5 text-[#FF2A85]" />
              <span>{t('field_project_title')}</span>
            </span>
            <span className="bg-[#FF2A85] text-white text-[10px] font-bold px-2 py-0.5 rounded-full border border-black shadow-[1px_1px_0px_#000]">
              {t('required_tag')}
            </span>
          </label>
          <input
            type="text"
            value={projectTitle}
            onChange={(e) => onChange({ projectTitle: e.target.value })}
            placeholder={t('field_project_title_ph')}
            className={`w-full p-3.5 rounded-xl border-2 text-black text-sm bg-[#FAF7EF] focus:bg-white focus:outline-none transition-all shadow-[2px_2px_0px_#000] ${
              errors.projectTitle ? 'border-[#FF2A85] ring-2 ring-[#FF2A85]' : 'border-black focus:border-black'
            }`}
          />
          {errors.projectTitle && (
            <p className="mt-1.5 text-xs text-[#FF2A85] font-bold flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              <span>{errors.projectTitle}</span>
            </p>
          )}
        </div>

        {/* Client Email */}
        <div>
          <label className="block text-xs font-bold text-black mb-2 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-[#FF2A85]" />
              <span>{t('field_client_email')}</span>
            </span>
            <span className="bg-[#FF2A85] text-white text-[10px] font-bold px-2 py-0.5 rounded-full border border-black shadow-[1px_1px_0px_#000]">
              {t('required_tag')}
            </span>
          </label>
          <input
            type="email"
            value={clientEmail}
            onChange={(e) => onChange({ clientEmail: e.target.value })}
            placeholder={t('field_client_email_ph')}
            className={`w-full p-3.5 rounded-xl border-2 text-black text-sm bg-[#FAF7EF] focus:bg-white focus:outline-none transition-all shadow-[2px_2px_0px_#000] ${
              errors.clientEmail ? 'border-[#FF2A85] ring-2 ring-[#FF2A85]' : 'border-black focus:border-black'
            }`}
          />
          {errors.clientEmail && (
            <p className="mt-1.5 text-xs text-[#FF2A85] font-bold flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              <span>{errors.clientEmail}</span>
            </p>
          )}
        </div>

        {/* Client Phone / Messenger */}
        <div>
          <label className="block text-xs font-bold text-black mb-2 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-black/60" />
              <span>{t('field_client_phone')}</span>
            </span>
            <span className="bg-[#E8FF54] text-black text-[10px] font-bold px-2 py-0.5 rounded-full border border-black shadow-[1px_1px_0px_#000]">
              {t('optional_tag')}
            </span>
          </label>
          <input
            type="text"
            value={clientPhone}
            onChange={(e) => onChange({ clientPhone: e.target.value })}
            placeholder={t('field_client_phone_ph')}
            className="w-full p-3.5 rounded-xl border-2 border-black bg-[#FAF7EF] text-black text-sm focus:outline-none focus:bg-white transition-all shadow-[2px_2px_0px_#000]"
          />
        </div>
      </div>
    </div>
  );
};
