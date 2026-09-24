import React, { useState } from 'react';
import { useI18n } from '../../locales/i18n';
import { BriefSubmission, BriefStatus } from '../../types/brief';
import { StorageService } from '../../services/storage';
import { SERVICES_LIST } from '../../data/services';
import {
  Search,
  Filter,
  Eye,
  FileDown,
  ExternalLink,
  Save,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Clock,
  Layers,
} from 'lucide-react';

interface AdminDashboardProps {
  briefs: BriefSubmission[];
  onRefresh: () => void;
  onOpenPublicView: (slug: string) => void;
  onBackToSite: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  briefs,
  onRefresh,
  onOpenPublicView,
  onBackToSite,
}) => {
  const { t, language, direction } = useI18n();
  const ArrowIcon = direction === 'rtl' ? ArrowLeft : ArrowRight;

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('all');
  const [activeBrief, setActiveBrief] = useState<BriefSubmission | null>(briefs[0] || null);
  const [designerNoteInput, setDesignerNoteInput] = useState<string>(
    briefs[0]?.designerNotes || ''
  );
  const [noteSaved, setNoteSaved] = useState(false);

  const filteredBriefs = briefs.filter((b) => {
    const matchesSearch =
      b.projectTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.clientEmail.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      selectedStatusFilter === 'all' || b.status === selectedStatusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleSelectBrief = (b: BriefSubmission) => {
    setActiveBrief(b);
    setDesignerNoteInput(b.designerNotes || '');
    setNoteSaved(false);
  };

  const handleStatusChange = async (id: string, newStatus: BriefStatus) => {
    await StorageService.updateBriefStatus(id, newStatus);
    onRefresh();
    if (activeBrief && activeBrief.id === id) {
      setActiveBrief({ ...activeBrief, status: newStatus });
    }
  };

  const handleSaveNotes = async () => {
    if (!activeBrief) return;
    await StorageService.updateDesignerNotes(activeBrief.id, designerNoteInput);
    onRefresh();
    setNoteSaved(true);
    setTimeout(() => setNoteSaved(false), 2000);
  };

  const handleExportJson = (brief: BriefSubmission) => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(brief, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `brief-${brief.slug.replace('/', '-')}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const getStatusBadge = (status: BriefStatus) => {
    switch (status) {
      case 'new':
        return <span className="text-xs font-mono text-[#C85A32] bg-[#C85A32]/10 px-2 py-0.5 rounded">{t('admin_status_new')}</span>;
      case 'reviewing':
        return <span className="text-xs font-mono text-amber-700 bg-amber-50 px-2 py-0.5 rounded">{t('admin_status_reviewing')}</span>;
      case 'in_progress':
        return <span className="text-xs font-mono text-blue-700 bg-blue-50 px-2 py-0.5 rounded">{t('admin_status_in_progress')}</span>;
      case 'completed':
        return <span className="text-xs font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">{t('admin_status_completed')}</span>;
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-[#DCD8D0] gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#77736D] uppercase mb-1">
            <span className="w-2 h-2 rounded-full bg-[#171717]" />
            <span>DESIGNER CONSOLE</span>
          </div>
          <h2 className="text-3xl font-editorial-serif font-medium text-[#171717]">
            {t('admin_title')}
          </h2>
          <p className="text-xs text-[#77736D] mt-0.5">{t('admin_subtitle')}</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onBackToSite}
            className="px-4 py-2 rounded-full border border-[#DCD8D0] bg-white text-xs font-medium text-[#171717] hover:bg-[#EFECE5] flex items-center gap-1.5 transition-colors"
          >
            <ArrowIcon className="w-3.5 h-3.5 rotate-180" />
            <span>{t('admin_back_to_site')}</span>
          </button>
        </div>
      </div>

      {/* Stats Ribbon */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <div className="p-4 rounded-xl bg-white border border-[#DCD8D0]">
          <span className="text-xs text-[#77736D] block mb-1">{t('admin_total_briefs')}</span>
          <span className="text-2xl font-editorial-serif font-medium text-[#171717]">
            {briefs.length}
          </span>
        </div>
        <div className="p-4 rounded-xl bg-white border border-[#DCD8D0]">
          <span className="text-xs text-[#77736D] block mb-1">{t('admin_status_new')}</span>
          <span className="text-2xl font-editorial-serif font-medium text-[#C85A32]">
            {briefs.filter((b) => b.status === 'new').length}
          </span>
        </div>
        <div className="p-4 rounded-xl bg-white border border-[#DCD8D0]">
          <span className="text-xs text-[#77736D] block mb-1">{t('admin_status_in_progress')}</span>
          <span className="text-2xl font-editorial-serif font-medium text-blue-700">
            {briefs.filter((b) => b.status === 'in_progress').length}
          </span>
        </div>
        <div className="p-4 rounded-xl bg-white border border-[#DCD8D0]">
          <span className="text-xs text-[#77736D] block mb-1">{t('admin_status_completed')}</span>
          <span className="text-2xl font-editorial-serif font-medium text-emerald-700">
            {briefs.filter((b) => b.status === 'completed').length}
          </span>
        </div>
      </div>

      {/* Main Admin Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left List of Briefs */}
        <div className="lg:col-span-5 space-y-4">
          {/* Search & Filter Toolbar */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="w-3.5 h-3.5 text-[#77736D] absolute top-3 left-3 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={language === 'fa' ? 'جستجو در نام پروژه یا مشتری...' : 'Search briefs...'}
                className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-[#DCD8D0] bg-white text-xs text-[#171717] focus:outline-none focus:border-[#171717]"
              />
            </div>

            {/* Filter buttons */}
            <select
              value={selectedStatusFilter}
              onChange={(e) => setSelectedStatusFilter(e.target.value)}
              className="py-2 px-3 rounded-xl border border-[#DCD8D0] bg-white text-xs text-[#171717] focus:outline-none"
            >
              <option value="all">{language === 'fa' ? 'همه وضعیت‌ها' : 'All Statuses'}</option>
              <option value="new">{t('admin_status_new')}</option>
              <option value="reviewing">{t('admin_status_reviewing')}</option>
              <option value="in_progress">{t('admin_status_in_progress')}</option>
              <option value="completed">{t('admin_status_completed')}</option>
            </select>
          </div>

          {/* List items */}
          <div className="space-y-2.5 max-h-[600px] overflow-y-auto pr-1">
            {filteredBriefs.length === 0 ? (
              <div className="p-8 rounded-xl bg-white border border-[#DCD8D0] text-center text-xs text-[#77736D]">
                {t('admin_empty')}
              </div>
            ) : (
              filteredBriefs.map((b) => {
                const isSelected = activeBrief?.id === b.id;
                const service = SERVICES_LIST.find((s) => s.id === b.serviceType);
                const serviceTitle = language === 'fa' ? service?.titleFa : service?.titleEn;

                return (
                  <div
                    key={b.id}
                    onClick={() => handleSelectBrief(b)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
                      isSelected
                        ? 'border-[#171717] bg-white shadow-sm ring-1 ring-[#171717]'
                        : 'border-[#DCD8D0] bg-[#F7F5F0] hover:bg-white hover:border-[#171717]/30'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <h4 className="text-sm font-semibold text-[#171717] truncate">
                        {b.projectTitle}
                      </h4>
                      {getStatusBadge(b.status)}
                    </div>
                    <div className="flex items-center justify-between text-xs text-[#77736D]">
                      <span>{b.clientName}</span>
                      <span>{serviceTitle}</span>
                    </div>
                    <div className="text-[11px] font-mono text-stone-400 mt-2">
                      {new Date(b.createdAt).toLocaleDateString(language === 'fa' ? 'fa-IR' : 'en-US')}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Detail Pane */}
        <div className="lg:col-span-7">
          {activeBrief ? (
            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#DCD8D0] space-y-6 shadow-xs">
              {/* Header Actions */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#DCD8D0] gap-3">
                <div>
                  <div className="text-xs font-mono text-[#77736D]">SLUG: {activeBrief.slug}</div>
                  <h3 className="text-2xl font-editorial-serif font-medium text-[#171717]">
                    {activeBrief.projectTitle}
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onOpenPublicView(activeBrief.slug)}
                    className="p-2 rounded-lg border border-[#DCD8D0] bg-[#EFECE5] hover:bg-[#E2DDD3] text-[#171717] text-xs flex items-center gap-1.5"
                    title="مشاهده صفحه عمومی بریف"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>{t('admin_view_details')}</span>
                  </button>
                  <button
                    onClick={() => handleExportJson(activeBrief)}
                    className="p-2 rounded-lg border border-[#DCD8D0] bg-[#EFECE5] hover:bg-[#E2DDD3] text-[#171717] text-xs flex items-center gap-1.5"
                    title="خروجی JSON"
                  >
                    <FileDown className="w-3.5 h-3.5" />
                    <span>{t('admin_download_json')}</span>
                  </button>
                </div>
              </div>

              {/* Status Selector Bar */}
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="text-[#77736D] mr-2">{t('admin_col_status')}:</span>
                {(['new', 'reviewing', 'in_progress', 'completed'] as BriefStatus[]).map((st) => (
                  <button
                    key={st}
                    onClick={() => handleStatusChange(activeBrief.id, st)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                      activeBrief.status === st
                        ? 'bg-[#171717] text-white'
                        : 'bg-[#EFECE5] text-[#171717] hover:bg-[#E2DDD3]'
                    }`}
                  >
                    {getStatusBadge(st)}
                  </button>
                ))}
              </div>

              {/* Client Info Grid */}
              <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-[#F7F5F0] border border-[#DCD8D0] text-xs">
                <div>
                  <span className="text-[#77736D] block mb-0.5">{t('field_client_name')}:</span>
                  <span className="font-semibold text-[#171717]">{activeBrief.clientName}</span>
                </div>
                <div>
                  <span className="text-[#77736D] block mb-0.5">{t('field_client_email')}:</span>
                  <span className="text-[#171717]">{activeBrief.clientEmail}</span>
                </div>
                {activeBrief.clientPhone && (
                  <div>
                    <span className="text-[#77736D] block mb-0.5">{t('field_client_phone')}:</span>
                    <span className="text-[#171717]">{activeBrief.clientPhone}</span>
                  </div>
                )}
                <div>
                  <span className="text-[#77736D] block mb-0.5">{t('admin_col_type')}:</span>
                  <span className="text-[#171717] font-medium">{activeBrief.serviceType}</span>
                </div>
              </div>

              {/* Visual Brief indicator */}
              {activeBrief.visualBrief && activeBrief.visualBrief.elements && (
                <div className="p-4 rounded-xl border border-[#DCD8D0] bg-[#EFECE5]/60 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-[#171717] font-medium">
                    <Layers className="w-4 h-4 text-[#C85A32]" />
                    <span>{t('admin_visual_board_attached')}</span>
                    <span className="text-[#77736D]">
                      ({activeBrief.visualBrief.elements.length} elements)
                    </span>
                  </div>
                  <button
                    onClick={() => onOpenPublicView(activeBrief.slug)}
                    className="text-[#C85A32] font-semibold hover:underline"
                  >
                    {language === 'fa' ? 'مشاهده بوم' : 'Inspect Canvas'}
                  </button>
                </div>
              )}

              {/* Answers preview */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-[#171717]">
                  {language === 'fa' ? 'پاسخ‌های ثبت‌شده' : 'Recorded Answers'}
                </h4>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {Object.entries(activeBrief.answers).map(([key, val]) => (
                    <div key={key} className="text-xs border-b border-[#DCD8D0]/40 pb-2">
                      <span className="font-mono text-[#77736D] block">{key}</span>
                      <span className="text-[#171717]">
                        {Array.isArray(val) ? val.join(' · ') : String(val)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Internal Designer Notes */}
              <div className="pt-4 border-t border-[#DCD8D0] space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium text-[#171717]">
                    {t('admin_internal_notes')}
                  </label>
                  <button
                    onClick={handleSaveNotes}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#171717] text-white text-xs hover:bg-black transition-colors"
                  >
                    {noteSaved ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Save className="w-3.5 h-3.5" />}
                    <span>{noteSaved ? t('success_copied') : t('admin_save_notes')}</span>
                  </button>
                </div>
                <textarea
                  rows={3}
                  value={designerNoteInput}
                  onChange={(e) => setDesignerNoteInput(e.target.value)}
                  placeholder={
                    language === 'fa'
                      ? 'یادداشت‌های محرمانه طراح برای این پروژه...'
                      : 'Private studio notes regarding this brief...'
                  }
                  className="w-full p-3 rounded-xl border border-[#DCD8D0] bg-[#F7F5F0] text-xs text-[#171717] focus:outline-none focus:border-[#171717]"
                />
              </div>
            </div>
          ) : (
            <div className="p-12 rounded-2xl bg-white border border-[#DCD8D0] text-center text-xs text-[#77736D]">
              {t('admin_empty')}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
