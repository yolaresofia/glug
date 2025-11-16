import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the pathname starts with a valid locale
  const pathnameHasLocale = routing.locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // If path doesn't have a locale and is not root, redirect to Spanish homepage
  if (!pathnameHasLocale && pathname !== '/') {
    const url = request.nextUrl.clone();
    url.pathname = '/es';
    return NextResponse.redirect(url);
  }

  // Otherwise, use the default next-intl middleware
  return intlMiddleware(request);
}

export const config = {
  // Match all pathnames except API routes, Next.js internals, and static files
  matcher: ['/', '/((?!api|_next|_vercel|.*\\..*).*)']
};
