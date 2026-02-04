/* eslint-disable @next/next/no-img-element */
import { InfoCard as InfoCardType } from "@/sanity.types";
import { urlForImage } from "@/sanity/lib/utils";
import { PortableText, PortableTextBlock } from "next-sanity";

type InfoCardProps = {
  block: InfoCardType;
  index: number;
};

// Note: The GROQ query already extracts locale-specific values,
// so block.title, block.text etc. are already resolved (string or PortableText array)

export default function InfoCard({ block }: InfoCardProps) {
  if (!block) return null;

  // Cast to any since GROQ query transforms types - values are already locale-resolved
  const title = (block as any)?.title || '';
  const textContent = (block as any)?.text;

  return (
    <section
      className={`flex flex-col lg:px-20 px-5 text-[${block?.textColor?.hex?.toUpperCase()}] pt-${block?.paddingT} pb-${block?.paddingB}`}
      data-section={block?.theme}
    >
      <h1 className="anim lg:text-[200px] text-8xl text-left md:pl-40 lg:pl-[360px] max-w-10 leading-[0.8] pb-20">
        {title}
      </h1>
      <div className="w-full rounded-xl overflow-hidden">
        <div
          className="bg-cover bg-center w-full min-h-[500px] lg:min-h-[800px] rounded-xl anim"
          style={{
            backgroundImage: `url(${urlForImage(block?.image)?.url()})`,
          }}
        ></div>
      </div>

      <div className="pt-20 md:text-2xl text-xl max-w-[12. 00px] md:pl-40 lg:pl-[360px] anim">
        {textContent && <PortableText value={textContent as PortableTextBlock[]} />}
      </div>
    </section>
  );
}
