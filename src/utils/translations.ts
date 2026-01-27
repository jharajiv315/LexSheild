import { LanguageCode } from '../contexts/LanguageContext';

// Import all translation files
import en from '../translations/en';
import hi from '../translations/hi';
import mr from '../translations/mr';
import bn from '../translations/bn';
import ta from '../translations/ta';
import te from '../translations/te';
import gu from '../translations/gu';
import kn from '../translations/kn';
import ml from '../translations/ml';
import pa from '../translations/pa';
import ur from '../translations/ur';

export const translations: Record<LanguageCode, any> = {
  en,
  hi,
  mr,
  bn,
  ta,
  te,
  gu,
  kn,
  ml,
  pa,
  ur,
};

export function getTranslation(lang: LanguageCode, key: string): string {
  const keys = key.split('.');
  let value: any = translations[lang] || translations.en;
  
  for (const k of keys) {
    value = value?.[k];
    if (!value) {
      // Fallback to English
      value = translations.en;
      for (const fallbackK of keys) {
        value = value?.[fallbackK];
      }
      break;
    }
  }
  
  return value || key;
}