/* eslint-disable @next/next/no-img-element */
"use client";
import { SettingsQueryResult } from "@/sanity.types";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import ReservationModal from "./ReservationModal";

type FooterProps = {
  block: SettingsQueryResult | null;
};

export default function Footer({ block }: FooterProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalUrl, setModalUrl] = useState<string | null>(null);
  const pathname = usePathname();

  // Extract current locale from pathname
  const locale = pathname?.split('/')[1] || 'es';

  const handleOpenModal = (url: string) => {
    setModalUrl(url);
    setIsModalOpen(true);
  };
  if (!block) return null;
  const footer = block.footer;

  return (
    <footer className="text-[#ECE8E2] flex flex-col lg:grid grid-cols-5 gap-4 [align-items:flex-start] text-[14px] justify-start pb-40 pt-20 lg:px-20 px-8 bg-[#712538] z-50 w-full font-teachers border-t border-[#ECE8E2]">
      <div className="flex flex-col gap-4 pb-6 lg:pb-0">
        <Link href={`/${locale}`}>
          <img
            src={block?.mainNavigation?.lightLogo?.url as string}
            alt="Logo"
            className="lg:w-1/3 h-auto"
          />
        </Link>
        {(block?.mainNavigation as any)?.michelinLogo?.url && (
          <img
            src={(block?.mainNavigation as any)?.michelinLogo?.url as string}
            alt="Michelin Logo"
            className="w-24 lg:w-1/3 h-auto pt-4"
          />
        )}
      </div>

      <div className="flex flex-col max-w-36">
        <a
          href={footer?.secondColumnFooter?.address?.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-left h-full"
        >
          {footer?.secondColumnFooter?.address?.urlTitle}
        </a>
        <a
          href={`mailto:${footer?.secondColumnFooter?.email}`}
          className="text-left h-full pt-6"
        >
          {footer?.secondColumnFooter?.email}
        </a>
        <a
          href={`tel:${footer?.secondColumnFooter?.phoneNumber}`}
          className="text-left h-full"
        >
          {footer?.secondColumnFooter?.phoneNumber}
        </a>
      </div>
      <div className="text-left">
        <a
          href={footer?.thirdColumnFooter?.instagram?.href}
          target="_blank"
          rel="noopener noreferrer"
          className="h-full"
        >
          {footer?.thirdColumnFooter?.instagram?.urlTitle}
        </a>
      </div>
      <div className="flex flex-col text-left space-y-1">
        <div className="flex flex-col text-left space-y-1">
          {footer?.fourthColumnFooter?.map((link, index) => {
            if (!link || !link.linkType) return null;
            if (link.linkType === "href" && link.href && link.urlTitle) {
              const urlTitle = typeof link.urlTitle === 'string' ? link.urlTitle : '';
              const isExternalLink = link.href.startsWith("http");

              if (urlTitle.toLowerCase() === "reservas") {
                return (
                  <button
                    key={index}
                    onClick={() => handleOpenModal(link?.href as string)}
                    className="text-left"
                  >
                    {link.urlTitle}
                  </button>
                );
              }

              if (isExternalLink) {
                return (
                  <a
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-left"
                  >
                    {link.urlTitle}
                  </a>
                );
              }

              // Internal link - add locale
              return (
                <Link
                  key={index}
                  href={`/${locale}${link.href}`}
                  className="text-left"
                >
                  {link.urlTitle}
                </Link>
              );
            }
            if (
              link.linkType === "page" &&
              link.page &&
              link.page.slug?.current
            ) {
              const pageTitle = link.page.name || link.page?.name || "Página";
              const path = `/${locale}/${link.page.slug.current}`;

              return (
                <Link key={index} href={path} className="text-left">
                  {pageTitle}
                </Link>
              );
            }

            return null;
          })}
        </div>
      </div>
      <div className="text-left max-w-36">
        <a
          href="mailto:info@glugbarcelona.com"
          rel="noopener noreferrer"
          className="h-full"
        >
         {footer?.workForUs || '¿Quieres trabajar con nosotros?'}
        </a>
      </div>
      
      {isModalOpen && modalUrl && (
        <ReservationModal
          isOpen={isModalOpen}
          url={modalUrl}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </footer>
  );
}
