import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { DesktopSidebar, SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import {
  OrganizationSchema,
  WebsiteSchema,
} from "@/components/structured-data";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = "https://renocheck.be";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "Renocheck — Producten, events & ledenportaal voor bouwprofessionals",
    template: "%s · Renocheck",
  },
  description:
    "Renocheck levert goodies, planners, borden en interieurcollecties aan architecten, aannemers, interieurpros en andere bouwprofessionals. Beheer uw bestellingen, bekijk onze events en blijf op de hoogte via het ledenportaal.",
  applicationName: "Renocheck",
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  keywords: [
    "Renocheck",
    "bouwprofessionals",
    "architect",
    "architectenbureau",
    "aannemer",
    "interieurarchitect",
    "projectontwikkelaar",
    "goodies bouwbedrijf",
    "planners bouw",
    "borden bouw",
    "signage architect",
    "hometrends",
    "house & home",
    "events bouwsector",
    "Renocheck ledenportaal",
    "bouw netwerk België",
  ],
  authors: [{ name: "Renocheck", url: SITE_URL }],
  creator: "Renocheck",
  publisher: "Renocheck",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "nl_BE",
    url: SITE_URL,
    siteName: "Renocheck",
    title: "Renocheck — Voor elke bouwprofessional",
    description:
      "Goodies, planners, borden en events voor architecten, aannemers en interieurpros. Ontdek de Renocheck collectie en word lid van het ledenportaal.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Renocheck — Voor elke bouwprofessional",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Renocheck — Voor elke bouwprofessional",
    description:
      "Goodies, planners, borden en events voor de hele bouwsector.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "/",
    languages: {
      "nl-BE": "/",
      "x-default": "/",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/icon.png",
  },
  manifest: "/manifest.webmanifest",
  verification: {
    // Add your verification tokens here when available
    // google: "...",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F1E8D2" },
    { media: "(prefers-color-scheme: dark)", color: "#F1E8D2" },
  ],
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="nl-BE"
      className={`${cormorant.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="bg-paper grain relative flex min-h-full flex-col text-ink">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:text-cream"
        >
          Ga naar hoofdinhoud
        </a>
        <SiteHeader />
        <div className="relative z-[2] mx-auto flex w-full max-w-[1920px] flex-1 flex-col">
          <div className="flex flex-1 flex-col lg:flex-row">
            <main id="main" className="min-w-0 flex-1">
              {children}
            </main>
            <DesktopSidebar />
          </div>
          <SiteFooter />
        </div>
        <OrganizationSchema />
        <WebsiteSchema />
      </body>
    </html>
  );
}
