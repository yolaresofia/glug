import { defineEnableDraftMode } from "next-sanity/draft-mode";
import { client } from "@/sanity/lib/client";
import { token } from "@/sanity/lib/token";

// Este workaround quita el `secret` de la query porque defineEnableDraftMode() no lo soporta
export const GET = async (req: Request) => {
  const url = new URL(req.url);
  const cleanUrl = url.origin + url.pathname; // removemos los query params

  const newRequest = new Request(cleanUrl, {
    headers: req.headers,
    method: req.method,
  });

  const handler = defineEnableDraftMode({
    client: client.withConfig({ token }),
  });

  return handler.GET(newRequest);
};
