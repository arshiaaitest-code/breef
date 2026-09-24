import React from 'react';
import { useI18n } from '../../locales/i18n';
import { StepDefinition, QuestionDefinition } from '../../types/brief';
import { Check, Sparkles, HelpCircle, Plus, Star } from 'lucide-react';

interface QuestionStepRendererProps {
  step: StepDefinition;
  answers: Record<string, any>;
  onAnswerChange: (questionId: string, value: any) => void;
  errors: Record<string, string>;
}

export const QuestionStepRenderer: React.FC<QuestionStepRendererProps> = ({
  step,
  answers,
  onAnswerChange,
  errors,
}) => {
  const { t, language } = useI18n();

  return (
    <div className="space-y-10">
      {step.questions.map((q, idx) => {
        const questionTitle = t(q.questionKey);
        const questionSubtitle = q.subtitleKey ? t(q.subtitleKey) : undefined;
        const currentAnswer = answers[q.id];
        const error = errors[q.id];

        // Helper to insert a suggested tag into textarea/text
        const handleInsertTag = (tag: string) => {
          const currentText = typeof currentAnswer === 'string' ? currentAnswer.trim() : '';
          if (!currentText) {
            onAnswerChange(q.id, tag);
          } else if (!currentText.includes(tag)) {
            onAnswerChange(q.id, `${currentText} · ${tag}`);
          }
        };

        return (
          <div
            key={q.id}
            className="p-6 sm:p-8 rounded-[28px] bg-white border-3 border-black shadow-[6px_6px_0px_#000] space-y-5 transition-all"
          >
            {/* Question Header Ribbon */}
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="bg-black text-[#E8FF54] text-xs font-mono font-black uppercase px-2.5 py-0.5 rounded-full border border-black shadow-[1.5px_1.5px_0px_#FF2A85]">
                  {step.number}.{idx + 1}
                </span>
                <span className="text-xs font-mono font-bold text-black/60 uppercase">
                  {step.titleKey ? t(step.titleKey) : 'SPECIFICATION'}
                </span>
                {q.required && (
                  <span className="bg-[#FF2A85] text-white text-[10px] font-black uppercase px-2 py-0.5 rounded-full border border-black shadow-[1.5px_1.5px_0px_#000]">
                    {t('required_tag')}
                  </span>
                )}
              </div>

              <h3 className="text-xl sm:text-2xl font-black font-display text-black tracking-tight leading-snug">
                {questionTitle}
              </h3>
              {questionSubtitle && (
                <p className="text-sm text-black/70 font-sans leading-relaxed mt-1">
                  {questionSubtitle}
                </p>
              )}
            </div>

            {/* Guiding Tips Box */}
            {q.guidanceTips && q.guidanceTips.length > 0 && (
              <div className="p-4 rounded-2xl bg-[#FAF7EF] border-2 border-black text-xs text-black/80 space-y-2 shadow-[2px_2px_0px_#000]">
                <div className="flex items-center gap-1.5 font-black uppercase text-black">
                  <Star className="w-3.5 h-3.5 fill-[#FF2A85] text-black" />
                  <span>{language === 'fa' ? 'نکات هدایت‌کننده طراح:' : 'Designer Insights:'}</span>
                </div>
                <ul className="list-disc list-inside space-y-1 pl-1 pr-1 text-[11px] leading-relaxed text-black/80 font-medium">
                  {q.guidanceTips.map((tip, tipIdx) => (
                    <li key={tipIdx}>{tip}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Field Input Rendering */}
            <div>
              {/* Type 1: Single Choice (Electric Acid-Yellow Selected) */}
              {q.type === 'single_choice' && q.options && (
                <div className="space-y-3">
                  {q.options.map((opt) => {
                    const isSelected = currentAnswer === opt.id;
                    const optLabel = t(opt.labelKey);
                    return (
                      <div
                        key={opt.id}
                        onClick={() => onAnswerChange(q.id, opt.id)}
                        className={`p-4 rounded-2xl border-2 border-black cursor-pointer transition-all duration-200 flex items-center justify-between ${
                          isSelected
                            ? 'bg-[#E8FF54] text-black shadow-[4px_4px_0px_#000] translate-x-[-1px] translate-y-[-1px]'
                            : 'bg-[#FAF7EF] hover:bg-white text-black shadow-[2px_2px_0px_#000]'
                        }`}
                      >
                        <span className={`text-sm font-bold leading-snug ${isSelected ? 'text-black' : 'text-black/80'}`}>
                          {optLabel}
                        </span>
                        <div
                          className={`w-5 h-5 rounded-full border-2 border-black flex items-center justify-center transition-colors ${
                            isSelected
                              ? 'bg-black text-white'
                              : 'bg-white'
                          }`}
                        >
                          {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Type 2: Multi Choice (Hot Pink Selected) */}
              {q.type === 'multi_choice' && q.options && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {q.options.map((opt) => {
                    const list: string[] = Array.isArray(currentAnswer) ? currentAnswer : [];
                    const isSelected = list.includes(opt.id);
                    const optLabel = t(opt.labelKey);

                    const toggle = () => {
                      if (isSelected) {
                        onAnswerChange(
                          q.id,
                          list.filter((x) => x !== opt.id)
                        );
                      } else {
                        onAnswerChange(q.id, [...list, opt.id]);
                      }
                    };

                    return (
                      <div
                        key={opt.id}
                        onClick={toggle}
                        className={`p-4 rounded-2xl border-2 border-black cursor-pointer transition-all duration-200 flex items-center justify-between ${
                          isSelected
                            ? 'bg-[#FF2A85] text-white shadow-[4px_4px_0px_#000] translate-x-[-1px] translate-y-[-1px]'
                            : 'bg-[#FAF7EF] hover:bg-white text-black shadow-[2px_2px_0px_#000]'
                        }`}
                      >
                        <span className={`text-sm font-bold leading-snug ${isSelected ? 'text-white' : 'text-black/85'}`}>
                          {optLabel}
                        </span>
                        <div
                          className={`w-5 h-5 rounded-md border-2 border-black flex items-center justify-center transition-colors ${
                            isSelected
                              ? 'bg-black text-white'
                              : 'bg-white'
                          }`}
                        >
                          {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Type 3: Visual Pills (Stark Contrast Black & Neon) */}
              {q.type === 'visual_pills' && q.options && (
                <div className="space-y-3">
                  {q.options.map((opt) => {
                    const isSelected = currentAnswer === opt.id;
                    const optLabel = t(opt.labelKey);

                    return (
                      <div
                        key={opt.id}
                        onClick={() => onAnswerChange(q.id, opt.id)}
                        className={`p-4 rounded-2xl border-2 border-black cursor-pointer transition-all duration-200 flex items-center justify-between ${
                          isSelected
                            ? 'bg-black text-[#E8FF54] shadow-[4px_4px_0px_#FF2A85] translate-x-[-1px] translate-y-[-1px]'
                            : 'bg-white hover:bg-[#FAF7EF] text-black shadow-[2px_2px_0px_#000]'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={`w-3 h-3 rounded-full border border-black ${
                              isSelected ? 'bg-[#FF2A85]' : 'bg-[#FAF7EF]'
                            }`}
                          />
                          <span
                            className={`text-sm font-bold leading-snug ${
                              isSelected ? 'text-[#E8FF54]' : 'text-black'
                            }`}
                          >
                            {optLabel}
                          </span>
                        </div>
                        {isSelected && (
                          <span className="text-[10px] bg-[#FF2A85] text-white px-2 py-0.5 rounded-full border border-black font-black uppercase shadow-[1px_1px_0px_#000]">
                            SELECTED ✦
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Type 4: Textarea */}
              {q.type === 'textarea' && (
                <div className="space-y-3">
                  <textarea
                    rows={4}
                    value={currentAnswer || ''}
                    onChange={(e) => onAnswerChange(q.id, e.target.value)}
                    placeholder={q.placeholderKey ? t(q.placeholderKey) : ''}
                    className="w-full p-4 rounded-2xl border-2 border-black bg-[#FAF7EF] text-black placeholder:text-black/40 focus:outline-none focus:bg-white focus:border-black text-sm leading-relaxed transition-all shadow-[3px_3px_0px_#000]"
                  />
                  {/* Clickable Quick Tags Pills */}
                  {q.suggestedTags && q.suggestedTags.length > 0 && (
                    <div className="flex items-center gap-2 flex-wrap pt-1">
                      <span className="text-[11px] font-mono font-bold text-black/60 uppercase">
                        {language === 'fa' ? 'پیشنهادهای سریع:' : 'Quick tags:'}
                      </span>
                      {q.suggestedTags.map((tag, tagIdx) => (
                        <button
                          key={tagIdx}
                          type="button"
                          onClick={() => handleInsertTag(tag)}
                          className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#E8FF54] hover:bg-[#d6f030] text-xs font-bold text-black border-2 border-black shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer"
                        >
                          <Plus className="w-3 h-3 stroke-[3]" />
                          <span>{tag}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Type 5: Single line text */}
              {q.type === 'text' && (
                <div className="space-y-3">
                  <input
                    type="text"
                    value={currentAnswer || ''}
                    onChange={(e) => onAnswerChange(q.id, e.target.value)}
                    placeholder={q.placeholderKey ? t(q.placeholderKey) : ''}
                    className="w-full p-3.5 rounded-2xl border-2 border-black bg-[#FAF7EF] text-black placeholder:text-black/40 focus:outline-none focus:bg-white focus:border-black text-sm transition-all shadow-[3px_3px_0px_#000]"
                  />
                  {/* Clickable Quick Tags Pills */}
                  {q.suggestedTags && q.suggestedTags.length > 0 && (
                    <div className="flex items-center gap-2 flex-wrap pt-1">
                      <span className="text-[11px] font-mono font-bold text-black/60 uppercase">
                        {language === 'fa' ? 'پیشنهادهای سریع:' : 'Quick tags:'}
                      </span>
                      {q.suggestedTags.map((tag, tagIdx) => (
                        <button
                          key={tagIdx}
                          type="button"
                          onClick={() => handleInsertTag(tag)}
                          className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#E8FF54] hover:bg-[#d6f030] text-xs font-bold text-black border-2 border-black shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer"
                        >
                          <Plus className="w-3 h-3 stroke-[3]" />
                          <span>{tag}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Validation Message */}
            {error && (
              <div className="mt-3 flex items-center gap-1.5 text-xs text-[#FF2A85] font-black uppercase">
                <Sparkles className="w-4 h-4 fill-current" />
                <span>{error}</span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
