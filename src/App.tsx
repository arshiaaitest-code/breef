import React, { useState, useEffect } from 'react';
import { I18nProvider, useI18n } from './locales/i18n';
import { ServiceType, BriefSubmission } from './types/brief';
import { TopBar } from './components/common/TopBar';
import { Footer } from './components/common/Footer';
import { HeroSection } from './components/brief/HeroSection';
import { AdaptiveQuestionFlow } from './components/brief/AdaptiveQuestionFlow';
import { VisualBriefBuilder } from './components/builder/VisualBriefBuilder';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { PublicBriefView } from './components/view/PublicBriefView';
import { StorageService } from './services/storage';
import { parseBriefUrl } from './services/slug';

function MainApp() {
  const { t, language } = useI18n();

  // Navigation state
  const [currentView, setCurrentView] = useState<'home' | 'flow' | 'builder' | 'admin' | 'public_brief'>('home');
  const [selectedService, setSelectedService] = useState<ServiceType>('website');
  const [activePublicSlug, setActivePublicSlug] = useState<string | null>(null);
  const [briefs, setBriefs] = useState<BriefSubmission[]>(() => StorageService.getAllBriefs());
  const [hasDraft, setHasDraft] = useState<boolean>(() => !!StorageService.loadDraft());

  // URL router detection on load and popstate
  useEffect(() => {
    const handleLocation = () => {
      const path = window.location.pathname;
      const parsed = parseBriefUrl(path);

      if (parsed) {
        const slug = `${parsed.clientSlug}/${parsed.projectSlug}`;
        setActivePublicSlug(slug);
        setCurrentView('public_brief');
      } else if (path.includes('/admin')) {
        setCurrentView('admin');
      } else if (path.includes('/builder')) {
        setCurrentView('builder');
      }
    };

    handleLocation();
    window.addEventListener('popstate', handleLocation);
    return () => window.removeEventListener('popstate', handleLocation);
  }, []);

  const refreshBriefs = () => {
    setBriefs(StorageService.getAllBriefs());
    setHasDraft(!!StorageService.loadDraft());
  };

  const handleSelectService = (service: ServiceType) => {
    setSelectedService(service);
    setCurrentView('flow');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenPublicBrief = (slug: string) => {
    setActivePublicSlug(slug);
    setCurrentView('public_brief');
    window.history.pushState({}, '', `/brief/${slug}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    window.history.pushState({}, '', '/');
    refreshBriefs();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentBrief = activePublicSlug
    ? briefs.find((b) => b.slug.toLowerCase() === activePublicSlug.toLowerCase()) || briefs[0]
    : null;

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#F7F5F0] text-[#171717]">
      <TopBar
        currentView={currentView}
        onNavigate={(view) => {
          setCurrentView(view);
          if (view === 'home') window.history.pushState({}, '', '/');
          else if (view === 'admin') window.history.pushState({}, '', '/admin');
          else if (view === 'builder') window.history.pushState({}, '', '/builder');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        hasDraft={hasDraft}
      />

      <main className="flex-1">
        {/* 1. Landing / Editorial Home */}
        {currentView === 'home' && (
          <HeroSection
            onSelectService={handleSelectService}
            onOpenDirectBuilder={() => {
              setCurrentView('builder');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* 2. Interactive Adaptive Question Flow */}
        {currentView === 'flow' && (
          <AdaptiveQuestionFlow
            serviceType={selectedService}
            onCancel={handleBackToHome}
            onViewBrief={handleOpenPublicBrief}
            onOpenDirectBuilder={() => setCurrentView('builder')}
          />
        )}

        {/* 3. Standalone Visual Brief Builder */}
        {currentView === 'builder' && (
          <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-editorial-serif font-medium text-[#171717]">
                  {t('builder_title')}
                </h2>
                <p className="text-xs text-[#77736D] mt-1">{t('builder_subtitle')}</p>
              </div>
              <button
                onClick={handleBackToHome}
                className="px-4 py-2 rounded-full border border-[#DCD8D0] bg-white text-xs font-medium text-[#171717] hover:bg-[#EFECE5]"
              >
                {t('btn_back')}
              </button>
            </div>
            <VisualBriefBuilder
              onChange={(data) => {
                // Save to current draft
                StorageService.saveDraft({ visualBrief: data });
              }}
              isStandalone={true}
            />
          </div>
        )}

        {/* 4. Designer Admin Desk */}
        {currentView === 'admin' && (
          <AdminDashboard
            briefs={briefs}
            onRefresh={refreshBriefs}
            onOpenPublicView={handleOpenPublicBrief}
            onBackToSite={handleBackToHome}
          />
        )}

        {/* 5. Public Personalized Brief URL View */}
        {currentView === 'public_brief' && currentBrief && (
          <PublicBriefView brief={currentBrief} onBack={handleBackToHome} />
        )}
      </main>

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <I18nProvider>
      <MainApp />
    </I18nProvider>
  );
}
