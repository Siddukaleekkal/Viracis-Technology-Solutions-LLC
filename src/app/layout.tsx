import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
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
    default: "Viracis",
    template: "%s | Viracis",
  },
  description:
    "Viracis provides technology consulting that bridges strategy and execution. Cloud infrastructure, AI automation, and enterprise software.",
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
        <Analytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Viracis",
              "legalName": "Viracis Technology Solutions LLC",
              "url": "https://viracis.com",
              "logo": "https://viracis.com/viracis-logo.png",
              "sameAs": [
                "https://www.linkedin.com/in/viracis-viracis-technology-solutions-40a7b53b3/",
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+1-804-503-3954",
                "contactType": "customer service",
                "areaServed": "US",
                "availableLanguage": "en",
              },
              "description": "Technology consulting bridging strategy and execution through AI automation, cloud infrastructure, and enterprise software.",
            }),
          }}
        />
      </body>
    </html>
  );
}
