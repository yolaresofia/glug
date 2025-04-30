import type { Metadata } from "next";
import Head from "next/head";

import PageBuilderPage from "@/app/components/PageBuilder";
import { sanityFetch } from "@/sanity/lib/live";
import { getPageQuery, pagesSlugs } from "@/sanity/lib/queries";
import { Page as PageType } from "@/sanity.types";
import { client, previewClient } from "@/sanity/lib/client";
import { redirect } from "next/navigation";
import { draftMode } from "next/headers";
import EnableVisualEditing from "../components/EnableVisualEditing";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const { data } = await sanityFetch({
    query: pagesSlugs,
    perspective: "published",
    stega: false,
  });
  return data;
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const { data: page } = await sanityFetch({
    query: getPageQuery,
    params,
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
    '*[_type == "page" && slug.current == $slug][0]',
    { slug: params.slug }
  );

  if (!page?._id) redirect("/");

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
