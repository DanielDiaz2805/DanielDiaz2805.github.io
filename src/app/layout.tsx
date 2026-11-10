import type { Metadata, Viewport } from "next";
import "@fontsource-variable/unbounded";
import "@fontsource-variable/instrument-sans";
import "./globals.css";
import { perfil, seo } from "@/data/profile";
import { SITE_URL, withBase } from "@/lib/site";

const nombreCompleto = `${perfil.nombre} ${perfil.apellido}`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `${nombreCompleto} | ${perfil.titulo}`, template: `%s | ${nombreCompleto}` },
  description: seo.descripcion,
  keywords: seo.palabrasClave,
  authors: [{ name: nombreCompleto, url: SITE_URL }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    locale: "es_CO",
    url: SITE_URL,
    title: `${nombreCompleto} | ${perfil.titulo}`,
    description: seo.descripcion,
    siteName: nombreCompleto,
    images: [{ url: withBase("/og.png"), width: 1200, height: 630, alt: nombreCompleto }],
  },
  twitter: { card: "summary_large_image", title: nombreCompleto, description: seo.descripcion },
  icons: { icon: withBase("/favicon.svg") },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#060914",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

// Datos estructurados: ayudan a Google a entender que es el perfil de una persona.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: nombreCompleto,
  jobTitle: perfil.titulo,
  url: SITE_URL,
  sameAs: [perfil.redes.github, perfil.redes.linkedin, ...perfil.redes.otras.map((r) => r.url)],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-cian focus:px-4 focus:py-2 focus:text-abismo"
        >
          Saltar al contenido
        </a>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
