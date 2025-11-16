/* eslint-disable @next/next/no-img-element */
"use client";
import { SettingsQueryResult } from "@/sanity.types";
import Link from "next/link";
import { useState } from "react";
import ReservationModal from "./ReservationModal";

type FooterProps = {
  block: SettingsQueryResult | null;
};

export default function Footer({ block }: FooterProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalUrl, setModalUrl] = useState<string | null>(null);

  const handleOpenModal = (url: string) => {
    setModalUrl(url);
    setIsModalOpen(true);
  };
  if (!block) return null;
  const footer = block.footer;

  return (
    <footer className="text-[#ECE8E2] flex flex-col lg:grid grid-cols-5 gap-4 [align-items:flex-start] text-[14px] justify-start pb-40 pt-20 lg:px-20 px-8 bg-[#712538] z-50 w-full font-teachers border-t border-[#ECE8E2]">
      <Link href="/">
        <img
          src={block?.mainNavigation?.lightLogo?.url as string}
          alt="alttext"
          className="lg:w-1/3 h-auto pb-6 lg:pb-0"
        />
      </Link>

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
            if (
              link.linkType === "page" &&
              link.page &&
              link.page.slug?.current
            ) {
              const pageTitle = link.page.name || link.page?.name || "Página";
              const path = `/${link.page.slug.current}`;

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
