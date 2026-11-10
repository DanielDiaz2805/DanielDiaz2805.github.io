export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://tu-dominio.com").replace(/\/$/, "");
export const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID ?? "";

/** Prefija rutas de /public con el basePath (necesario en exportación estática). */
export const withBase = (ruta: string) =>
  /^https?:\/\//.test(ruta) ? ruta : `${BASE_PATH}${ruta.startsWith("/") ? ruta : `/${ruta}`}`;
