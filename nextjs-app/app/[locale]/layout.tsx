import "../globals.css";

import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Inter, Teachers } from "next/font/google";
import { toPlainText } from "next-sanity";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { routing } from '@/i18n/routing';

import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { settingsQuery } from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/utils"; // ✅ Use this instead of resolveOpenGraphImage
import { handleError } from "../client-utils";
import GlobalAnimations from "../components/GlobalAnimations";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

/**
 * Generate metadata for the page.
 * Learn more: https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { data: settings } = await sanityFetch({
    query: settingsQuery,
    params: { locale },
    stega: false,
  });

  const title = settings?.title || "Glug";
  const description = toPlainText(settings?.description || []);

  const ogImageUrl = settings?.ogImage
      ? urlForImage(settings?.ogImage)?.width(1200)?.height(630)?.url()
      : null;

  return {
    title: {
      template: `%s | ${title}`,
      default: title,
    },
    description,
    openGraph: {
      title,
      description,
      images: ogImageUrl
        ? [
            {
              url: ogImageUrl,
              width: 1200,
              height: 630,
              alt: "Open Graph Image",
            },
          ]
        : [],
    },
  };
}

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const teachers = Teachers({ subsets: ["latin"], weight: ["400", "600"] });

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

  const { data: settings } = await sanityFetch({
    query: settingsQuery,
    params: { locale },
  });

  return (
    <html lang={locale} className={`${teachers} text-black`}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <section>
            <SanityLive onError={handleError} />
            <GlobalAnimations />
            {/* @ts-ignore */}
            {settings && <Header block={settings} />}
            <main>{children}</main>
            {/* @ts-ignore */}
            <Footer block={settings} />
          </section>
          <SpeedInsights />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
