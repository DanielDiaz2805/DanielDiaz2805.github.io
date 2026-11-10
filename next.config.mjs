/**
 * Exportación estática: genera la carpeta /out lista para GitHub Pages
 * (o cualquier hosting estático: Netlify, Vercel, Cloudflare Pages).
 *
 * NEXT_PUBLIC_BASE_PATH:
 *  - Vacío ("")       → sitio en usuario.github.io o dominio propio.
 *  - "/nombre-repo"   → sitio en usuario.github.io/nombre-repo.
 * El workflow de GitHub Actions lo configura automáticamente.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
  poweredByHeader: false,
};

export default nextConfig;
