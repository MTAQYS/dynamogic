export type AppId =
  | "demo"
  | "brand"
  | "mcp"
  | "pricing"
  | "faq"
  | "about"
  | "how"
  | "signin"
  | "bepro";

export type WindowState = {
  id: AppId;
  title: string;
  x: number;
  y: number;
  width: number;
  height: number;
  minimized: boolean;
  z: number;
};

export type BrandKitState = {
  name: string;
  primary_color: string;
  accent_style: "minimal" | "bar" | "left-rule";
  footer_text: string;
  font_heading: string;
  font_body: string;
  website: string | null;
  presetId: string;
};

export const APP_META: Record<
  AppId,
  { title: string; label: string; defaultSize: { w: number; h: number } }
> = {
  demo: {
    title: "Demo.app",
    label: "Demo",
    defaultSize: { w: 920, h: 640 },
  },
  brand: {
    title: "Brand Kit.app",
    label: "Brand Kit",
    defaultSize: { w: 520, h: 560 },
  },
  bepro: {
    title: "BePro.app",
    label: "BePro",
    defaultSize: { w: 480, h: 520 },
  },
  mcp: {
    title: "MCP Terminal.app",
    label: "MCP Terminal",
    defaultSize: { w: 640, h: 420 },
  },
  pricing: {
    title: "Pricing.app",
    label: "Pricing",
    defaultSize: { w: 780, h: 520 },
  },
  faq: {
    title: "FAQ.app",
    label: "Docs / FAQ",
    defaultSize: { w: 560, h: 520 },
  },
  about: {
    title: "About.app",
    label: "About",
    defaultSize: { w: 480, h: 420 },
  },
  how: {
    title: "How it works.app",
    label: "How it works",
    defaultSize: { w: 480, h: 400 },
  },
  signin: {
    title: "Sign In.app",
    label: "Sign in",
    defaultSize: { w: 420, h: 440 },
  },
};

export const DEFAULT_BRAND: BrandKitState = {
  name: "Acme",
  primary_color: "#1D4ED8",
  accent_style: "bar",
  footer_text: "Acme Inc. · Confidential",
  font_heading: "Inter",
  font_body: "Inter",
  website: "https://acme.example",
  presetId: "acme",
};

export const BRAND_PRESETS: Array<
  BrandKitState & { id: string; label: string }
> = [
  {
    id: "acme",
    label: "Acme Blue",
    name: "Acme",
    primary_color: "#1D4ED8",
    accent_style: "bar",
    footer_text: "Acme Inc. · Confidential",
    font_heading: "Inter",
    font_body: "Inter",
    website: "https://acme.example",
    presetId: "acme",
  },
  {
    id: "north",
    label: "North Amber",
    name: "North Studio",
    primary_color: "#B45309",
    accent_style: "left-rule",
    footer_text: "North Studio",
    font_heading: "Georgia",
    font_body: "Georgia",
    website: "https://north.example",
    presetId: "north",
  },
  {
    id: "mono",
    label: "Mono Minimal",
    name: "Mono Co",
    primary_color: "#1A1A1A",
    accent_style: "minimal",
    footer_text: "Mono Co",
    font_heading: "Inter",
    font_body: "Inter",
    website: null,
    presetId: "mono",
  },
];
