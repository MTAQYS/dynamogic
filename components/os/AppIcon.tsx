"use client";

import { Logo } from "../Logo";
import type { AppId } from "./types";

type Props = {
  id: AppId;
  size?: number;
  className?: string;
};

/** Consistent geometric SVG glyphs — soft charcoal strokes, no emoji.
 *  About uses the M2h falcon mark as the Dynamogic app icon.
 */
export function AppIcon({ id, size = 22, className = "" }: Props) {
  const s = size;
  const common = {
    width: s,
    height: s,
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": true as const,
    className,
  };
  const stroke = "#1C1C1C";
  const sw = 1.5;

  switch (id) {
    case "demo":
      return (
        <svg {...common}>
          <rect x="5" y="3" width="14" height="18" rx="2" stroke={stroke} strokeWidth={sw} />
          <path d="M8 8h8M8 12h8M8 16h5" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
        </svg>
      );
    case "brand":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8" stroke={stroke} strokeWidth={sw} />
          <circle cx="12" cy="12" r="3" stroke={stroke} strokeWidth={sw} />
          <path d="M12 4v2.5M12 17.5V20M4 12h2.5M17.5 12H20" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
        </svg>
      );
    case "bepro":
      return (
        <svg {...common}>
          <rect x="6" y="4" width="12" height="16" rx="1.5" stroke={stroke} strokeWidth={sw} />
          <path d="M9 8h6M9 11h6M9 14h4" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
          <path d="M8 4V3.5A1.5 1.5 0 019.5 2h5A1.5 1.5 0 0116 3.5V4" stroke={stroke} strokeWidth={sw} />
        </svg>
      );
    case "docs":
      return (
        <svg {...common}>
          <rect x="5" y="3" width="14" height="18" rx="2" stroke={stroke} strokeWidth={sw} />
          <path
            d="M8.5 7.5v5M11.5 7.5v5M8 9h4M8 11h4"
            stroke={stroke}
            strokeWidth={sw}
            strokeLinecap="round"
          />
          <path d="M8 15h8M8 18h5.5" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
        </svg>
      );
    case "mcp":
      return (
        <svg {...common}>
          <rect x="3" y="5" width="18" height="14" rx="2" stroke={stroke} strokeWidth={sw} />
          <path d="M7 15l3-6 3 4 2-2 2 4" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "pricing":
      return (
        <svg {...common}>
          <path
            d="M12 3l2.2 4.5 5 .7-3.6 3.5.9 5.1L12 14.8 7.5 16.8l.9-5.1L4.8 8.2l5-.7L12 3z"
            stroke={stroke}
            strokeWidth={sw}
            strokeLinejoin="round"
          />
        </svg>
      );
    case "faq":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" stroke={stroke} strokeWidth={sw} />
          <path
            d="M9.5 9.5a2.5 2.5 0 014.3 1.7c0 1.5-2.3 2.2-2.3 3.3"
            stroke={stroke}
            strokeWidth={sw}
            strokeLinecap="round"
          />
          <circle cx="12" cy="17" r="0.9" fill={stroke} />
        </svg>
      );
    case "how":
      return (
        <svg {...common}>
          <circle cx="6" cy="12" r="2.2" stroke={stroke} strokeWidth={sw} />
          <circle cx="12" cy="12" r="2.2" stroke={stroke} strokeWidth={sw} />
          <circle cx="18" cy="12" r="2.2" stroke={stroke} strokeWidth={sw} />
          <path d="M8.2 12h1.6M14.2 12h1.6" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
        </svg>
      );
    case "about":
      return <Logo variant="mark" size={s} square className={className} />;
    case "signin":
      return (
        <svg {...common}>
          <circle cx="12" cy="9" r="3.2" stroke={stroke} strokeWidth={sw} />
          <path
            d="M5 19c1.5-3.2 4-4.8 7-4.8s5.5 1.6 7 4.8"
            stroke={stroke}
            strokeWidth={sw}
            strokeLinecap="round"
          />
        </svg>
      );
    default:
      return null;
  }
}
