import { ServiceItem } from '../types/brief';

// Local high-fidelity images generated according to skill requirements
import websiteImg from '../assets/images/service_website_editorial_1790256432316.jpg';
import brandImg from '../assets/images/service_brand_editorial_1790256443568.jpg';
import packagingImg from '../assets/images/service_packaging_editorial_1790256454270.jpg';
import studioImg from '../assets/images/hero_editorial_studio_1790256419733.jpg';

export { studioImg };

export const SERVICES_LIST: ServiceItem[] = [
  {
    id: 'website',
    titleFa: 'طراحی وب‌سایت',
    titleEn: 'Website Design',
    taglineFa: 'معماری مدرن، ادیتوریال و داستان‌محور در بستر وب',
    taglineEn: 'Modern, editorial, and narrative-driven web experiences',
    image: websiteImg,
    estimatedTime: '۴ الی ۶ هفته',
  },
  {
    id: 'logo',
    titleFa: 'طراحی لوگو',
    titleEn: 'Logo Design',
    taglineFa: 'نشان ماندگار و بااصالت؛ تعریف عصاره برند',
    taglineEn: 'Timeless mark & essence of your brand signature',
    image: brandImg,
    estimatedTime: '۲ الی ۳ هفته',
  },
  {
    id: 'brand_identity',
    titleFa: 'طراحی هویت بصری',
    titleEn: 'Brand Identity',
    taglineFa: 'سیستم جامع دیزاین: رنگ، تایپوگرافی، اقلام و راهنما',
    taglineEn: 'Complete design system: colors, typography & guidelines',
    image: brandImg,
    estimatedTime: '۳ الی ۵ هفته',
  },
  {
    id: 'app',
    titleFa: 'طراحی اپلیکیشن',
    titleEn: 'Application Design',
    taglineFa: 'واسط و تجربه کاربری ملموس و روان (UI/UX)',
    taglineEn: 'Tactile and fluid interfaces & user experience',
    image: studioImg,
    estimatedTime: '۵ الی ۸ هفته',
  },
  {
    id: 'packaging',
    titleFa: 'طراحی بسته‌بندی',
    titleEn: 'Packaging Design',
    taglineFa: 'بسته‌بندی فاخر، متریال خاص و اثرگذار بر قفسه',
    taglineEn: 'Sculptural packaging crafted to captivate physically',
    image: packagingImg,
    estimatedTime: '۳ الی ۴ هفته',
  },
  {
    id: 'graphic_design',
    titleFa: 'طراحی گرافیک',
    titleEn: 'Graphic Design',
    taglineFa: 'پوستر، مونوگراف، نشریه و اقلام اختصاصی استودیو',
    taglineEn: 'Editorial posters, catalogues, and bespoke collateral',
    image: websiteImg,
    estimatedTime: '۱ الی ۳ هفته',
  },
  {
    id: 'other',
    titleFa: 'سایر پروژه‌های طراحی',
    titleEn: 'Other Bespoke Design',
    taglineFa: 'پروژه‌های خلاقانه تلفیقی یا تجربه‌های نامتعارف',
    taglineEn: 'Interdisciplinary & experimental creative concepts',
    image: studioImg,
    estimatedTime: 'متناسب با پروژه',
  },
];
