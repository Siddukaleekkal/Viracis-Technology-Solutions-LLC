import type { Metadata, Viewport } from "next";
import { Lexend_Deca, IBM_Plex_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const lexendDeca = Lexend_Deca({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-lexend-deca",
  display: "swap",
});

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-ibm-plex-sans",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://viracis.com"),
  title: {
    default: "Viracis | Ultimate Door to Door Operating System",
    template: "%s | Viracis | Ultimate Door to Door Operating System",
  },
  description:
    "Viracis delivers enterprise-grade technology consulting, specializing in scalable cloud infrastructure, AI-driven automation, and custom enterprise software solutions for global businesses.",
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
    title: "Viracis | Ultimate Door to Door Operating System",
    description:
      "Enterprise-grade technology consulting bridging strategy and execution.",
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
      <head>
        <link rel="preconnect" href="https://app.viracis.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://app.viracis.com" />
      </head>
      <body className={`${lexendDeca.variable} ${ibmPlexSans.variable} font-sans`}>
        {children}
        <Analytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Viracis",
              "legalName": "Viracis LLC",
              "url": "https://viracis.com",
              "logo": "https://viracis.com/viracis-logo.png",
              "sameAs": [
                "https://www.linkedin.com/company/viracis",
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+1-804-503-3954",
                "contactType": "customer service",
                "areaServed": "US",
                "availableLanguage": "en",
              },
              "description": "Viracis delivers enterprise-grade technology consulting, specializing in scalable cloud infrastructure, AI-driven automation, and custom enterprise software solutions for global businesses.",
            }),
          }}
        />
      </body>
    </html>
  );
}
