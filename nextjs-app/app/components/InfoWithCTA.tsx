"use client";

import { useState } from "react";
import Link from "next/link";
import { InfoWithCTA as InfoWithCTAType } from "@/sanity.types";
import { PortableText, PortableTextBlock } from "next-sanity";
import Button from "./Button";
import ReservationModal from "./ReservationModal";

type InfoWithCTAProps = {
  block: InfoWithCTAType;
  index: number;
};

// Note: The GROQ query already extracts locale-specific values,
// so block.firstColumnText, block.secondColumnText etc. are already resolved

export default function InfoWithCTA({ block }: InfoWithCTAProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!block) return null;

  const cta = block?.cta?.link;

  const handleClick = () => {
    if (cta?.openType === "modal") {
      setIsModalOpen(true);
    }
  };

  const isExternalLink = cta?.href?.startsWith("http");

  // Cast to any since GROQ query transforms types - values are already locale-resolved
  const firstColumnContent = (block as any).firstColumnText;
  const secondColumnContent = (block as any).secondColumnText;
  const buttonText = (block as any)?.cta?.text || '';

  return (
    <section
      className={`lg:grid anim lg:grid-cols-12 pt-${block?.paddingT} pb-${block?.paddingB} text-[${block?.textColor?.hex}] md:px-20 px-5`}
      data-section={block?.theme}
    >
      <div className="text-3xl col-span-7 font-semibold">
        {firstColumnContent && <PortableText value={firstColumnContent as PortableTextBlock[]} />}
      </div>
      <div className="text-base col-span-4 pb-12 lg:pb-0 font-semibold">
        {secondColumnContent && <PortableText value={secondColumnContent as PortableTextBlock[]} />}
      </div>
      <div className="col-span-1">
        {cta && (
          <>
            {cta.openType === "newTab" && cta.href ? (
              isExternalLink ? (
                <a
                  href={cta.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button buttonText={buttonText} variant={block?.cta?.variant} />
                </a>
              ) : (
                <Link href={cta.href}>
                  <Button buttonText={buttonText} variant={block?.cta?.variant} />
                </Link>
              )
            ) : (
              <Button
                buttonText={buttonText}
                variant={block?.cta?.variant}
                onClick={handleClick}
              />
            )}
          </>
        )}
      </div>

      {isModalOpen && <ReservationModal isOpen={isModalOpen} url={cta?.href} onClose={() => setIsModalOpen(false)} />}
    </section>
  );
}
