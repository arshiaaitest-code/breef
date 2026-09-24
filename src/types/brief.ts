export type ServiceType =
  | 'website'
  | 'logo'
  | 'brand_identity'
  | 'app'
  | 'packaging'
  | 'graphic_design'
  | 'other';

export type BriefStatus = 'new' | 'reviewing' | 'in_progress' | 'completed';

export type VisualElementType =
  | 'text'
  | 'image'
  | 'palette'
  | 'card'
  | 'shape'
  | 'navbar'
  | 'hero'
  | 'button'
  | 'note';

export interface VisualElement {
  id: string;
  type: VisualElementType;
  content?: string;
  subtitle?: string;
  color?: string;
  secondaryColor?: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation?: number;
  fontSize?: number;
  fontStyle?: 'serif' | 'sans';
  textAlign?: 'left' | 'center' | 'right';
  borderRadius?: number;
  zIndex?: number;
  tag?: string;
  hasTape?: boolean;
}

export interface VisualBriefData {
  templateId: string;
  templateName: string;
  backgroundColor: string;
  elements: VisualElement[];
  resolution?: {
    width: number;
    height: number;
    name?: string;
  };
}

export interface QuestionOption {
  id: string;
  labelKey: string;
  descriptionKey?: string;
  icon?: string;
  badge?: string;
}

export type QuestionInputType =
  | 'text'
  | 'textarea'
  | 'single_choice'
  | 'multi_choice'
  | 'visual_pills'
  | 'tone_slider'
  | 'url_list'
  | 'color_picker_multi';

export interface QuestionDefinition {
  id: string;
  stepId: string;
  questionKey: string;
  subtitleKey?: string;
  type: QuestionInputType;
  required?: boolean;
  placeholderKey?: string;
  options?: QuestionOption[];
  minChoices?: number;
  maxChoices?: number;
  guidanceTips?: string[];
  suggestedTags?: string[];
  sliderLabels?: {
    leftKey: string;
    rightKey: string;
  };
}

export interface StepDefinition {
  id: string;
  number: string;
  titleKey: string;
  descriptionKey?: string;
  questions: QuestionDefinition[];
}

export interface AttachedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
  previewUrl?: string;
}

export interface BriefSubmission {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  projectTitle: string;
  serviceType: ServiceType;
  slug: string;
  status: BriefStatus;
  createdAt: string;
  updatedAt: string;
  answers: Record<string, any>;
  additionalNotes?: string;
  referenceUrls?: string[];
  attachedFiles?: AttachedFile[];
  visualBrief?: VisualBriefData;
  designerNotes?: string;
}

export interface ServiceItem {
  id: ServiceType;
  titleFa: string;
  titleEn: string;
  taglineFa: string;
  taglineEn: string;
  image: string;
  estimatedTime: string;
}
