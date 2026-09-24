import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useI18n } from '../../locales/i18n';
import { VisualBriefData, VisualElement, VisualElementType } from '../../types/brief';
import { VISUAL_TEMPLATES } from '../../data/templates';
import {
  Type,
  Image as ImageIcon,
  Palette,
  FileText,
  Trash2,
  Copy,
  RotateCcw,
  Sparkles,
  Check,
  Move,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  Layers,
  ArrowUp,
  ArrowDown,
  Navigation,
  Bookmark,
  MousePointerClick,
  Sliders,
  Compass,
  Monitor,
  Laptop,
  Tv,
} from 'lucide-react';
import studioImg from '../../assets/images/hero_editorial_studio_1790256419733.jpg';
import websiteImg from '../../assets/images/service_website_editorial_1790256432316.jpg';
import brandImg from '../../assets/images/service_brand_editorial_1790256443568.jpg';
import packagingImg from '../../assets/images/service_packaging_editorial_1790256454270.jpg';

interface VisualBriefBuilderProps {
  initialData?: VisualBriefData;
  onChange: (data: VisualBriefData) => void;
  onDone?: () => void;
  isStandalone?: boolean;
}

export interface ResolutionPreset {
  id: string;
  nameFa: string;
  nameEn: string;
  width: number;
  height: number;
  aspect: string;
  icon: 'laptop' | 'desktop' | 'cinema';
}

export const RESOLUTION_PRESETS: ResolutionPreset[] = [
  {
    id: 'laptop_1280',
    nameFa: 'لپ‌تاپ استودیو (۱۲۸۰×۸۰۰)',
    nameEn: 'Studio Laptop 16:10',
    width: 1280,
    height: 800,
    aspect: '16:10',
    icon: 'laptop',
  },
  {
    id: 'desktop_1440',
    nameFa: 'دسکتاپ واید (۱۴۴۰×۹۰۰)',
    nameEn: 'Widescreen 16:10',
    width: 1440,
    height: 900,
    aspect: '16:10',
    icon: 'desktop',
  },
  {
    id: 'cinema_1600',
    nameFa: 'سینمایی ۱۶:۹ (۱۶۰۰×۹۰۰)',
    nameEn: 'Cinema Display 16:9',
    width: 1600,
    height: 900,
    aspect: '16:9',
    icon: 'cinema',
  },
];

const AVAILABLE_IMAGES = [
  { id: 'studio', label: 'Studio Interior', src: studioImg },
  { id: 'website', label: 'Editorial Layout', src: websiteImg },
  { id: 'brand', label: 'Tactile Branding', src: brandImg },
  { id: 'packaging', label: 'Ceramic Packaging', src: packagingImg },
];

const PRESET_COLORS = [
  '#0D0D0D',
  '#FF2A85',
  '#FF4D00',
  '#E8FF54',
  '#00E5FF',
  '#FAF7EF',
  '#FFFFFF',
  '#4B5349',
  '#77736D',
  '#1A365D',
  '#7C3AED',
];

type ResizeHandleType = 'se' | 'e' | 's' | 'sw' | 'ne' | 'nw';

export const VisualBriefBuilder: React.FC<VisualBriefBuilderProps> = ({
  initialData,
  onChange,
  onDone,
  isStandalone = false,
}) => {
  const { t, language } = useI18n();

  const [briefData, setBriefData] = useState<VisualBriefData>(() => {
    if (initialData && initialData.elements && initialData.elements.length > 0) {
      return initialData;
    }
    return VISUAL_TEMPLATES[0].data;
  });

  const [currentResolution, setCurrentResolution] = useState<ResolutionPreset>(() => {
    if (initialData?.resolution?.width) {
      const match = RESOLUTION_PRESETS.find(
        (r) => r.width === initialData.resolution?.width && r.height === initialData.resolution?.height
      );
      if (match) return match;
    }
    return RESOLUTION_PRESETS[0];
  });

  const [selectedElementId, setSelectedElementId] = useState<string | null>(
    briefData.elements[0]?.id || null
  );

  const [activeTab, setActiveTab] = useState<'templates' | 'canvas' | 'properties'>('canvas');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showGuides, setShowGuides] = useState(true);

  // Responsive dynamic scale
  const [containerWidth, setContainerWidth] = useState<number>(900);
  const [userZoomModifier, setUserZoomModifier] = useState<number>(1.0);

  // Dragging state
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dragStart, setDragStart] = useState<{ x: number; y: number; elX: number; elY: number }>({
    x: 0,
    y: 0,
    elX: 0,
    elY: 0,
  });

  // Resizing state
  const [resizing, setResizing] = useState<{
    id: string;
    handle: ResizeHandleType;
    startX: number;
    startY: number;
    startWidth: number;
    startHeight: number;
    startElX: number;
    startElY: number;
  } | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const selectedElement = briefData.elements.find((el) => el.id === selectedElementId) || null;

  // Sync to parent
  const updateBriefData = (newData: VisualBriefData) => {
    setBriefData(newData);
    onChange(newData);
  };

  // Measure container width responsively
  useEffect(() => {
    const measure = () => {
      if (containerRef.current) {
        const width = containerRef.current.clientWidth;
        if (width > 0) {
          setContainerWidth(width);
        }
      }
    };
    measure();

    let ro: ResizeObserver | null = null;
    if (containerRef.current && window.ResizeObserver) {
      ro = new ResizeObserver(() => measure());
      ro.observe(containerRef.current);
    } else {
      window.addEventListener('resize', measure);
    }

    return () => {
      if (ro) ro.disconnect();
      else window.removeEventListener('resize', measure);
    };
  }, [isFullscreen]);

  // Compute scale based on container width and user zoom modifier
  const baseScale = Math.min(1.0, Math.max(0.35, (containerWidth - 28) / currentResolution.width));
  const effectiveZoom = baseScale * userZoomModifier;

  const handleSelectTemplate = (template: typeof VISUAL_TEMPLATES[0]) => {
    const updated: VisualBriefData = {
      templateId: template.id,
      templateName: template.nameEn,
      backgroundColor: template.data.backgroundColor,
      resolution: {
        width: currentResolution.width,
        height: currentResolution.height,
        name: currentResolution.nameEn,
      },
      elements: JSON.parse(JSON.stringify(template.data.elements)),
    };
    updateBriefData(updated);
    setSelectedElementId(updated.elements[0]?.id || null);
  };

  const handleResolutionChange = (preset: ResolutionPreset) => {
    setCurrentResolution(preset);
    const updated: VisualBriefData = {
      ...briefData,
      resolution: {
        width: preset.width,
        height: preset.height,
        name: preset.nameEn,
      },
    };
    updateBriefData(updated);
  };

  const handleAddElement = (type: VisualElementType) => {
    const newId = `el-${Date.now()}`;
    let newElement: VisualElement;

    if (type === 'navbar') {
      newElement = {
        id: newId,
        type: 'navbar',
        content: language === 'fa' ? 'نام برند شما' : 'STUDIO ARCHIVE',
        subtitle: language === 'fa' ? 'صفحه اصلی · نمونه‌کارها · درباره ما · تماس' : 'HOME · WORKS · JOURNAL · CONTACT',
        color: '#171717',
        secondaryColor: '#FFFFFF',
        x: 32,
        y: 24,
        width: currentResolution.width - 64,
        height: 56,
        fontSize: 13,
        fontStyle: 'serif',
        borderRadius: 8,
        zIndex: 10,
      };
    } else if (type === 'hero') {
      newElement = {
        id: newId,
        type: 'hero',
        content: language === 'fa' ? 'تیتر اصلی و بیانیه برند شما' : 'CONTEMPORARY CREATIVE VISION',
        subtitle: language === 'fa' ? 'توضیح کوتاه و جذاب در مورد خدمات و رسالت وب‌سایت.' : 'Shaping modern digital experiences through deliberate art direction.',
        color: '#171717',
        secondaryColor: '#FFFFFF',
        x: 32,
        y: 104,
        width: Math.min(680, currentResolution.width - 64),
        height: 320,
        fontSize: 34,
        fontStyle: 'serif',
        borderRadius: 12,
        zIndex: 12,
      };
    } else if (type === 'image') {
      newElement = {
        id: newId,
        type: 'image',
        content: websiteImg,
        subtitle: 'FIG 02.0 // EDITORIAL ATMOSPHERE',
        x: Math.min(740, currentResolution.width - 480),
        y: 104,
        width: 480,
        height: 340,
        borderRadius: 10,
        hasTape: true,
        zIndex: 14,
      };
    } else if (type === 'palette') {
      newElement = {
        id: newId,
        type: 'palette',
        content: '#B84A28 · #171717 · #77736D · #EFECE5',
        color: '#B84A28',
        secondaryColor: '#EFECE5',
        x: 32,
        y: 450,
        width: 360,
        height: 120,
        borderRadius: 10,
        zIndex: 15,
      };
    } else if (type === 'card') {
      newElement = {
        id: newId,
        type: 'card',
        content: language === 'fa' ? 'یادداشت یا ویژگی کلیدی پروژه\nتوضیحات تکمیلی پیرامون این بخش.' : 'ARTICLE // 01\nDeliberate whitespace and tactile typography.',
        subtitle: 'EDITORIAL SPEC',
        color: '#171717',
        secondaryColor: '#FFFFFF',
        x: Math.min(420, currentResolution.width - 380),
        y: 450,
        width: 380,
        height: 200,
        fontSize: 13,
        fontStyle: 'serif',
        borderRadius: 10,
        zIndex: 16,
      };
    } else if (type === 'button') {
      newElement = {
        id: newId,
        type: 'button',
        content: language === 'fa' ? 'شروع گفتگو یا ثبت سفارش →' : 'EXPLORE ARCHIVE →',
        color: '#FFFFFF',
        secondaryColor: '#171717',
        x: 32,
        y: 590,
        width: 260,
        height: 56,
        fontSize: 13,
        fontStyle: 'sans',
        borderRadius: 999,
        zIndex: 17,
      };
    } else if (type === 'note') {
      newElement = {
        id: newId,
        type: 'note',
        content: language === 'fa' ? '📌 یادداشت مهم کارفرما:\n«ما به یک صفحه فرود بسیار تمیز با اسکرول داستان‌محور نیاز داریم.»' : '📌 CLIENT NOTE:\nFocus on refined pacing and thoughtful art direction.',
        color: '#171717',
        secondaryColor: '#FFFDEB',
        x: Math.min(830, currentResolution.width - 360),
        y: 460,
        width: 340,
        height: 200,
        fontSize: 13,
        fontStyle: 'sans',
        rotation: -1,
        borderRadius: 8,
        zIndex: 18,
      };
    } else {
      newElement = {
        id: newId,
        type: 'text',
        content: language === 'fa' ? 'عنوان اختصاصی شما' : 'EDITORIAL STATEMENT',
        color: '#171717',
        x: 32,
        y: 104,
        width: 600,
        height: 80,
        fontSize: 28,
        fontStyle: 'serif',
        textAlign: 'left',
        zIndex: 11,
      };
    }

    const updated = {
      ...briefData,
      elements: [...briefData.elements, newElement],
    };
    updateBriefData(updated);
    setSelectedElementId(newId);
  };

  const handleUpdateSelected = (props: Partial<VisualElement>) => {
    if (!selectedElementId) return;
    const updated = {
      ...briefData,
      elements: briefData.elements.map((el) =>
        el.id === selectedElementId ? { ...el, ...props } : el
      ),
    };
    updateBriefData(updated);
  };

  const handleDeleteSelected = () => {
    if (!selectedElementId) return;
    const updated = {
      ...briefData,
      elements: briefData.elements.filter((el) => el.id !== selectedElementId),
    };
    updateBriefData(updated);
    setSelectedElementId(updated.elements[0]?.id || null);
  };

  const handleDuplicateSelected = () => {
    if (!selectedElement) return;
    const newId = `el-${Date.now()}`;
    const duplicated: VisualElement = {
      ...selectedElement,
      id: newId,
      x: Math.min(currentResolution.width - selectedElement.width - 16, selectedElement.x + 24),
      y: Math.min(currentResolution.height - selectedElement.height - 16, selectedElement.y + 24),
      zIndex: (selectedElement.zIndex || 10) + 1,
    };
    const updated = {
      ...briefData,
      elements: [...briefData.elements, duplicated],
    };
    updateBriefData(updated);
    setSelectedElementId(newId);
  };

  const handlePointerDownElement = (e: React.PointerEvent, id: string) => {
    if (resizing) return;
    e.stopPropagation();
    setSelectedElementId(id);
    setDraggingId(id);

    const el = briefData.elements.find((item) => item.id === id);
    if (!el) return;

    setDragStart({
      x: e.clientX,
      y: e.clientY,
      elX: el.x,
      elY: el.y,
    });
  };

  const handleResizePointerDown = (
    e: React.PointerEvent,
    id: string,
    handle: ResizeHandleType
  ) => {
    e.stopPropagation();
    try {
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    } catch {
      // ignore
    }

    const el = briefData.elements.find((item) => item.id === id);
    if (!el) return;

    setResizing({
      id,
      handle,
      startX: e.clientX,
      startY: e.clientY,
      startWidth: el.width,
      startHeight: el.height,
      startElX: el.x,
      startElY: el.y,
    });
  };

  const handleGlobalPointerMove = useCallback(
    (e: React.PointerEvent) => {
      // 1. Resizing in progress
      if (resizing) {
        const dx = (e.clientX - resizing.startX) / effectiveZoom;
        const dy = (e.clientY - resizing.startY) / effectiveZoom;

        let newWidth = resizing.startWidth;
        let newHeight = resizing.startHeight;
        let newX = resizing.startElX;
        let newY = resizing.startElY;

        if (resizing.handle === 'se') {
          newWidth = Math.max(80, Math.min(currentResolution.width - resizing.startElX - 16, resizing.startWidth + dx));
          newHeight = Math.max(36, Math.min(currentResolution.height - resizing.startElY - 16, resizing.startHeight + dy));
        } else if (resizing.handle === 'e') {
          newWidth = Math.max(80, Math.min(currentResolution.width - resizing.startElX - 16, resizing.startWidth + dx));
        } else if (resizing.handle === 's') {
          newHeight = Math.max(36, Math.min(currentResolution.height - resizing.startElY - 16, resizing.startHeight + dy));
        } else if (resizing.handle === 'sw') {
          const calculatedWidth = resizing.startWidth - dx;
          if (calculatedWidth >= 80 && resizing.startElX + dx >= 16) {
            newWidth = calculatedWidth;
            newX = resizing.startElX + dx;
          }
          newHeight = Math.max(36, Math.min(currentResolution.height - resizing.startElY - 16, resizing.startHeight + dy));
        } else if (resizing.handle === 'ne') {
          newWidth = Math.max(80, Math.min(currentResolution.width - resizing.startElX - 16, resizing.startWidth + dx));
          const calculatedHeight = resizing.startHeight - dy;
          if (calculatedHeight >= 36 && resizing.startElY + dy >= 16) {
            newHeight = calculatedHeight;
            newY = resizing.startElY + dy;
          }
        } else if (resizing.handle === 'nw') {
          const calculatedWidth = resizing.startWidth - dx;
          if (calculatedWidth >= 80 && resizing.startElX + dx >= 16) {
            newWidth = calculatedWidth;
            newX = resizing.startElX + dx;
          }
          const calculatedHeight = resizing.startHeight - dy;
          if (calculatedHeight >= 36 && resizing.startElY + dy >= 16) {
            newHeight = calculatedHeight;
            newY = resizing.startElY + dy;
          }
        }

        const updated = {
          ...briefData,
          elements: briefData.elements.map((el) =>
            el.id === resizing.id
              ? {
                  ...el,
                  x: Math.round(newX),
                  y: Math.round(newY),
                  width: Math.round(newWidth),
                  height: Math.round(newHeight),
                }
              : el
          ),
        };
        updateBriefData(updated);
        return;
      }

      // 2. Dragging in progress
      if (draggingId) {
        const dx = (e.clientX - dragStart.x) / effectiveZoom;
        const dy = (e.clientY - dragStart.y) / effectiveZoom;

        const currentEl = briefData.elements.find((el) => el.id === draggingId);
        if (!currentEl) return;

        const maxX = currentResolution.width - currentEl.width - 16;
        const maxY = currentResolution.height - currentEl.height - 16;

        const newX = Math.max(16, Math.min(maxX, dragStart.elX + dx));
        const newY = Math.max(16, Math.min(maxY, dragStart.elY + dy));

        const updated = {
          ...briefData,
          elements: briefData.elements.map((el) =>
            el.id === draggingId
              ? { ...el, x: Math.round(newX), y: Math.round(newY) }
              : el
          ),
        };
        updateBriefData(updated);
      }
    },
    [resizing, draggingId, dragStart, briefData, effectiveZoom, currentResolution]
  );

  const handleGlobalPointerUp = (e: React.PointerEvent) => {
    if (resizing) {
      try {
        (e.target as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {
        // ignore
      }
      setResizing(null);
    }
    if (draggingId) {
      setDraggingId(null);
    }
  };

  return (
    <div
      className={`w-full bg-[#FAF7EF] border-3 border-black shadow-[8px_8px_0px_#000] transition-all duration-300 ${
        isFullscreen
          ? 'fixed inset-0 z-50 rounded-none p-4 sm:p-6 overflow-y-auto bg-[#FAF7EF]'
          : 'rounded-[32px] p-4 sm:p-6 lg:p-7'
      }`}
    >
      {/* Studio Header Ribbon - Neo-Brutalist Pop Editorial */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-5 border-b-2 border-black gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-black tracking-widest uppercase mb-1">
            <span className="bg-[#FF2A85] text-white px-2.5 py-0.5 rounded-full border border-black shadow-[1.5px_1.5px_0px_#000]">
              THE ART 24 // CANVAS
            </span>
            <span className="text-black/60">·</span>
            <span className="text-black">{currentResolution.nameEn}</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black font-display text-black uppercase tracking-tight">
            {t('builder_title')}
          </h3>
          <p className="text-xs text-black/70 max-w-xl mt-0.5 leading-relaxed font-sans">
            {t('builder_subtitle')}
          </p>
        </div>

        {/* Global Toolbar & Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Resolution Presets Selector */}
          <div className="flex items-center rounded-full border-2 border-black bg-white p-1 text-xs font-mono shadow-[2px_2px_0px_#000]">
            {RESOLUTION_PRESETS.map((res) => {
              const isSelected = currentResolution.id === res.id;
              return (
                <button
                  key={res.id}
                  onClick={() => handleResolutionChange(res)}
                  className={`px-3 py-1 rounded-full flex items-center gap-1.5 font-bold transition-colors ${
                    isSelected
                      ? 'bg-black text-[#E8FF54] shadow-xs'
                      : 'text-black hover:bg-[#FAF7EF]'
                  }`}
                  title={language === 'fa' ? res.nameFa : res.nameEn}
                >
                  {res.icon === 'laptop' && <Laptop className="w-3.5 h-3.5" />}
                  {res.icon === 'desktop' && <Monitor className="w-3.5 h-3.5" />}
                  {res.icon === 'cinema' && <Tv className="w-3.5 h-3.5" />}
                  <span className="hidden sm:inline text-[11px]">{res.width}×{res.height}</span>
                </button>
              );
            })}
          </div>

          {/* Zoom controls */}
          <div className="flex items-center rounded-full border-2 border-black bg-white text-xs font-mono font-bold text-black p-1 shadow-[2px_2px_0px_#000]">
            <button
              onClick={() => setUserZoomModifier((z) => Math.max(0.5, z - 0.1))}
              className="p-1 hover:bg-[#FAF7EF] rounded-full"
              title="Zoom out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="px-2 font-black">{Math.round(effectiveZoom * 100)}%</span>
            <button
              onClick={() => setUserZoomModifier((z) => Math.min(1.5, z + 0.1))}
              className="p-1 hover:bg-[#FAF7EF] rounded-full"
              title="Zoom in"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setUserZoomModifier(1.0)}
              className="px-2 py-0.5 text-[11px] hover:bg-[#FAF7EF] rounded-full border-l border-black"
            >
              {t('builder_fit')}
            </button>
          </div>

          {/* Toggle Guides */}
          <button
            onClick={() => setShowGuides(!showGuides)}
            className={`px-3.5 py-1.5 rounded-full border-2 border-black text-xs font-black flex items-center gap-1.5 shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer ${
              showGuides
                ? 'bg-[#E8FF54] text-black'
                : 'bg-white text-black hover:bg-[#FAF7EF]'
            }`}
          >
            <Compass className="w-3.5 h-3.5 stroke-[2.5]" />
            <span className="hidden sm:inline">GUIDES</span>
          </button>

          {/* Fullscreen toggle */}
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2 rounded-full border-2 border-black bg-white text-black hover:bg-[#FAF7EF] shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer"
            title={isFullscreen ? t('builder_exit_fullscreen') : t('builder_fullscreen')}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          {onDone && (
            <button
              onClick={onDone}
              className="px-6 py-2.5 rounded-full bg-[#FF2A85] text-white text-xs font-black uppercase tracking-wider border-2 border-black shadow-[3px_3px_0px_#000] hover:bg-[#e02072] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer"
            >
              {language === 'fa' ? 'تأیید و ذخیره بوم' : 'Save & Continue'}
            </button>
          )}
        </div>
      </div>

      {/* Quick Add Blocks Bar */}
      <div className="py-3 px-1 border-b-2 border-black flex items-center gap-2.5 overflow-x-auto no-scrollbar">
        <span className="text-[11px] font-mono font-black text-black uppercase whitespace-nowrap pl-1">
          {language === 'fa' ? 'افزودن بلاک:' : 'ADD BLOCK:'}
        </span>
        <button
          onClick={() => handleAddElement('navbar')}
          className="px-3.5 py-1.5 rounded-full border-2 border-black bg-white hover:bg-[#E8FF54] text-xs font-black uppercase text-black flex items-center gap-1.5 whitespace-nowrap shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer"
        >
          <Navigation className="w-3.5 h-3.5 text-[#FF2A85]" />
          <span>{t('builder_add_navbar')}</span>
        </button>
        <button
          onClick={() => handleAddElement('hero')}
          className="px-3.5 py-1.5 rounded-full border-2 border-black bg-white hover:bg-[#E8FF54] text-xs font-black uppercase text-black flex items-center gap-1.5 whitespace-nowrap shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#FF2A85]" />
          <span>{t('builder_add_hero')}</span>
        </button>
        <button
          onClick={() => handleAddElement('image')}
          className="px-3.5 py-1.5 rounded-full border-2 border-black bg-white hover:bg-[#E8FF54] text-xs font-black uppercase text-black flex items-center gap-1.5 whitespace-nowrap shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer"
        >
          <ImageIcon className="w-3.5 h-3.5 text-[#FF2A85]" />
          <span>{t('builder_add_image')}</span>
        </button>
        <button
          onClick={() => handleAddElement('palette')}
          className="px-3.5 py-1.5 rounded-full border-2 border-black bg-white hover:bg-[#E8FF54] text-xs font-black uppercase text-black flex items-center gap-1.5 whitespace-nowrap shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer"
        >
          <Palette className="w-3.5 h-3.5 text-[#FF2A85]" />
          <span>{t('builder_add_palette')}</span>
        </button>
        <button
          onClick={() => handleAddElement('card')}
          className="px-3.5 py-1.5 rounded-full border-2 border-black bg-white hover:bg-[#E8FF54] text-xs font-black uppercase text-black flex items-center gap-1.5 whitespace-nowrap shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer"
        >
          <FileText className="w-3.5 h-3.5 text-[#FF2A85]" />
          <span>{t('builder_add_card')}</span>
        </button>
        <button
          onClick={() => handleAddElement('button')}
          className="px-3.5 py-1.5 rounded-full border-2 border-black bg-white hover:bg-[#E8FF54] text-xs font-black uppercase text-black flex items-center gap-1.5 whitespace-nowrap shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer"
        >
          <MousePointerClick className="w-3.5 h-3.5 text-[#FF2A85]" />
          <span>{t('builder_add_button')}</span>
        </button>
        <button
          onClick={() => handleAddElement('note')}
          className="px-3.5 py-1.5 rounded-full border-2 border-black bg-[#E8FF54] text-xs font-black uppercase text-black flex items-center gap-1.5 whitespace-nowrap shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer"
        >
          <Bookmark className="w-3.5 h-3.5 text-[#FF2A85]" />
          <span>{t('builder_add_note')}</span>
        </button>
      </div>

      {/* Mobile Tab Selector */}
      <div className="flex xl:hidden items-center justify-around border-b border-[#DCD6CA] my-3 pb-2 text-xs font-medium text-[#77736D]">
        <button
          onClick={() => setActiveTab('templates')}
          className={`pb-2 border-b-2 ${
            activeTab === 'templates' ? 'border-[#171717] text-[#171717]' : 'border-transparent'
          }`}
        >
          {t('builder_templates')}
        </button>
        <button
          onClick={() => setActiveTab('canvas')}
          className={`pb-2 border-b-2 ${
            activeTab === 'canvas' ? 'border-[#171717] text-[#171717]' : 'border-transparent'
          }`}
        >
          {t('builder_canvas')}
        </button>
        <button
          onClick={() => setActiveTab('properties')}
          className={`pb-2 border-b-2 ${
            activeTab === 'properties' ? 'border-[#171717] text-[#171717]' : 'border-transparent'
          }`}
        >
          {t('builder_properties')}
        </button>
      </div>

      {/* Main Studio Grid: Left (Templates) | Center (Widescreen Artboard) | Right (Properties) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 pt-4">
        {/* LEFT COLUMN: Curated Templates */}
        <div
          className={`xl:col-span-2 space-y-4 ${
            activeTab === 'templates' ? 'block' : 'hidden xl:block'
          }`}
        >
          <div className="flex items-center justify-between pb-2 border-b border-[#DCD6CA] text-xs font-mono text-[#77736D]">
            <span>{t('builder_templates')}</span>
            <span>[04]</span>
          </div>

          <div className="space-y-2.5">
            {VISUAL_TEMPLATES.map((tmpl) => {
              const isActive = briefData.templateId === tmpl.id;
              const name = language === 'fa' ? tmpl.nameFa : tmpl.nameEn;
              return (
                <div
                  key={tmpl.id}
                  onClick={() => handleSelectTemplate(tmpl)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all duration-200 text-left ${
                    isActive
                      ? 'border-[#171717] bg-white shadow-sm ring-1 ring-[#171717]'
                      : 'border-[#DCD6CA] bg-[#EFECE5]/60 hover:bg-white hover:border-[#171717]/40'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-[#171717]">{name}</span>
                    {isActive && <Check className="w-3.5 h-3.5 text-[#B84A28]" />}
                  </div>
                  <div className="text-[10px] font-mono text-[#77736D]">
                    {tmpl.data.elements.length} {language === 'fa' ? 'بخش و مؤلفه' : 'blocks'}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-3.5 rounded-xl bg-[#EFECE5]/60 border border-[#DCD6CA] text-[11px] text-[#77736D] leading-relaxed">
            <span className="font-semibold block text-[#171717] mb-1">💡 راهنمای دستگیره‌ها:</span>
            <p>{t('builder_hint')}</p>
          </div>
        </div>

        {/* CENTER COLUMN: Spacious Horizontal Artboard Workspace */}
        <div
          className={`xl:col-span-7 flex flex-col items-center overflow-hidden ${
            activeTab === 'canvas' ? 'block' : 'hidden xl:block'
          }`}
          ref={containerRef}
          onPointerMove={handleGlobalPointerMove}
          onPointerUp={handleGlobalPointerUp}
        >
          {/* Browser / Atelier Artboard Frame */}
          <div className="w-full rounded-2xl border border-[#DCD6CA] bg-white shadow-md overflow-hidden">
            {/* Browser Header Bar */}
            <div className="px-4 py-2.5 bg-[#EFECE5] border-b border-[#DCD6CA] flex items-center justify-between text-xs font-mono text-[#77736D]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#B84A28]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#C58B38]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#4B5349]" />
                <span className="text-[11px] text-[#77736D] ml-2 hidden sm:inline">
                  atelier://theart24-spec.artboard
                </span>
              </div>
              <div className="flex items-center gap-3 text-[11px]">
                <span className="font-semibold text-[#171717]">
                  {currentResolution.width} × {currentResolution.height} PX ({currentResolution.aspect})
                </span>
                <span className="hidden sm:inline">·</span>
                <span className="hidden sm:inline">{briefData.elements.length} ELEMENTS</span>
              </div>
            </div>

            {/* Canvas Outer Viewport with Precisely Scaled Inner Artboard */}
            <div
              className="p-3 sm:p-5 flex justify-center items-center bg-[#EFECE5]/40 overflow-hidden"
              style={{ minHeight: `${currentResolution.height * effectiveZoom + 36}px` }}
              onClick={() => setSelectedElementId(null)}
            >
              {/* Scaled Bounding Box in flow */}
              <div
                style={{
                  width: `${currentResolution.width * effectiveZoom}px`,
                  height: `${currentResolution.height * effectiveZoom}px`,
                  position: 'relative',
                }}
                className="mx-auto select-none"
              >
                {/* Visual Artboard */}
                <div
                  style={{
                    width: `${currentResolution.width}px`,
                    height: `${currentResolution.height}px`,
                    transform: `scale(${effectiveZoom})`,
                    transformOrigin: 'top left',
                    backgroundColor: briefData.backgroundColor || '#FAF8F5',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                  }}
                  className={`rounded-xl border border-[#DCD6CA] shadow-sm select-none transition-colors overflow-hidden ${
                    showGuides ? 'blueprint-guide-grid' : 'canvas-grid-pattern'
                  }`}
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* 12-Column Overlay Guides when enabled */}
                  {showGuides && (
                    <div className="absolute inset-0 pointer-events-none grid grid-cols-12 gap-4 px-8 opacity-15">
                      {Array.from({ length: 12 }).map((_, i) => (
                        <div key={i} className="h-full border-x border-[#B84A28]" />
                      ))}
                    </div>
                  )}

                  {/* Render All Elements */}
                  {briefData.elements.map((el) => {
                    const isSelected = selectedElementId === el.id;

                    return (
                      <div
                        key={el.id}
                        onPointerDown={(e) => handlePointerDownElement(e, el.id)}
                        style={{
                          position: 'absolute',
                          left: `${el.x}px`,
                          top: `${el.y}px`,
                          width: `${el.width}px`,
                          height: `${el.height}px`,
                          transform: el.rotation ? `rotate(${el.rotation}deg)` : undefined,
                          zIndex: isSelected ? 40 : el.zIndex || 10,
                          cursor: draggingId === el.id ? 'grabbing' : 'grab',
                        }}
                        className={`group touch-none transition-shadow ${
                          isSelected
                            ? 'ring-2 ring-[#B84A28] shadow-lg'
                            : 'hover:ring-1 hover:ring-[#171717]/30'
                        }`}
                      >
                        {/* Scrapbook Washi Tape if enabled */}
                        {el.hasTape && <div className="washi-tape" />}

                        {/* Sticky Pin if note type */}
                        {el.type === 'note' && <div className="paper-pin" />}

                        {/* --- ELEMENT TYPE 1: NAVBAR --- */}
                        {el.type === 'navbar' && (
                          <div
                            style={{
                              backgroundColor: el.secondaryColor || '#FFFFFF',
                              color: el.color || '#171717',
                              borderRadius: `${el.borderRadius ?? 8}px`,
                            }}
                            className="w-full h-full px-6 border border-black/10 flex items-center justify-between shadow-xs font-editorial-sans"
                          >
                            <div className="flex items-center gap-3">
                              <span className="w-3 h-3 rounded-full bg-[#B84A28]" />
                              <span className="font-semibold tracking-wider text-sm font-editorial-serif">
                                {el.content}
                              </span>
                            </div>
                            <div className="flex items-center gap-4 text-xs text-[#77736D] font-mono">
                              <span>{el.subtitle}</span>
                              <span className="px-3 py-1 rounded bg-[#171717] text-white text-[10px]">
                                ACTION
                              </span>
                            </div>
                          </div>
                        )}

                        {/* --- ELEMENT TYPE 2: HERO HEADLINE --- */}
                        {el.type === 'hero' && (
                          <div
                            style={{
                              backgroundColor: el.secondaryColor || '#FFFFFF',
                              color: el.color || '#171717',
                              borderRadius: `${el.borderRadius ?? 12}px`,
                            }}
                            className="w-full h-full p-8 border border-black/10 flex flex-col justify-between shadow-xs"
                          >
                            <div>
                              <div className="flex items-center gap-2 text-[11px] font-mono tracking-widest text-[#77736D] uppercase mb-3">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#B84A28]" />
                                <span>INDEX // 01 · SPEC</span>
                              </div>
                              <h2
                                style={{ fontSize: `${el.fontSize || 34}px` }}
                                className="font-editorial-serif font-normal leading-[1.12] text-[#171717] text-balance"
                              >
                                {el.content}
                              </h2>
                            </div>
                            <div className="flex items-center justify-between pt-4 border-t border-black/5">
                              <p className="text-xs text-[#77736D] font-editorial-sans max-w-lg">
                                {el.subtitle}
                              </p>
                              <span className="px-4 py-2 rounded-full bg-[#171717] text-white text-xs font-medium">
                                START →
                              </span>
                            </div>
                          </div>
                        )}

                        {/* --- ELEMENT TYPE 3: TEXT --- */}
                        {el.type === 'text' && (
                          <div
                            style={{
                              color: el.color || '#171717',
                              fontSize: `${el.fontSize || 28}px`,
                              textAlign: el.textAlign || 'left',
                            }}
                            className={`w-full h-full flex items-center font-medium leading-tight ${
                              el.fontStyle === 'serif' ? 'font-editorial-serif' : 'font-editorial-sans'
                            }`}
                          >
                            {el.content}
                          </div>
                        )}

                        {/* --- ELEMENT TYPE 4: EDITORIAL IMAGE --- */}
                        {el.type === 'image' && (
                          <div
                            style={{ borderRadius: `${el.borderRadius ?? 10}px` }}
                            className="w-full h-full overflow-hidden border border-black/15 relative bg-stone-200 group flex flex-col shadow-xs"
                          >
                            <img
                              src={el.content || websiteImg}
                              alt="visual reference"
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover pointer-events-none"
                            />
                            {el.subtitle && (
                              <div className="absolute bottom-0 inset-x-0 bg-black/65 backdrop-blur-xs p-2.5 text-[11px] font-mono text-white/95">
                                {el.subtitle}
                              </div>
                            )}
                          </div>
                        )}

                        {/* --- ELEMENT TYPE 5: COLOR PALETTE --- */}
                        {el.type === 'palette' && (
                          <div
                            style={{
                              backgroundColor: el.secondaryColor || '#EFECE5',
                              borderRadius: `${el.borderRadius ?? 10}px`,
                            }}
                            className="w-full h-full p-4 border border-black/10 flex flex-col justify-between shadow-xs"
                          >
                            <div className="flex items-center gap-3">
                              <span
                                className="w-9 h-9 rounded-full border border-black/20 shadow-xs"
                                style={{ backgroundColor: el.color || '#B84A28' }}
                              />
                              <span
                                className="w-9 h-9 rounded-full border border-black/20 shadow-xs"
                                style={{ backgroundColor: '#171717' }}
                              />
                              <span
                                className="w-9 h-9 rounded-full border border-black/20 shadow-xs"
                                style={{ backgroundColor: '#77736D' }}
                              />
                              <span
                                className="w-9 h-9 rounded-full border border-black/20 shadow-xs"
                                style={{ backgroundColor: '#EFECE5' }}
                              />
                            </div>
                            <span className="text-[11px] font-mono text-[#77736D] tracking-tight">
                              {el.content || 'PALETTE SPEC.'}
                            </span>
                          </div>
                        )}

                        {/* --- ELEMENT TYPE 6: ARTICLE CARD --- */}
                        {el.type === 'card' && (
                          <div
                            style={{
                              backgroundColor: el.secondaryColor || '#FFFFFF',
                              color: el.color || '#171717',
                              borderRadius: `${el.borderRadius ?? 10}px`,
                              fontSize: `${el.fontSize || 13}px`,
                            }}
                            className={`w-full h-full p-5 border border-[#DCD6CA] shadow-xs flex flex-col justify-between whitespace-pre-line leading-relaxed ${
                              el.fontStyle === 'serif' ? 'font-editorial-serif' : 'font-editorial-sans'
                            }`}
                          >
                            {el.subtitle && (
                              <span className="text-[10px] font-mono text-[#B84A28] uppercase tracking-wider block mb-1">
                                {el.subtitle}
                              </span>
                            )}
                            <span className="flex-1">{el.content}</span>
                            <span className="text-[10px] text-[#77736D] uppercase tracking-wider mt-2 pt-2 border-t border-black/5">
                              ✦ THE ART 24 // SPEC
                            </span>
                          </div>
                        )}

                        {/* --- ELEMENT TYPE 7: BUTTON --- */}
                        {el.type === 'button' && (
                          <div
                            style={{
                              backgroundColor: el.secondaryColor || '#171717',
                              color: el.color || '#FFFFFF',
                              borderRadius: `${el.borderRadius ?? 999}px`,
                              fontSize: `${el.fontSize || 13}px`,
                            }}
                            className="w-full h-full flex items-center justify-center font-medium tracking-wide shadow-xs px-5"
                          >
                            {el.content}
                          </div>
                        )}

                        {/* --- ELEMENT TYPE 8: STICKY NOTE --- */}
                        {el.type === 'note' && (
                          <div
                            style={{
                              backgroundColor: el.secondaryColor || '#FFFDEB',
                              color: el.color || '#171717',
                              borderRadius: `${el.borderRadius ?? 8}px`,
                              fontSize: `${el.fontSize || 13}px`,
                            }}
                            className="w-full h-full p-5 border border-amber-200/80 shadow-md flex flex-col justify-between whitespace-pre-line leading-relaxed font-sans"
                          >
                            <span>{el.content}</span>
                            <span className="text-[10px] font-mono text-amber-800/70 uppercase">
                              CLIENT SPEC
                            </span>
                          </div>
                        )}

                        {/* --- SELECTION OVERLAY & INTERACTIVE RESIZE HANDLES --- */}
                        {isSelected && (
                          <>
                            {/* Live Dimensions Tooltip */}
                            <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-[#171717] text-white text-[10px] font-mono px-2 py-0.5 rounded shadow pointer-events-none whitespace-nowrap z-50">
                              {el.width} × {el.height} px
                            </div>

                            {/* Top-Left Handle */}
                            <div
                              onPointerDown={(e) => handleResizePointerDown(e, el.id, 'nw')}
                              className="absolute -top-2 -left-2 w-3.5 h-3.5 bg-white border-2 border-[#B84A28] rounded-full shadow-sm cursor-nwse-resize z-50 hover:scale-125 transition-transform"
                            />

                            {/* Top-Right Handle */}
                            <div
                              onPointerDown={(e) => handleResizePointerDown(e, el.id, 'ne')}
                              className="absolute -top-2 -right-2 w-3.5 h-3.5 bg-white border-2 border-[#B84A28] rounded-full shadow-sm cursor-nesw-resize z-50 hover:scale-125 transition-transform"
                            />

                            {/* Bottom-Left Handle */}
                            <div
                              onPointerDown={(e) => handleResizePointerDown(e, el.id, 'sw')}
                              className="absolute -bottom-2 -left-2 w-3.5 h-3.5 bg-white border-2 border-[#B84A28] rounded-full shadow-sm cursor-nesw-resize z-50 hover:scale-125 transition-transform"
                            />

                            {/* Bottom-Right Handle (Main) */}
                            <div
                              onPointerDown={(e) => handleResizePointerDown(e, el.id, 'se')}
                              className="absolute -bottom-2.5 -right-2.5 w-4 h-4 bg-[#B84A28] border-2 border-white rounded-full shadow-md cursor-nwse-resize z-50 hover:scale-125 transition-transform"
                              title="Drag to resize"
                            />

                            {/* Right Edge Handle */}
                            <div
                              onPointerDown={(e) => handleResizePointerDown(e, el.id, 'e')}
                              className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-2.5 h-6 bg-white border border-[#B84A28] rounded shadow-xs cursor-ew-resize z-50 hover:scale-110"
                              title="Resize width"
                            />

                            {/* Bottom Edge Handle */}
                            <div
                              onPointerDown={(e) => handleResizePointerDown(e, el.id, 's')}
                              className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-6 h-2.5 bg-white border border-[#B84A28] rounded shadow-xs cursor-ns-resize z-50 hover:scale-110"
                              title="Resize height"
                            />
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Bottom Bar: Canvas Background Color Swatch */}
            <div className="px-4 py-2.5 bg-white border-t border-[#DCD6CA] flex items-center justify-between text-xs text-[#77736D]">
              <span className="font-mono text-[11px]">{t('builder_canvas_bg')}</span>
              <div className="flex items-center gap-2">
                {['#FAF8F5', '#F7F5F0', '#F5F2EB', '#FFFFFF', '#EFECE5', '#171717'].map((bg) => (
                  <button
                    key={bg}
                    onClick={() => updateBriefData({ ...briefData, backgroundColor: bg })}
                    style={{ backgroundColor: bg }}
                    className={`w-5 h-5 rounded-full border ${
                      briefData.backgroundColor === bg
                        ? 'border-[#B84A28] scale-125 shadow-xs'
                        : 'border-[#DCD6CA]'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Inspector & Dimensions Panel */}
        <div
          className={`xl:col-span-3 space-y-4 ${
            activeTab === 'properties' ? 'block' : 'hidden xl:block'
          }`}
        >
          <div className="flex items-center justify-between pb-2 border-b border-[#DCD6CA] text-xs font-mono text-[#77736D]">
            <span>{t('builder_properties')}</span>
            {selectedElement && (
              <span className="px-2 py-0.5 rounded bg-[#EFECE5] text-[#171717] font-semibold">
                {selectedElement.type.toUpperCase()}
              </span>
            )}
          </div>

          {selectedElement ? (
            <div className="p-4 rounded-2xl bg-white border border-[#DCD6CA] space-y-4 shadow-xs">
              {/* Element Resizing Controls (Width & Height) */}
              <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#DCD6CA] space-y-3">
                <div className="flex items-center justify-between text-xs font-semibold text-[#171717]">
                  <span className="flex items-center gap-1.5">
                    <Sliders className="w-3.5 h-3.5 text-[#B84A28]" />
                    <span>{t('builder_resize')}</span>
                  </span>
                  <span className="font-mono text-[11px] text-[#77736D]">
                    {selectedElement.width} × {selectedElement.height}
                  </span>
                </div>

                {/* Width Slider */}
                <div>
                  <div className="flex justify-between text-[11px] text-[#77736D] mb-1">
                    <span>{t('builder_width')}</span>
                    <span className="font-mono">{selectedElement.width}px</span>
                  </div>
                  <input
                    type="range"
                    min={80}
                    max={currentResolution.width - 32}
                    value={selectedElement.width}
                    onChange={(e) =>
                      handleUpdateSelected({
                        width: Number(e.target.value),
                        x: Math.min(selectedElement.x, currentResolution.width - Number(e.target.value) - 16),
                      })
                    }
                    className="w-full accent-[#B84A28]"
                  />
                </div>

                {/* Height Slider */}
                <div>
                  <div className="flex justify-between text-[11px] text-[#77736D] mb-1">
                    <span>{t('builder_height')}</span>
                    <span className="font-mono">{selectedElement.height}px</span>
                  </div>
                  <input
                    type="range"
                    min={36}
                    max={currentResolution.height - 32}
                    value={selectedElement.height}
                    onChange={(e) =>
                      handleUpdateSelected({
                        height: Number(e.target.value),
                        y: Math.min(selectedElement.y, currentResolution.height - Number(e.target.value) - 16),
                      })
                    }
                    className="w-full accent-[#B84A28]"
                  />
                </div>

                {/* Rotation Slider */}
                <div>
                  <div className="flex justify-between text-[11px] text-[#77736D] mb-1">
                    <span>{t('builder_rotation')}</span>
                    <span className="font-mono">{selectedElement.rotation || 0}°</span>
                  </div>
                  <input
                    type="range"
                    min={-12}
                    max={12}
                    value={selectedElement.rotation || 0}
                    onChange={(e) =>
                      handleUpdateSelected({ rotation: Number(e.target.value) })
                    }
                    className="w-full accent-[#B84A28]"
                  />
                </div>
              </div>

              {/* Content / Text Editor */}
              {selectedElement.content !== undefined && (
                <div>
                  <label className="block text-xs font-semibold text-[#171717] mb-1.5">
                    {t('builder_edit_text')}
                  </label>
                  <textarea
                    rows={3}
                    value={selectedElement.content}
                    onChange={(e) => handleUpdateSelected({ content: e.target.value })}
                    className="w-full p-2.5 rounded-lg border border-[#DCD6CA] text-xs bg-[#FAF8F5] focus:bg-white focus:outline-none focus:border-[#171717]"
                  />
                </div>
              )}

              {/* Subtitle / Caption Editor */}
              {selectedElement.subtitle !== undefined && (
                <div>
                  <label className="block text-xs font-semibold text-[#171717] mb-1.5">
                    {language === 'fa' ? 'زیرعنوان یا توضیح:' : 'Subtitle / Caption:'}
                  </label>
                  <input
                    type="text"
                    value={selectedElement.subtitle}
                    onChange={(e) => handleUpdateSelected({ subtitle: e.target.value })}
                    className="w-full p-2.5 rounded-lg border border-[#DCD6CA] text-xs bg-[#FAF8F5] focus:bg-white focus:outline-none focus:border-[#171717]"
                  />
                </div>
              )}

              {/* Image Picker for Image Element */}
              {selectedElement.type === 'image' && (
                <div>
                  <label className="block text-xs font-semibold text-[#171717] mb-1.5">
                    {language === 'fa' ? 'انتخاب تصویر استودیو:' : 'Choose Studio Image:'}
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {AVAILABLE_IMAGES.map((img) => (
                      <div
                        key={img.id}
                        onClick={() => handleUpdateSelected({ content: img.src })}
                        className={`h-16 rounded-lg border cursor-pointer overflow-hidden relative ${
                          selectedElement.content === img.src
                            ? 'ring-2 ring-[#B84A28] border-transparent'
                            : 'border-[#DCD6CA]'
                        }`}
                      >
                        <img
                          src={img.src}
                          alt={img.label}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Color Swatches */}
              <div>
                <label className="block text-xs font-semibold text-[#171717] mb-1.5">
                  {t('builder_color')}
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {PRESET_COLORS.map((c) => (
                    <button
                      key={c}
                      onClick={() => handleUpdateSelected({ color: c })}
                      style={{ backgroundColor: c }}
                      className={`w-6 h-6 rounded-full border ${
                        selectedElement.color === c
                          ? 'ring-2 ring-[#B84A28] scale-110'
                          : 'border-[#DCD6CA]'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Secondary / Background Color */}
              <div>
                <label className="block text-xs font-semibold text-[#171717] mb-1.5">
                  {t('builder_bg_color')}
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {PRESET_COLORS.map((c) => (
                    <button
                      key={c}
                      onClick={() => handleUpdateSelected({ secondaryColor: c })}
                      style={{ backgroundColor: c }}
                      className={`w-6 h-6 rounded-full border ${
                        selectedElement.secondaryColor === c
                          ? 'ring-2 ring-[#B84A28] scale-110'
                          : 'border-[#DCD6CA]'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Layer Controls & Actions */}
              <div className="pt-2 border-t border-[#DCD6CA] flex items-center justify-between gap-2">
                <div className="flex items-center gap-1">
                  <button
                    onClick={handleDuplicateSelected}
                    className="p-2 rounded-lg border border-[#DCD6CA] text-[#77736D] hover:text-[#171717] hover:bg-[#EFECE5]"
                    title={t('builder_duplicate')}
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() =>
                      handleUpdateSelected({ zIndex: (selectedElement.zIndex || 10) + 1 })
                    }
                    className="p-2 rounded-lg border border-[#DCD6CA] text-[#77736D] hover:text-[#171717] hover:bg-[#EFECE5]"
                    title={t('builder_bring_forward')}
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() =>
                      handleUpdateSelected({
                        zIndex: Math.max(1, (selectedElement.zIndex || 10) - 1),
                      })
                    }
                    className="p-2 rounded-lg border border-[#DCD6CA] text-[#77736D] hover:text-[#171717] hover:bg-[#EFECE5]"
                    title={t('builder_send_backward')}
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  onClick={handleDeleteSelected}
                  className="p-2 rounded-lg border border-red-200 text-red-600 hover:bg-red-50"
                  title={t('builder_delete_element')}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ) : (
            <div className="p-6 rounded-2xl bg-[#EFECE5]/50 border border-dashed border-[#DCD6CA] text-center text-xs text-[#77736D] leading-relaxed">
              <Move className="w-6 h-6 text-[#77736D]/60 mx-auto mb-2" />
              <p>{t('builder_select_prompt')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
