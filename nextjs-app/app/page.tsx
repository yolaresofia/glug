import { client, previewClient } from "@/sanity/lib/client";
import BlockRenderer from "./components/BlockRenderer";
import { draftMode } from "next/headers";
import EnableVisualEditing from "./components/EnableVisualEditing";

export default async function Page() {
  const { isEnabled: isDraft } = await draftMode();
  const sanityClient = isDraft ? previewClient : client;

  const [page] = await sanityClient.fetch(
    '*[_type == "page" && slug.current == "/"]'
  );

  return (
    <div className="font-teachers">
      {page?.pageBuilder?.map((block: any, index: number) => (
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
