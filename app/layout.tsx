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
  title: "jnklab — Product innovation & consulting",
  description:
    "Product innovation and consulting for companies building early-stage products. We help you find the idea worth building — then ship the MVP that proves it. AI woven into how the work actually gets done, not bolted on as a chatbot.",
  metadataBase: new URL("https://jnklab.com"),
  openGraph: {
    title: "jnklab — Product innovation & consulting",
    description:
      "Product innovation and consulting for companies building early-stage products. We help you find the idea worth building — then ship the MVP that proves it. AI woven into how the work actually gets done, not bolted on as a chatbot.",
    url: "https://jnklab.com",
    siteName: "jnklab",
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
