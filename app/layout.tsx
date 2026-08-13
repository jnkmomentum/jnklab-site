import type { Metadata } from "next";
import { Inter, Instrument_Serif, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "JNK Momentum — Consulting Firm & Product Studio",
  description:
    "JNK Momentum is a boutique consulting firm and product studio. We design, build, and ship software that moves.",
  metadataBase: new URL("https://jnklab.com"),
  openGraph: {
    title: "JNK Momentum — Consulting Firm & Product Studio",
    description:
      "We design, build, and ship software that moves. Based in Germany.",
    url: "https://jnklab.com",
    siteName: "JNK Momentum",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${instrumentSerif.variable} ${spaceGrotesk.variable} scroll-smooth`}
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
