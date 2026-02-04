"use client";

import { Suspense } from "react";

import ResolvedLink from "@/app/components/ResolvedLink";
import { CallToAction } from "@/sanity.types";

type CtaProps = {
  block: CallToAction;
  index: number;
};

// Note: The GROQ query already extracts locale-specific values,
// so block.heading, block.text, block.buttonText are already strings

export default function CTA({ block }: CtaProps) {
  // Cast to any since GROQ query transforms types - values are already strings
  const heading = (block as any).heading || '';
  const text = (block as any).text || '';
  const buttonText = (block as any).buttonText || '';

  return (
    <div className="container my-12">
      <div className="bg-gray-50 border border-gray-100 rounded-2xl max-w-3xl">
        <div className="p-12 flex flex-col gap-6">
          <div className="max-w-xl flex flex-col gap-3">
            <h2 className="text-3xl font-bold tracking-tight text-black sm:text-4xl">
              {heading}
            </h2>
            <p className="text-lg leading-8 text-gray-600">
              {text}
            </p>
          </div>

          <Suspense fallback={null}>
            <div className="flex items-center gap-x-6 lg:mt-0 lg:flex-shrink-0">
              <ResolvedLink
                link={block.link}
                className="rounded-full flex gap-2 mr-6 items-center bg-black hover:bg-red-500 focus:bg-cyan-500 py-3 px-6 text-white transition-colors duration-200"
              >
                {buttonText}
              </ResolvedLink>
            </div>
          </Suspense>
        </div>
      </div>
    </div>
  );
}
