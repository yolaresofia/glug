"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { linkResolver } from "@/sanity/lib/utils";

interface ResolvedLinkProps {
  link: any;
  children: React.ReactNode;
  className?: string;
}

export default function ResolvedLink({
  link,
  children,
  className,
}: ResolvedLinkProps) {
  const pathname = usePathname();

  // Extract current locale from pathname
  const locale = pathname?.split('/')[1] || 'es';

  // resolveLink() is used to determine the type of link and return the appropriate URL.
  const resolvedLink = linkResolver(link, locale);

  if (typeof resolvedLink === "string") {
    return (
      <Link
        href={resolvedLink}
        target={link?.openInNewTab ? "_blank" : undefined}
        rel={link?.openInNewTab ? "noopener noreferrer" : undefined}
        className={className}
      >
        {children}
      </Link>
    );
  }
  return <>{children}</>;
}
