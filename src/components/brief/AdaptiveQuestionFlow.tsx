import React, { useState, useEffect } from 'react';
import { useI18n } from '../../locales/i18n';
import { ServiceType, BriefSubmission, VisualBriefData, AttachedFile } from '../../types/brief';
import { SERVICE_QUESTIONS } from '../../data/questions';
import { SERVICES_LIST } from '../../data/services';
import { generateBriefSlug } from '../../services/slug';
import { StorageService } from '../../services/storage';
import { ClientInfoStep } from './ClientInfoStep';
import { QuestionStepRenderer } from './QuestionStepRenderer';
import { VisualBriefBuilder } from '../builder/VisualBriefBuilder';
import { AdditionalNotesStep } from './AdditionalNotesStep';
import { FinalPreviewStep } from './FinalPreviewStep';
import { SuccessView } from './SuccessView';
import { ArrowLeft, ArrowRight, ArrowUpRight, Sparkles } from 'lucide-react';

interface AdaptiveQuestionFlowProps {
  serviceType: ServiceType;
  onCancel: () => void;
  onViewBrief: (slug: string) => void;
  onOpenDirectBuilder: () => void;
}

type StepItem =
  | { kind: 'client' }
  | { kind: 'question'; questionIndex: number }
  | { kind: 'visual' }
  | { kind: 'notes' }
  | { kind: 'preview' };

export const AdaptiveQuestionFlow: React.FC<AdaptiveQuestionFlowProps> = ({
  serviceType,
  onCancel,
  onViewBrief,
}) => {
  const { t, language, direction } = useI18n();
  const ArrowIcon = direction === 'rtl' ? ArrowLeft : ArrowRight;
  const BackArrowIcon = direction === 'rtl' ? ArrowRight : ArrowLeft;

  const currentService = SERVICES_LIST.find((s) => s.id === serviceType) || SERVICES_LIST[0];
  const serviceTitle = language === 'fa' ? currentService.titleFa : currentService.titleEn;

  // Step definitions for this service
  const adaptiveSteps = SERVICE_QUESTIONS[serviceType] || [];
  const isWebsiteService = serviceType === 'website';

  // Construct dynamic flow steps
  // Visual Builder is strictly for Website Service
  const flowSteps: StepItem[] = [
    { kind: 'client' },
    ...adaptiveSteps.map((_, i) => ({ kind: 'question' as const, questionIndex: i })),
    ...(isWebsiteService ? [{ kind: 'visual' as const }] : []),
    { kind: 'notes' },
    { kind: 'preview' },
  ];

  const totalFlowSteps = flowSteps.length;

  // Form State
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [projectTitle, setProjectTitle] = useState('');
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [visualBrief, setVisualBrief] = useState<VisualBriefData | undefined>(undefined);
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [referenceUrls, setReferenceUrls] = useState<string[]>([]);
  const [attachedFiles, setAttachedFiles] = useState<AttachedFile[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedBrief, setSubmittedBrief] = useState<BriefSubmission | null>(null);

  // Load Autosaved draft on mount
  useEffect(() => {
    const draft = StorageService.loadDraft();
    if (draft && draft.serviceType === serviceType) {
      if (draft.clientName) setClientName(draft.clientName);
      if (draft.clientEmail) setClientEmail(draft.clientEmail);
      if (draft.clientPhone) setClientPhone(draft.clientPhone);
      if (draft.projectTitle) setProjectTitle(draft.projectTitle);
      if (draft.answers) setAnswers(draft.answers);
      if (draft.visualBrief) setVisualBrief(draft.visualBrief);
      if (draft.additionalNotes) setAdditionalNotes(draft.additionalNotes);
      if (draft.referenceUrls) setReferenceUrls(draft.referenceUrls);
      if (draft.attachedFiles) setAttachedFiles(draft.attachedFiles);
      if (typeof draft.stepIndex === 'number' && draft.stepIndex < totalFlowSteps) {
        setCurrentStepIndex(draft.stepIndex);
      }
    }
  }, [serviceType, totalFlowSteps]);

  // Autosave when state changes
  useEffect(() => {
    StorageService.saveDraft({
      serviceType,
      stepIndex: currentStepIndex,
      clientName,
      clientEmail,
      clientPhone,
      projectTitle,
      answers,
      visualBrief,
      additionalNotes,
      referenceUrls,
      attachedFiles,
    });
  }, [
    serviceType,
    currentStepIndex,
    clientName,
    clientEmail,
    clientPhone,
    projectTitle,
    answers,
    visualBrief,
    additionalNotes,
    referenceUrls,
    attachedFiles,
  ]);

  const currentStep = flowSteps[currentStepIndex] || flowSteps[0];

  // Validation function
  const validateCurrentStep = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (currentStep.kind === 'client') {
      if (!clientName.trim()) {
        newErrors.clientName = t('validation_required');
      }
      if (!projectTitle.trim()) {
        newErrors.projectTitle = t('validation_required');
      }
      if (!clientEmail.trim()) {
        newErrors.clientEmail = t('validation_required');
      } else if (!clientEmail.includes('@')) {
        newErrors.clientEmail =
          language === 'fa' ? 'ایمیل وارد شده معتبر نیست :)' : 'Please check your email address :)';
      }
    } else if (currentStep.kind === 'question') {
      const stepDef = adaptiveSteps[currentStep.questionIndex];
      if (stepDef) {
        stepDef.questions.forEach((q) => {
          if (q.required) {
            const ans = answers[q.id];
            if (
              !ans ||
              (Array.isArray(ans) && ans.length === 0) ||
              (typeof ans === 'string' && !ans.trim())
            ) {
              newErrors[q.id] = t('validation_required');
            }
          }
        });
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (!validateCurrentStep()) return;
    if (currentStepIndex < totalFlowSteps - 1) {
      setCurrentStepIndex((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      onCancel();
    }
  };

  const handleAnswerChange = (qId: string, val: any) => {
    setAnswers((prev) => ({ ...prev, [qId]: val }));
    if (errors[qId]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[qId];
        return next;
      });
    }
  };

  const handleFinalSubmit = async () => {
    setIsSubmitting(true);
    const slug = generateBriefSlug(clientName, projectTitle);

    const submission: BriefSubmission = {
      id: `brief-${Date.now()}`,
      clientName,
      clientEmail,
      clientPhone,
      projectTitle,
      serviceType,
      slug,
      status: 'new',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      answers,
      additionalNotes,
      referenceUrls,
      attachedFiles,
      visualBrief: isWebsiteService ? visualBrief : undefined,
    };

    try {
      await StorageService.saveBrief(submission);
      setSubmittedBrief(submission);
    } catch (e) {
      console.error('Error saving brief', e);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Keyboard navigation: Cmd+Enter to advance
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
        handleNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentStepIndex, clientName, clientEmail, projectTitle, answers]);

  if (submittedBrief) {
    return (
      <SuccessView
        submission={submittedBrief}
        onViewBrief={(slug) => onViewBrief(slug)}
        onStartNew={() => {
          setSubmittedBrief(null);
          setCurrentStepIndex(0);
          setAnswers({});
          setVisualBrief(undefined);
          setAdditionalNotes('');
          onCancel();
        }}
      />
    );
  }

  const stepNumberDisplay = String(currentStepIndex + 1).padStart(2, '0');
  const totalStepsDisplay = String(totalFlowSteps).padStart(2, '0');

  // Title for current step
  const getStepTitle = () => {
    if (currentStep.kind === 'client') return t('client_info_step');
    if (currentStep.kind === 'question') {
      const qStep = adaptiveSteps[currentStep.questionIndex];
      return qStep ? t(qStep.titleKey) : '';
    }
    if (currentStep.kind === 'visual') return t('builder_title');
    if (currentStep.kind === 'notes') return t('notes_title');
    if (currentStep.kind === 'preview') return t('preview_title');
    return '';
  };

  const isVisualStep = currentStep.kind === 'visual';

  return (
    <div
      className={`mx-auto py-8 px-4 sm:px-6 lg:px-8 transition-all ${
        isVisualStep ? 'max-w-7xl' : 'max-w-4xl'
      }`}
    >
      {/* Pop Editorial Progress Ribbon */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b-3 border-black gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={handleBack}
            className="p-2.5 rounded-full border-2 border-black bg-white text-black hover:bg-[#FAF7EF] shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer"
            title={t('btn_back')}
          >
            <BackArrowIcon className="w-4 h-4 stroke-[3]" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-[#FF2A85] text-white text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full border border-black shadow-[1.5px_1.5px_0px_#000]">
                {serviceTitle}
              </span>
              <span className="text-xs font-mono font-bold text-black/60 uppercase">
                {language === 'fa' ? 'فرم انطباقی' : 'ADAPTIVE WORKSHEET'}
              </span>
            </div>
            <div className="text-lg sm:text-xl font-black font-display text-black uppercase tracking-tight mt-0.5">
              {getStepTitle()}
            </div>
          </div>
        </div>

        {/* Neo-Brutalist Step Badge */}
        <div className="flex items-center gap-3 self-end sm:self-center">
          <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border-2 border-black shadow-[2px_2px_0px_#000] text-xs font-mono font-black">
            <span className="text-[#FF2A85]">{stepNumberDisplay}</span>
            <span className="text-black/40">/</span>
            <span>{totalStepsDisplay}</span>
          </div>

          {/* Segmented Step Blocks */}
          <div className="hidden md:flex items-center gap-1.5">
            {flowSteps.map((_, idx) => (
              <span
                key={idx}
                className={`w-3.5 h-3.5 rounded-md border border-black transition-all ${
                  idx < currentStepIndex
                    ? 'bg-[#FF2A85] shadow-[1px_1px_0px_#000]'
                    : idx === currentStepIndex
                    ? 'bg-[#E8FF54] shadow-[1.5px_1.5px_0px_#000] scale-110'
                    : 'bg-white/60'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Step Renderers */}
      <div className="min-h-[440px]">
        {/* Step: Basic Client Info */}
        {currentStep.kind === 'client' && (
          <ClientInfoStep
            clientName={clientName}
            clientEmail={clientEmail}
            clientPhone={clientPhone}
            projectTitle={projectTitle}
            onChange={(fields) => {
              if (fields.clientName !== undefined) setClientName(fields.clientName);
              if (fields.clientEmail !== undefined) setClientEmail(fields.clientEmail);
              if (fields.clientPhone !== undefined) setClientPhone(fields.clientPhone);
              if (fields.projectTitle !== undefined) setProjectTitle(fields.projectTitle);
            }}
            errors={errors}
          />
        )}

        {/* Step: Service Specific Questions */}
        {currentStep.kind === 'question' && (
          <QuestionStepRenderer
            step={adaptiveSteps[currentStep.questionIndex]}
            answers={answers}
            onAnswerChange={handleAnswerChange}
            errors={errors}
          />
        )}

        {/* Step: Visual Brief Builder (Website Only) */}
        {currentStep.kind === 'visual' && (
          <VisualBriefBuilder
            initialData={visualBrief}
            onChange={(data) => setVisualBrief(data)}
            onDone={handleNext}
          />
        )}

        {/* Step: Additional Notes & Files */}
        {currentStep.kind === 'notes' && (
          <AdditionalNotesStep
            notes={additionalNotes}
            onNotesChange={setAdditionalNotes}
            referenceUrls={referenceUrls}
            onReferenceUrlsChange={setReferenceUrls}
            attachedFiles={attachedFiles}
            onAttachedFilesChange={setAttachedFiles}
          />
        )}

        {/* Step: Final Preview */}
        {currentStep.kind === 'preview' && (
          <FinalPreviewStep
            serviceType={serviceType}
            clientName={clientName}
            clientEmail={clientEmail}
            clientPhone={clientPhone}
            projectTitle={projectTitle}
            answers={answers}
            additionalNotes={additionalNotes}
            referenceUrls={referenceUrls}
            attachedFiles={attachedFiles}
            visualBrief={isWebsiteService ? visualBrief : undefined}
            onEditSection={(target) => {
              if (target === 'client') {
                setCurrentStepIndex(0);
              } else if (target === 'questions') {
                setCurrentStepIndex(1);
              } else if (target === 'visual') {
                const visIdx = flowSteps.findIndex((s) => s.kind === 'visual');
                if (visIdx !== -1) setCurrentStepIndex(visIdx);
              } else if (target === 'notes') {
                const notesIdx = flowSteps.findIndex((s) => s.kind === 'notes');
                if (notesIdx !== -1) setCurrentStepIndex(notesIdx);
              }
            }}
            onSubmit={handleFinalSubmit}
            isSubmitting={isSubmitting}
          />
        )}
      </div>

      {/* Navigation Footer Controls */}
      {currentStep.kind !== 'preview' && (
        <div className="pt-8 mt-10 border-t-2 border-black flex items-center justify-between">
          <button
            onClick={handleBack}
            className="px-6 py-3 rounded-full border-2 border-black bg-white hover:bg-[#FAF7EF] text-xs font-black uppercase text-black shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer"
          >
            {t('btn_back')}
          </button>

          <div className="flex items-center gap-3">
            {currentStep.kind === 'visual' && (
              <button
                onClick={handleNext}
                className="px-4 py-3 rounded-full text-xs font-bold text-black/70 hover:text-black transition-colors"
              >
                {t('btn_skip')}
              </button>
            )}

            <button
              onClick={handleNext}
              className="px-8 py-3.5 rounded-full bg-[#FF2A85] hover:bg-[#e02072] text-white border-2 border-black shadow-[4px_4px_0px_#000] neo-button-hover font-black uppercase tracking-wider text-xs flex items-center gap-2 cursor-pointer"
            >
              <span>{t('btn_next')}</span>
              <ArrowIcon className="w-4 h-4 stroke-[3]" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
