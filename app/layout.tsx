import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const metadata: Metadata = {
  title: "Dynamogic OS — Brand layer for AI output",
  description:
    "Apply your brand kit to AI-generated content and get shareable PDFs via demo, API, or MCP. Free 3 PDFs/day.",
  icons: {
    icon: [
      { url: `${basePath}/favicon.svg`, type: "image/svg+xml" },
      { url: `${basePath}/icon-192.png`, sizes: "192x192", type: "image/png" },
      { url: `${basePath}/icon-512.png`, sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: `${basePath}/apple-touch-icon.png`, sizes: "180x180" }],
  },
  openGraph: {
    title: "Dynamogic OS — Brand layer for AI output",
    description:
      "Apply your brand kit to AI-generated content and get shareable PDFs via demo, API, or MCP. Free 3 PDFs/day.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable}`}>
      <body
        className={`${inter.className} min-h-[100dvh] overflow-hidden antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
