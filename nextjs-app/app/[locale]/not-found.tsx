"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function NotFound() {
  const pathname = usePathname();
  const router = useRouter();

  // Extract locale from pathname, default to 'es'
  const locale = pathname?.split('/')[1] || 'es';

  useEffect(() => {
    // Redirect to the localized homepage
    router.replace(`/${locale}`);
  }, [locale, router]);

  return <div>Redirecting...</div>;
}
