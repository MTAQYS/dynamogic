export type AccentStyle = "minimal" | "bar" | "left-rule";

export type BrandKitInput = {
  name: string;
  primary_color: string;
  secondary_color?: string | null;
  font_heading: string;
  font_body: string;
  footer_text?: string | null;
  website?: string | null;
  accent_style: AccentStyle;
  logo_data_url?: string | null;
};

export type CreateRenderJobInput = {
  content: string;
  content_type?: "markdown" | "plain";
  brand: BrandKitInput;
  /** Free-tier demo credit line on PDF footer */
  show_credit?: boolean;
};

export type CreateRenderJobResult = {
  id: string;
  status: "done" | "failed";
  pdf_base64?: string;
  mime_type?: string;
  chars: number;
  error?: string;
};
