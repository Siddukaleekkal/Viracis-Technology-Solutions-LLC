import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import "./globals.css";

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-ibm-plex-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://viracis.com"),
  title: {
    default: "Viracis Technology Solutions",
    template: "%s | Viracis",
  },
  description:
    "Technology consulting that bridges strategy and execution. Cloud infrastructure, AI automation, digital transformation, and enterprise software.",
  keywords: [
    "AI Consulting",
    "Software Engineering",
    "Cloud Development",
    "Viracis",
    "Technology Services",
    "Digital Transformation",
    "IT Consulting",
  ],
  authors: [{ name: "Viracis Technology Solutions" }],
  robots: { index: true, follow: true },
  openGraph: {
    title: "Viracis Technology Solutions",
    description:
      "Technology consulting that bridges strategy and execution.",
    url: "https://viracis.com",
    siteName: "Viracis",
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: [
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={ibmPlexSans.variable}>
        {children}
      </body>
    </html>
  );
}
