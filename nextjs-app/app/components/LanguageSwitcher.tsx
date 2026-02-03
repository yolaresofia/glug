"use client";

import { usePathname, useRouter } from "@/i18n/routing";
import { useParams } from "next/navigation";

type Locale = "es" | "ca" | "en";

const languages = [
  { code: "es" as Locale, label: "ES" },
  { code: "ca" as Locale, label: "CA" },
  { code: "en" as Locale, label: "EN" },
];

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const currentLocale = (params?.locale as Locale) || "es";

  const handleLanguageChange = (newLocale: Locale) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className="flex gap-3 items-center">
      {languages.map((lang, index) => (
        <span key={lang.code} className="flex items-center">
          <button
            onClick={() => handleLanguageChange(lang.code)}
            className={`transition-opacity ${
              currentLocale === lang.code
                ? "font-bold opacity-100"
                : "opacity-50 hover:opacity-70"
            }`}
            aria-label={`Switch to ${lang.label}`}
          >
            {lang.label}
          </button>
        </span>
      ))}
    </div>
  );
}
