"use client";

import { usePathname } from "next/navigation";
import { redirect } from "next/navigation";

export default function NotFound() {
  const pathname = usePathname();

  // Extract locale from pathname, default to 'es'
  const locale = pathname?.split('/')[1] || 'es';

  // Redirect to the localized homepage
  redirect(`/${locale}`);

  return null; // Prevent rendering anything
}