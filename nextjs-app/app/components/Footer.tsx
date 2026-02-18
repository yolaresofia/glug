/* eslint-disable @next/next/no-img-element */
"use client";
import { SettingsQueryResult } from "@/sanity.types";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { getLocaleString } from "@/app/lib/localeUtils";
import ReservationModal from "./ReservationModal";

type FooterProps = {
  block: SettingsQueryResult | null;
};

export default function Footer({ block }: FooterProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalUrl, setModalUrl] = useState<string | null>(null);
  const pathname = usePathname();

  // Extract current locale from pathname
  const locale = pathname?.split("/")[1] || "es";

  const handleOpenModal = (url: string) => {
    setModalUrl(url);
    setIsModalOpen(true);
  };
  if (!block) return null;
  const footer = block.footer;

  return (
    <footer className="text-[#ECE8E2] pb-40 pt-8 md:pt-52 lg:px-20 px-8 bg-[#712538] z-50 w-full font-teachers border-t border-[#ECE8E2] h-screen">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-12 lg:gap-16 [align-items:flex-start] text-[14px] justify-start">
        <div className="flex flex-col gap-4 md:col-span-3 lg:col-span-1 pb-6 lg:pb-0">
          <Link href={`/${locale}`}>
            <img
              src={block?.mainNavigation?.lightLogo?.url as string}
              alt="Logo"
              className="w-[85px] h-auto"
            />
          </Link>
        </div>

        <div className="flex flex-col max-w-48">
          <a
            href={footer?.secondColumnFooter?.address?.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-left h-full"
          >
            {getLocaleString(
              footer?.secondColumnFooter?.address?.urlTitle,
              locale,
            )}
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
            {getLocaleString(
              footer?.thirdColumnFooter?.instagram?.urlTitle,
              locale,
            )}
          </a>
        </div>
        <div className="flex flex-col text-left space-y-1">
          <div className="flex flex-col text-left space-y-1">
            {footer?.fourthColumnFooter?.map((link, index) => {
              if (!link || !link.linkType) return null;
              if (link.linkType === "href" && link.href && link.urlTitle) {
                const urlTitle = getLocaleString(link.urlTitle, locale);
                const isExternalLink = link.href.startsWith("http");

                if (urlTitle.toLowerCase() === "reservas") {
                  return (
                    <button
                      key={index}
                      onClick={() => handleOpenModal(link?.href as string)}
                      className="text-left"
                    >
                      {urlTitle}
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
                      {urlTitle}
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
                    {urlTitle}
                  </Link>
                );
              }
              if (
                link.linkType === "page" &&
                link.page &&
                link.page.slug?.current
              ) {
                const pageTitle =
                  getLocaleString(link.page.name, locale) || "Página";
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
        <div className="text-left max-w-48">
          <a
            href="mailto:info@glugbarcelona.com"
            rel="noopener noreferrer"
            className="h-full"
          >
            {getLocaleString(footer?.workForUs, locale) ||
              "¿Quieres trabajar con nosotros?"}
          </a>
        </div>
      </div>
      <div className="flex flex-col md:flex-row md:justify-around md:items-center items-start w-full pt-12 md:pt-32 md:px-20 lg:px-52 text-[14px]">
        <h3 className="md:w-1/3">Premios y reconocimientos</h3>
        <div className="flex flex-row justify-around w-full md:px-12 pt-6 md:pt-0">
          {(block?.mainNavigation as any)?.michelinLogo?.url && (
            <img
              src={(block?.mainNavigation as any)?.michelinLogo?.url as string}
              alt="Michelin Logo"
              className="w-12 lg:w-20 h-auto pt-4 object-contain"
            />
          )}
            <img
              src="/images/star-wine-list.png"
              alt="Star Wine List"
              className="w-8 lg:w-14 h-auto pt-4 object-contain"
            />
           <img
              src="/images/guia-repsol.png"
              alt="Guia Repsol"
              className="w-8 lg:w-14 h-auto pt-4 object-contain"
            />
        </div>
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
