import { randomUUID } from "crypto";
import { markdownToSafeHtml, plainToSafeHtml } from "./markdown";
import { htmlToPdfBuffer } from "./pdf";
import { buildBrandedHtml } from "./template";
import type { CreateRenderJobInput, CreateRenderJobResult } from "./types";

export type { BrandKitInput, CreateRenderJobInput, CreateRenderJobResult } from "./types";

/**
 * Shared render path used by demo (Phase 1), and later app / API / MCP.
 * createRenderJob(content, brandKit) → HTML template → Chromium PDF → bytes
 */
export async function createRenderJob(
  input: CreateRenderJobInput
): Promise<CreateRenderJobResult> {
  const id = randomUUID();
  const content = (input.content || "").trim();
  const chars = content.length;

  if (!content) {
    return { id, status: "failed", chars: 0, error: "Content is required." };
  }
  if (chars > 8000) {
    return {
      id,
      status: "failed",
      chars,
      error: "Content exceeds the free demo limit of 8,000 characters.",
    };
  }

  try {
    const bodyHtml =
      input.content_type === "plain"
        ? plainToSafeHtml(content)
        : markdownToSafeHtml(content);

    const html = buildBrandedHtml({
      bodyHtml,
      brand: input.brand,
      showCredit: input.show_credit !== false,
    });

    const pdf = await htmlToPdfBuffer(html);

    return {
      id,
      status: "done",
      pdf_base64: pdf.toString("base64"),
      mime_type: "application/pdf",
      chars,
    };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Unknown render failure";
    return {
      id,
      status: "failed",
      chars,
      error: `Couldn't generate that PDF. Try again in a moment. (${message})`,
    };
  }
}
