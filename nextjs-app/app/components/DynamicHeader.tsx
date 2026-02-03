"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { settingsQuery } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";

type UrlObject = {
  url: string | undefined;
};

type DynamicHeaderProps = {
  onThemeChange?: (theme: string) => void;
};

export default function DynamicHeader({ onThemeChange }: DynamicHeaderProps) {
  const [textColor, setTextColor] = useState("#ECE8E2");
  const [currentLogo, setCurrentLogo] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [darkLogoUrl, setDarkLogoUrl] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    const getData = async () => {
      // Extract locale from pathname (e.g., /es/about -> es)
      const locale = pathname?.split('/')[1] || 'es';
      const data = await client.fetch(settingsQuery, { locale });
      const lightLogo = (data?.mainNavigation?.lightLogo as UrlObject | undefined)?.url || "";
      const darkLogo = (data?.mainNavigation?.darkLogo as UrlObject | undefined)?.url || "";

      setLogoUrl(lightLogo);
      setDarkLogoUrl(darkLogo);

      // Check current section theme to set correct initial logo
      const sections = document.querySelectorAll("section");
      let initialLogo = lightLogo; // Default for dark backgrounds
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top >= 0 && rect.top < window.innerHeight / 2) {
          const sectionType = section.getAttribute("data-section");
          if (sectionType === "lightTheme") {
            initialLogo = darkLogo;
            setTextColor("#712538");
          }
        }
      });
      setCurrentLogo(initialLogo);
    };

    getData();
  }, [pathname]);

  useEffect(() => {
    let observer: IntersectionObserver | null = null;
    let footerObserver: IntersectionObserver | null = null;

    const updateNavbarTheme = () => {
      const sections = document.querySelectorAll("section");
      let found = false;

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top >= 0 && rect.top < window.innerHeight / 2) {
          const sectionType = section.getAttribute("data-section");
          if (sectionType === "lightTheme") {
            setTextColor("#712538");
            setCurrentLogo(darkLogoUrl);
            onThemeChange?.("lightTheme");
          } else {
            setTextColor("#ECE8E2");
            setCurrentLogo(logoUrl);
            onThemeChange?.("darkTheme");
          }
          found = true;
        }
      });

      if (!found) {
        setTextColor("#ECE8E2");
        setCurrentLogo(logoUrl);
        onThemeChange?.("darkTheme");
      }
    };

    updateNavbarTheme();

    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const sectionType = entry.target.getAttribute("data-section");
            if (sectionType === "lightTheme") {
              setTextColor("#712538");
              setCurrentLogo(darkLogoUrl);
              onThemeChange?.("lightTheme");
            } else {
              setTextColor("#ECE8E2");
              setCurrentLogo(logoUrl);
              onThemeChange?.("darkTheme");
            }
          }
        }
      },
      { rootMargin: "-50px 0px 0px 0px", threshold: 0.6 }
    );

    document
      .querySelectorAll("section")
      .forEach((section) => observer!.observe(section));

    // Footer observer - footer has dark background so use light logo
    const footer = document.querySelector("footer");
    if (footer) {
      footerObserver = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              setTextColor("#ECE8E2");
              setCurrentLogo(logoUrl);
              onThemeChange?.("darkTheme");
            }
          }
        },
        { rootMargin: "-50px 0px 0px 0px", threshold: 0.1 }
      );
      footerObserver.observe(footer);
    }

    return () => {
      if (observer) observer.disconnect();
      if (footerObserver) footerObserver.disconnect();
    };
  }, [pathname, darkLogoUrl, logoUrl]);

  // Extract locale from pathname for the home link
  const locale = pathname?.split('/')[1] || 'es';

  return (
    <>
      <style>{`
        header {
          color: ${textColor};
        }
      `}</style>

      <Link href={`/${locale}`} className="flex items-center">
        {currentLogo && (
          <Image
            src={currentLogo}
            alt="Logo"
            width={160}
            height={50}
            className="rounded-xl md:pr-20 w-auto h-auto transition-opacity duration-300"
          />
        )}
      </Link>
    </>
  );
}
