import { NextResponse } from "next/server";
import { createRenderJob, type BrandKitInput } from "@/lib/render";
import { checkAndIncrementDemoLimit, getClientIp } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

type Body = {
  content?: string;
  brand?: Partial<BrandKitInput>;
};

const FONT_ALLOW = new Set([
  "Inter",
  "Georgia",
  "system-ui",
  "Arial",
  "Times New Roman",
]);

function normalizeBrand(raw: Partial<BrandKitInput> | undefined): BrandKitInput {
  const accent = raw?.accent_style;
  return {
    name: (raw?.name || "Sample Brand").slice(0, 80),
    primary_color: /^#[0-9A-Fa-f]{6}$/.test(raw?.primary_color || "")
      ? (raw!.primary_color as string)
      : "#1D4ED8",
    secondary_color: raw?.secondary_color || null,
    font_heading: FONT_ALLOW.has(raw?.font_heading || "")
      ? (raw!.font_heading as string)
      : "Inter",
    font_body: FONT_ALLOW.has(raw?.font_body || "")
      ? (raw!.font_body as string)
      : "Inter",
    footer_text: raw?.footer_text?.slice(0, 200) || "Confidential · Sample brand kit",
    website: raw?.website?.slice(0, 200) || null,
    accent_style:
      accent === "minimal" || accent === "bar" || accent === "left-rule"
        ? accent
        : "bar",
    logo_data_url:
      raw?.logo_data_url && raw.logo_data_url.startsWith("data:image/")
        ? raw.logo_data_url.slice(0, 400_000)
        : null,
  };
}

export async function POST(req: Request) {
  const ip = getClientIp(req.headers);
  const quota = checkAndIncrementDemoLimit(ip, 3);

  if (!quota.allowed) {
    return NextResponse.json(
      {
        error:
          "You’ve hit today’s free demo limit. Sign in or come back tomorrow.",
        code: "RATE_LIMIT",
        remaining: 0,
      },
      { status: 429 }
    );
  }

  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const result = await createRenderJob({
    content: body.content || "",
    content_type: "markdown",
    brand: normalizeBrand(body.brand),
    show_credit: true,
  });

  if (result.status === "failed") {
    return NextResponse.json(
      {
        error:
          result.error ||
          "Couldn’t generate that PDF. Try again in a moment. If it keeps failing, contact support.",
        remaining: quota.remaining,
      },
      { status: 500 }
    );
  }

  return NextResponse.json({
    id: result.id,
    status: result.status,
    pdf_base64: result.pdf_base64,
    mime_type: result.mime_type,
    chars: result.chars,
    remaining: quota.remaining,
    share_url: null, // Phase 2+
  });
}
