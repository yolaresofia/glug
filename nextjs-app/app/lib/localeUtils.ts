/**
 * Utility functions for handling LocaleString types from Sanity
 */

// Type for a single LocaleString object
type LocaleStringObj = {
  _type?: "localeString";
  es?: string;
  ca?: string;
  en?: string;
};

// Type for an array of LocaleString objects (from GROQ queries)
type LocaleStringArray = Array<LocaleStringObj> | null | undefined;

// Type for a single LocaleString (from schema types)
type LocaleString = LocaleStringObj | null | undefined;

type Locale = 'es' | 'ca' | 'en';

/**
 * Extracts a locale-specific string from a LocaleString or array of LocaleStrings
 * Handles both:
 * - Direct LocaleString objects: { es: "text", ca: "text", en: "text" }
 * - Arrays from GROQ queries: [{ _type: "localeString", es: "text", ... }]
 */
export function getLocaleString(
  value: LocaleString | LocaleStringArray | string | unknown,
  locale: string = 'es'
): string {
  // If it's already a string, return it
  if (typeof value === 'string') {
    return value;
  }

  // If it's null/undefined, return empty string
  if (!value) {
    return '';
  }

  const loc = locale as Locale;

  // If it's an array (from GROQ query results)
  if (Array.isArray(value)) {
    if (value.length === 0) return '';
    const firstItem = value[0] as LocaleStringObj;
    return firstItem?.[loc] || firstItem?.es || '';
  }

  // If it's a direct LocaleString object
  if (typeof value === 'object' && value !== null) {
    const obj = value as LocaleStringObj;
    return obj?.[loc] || obj?.es || '';
  }

  return '';
}
