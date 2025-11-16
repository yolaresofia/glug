import type { Metadata } from "next";
import Head from "next/head";

import PageBuilderPage from "@/app/components/PageBuilder";
import { sanityFetch } from "@/sanity/lib/live";
import { getPageQuery, pagesSlugs } from "@/sanity/lib/queries";
import { Page as PageType } from "@/sanity.types";
import { client, previewClient } from "@/sanity/lib/client";
import { redirect } from "next/navigation";
import { draftMode } from "next/headers";
import EnableVisualEditing from "../../components/EnableVisualEditing";

type Props = {
  params: Promise<{ slug: string; locale: string }>;
};

export async function generateStaticParams() {
  const locales = ['es', 'ca', 'en'];
  const { data } = await sanityFetch({
    query: pagesSlugs,
    perspective: "published",
    stega: false,
  });

  // Generate params for all locales
  const allParams = locales.flatMap(locale =>
    (data || []).map((page: any) => ({
      slug: page.slug,
      locale,
    }))
  );

  return allParams;
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const { data: page } = await sanityFetch({
    query: getPageQuery,
    params: { slug: params.slug, locale: params.locale },
    stega: false,
  });

  return {
    title: page?.name,
    description: page?.heading,
  };
}

export default async function Page(props: Props) {
  const params = await props.params;
  if (params.slug === "404" || params.slug === "500") return null;

  const { isEnabled: isDraft } = await draftMode();
  const sanityClient = isDraft ? previewClient : client;

  const page = await sanityClient.fetch(
    `*[_type == "page" && slug.current == $slug][0]{
      _id,
      _type,
      "name": name[$locale],
      slug,
      "heading": heading[$locale],
      "subheading": subheading[$locale],
      pageBackgroundColor,
      "pageBuilder": pageBuilder[]{
        ...,
        _type == "callToAction" => {
          _key,
          _type,
          "heading": heading[$locale],
          "text": text[$locale],
          "buttonText": buttonText[$locale],
          link
        },
        _type == "infoWithCTA" => {
          _key,
          _type,
          theme,
          paddingT,
          paddingB,
          mobilePaddingT,
          mobilePaddingB,
          "firstColumnText": firstColumnText[$locale],
          "secondColumnText": secondColumnText[$locale],
          textColor,
          cta {
            ...,
            "text": text[$locale],
            link {
              ...,
              "urlTitle": urlTitle[$locale],
              page-> {
                "name": name[$locale],
                slug
              }
            }
          }
        },
        _type == "mainHero" => {
          ...
        },
        _type == "imageTextBlock" => {
          _key,
          _type,
          theme,
          paddingT,
          paddingB,
          mobilePaddingT,
          mobilePaddingB,
          "text": text[$locale],
          textColor,
          images,
          illustration,
          layout,
          "titleImage1": titleImage1[$locale],
          "textImage1": textImage1[$locale],
          "titleImage2": titleImage2[$locale],
          "textImage2": textImage2[$locale]
        },
        _type == "infoCard" => {
          _key,
          _type,
          paddingT,
          paddingB,
          mobilePaddingT,
          mobilePaddingB,
          theme,
          "title": title[$locale],
          "text": text[$locale],
          textColor,
          image,
          "imageAltText": imageAltText[$locale]
        },
        _type == "featureCard" => {
          _key,
          _type,
          theme,
          paddingT,
          paddingB,
          mobilePaddingT,
          mobilePaddingB,
          textColor,
          variant,
          "title": title[$locale],
          "description": description[$locale],
          price,
          cta {
            "text": text[$locale],
            link {
              ...,
              "urlTitle": urlTitle[$locale],
              page-> {
                "name": name[$locale],
                slug
              }
            },
            variant
          },
          illustration,
          backgroundColor
        }
      }
    }`,
    { slug: params.slug, locale: params.locale }
  );

  if (!page?._id) redirect(`/${params.locale}`);

  return (
    <div
      className={`font-teachers bg-[${page.pageBackgroundColor?.hex ?? "#ffffff"}]`}
    >
      <Head>
        <title>{page.heading}</title>
      </Head>
      <PageBuilderPage page={page as PageType} />
      {isDraft && <EnableVisualEditing />}
    </div>
  );
}
