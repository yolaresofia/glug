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
    <footer className="text-[#ECE8E2] pb-40 pt-8 lg:pt-52 bg-[#712538] z-50 w-full font-teachers border-t border-[#ECE8E2] lg:h-screen md:h-auto h-screen flex flex-col justify-center lg:justify-start">
      <div className="grid grid-cols-1 gap-8 [align-items:flex-start] text-[14px] justify-start lg:hidden px-8">
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

      {/* Desktop layout - mirrors header alignment */}
      <div className="hidden lg:flex items-start text-[14px] justify-between px-20">
        {/* Invisible spacer matching header logo width */}
        <div className="w-[85px] shrink-0" />
        <div className="flex w-1/2">
          <div className="text-left pl-12 leading-tight w-[200px]">
            <a
              href={footer?.thirdColumnFooter?.instagram?.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {getLocaleString(
                footer?.thirdColumnFooter?.instagram?.urlTitle,
                locale,
              )}
            </a>
          </div>
          <div className="text-left pl-12 leading-tight flex flex-col space-y-1">
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
        <nav className="flex justify-end w-1/2">
          <a
            href="mailto:info@glugbarcelona.com"
            rel="noopener noreferrer"
            className="text-right"
          >
            {getLocaleString(footer?.workForUs, locale) ||
              "¿Quieres trabajar con nosotros?"}
          </a>
        </nav>
      </div>
      <div className="border-t border-t-[#ECE8E2] w-screen mt-24 lg:block hidden"></div>
      <div className="flex flex-col items-start w-full md:pt-24 pt-12 lg:flex-row lg:items-center lg:pl-[213px] lg:pr-20 text-[14px] px-8">
        <h3 className="lg:w-1/3">Premios y reconocimientos</h3>
        <div className="flex flex-row justify-start gap-4 lg:gap-20 w-full lg:px-0 pt-2 lg:pt-0">
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
