import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dynamogic — Brand layer for AI output",
  description:
    "Apply your brand kit to AI-generated content and get shareable PDFs via demo, API, or MCP. Free 3 PDFs/day.",
  openGraph: {
    title: "Dynamogic — Brand layer for AI output",
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
      <body className={`${inter.className} min-h-screen antialiased`}>
        {children}
      </body>
    </html>
  );
}
