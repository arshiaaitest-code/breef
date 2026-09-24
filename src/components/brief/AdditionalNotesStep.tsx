import React, { useRef } from 'react';
import { useI18n } from '../../locales/i18n';
import { AttachedFile } from '../../types/brief';
import { Plus, Trash2, Link as LinkIcon, UploadCloud, FileText, Star } from 'lucide-react';

interface AdditionalNotesStepProps {
  notes: string;
  onNotesChange: (notes: string) => void;
  referenceUrls: string[];
  onReferenceUrlsChange: (urls: string[]) => void;
  attachedFiles: AttachedFile[];
  onAttachedFilesChange: (files: AttachedFile[]) => void;
}

export const AdditionalNotesStep: React.FC<AdditionalNotesStepProps> = ({
  notes,
  onNotesChange,
  referenceUrls,
  onReferenceUrlsChange,
  attachedFiles,
  onAttachedFilesChange,
}) => {
  const { t, language } = useI18n();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAddUrl = () => {
    onReferenceUrlsChange([...referenceUrls, '']);
  };

  const handleUpdateUrl = (index: number, val: string) => {
    const updated = [...referenceUrls];
    updated[index] = val;
    onReferenceUrlsChange(updated);
  };

  const handleRemoveUrl = (index: number) => {
    onReferenceUrlsChange(referenceUrls.filter((_, i) => i !== index));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newFiles: AttachedFile[] = [];
    Array.from(files).forEach((file) => {
      const url = URL.createObjectURL(file);
      newFiles.push({
        id: `file-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
        name: file.name,
        size: file.size,
        type: file.type,
        url: url,
        previewUrl: file.type.startsWith('image/') ? url : undefined,
      });
    });

    onAttachedFilesChange([...attachedFiles, ...newFiles]);
  };

  const handleRemoveFile = (id: string) => {
    onAttachedFilesChange(attachedFiles.filter((f) => f.id !== id));
  };

  return (
    <div className="space-y-8">
      {/* 1. Main Conversational Notes */}
      <div className="p-6 sm:p-8 rounded-[28px] bg-white border-3 border-black shadow-[6px_6px_0px_#000] space-y-4">
        <div className="border-b-2 border-black pb-4 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-[#FF2A85] text-white text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full border border-black shadow-[1.5px_1.5px_0px_#000]">
                UNFILTERED THOUGHTS
              </span>
            </div>
            <h3 className="text-2xl font-black font-display text-black uppercase tracking-tight">
              {t('notes_title')}
            </h3>
            <p className="text-sm text-black/70 font-sans mt-0.5">{t('notes_subtitle')}</p>
          </div>
          <div className="hidden sm:block text-2xl font-black text-[#E8FF54] bg-black px-3 py-1 rounded-xl border-2 border-black shadow-[2px_2px_0px_#FF2A85] -rotate-3">
            ✦
          </div>
        </div>

        <textarea
          rows={5}
          value={notes}
          onChange={(e) => onNotesChange(e.target.value)}
          placeholder={t('notes_placeholder')}
          className="w-full p-4 rounded-2xl border-2 border-black bg-[#FAF7EF] text-black text-sm leading-relaxed focus:outline-none focus:bg-white transition-all shadow-[2px_2px_0px_#000] placeholder:text-black/40"
        />
      </div>

      {/* 2. Reference URLs */}
      <div className="p-6 sm:p-8 rounded-[28px] bg-white border-3 border-black shadow-[6px_6px_0px_#000] space-y-5">
        <div className="flex items-center justify-between border-b-2 border-black pb-4">
          <div>
            <h4 className="text-xl font-black font-display text-black uppercase tracking-tight">
              {t('references_label')}
            </h4>
            <p className="text-xs text-black/70 font-sans mt-0.5">
              {language === 'fa'
                ? 'نمونه‌هایی که دوست داری طراح قبل از شروع کار حتماً بررسی کند.'
                : 'Inspirations or benchmark references you want the studio to explore.'}
            </p>
          </div>
          <button
            onClick={handleAddUrl}
            className="px-3.5 py-1.5 rounded-full border-2 border-black bg-[#E8FF54] hover:bg-[#d6f030] text-xs font-black uppercase text-black flex items-center gap-1.5 shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 stroke-[3]" />
            <span>{t('references_add')}</span>
          </button>
        </div>

        <div className="space-y-3">
          {referenceUrls.length === 0 ? (
            <p className="text-xs text-black/50 font-bold italic py-2">
              {language === 'fa' ? 'هنوز لینکی اضافه نشده است.' : 'No references added yet.'}
            </p>
          ) : (
            referenceUrls.map((url, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <div className="relative flex-1">
                  <LinkIcon className="w-4 h-4 text-black/60 absolute top-3 left-3 pointer-events-none" />
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => handleUpdateUrl(idx, e.target.value)}
                    placeholder={t('references_placeholder')}
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border-2 border-black bg-[#FAF7EF] text-xs font-mono text-black focus:outline-none focus:bg-white shadow-[2px_2px_0px_#000]"
                  />
                </div>
                <button
                  onClick={() => handleRemoveUrl(idx)}
                  className="p-2 text-black hover:text-white rounded-lg border-2 border-black hover:bg-[#FF2A85] shadow-[2px_2px_0px_#000] transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* 3. File Upload Simulation */}
      <div className="p-6 sm:p-8 rounded-[28px] bg-white border-3 border-black shadow-[6px_6px_0px_#000] space-y-4">
        <div className="border-b-2 border-black pb-4">
          <h4 className="text-xl font-black font-display text-black uppercase tracking-tight">
            {t('upload_label')}
          </h4>
          <p className="text-xs text-black/70 font-sans mt-0.5">{t('upload_hint')}</p>
        </div>

        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-3 border-dashed border-black hover:bg-[#E8FF54]/20 rounded-2xl p-8 text-center cursor-pointer bg-[#FAF7EF] transition-all flex flex-col items-center justify-center gap-2.5 group shadow-[3px_3px_0px_#000]"
        >
          <div className="w-12 h-12 rounded-full bg-[#FF2A85] text-white border-2 border-black flex items-center justify-center shadow-[2px_2px_0px_#000] group-hover:scale-110 transition-transform">
            <UploadCloud className="w-6 h-6" />
          </div>
          <p className="text-sm font-black uppercase tracking-wider text-black">{t('upload_drop_zone')}</p>
          <p className="text-xs text-black/60 font-sans">{t('upload_hint')}</p>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*,application/pdf"
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>

        {/* Uploaded File List */}
        {attachedFiles.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {attachedFiles.map((file) => (
              <div
                key={file.id}
                className="p-3 rounded-xl border-2 border-black bg-[#FAF7EF] flex items-center justify-between gap-3 shadow-[2px_2px_0px_#000]"
              >
                <div className="flex items-center gap-2.5 overflow-hidden">
                  {file.previewUrl ? (
                    <img
                      src={file.previewUrl}
                      alt={file.name}
                      className="w-10 h-10 object-cover rounded-lg border-2 border-black shrink-0"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-lg bg-[#E8FF54] border-2 border-black flex items-center justify-center shrink-0">
                      <FileText className="w-5 h-5 text-black" />
                    </div>
                  )}
                  <div className="overflow-hidden">
                    <p className="text-xs font-bold text-black truncate">{file.name}</p>
                    <p className="text-[10px] font-mono text-black/60">
                      {(file.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => handleRemoveFile(file.id)}
                  className="p-1.5 border-2 border-black bg-white hover:bg-[#FF2A85] hover:text-white rounded-lg shadow-[1.5px_1.5px_0px_#000]"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
