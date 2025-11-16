"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { SettingsQueryResult } from "@/sanity.types";
import MenuIcon from "./MenuIcon";
import Image from "next/image";
import { PortableText } from "next-sanity";
import Link from "next/link";

type MobileMenuProps = {
  block: SettingsQueryResult;
  onClose: () => void;
  onOpenModal: (url: string) => void; // New function to handle modal opening
};

export default function MobileMenu({
  onClose,
  block,
  onOpenModal,
}: MobileMenuProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const pathname = usePathname();

  // Extract current locale from pathname
  const locale = pathname?.split('/')[1] || 'es';

  useEffect(() => {
    document.body.style.overflow = "hidden";
    setIsAnimating(true);

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => onClose(), 300);
  };

  const handleModalClick = (url: string) => {
    setIsExiting(true);
    setTimeout(() => {
      onClose();
      onOpenModal(url);
    }, 300);
  };

  if (!block) return null;

  return (
    <div
      className={`fixed inset-0 bg-[#F8F6F2] flex flex-col justify-between p-8 z-50 font-teachers 
        transition-transform duration-300 ${isAnimating && !isExiting ? "translate-x-0" : "translate-x-full"}`}
    >
      <div className="flex justify-between items-start">
        <Link href={`/${locale}`}>
          <Image
            // @ts-ignore
            src={block?.mainNavigation?.darkLogo?.url as string}
            alt="Logo"
            width={150}
            height={50}
            className="rounded-xl md:pr-20 w-auto h-auto transition-opacity duration-300"
          />
        </Link>
        <button onClick={handleClose} aria-label="Close menu">
          <MenuIcon width={26} height={25} color={"#712538"} isOpen={true} />
        </button>
      </div>

      <nav className="flex flex-col items-end space-y-8 text-[#541B1E] text-5xl">
        {block?.mainNavigation?.navLinks?.map((link, i) => {
          if (!link) return null;

          // Handle urlTitle which might be a string or array due to type generation
          const urlTitle = typeof link.urlTitle === 'string' ? link.urlTitle : (Array.isArray(link.urlTitle) ? link.urlTitle[0] : 'Untitled Link');
          // Handle page name which might be a string or array
          const pageName = typeof link.page?.name === 'string' ? link.page.name : (Array.isArray(link.page?.name) ? link.page.name[0] : 'Untitled Page');

          if (link.linkType === "href" && link.openType === "modal") {
            return (
              <button
                key={i}
                onClick={() => handleModalClick(link.href as string)}
                className="hover:opacity-70 transition-opacity"
              >
                {urlTitle}
              </button>
            );
          }

          if (link.linkType === "href") {
            return (
              <a
                key={i}
                href={link.href?.startsWith("http") ? link.href : `/${locale}${link.href || ""}`}
                className="hover:opacity-70 transition-opacity"
                onClick={handleClose}
              >
                {urlTitle}
              </a>
            );
          }

          if (link.linkType === "page" && link?.page?.slug?.current) {
            return (
              <a
                key={i}
                href={`/${locale}/${link.page.slug.current}`}
                className="hover:opacity-70 transition-opacity"
                onClick={handleClose}
              >
                {pageName}
              </a>
            );
          }

          return null;
        })}
      </nav>

      <div className="text-right text-[#541B1E] pb-12 flex flex-col space-y-2 text-base max-w-44 ml-auto">
        {block?.footer?.secondColumnFooter?.address?.href && (
          <a
            href={block.footer.secondColumnFooter.address.href}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            {block.footer.secondColumnFooter.address.urlTitle}
          </a>
        )}
        {block?.footer?.secondColumnFooter?.email && (
          <a
            href={`mailto:${block.footer.secondColumnFooter.email}`}
            className="hover:underline"
          >
            {block.footer.secondColumnFooter.email}
          </a>
        )}
        {block?.footer?.secondColumnFooter?.phoneNumber && (
          <a
            href={`tel:${block.footer.secondColumnFooter.phoneNumber}`}
            className="hover:underline"
          >
            {block.footer.secondColumnFooter.phoneNumber}
          </a>
        )}
      </div>
    </div>
  );
}
