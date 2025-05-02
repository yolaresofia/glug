// nextjs-app/app/api/draft-mode/enable/route.ts

import { draftMode } from "next/headers";
import { NextResponse } from "next/server";

// Opcional: proteger con tu propio secret
const expectedSecret = process.env.SANITY_PREVIEW_SECRET;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const redirectUrl = searchParams.get("redirect") || "/";

  // Si querés validar secret:
  if (expectedSecret && secret !== expectedSecret) {
    return new NextResponse("Invalid secret", { status: 401 });
  }

  const dm = await draftMode();
  dm.enable();

  return NextResponse.redirect(new URL(redirectUrl, request.url));
}
