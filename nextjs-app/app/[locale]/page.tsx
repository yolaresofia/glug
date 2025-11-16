import { client, previewClient } from "@/sanity/lib/client";
import BlockRenderer from "../components/BlockRenderer";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import EnableVisualEditing from "../components/EnableVisualEditing";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function Page(props: Props) {
  const params = await props.params;
  const { isEnabled: isDraft } = await draftMode();
  const sanityClient = isDraft ? previewClient : client;

  const page = await sanityClient.fetch(
    `*[_type == "page" && slug.current == "/"][0]{
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
    { locale: params.locale }
  );

  if (!page) {
    notFound();
  }

  return (
    <div className="font-teachers">
      {page.pageBuilder && Array.isArray(page.pageBuilder) && page.pageBuilder.map((block: any, index: number) => (
        <BlockRenderer
          key={block._key}
          index={index}
          block={block}
          pageId={page._id}
          pageType={page._type}
        />
      ))}
      {isDraft && <EnableVisualEditing />}
    </div>
  );
}
