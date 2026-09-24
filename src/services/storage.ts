import { BriefSubmission, ServiceType, BriefStatus } from '../types/brief';
import { VISUAL_TEMPLATES } from '../data/templates';

const DRAFT_STORAGE_KEY = 'atelier_brief_draft_v1';
const BRIEFS_STORAGE_KEY = 'atelier_briefs_collection_v1';

export interface DraftState {
  serviceType?: ServiceType;
  stepIndex: number;
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  projectTitle: string;
  answers: Record<string, any>;
  additionalNotes?: string;
  referenceUrls?: string[];
  attachedFiles?: any[];
  visualBrief?: any;
  lastUpdated: string;
}

export const StorageService = {
  // Draft autosave
  saveDraft(draft: Partial<DraftState>): void {
    try {
      const existing = StorageService.loadDraft() || {};
      const updated = {
        ...existing,
        ...draft,
        lastUpdated: new Date().toISOString(),
      };
      localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn('Failed to autosave draft', e);
    }
  },

  loadDraft(): DraftState | null {
    try {
      const data = localStorage.getItem(DRAFT_STORAGE_KEY);
      if (!data) return null;
      return JSON.parse(data);
    } catch {
      return null;
    }
  },

  clearDraft(): void {
    try {
      localStorage.removeItem(DRAFT_STORAGE_KEY);
    } catch {
      // ignore
    }
  },

  // Finalized Briefs
  getAllBriefs(): BriefSubmission[] {
    try {
      const data = localStorage.getItem(BRIEFS_STORAGE_KEY);
      if (!data) {
        // Seed default sample briefs for showcase
        const sampleBriefs = getInitialSampleBriefs();
        localStorage.setItem(BRIEFS_STORAGE_KEY, JSON.stringify(sampleBriefs));
        return sampleBriefs;
      }
      return JSON.parse(data);
    } catch {
      return getInitialSampleBriefs();
    }
  },

  getBriefBySlug(slug: string): BriefSubmission | undefined {
    const briefs = StorageService.getAllBriefs();
    return briefs.find((b) => b.slug.toLowerCase() === slug.toLowerCase());
  },

  getBriefById(id: string): BriefSubmission | undefined {
    const briefs = StorageService.getAllBriefs();
    return briefs.find((b) => b.id === id);
  },

  async saveBrief(brief: BriefSubmission): Promise<BriefSubmission> {
    const briefs = StorageService.getAllBriefs();
    // Check if duplicate slug exists, if so append unique timestamp
    let finalSlug = brief.slug;
    const existingIndex = briefs.findIndex((b) => b.id === brief.id);
    const slugConflict = briefs.some((b) => b.slug === finalSlug && b.id !== brief.id);

    if (slugConflict) {
      finalSlug = `${finalSlug}-${Date.now().toString().slice(-4)}`;
      brief.slug = finalSlug;
    }

    let updated: BriefSubmission[];
    if (existingIndex >= 0) {
      updated = [...briefs];
      updated[existingIndex] = brief;
    } else {
      updated = [brief, ...briefs];
    }

    try {
      localStorage.setItem(BRIEFS_STORAGE_KEY, JSON.stringify(updated));
    } catch (err) {
      console.error('Failed to store brief in local database', err);
    }

    // Clear draft once successfully submitted
    StorageService.clearDraft();
    return brief;
  },

  async updateBriefStatus(id: string, status: BriefStatus): Promise<void> {
    const briefs = StorageService.getAllBriefs();
    const updated = briefs.map((b) => (b.id === id ? { ...b, status, updatedAt: new Date().toISOString() } : b));
    localStorage.setItem(BRIEFS_STORAGE_KEY, JSON.stringify(updated));
  },

  async updateDesignerNotes(id: string, designerNotes: string): Promise<void> {
    const briefs = StorageService.getAllBriefs();
    const updated = briefs.map((b) => (b.id === id ? { ...b, designerNotes, updatedAt: new Date().toISOString() } : b));
    localStorage.setItem(BRIEFS_STORAGE_KEY, JSON.stringify(updated));
  },
};

function getInitialSampleBriefs(): BriefSubmission[] {
  return [
    {
      id: 'brief-seed-01',
      clientName: 'سارا معتمد',
      clientEmail: 'sara.motamed@atelier-example.com',
      clientPhone: '۰۹۱۲۳۴۵۶۷۸۹',
      projectTitle: 'نشر دیزاین کتیبه',
      serviceType: 'brand_identity',
      slug: 'sara-motamed/nashr-katibeh',
      status: 'reviewing',
      createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
      updatedAt: new Date(Date.now() - 86400000 * 1).toISOString(),
      answers: {
        brand_values: 'انتشار کتاب‌های مرجع معماری و هنر معاصر ایران با بالاترین استاندارد کیفی چاپ و کاغذ دست‌ساز.',
        brand_tone_of_voice: 'editorial_poetic',
        brand_deliverables: ['guidelines_book', 'color_typography', 'stationery_set'],
        brand_competitors_differentiation: 'تمرکز ویژه بر مونوگراف‌های معماری بومی با زبان طراحی بین‌المللی و ادیتوریال.',
      },
      additionalNotes: 'پروژه باید برای نمایشگاه کتاب بین‌المللی پاییز در غرفه اختصاصی آماده پرزنتیشن باشد.',
      referenceUrls: ['https://www.theart24.com', 'https://cerealmag.com'],
      visualBrief: VISUAL_TEMPLATES[0].data,
      designerNotes: 'پروژه‌ای بسیار بااصالت؛ هماهنگی برای ارسال نمونه‌های بافت کاغذ و تایپ‌فیس‌های پیشنهادی انجام شود.',
    },
    {
      id: 'brief-seed-02',
      clientName: 'کیان راد',
      clientEmail: 'kian@radceramics.ir',
      clientPhone: '۰۹۱۹۹۸۸۷۷۶۶',
      projectTitle: 'سرامیک استودیو راد',
      serviceType: 'packaging',
      slug: 'kian-rad/rad-ceramics',
      status: 'new',
      createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
      updatedAt: new Date(Date.now() - 3600000 * 4).toISOString(),
      answers: {
        pack_product_desc: 'ظروف سرامیکی دست‌ساز پخت هیزمی و اسانس‌سوزهای سفالی با بسته‌بندی هاردباکس محافظ در برابر شکستگی.',
        pack_format: 'box_cardboard',
        pack_shelf_impression: 'artisanal_craft',
        pack_mandatory_info: 'نشان اصالت دست‌ساز، بارکد استاندارد و بروشور مراقبت از لعاب سفال.',
      },
      additionalNotes: 'علاقه‌مند به استفاده از فوم بازیافتی و کاغذ مومی با چاپ طرح هندسی ملایم هستیم.',
      referenceUrls: ['https://kinfolk.com'],
      visualBrief: VISUAL_TEMPLATES[3].data,
    },
  ];
}
