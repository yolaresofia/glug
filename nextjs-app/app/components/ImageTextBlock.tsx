/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { ImageTextBlock as ImageTextBlockType } from "@/sanity.types";
import { urlForImage } from "@/sanity/lib/utils";
import { PortableText, PortableTextBlock } from "next-sanity";

type ImageTextBlockProps = {
  block: ImageTextBlockType;
  index: number;
};

// Note: The GROQ query already extracts locale-specific values,
// so block.text, block.titleImage1, etc. are already resolved

export default function ImageTextBlock({ block }: ImageTextBlockProps) {
  const layout = block.layout || "leftImage";
  const [hoveredImage, setHoveredImage] = useState<number | null>(null);

  if (!block) return null;

  // Cast to any since GROQ query transforms types - values are already locale-resolved
  const textContent = (block as any)?.text;
  const titleImage1 = (block as any)?.titleImage1 || '';
  const titleImage2 = (block as any)?.titleImage2 || '';
  const textImage1Content = (block as any)?.textImage1;
  const textImage2Content = (block as any)?.textImage2;

  return (
    <section
      className={`flex items-center justify-center text-[${block?.textColor?.hex}] text-3xl pt-${block?.paddingT} pb-${block?.paddingB}`}
      data-section={block?.theme}
    >
      {layout === "leftImage" && (
        <div className="flex flex-col lg:flex-row items-end gap-6 lg:px-20 px-5">
          <div className="lg:w-1/2 w-full">
            <img
              src={urlForImage(block?.images[0])?.url() as string}
              alt="alttext"
              className="lg:rounded-xl anim rounded-3xl w-full h-auto"
            />
          </div>
          <div className="lg:w-1/2 flex justify-center">
            <img
              src={urlForImage(block?.illustration)?.url() as string}
              alt="alttext"
              className="w-[350px] anim"
            />
          </div>
        </div>
      )}

      {layout === "topText" && (
        <div className="flex flex-col items-end lg:px-20 px-5 lg:pl-40">
          <div className="flex flex-col lg:flex-row justify-end items-end lg:pl-40 gap-8">
            <img
              src={urlForImage(block.images[1])?.url() as string}
              alt=""
              className="lg:rounded-xl rounded-3xl lg:w-1/2 w-full h-[700px] object-cover anim"
            />
            <div className="flex flex-col lg:w-1/2 w-full font-semibold anim">
              {textContent && <PortableText value={textContent as PortableTextBlock[]} />}
              <div className="relative w-full h-[700px] mt-8">
                <img
                  src={urlForImage(block.images[0])?.url() as string}
                  alt=""
                  className="lg:rounded-xl rounded-3xl w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {layout === "leftTextImageIlustration" && (
        <div className="flex flex-col lg:flex-row items-end gap-6 lg:px-20 px-5">
          <div className="lg:w-1/2">
            <div className="max-w-[580px] pb-20 font-semibold anim">
              {textContent && <PortableText value={textContent as PortableTextBlock[]} />}
            </div>
            <img
              src={urlForImage(block?.images[0])?.url() as string}
              alt="alttext"
              className="rounded-xl w-full h-auto anim"
            />
          </div>
          <div className="lg:w-1/2 w-full flex justify-center">
            <img
              src={urlForImage(block?.illustration)?.url() as string}
              alt="alttext"
              className="w-[350px] anim"
            />
          </div>
        </div>
      )}

      {layout === "rightImageHoverText" && (
        <div className="flex lg:flex-row flex-col items-start justify-center gap-6 lg:pl-40 px-5">
          {block.images?.[0] && (
            <div className="lg:w-1/2 w-full">
              <div
                className="relative"
                onMouseEnter={() => setHoveredImage(0)}
                onMouseLeave={() => setHoveredImage(null)}
              >
                <img
                  src={urlForImage(block.images[0])?.url() as string}
                  alt="alttext-1"
                  className="lg:rounded-xl rounded-3xl w-full h-auto transition-opacity duration-300 anim"
                />
                {textImage1Content && (
                  <div
                    className={`absolute inset-0 hidden lg:flex flex-col items-start justify-start transition-opacity duration-300 rounded-xl ${
                      hoveredImage === 0
                        ? "opacity-100 bg-[#ECE8E2]"
                        : "opacity-0 bg-transparent"
                    }`}
                  >
                    {titleImage1 && (
                      <h3 className="text-4xl font-bold text-[#712538] mb-2 px-16 pt-24 pb-8">
                        {titleImage1}
                      </h3>
                    )}
                    <PortableText
                      value={textImage1Content as PortableTextBlock[]}
                      components={{
                        block: ({ children }) => (
                          <p className="text-[#712538] font-medium text-lg px-16 pb-20">
                            {children}
                          </p>
                        ),
                      }}
                    />
                  </div>
                )}
              </div>
              <div className="lg:hidden text-left mt-16 mb-24">
                {titleImage1 && (
                  <h3 className="text-3xl font-bold text-[#ECE8E2]">
                    {titleImage1}
                  </h3>
                )}
                {textImage1Content && (
                  <PortableText
                    value={textImage1Content as PortableTextBlock[]}
                    components={{
                      block: ({ children }) => (
                        <p className="text-[#ECE8E2] text-lg mt-2 font-medium">
                          {children}
                        </p>
                      ),
                    }}
                  />
                )}
              </div>
            </div>
          )}
          {block.images?.[1] && (
            <div className="lg:w-1/2 w-full">
              <div
                className="relative"
                onMouseEnter={() => setHoveredImage(1)}
                onMouseLeave={() => setHoveredImage(null)}
              >
                <img
                  src={urlForImage(block.images[1])?.url() as string}
                  alt="alttext-2"
                  className="lg:rounded-xl rounded-3xl w-full h-auto transition-opacity duration-300 anim"
                />
                {textImage2Content && (
                  <div
                    className={`absolute inset-0 hidden lg:flex flex-col items-start justify-start transition-opacity duration-300 rounded-xl ${
                      hoveredImage === 1
                        ? "opacity-100 bg-[#ECE8E2]"
                        : "opacity-0 bg-transparent"
                    }`}
                  >
                    {titleImage2 && (
                      <h3 className="text-4xl font-bold text-[#712538] mb-2 px-16 pt-24 pb-8">
                        {titleImage2}
                      </h3>
                    )}
                    <PortableText
                      value={textImage2Content as PortableTextBlock[]}
                      components={{
                        block: ({ children }) => (
                          <p className="text-[#712538] text-lg px-16 pb-20">
                            {children}
                          </p>
                        ),
                      }}
                    />
                  </div>
                )}
              </div>
              <div className="lg:hidden text-left mt-16">
                {titleImage2 && (
                  <h3 className="text-3xl font-bold text-[#ECE8E2]">
                    {titleImage2}
                  </h3>
                )}
                {textImage2Content && (
                  <PortableText
                    value={textImage2Content as PortableTextBlock[]}
                    components={{
                      block: ({ children }) => (
                        <p className="text-[#ECE8E2] text-lg mt-2">
                          {children}
                        </p>
                      ),
                    }}
                  />
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
