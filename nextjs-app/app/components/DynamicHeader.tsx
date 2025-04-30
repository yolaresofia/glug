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

export default function DynamicHeader() {
  const [textColor, setTextColor] = useState("#ECE8E2");
  const [currentLogo, setCurrentLogo] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [darkLogoUrl, setDarkLogoUrl] = useState("");
  const pathname = usePathname();

  const getData = async () => {
    const data = await client.fetch(settingsQuery);
    setLogoUrl(
      (data?.mainNavigation?.lightLogo as UrlObject | undefined)?.url || ""
    );
    setDarkLogoUrl(
      (data?.mainNavigation?.darkLogo as UrlObject | undefined)?.url || ""
    );
    setCurrentLogo(
      (data?.mainNavigation?.lightLogo as UrlObject | undefined)?.url || ""
    );
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    let observer: IntersectionObserver | null = null;

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
          } else {
            setTextColor("#ECE8E2");
            setCurrentLogo(logoUrl);
          }
          found = true;
        }
      });

      if (!found) {
        setTextColor("#ECE8E2");
        setCurrentLogo(logoUrl);
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
            } else {
              setTextColor("#ECE8E2");
              setCurrentLogo(logoUrl);
            }
          }
        }
      },
      { rootMargin: "-50px 0px 0px 0px", threshold: 0.6 }
    );

    document
      .querySelectorAll("section")
      .forEach((section) => observer!.observe(section));

    return () => {
      if (observer) observer.disconnect();
    };
  }, [pathname, darkLogoUrl, logoUrl]);

  return (
    <>
      <style>{`
        header {
          color: ${textColor};
        }
      `}</style>

      <Link href="/" className="flex items-center">
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
