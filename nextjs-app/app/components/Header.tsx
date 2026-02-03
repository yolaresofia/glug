"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SettingsQueryResult, Settings as SettingsType } from "@/sanity.types";

import DynamicHeader from "./DynamicHeader";
import LanguageSwitcher from "./LanguageSwitcher";
import MenuIcon from "./MenuIcon";
import MobileMenu from "./MobileMenu";
import ReservationModal from "./ReservationModal";

type HeaderProps = {
  block: SettingsQueryResult | null;
};

export default function Header({ block }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalUrl, setModalUrl] = useState<string | null>(null);
  const [headerTheme, setHeaderTheme] = useState("darkTheme");
  const pathname = usePathname();

  // Extract current locale from pathname
  const locale = pathname?.split('/')[1] || 'es';

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const handleOpenModal = (url: string) => {
    setModalUrl(url);
    setIsModalOpen(true);
  };

  if (!block) return null;

  return (
    <div>
      <header className="lg:hidden flex justify-between w-full fixed top-8 left-0 px-8 items-center z-50">
        <DynamicHeader onThemeChange={setHeaderTheme} />
        <button onClick={toggleMenu} aria-label="Toggle menu">
          <MenuIcon
            width={40}
            height={22}
            isOpen={isMenuOpen}
            theme={headerTheme}
          />
        </button>
      </header>

      {isMenuOpen && (
        <MobileMenu
          block={block}
          onClose={toggleMenu}
          onOpenModal={handleOpenModal}
        />
      )}

      <header className="fixed top-0 left-0 lg:flex hidden items-center text-[14px] justify-between px-20 py-8 bg-transparent z-50 w-full font-teachers transition-colors duration-300">
        <DynamicHeader />
        <div className="flex w-1/2">
          <div
            className="text-left pl-12 leading-tight w-[200px]"
          >
            <a
              href={block?.footer?.secondColumnFooter?.address?.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-left h-full"
            >
              {block?.footer?.secondColumnFooter?.address?.urlTitle}
            </a>
          </div>
          <div className="text-left leading-tight flex flex-col pl-12">
            <a
              href={`mailto:${block?.footer?.secondColumnFooter?.email}`}
              className="cursor-pointer"
            >
              {block?.footer?.secondColumnFooter?.email}
            </a>
            <a
              href={`tel:${block?.footer?.secondColumnFooter?.phoneNumber}`}
              className="cursor-pointer"
            >
              {block?.footer?.secondColumnFooter?.phoneNumber}
            </a>
          </div>
        </div>

        <nav className="flex justify-end gap-11 w-1/2 font-semibold items-center">
          {block?.mainNavigation?.navLinks?.map((link, i) => {
            if (!link) return null;

            const isExternalLink = link?.href?.startsWith("http");
            // Handle urlTitle which might be a string or array due to type generation
            const urlTitle = typeof link.urlTitle === 'string' ? link.urlTitle : (Array.isArray(link.urlTitle) ? link.urlTitle[0] : 'Untitled Link');
            // Handle page name which might be a string or array
            const pageName = typeof link.page?.name === 'string' ? link.page.name : (Array.isArray(link.page?.name) ? link.page.name[0] : 'Untitled Page');

            if (link.linkType === "href" && link.openType === "modal") {
              return (
                <button
                  key={i}
                  onClick={() => handleOpenModal(link?.href as string)}
                  className="hover:opacity-70 transition-opacity"
                >
                  {urlTitle}
                </button>
              );
            }

            if (link.linkType === "href") {
              return isExternalLink ? (
                <a
                  key={i}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-70 transition-opacity"
                >
                  {urlTitle}
                </a>
              ) : (
                <Link
                  key={i}
                  href={`/${locale}${link.href || ""}`}
                  className="hover:opacity-70 transition-opacity"
                >
                  {urlTitle}
                </Link>
              );
            }

            if (link.linkType === "page" && link?.page?.slug?.current) {
              return (
                <Link
                  key={i}
                  href={`/${locale}/${link.page.slug.current}`}
                  className="hover:opacity-70 transition-opacity"
                >
                  {pageName}
                </Link>
              );
            }
            return null;
          })}
          <LanguageSwitcher />
        </nav>
      </header>

      {isModalOpen && modalUrl && (
        <ReservationModal
          isOpen={isModalOpen}
          url={modalUrl}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}
