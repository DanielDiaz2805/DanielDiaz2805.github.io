# Portafolio de Daniel Diaz Montiel

Portafolio profesional de Ingeniero de Sistemas y desarrollador de software. Sitio estático, rápido y accesible, construido con Next.js, TypeScript y Tailwind CSS, y desplegado automáticamente en GitHub Pages.

**Sitio en vivo:** https://[tu-dominio.com]

## Características

- Hero con un "mapa de sistema" interactivo en canvas: los nodos reaccionan al puntero como servicios que reciben una petición. Se pausa fuera de pantalla y respeta `prefers-reduced-motion`.
- Animación de entrada orquestada, halo de luz que sigue al cursor y tarjetas de proyecto con iluminación en hover.
- Navegación con resaltado de la sección activa, menú móvil accesible (Esc para cerrar) y enlace "Saltar al contenido".
- Proyectos con problema, solución, funcionalidades, tecnologías, demo y repositorio. Si un proyecto no tiene captura, se genera una vista previa única a partir de su título.
- Timeline de experiencia, formación y certificaciones.
- Sección de GitHub que carga en vivo tus repositorios públicos (con caché de 30 min y estados de carga y error).
- Formulario de contacto funcional con validación accesible, protección anti-spam (honeypot) y envío vía Formspree; si no hay Formspree configurado, abre el correo del visitante.
- Indicador de disponibilidad laboral.
- SEO: metadatos, Open Graph, Twitter Card, datos estructurados `Person` (JSON-LD), `sitemap.xml` y `robots.txt`.
- Todo el contenido vive en un único archivo: `src/data/profile.ts`.
- Sin dependencias de UI externas: iconos SVG propios y fuentes autoalojadas (sin peticiones a Google Fonts).

## Stack

| Capa | Tecnología |
| --- | --- |
| Framework | Next.js 14 (App Router, exportación estática) |
| Lenguaje | TypeScript (modo estricto) |
| Estilos | Tailwind CSS 3 |
| Tipografía | Unbounded (títulos) e Instrument Sans (texto), vía Fontsource |
| Formulario | Formspree (opcional) |
| Despliegue | GitHub Actions + GitHub Pages |

## Estructura

```
portafolio/
├── .github/workflows/deploy.yml   # Compila y publica en GitHub Pages en cada push a main
├── public/
│   ├── cv.pdf                     # ⚠ Reemplázalo por tu CV real
│   ├── og.png                     # Imagen para redes sociales (1200×630)
│   └── favicon.svg
├── src/
│   ├── app/
│   │   ├── layout.tsx             # Metadatos, SEO, fuentes, JSON-LD
│   │   ├── page.tsx               # Composición de secciones
│   │   ├── globals.css            # Tokens, componentes base, animaciones
│   │   ├── not-found.tsx          # Página 404
│   │   ├── sitemap.ts · robots.ts
│   ├── components/
│   │   ├── Navbar.tsx · Footer.tsx
│   │   ├── sections/              # Hero, About, Stack, Projects, Timeline,
│   │   │                          # Services, GitHubActivity, Contact
│   │   └── ui/                    # SystemCanvas, CursorGlow, ProjectCard,
│   │                              # ProjectPreview, SectionHeading, Icons
│   ├── data/profile.ts            # ★ TODO TU CONTENIDO ESTÁ AQUÍ
│   └── lib/                       # site.ts (rutas, entorno), github.ts (API)
├── .env.example
├── REEMPLAZAR.md                  # Lista de datos que debes cambiar
└── tailwind.config.ts             # Paleta y tipografías
```

## Instalación y ejecución

Requisitos: Node.js 18.17 o superior (recomendado 20) y npm.

```bash
npm install
cp .env.example .env.local      # opcional: Formspree y URL del sitio
npm run dev                     # http://localhost:3000
```

Otros comandos:

```bash
npm run build      # genera el sitio estático en /out
npm run start      # sirve /out localmente para revisarlo
npm run lint       # ESLint
npm run typecheck  # comprobación de tipos
```

## Personalización

1. Edita `src/data/profile.ts` con tu información real (ver `REEMPLAZAR.md`).
2. En cada sección cambia `provisional: true` a `false` cuando ya tenga datos reales; así desaparece la etiqueta "Contenido provisional".
3. Reemplaza `public/cv.pdf` y `public/og.png`.
4. Añade capturas de proyectos en `public/proyectos/` (WebP, 1600×1000 recomendado) y referencia la ruta en el campo `imagen`.
5. Colores y fuentes: `tailwind.config.ts`.

## Formulario de contacto

GitHub Pages solo sirve archivos estáticos, por lo que el envío se delega en [Formspree](https://formspree.io) (plan gratuito: 50 envíos/mes).

1. Crea una cuenta y un formulario nuevo. Copia su ID (la parte final de `https://formspree.io/f/XXXXXXX`).
2. En local: ponlo en `.env.local` como `NEXT_PUBLIC_FORMSPREE_ID`.
3. En producción: GitHub → tu repositorio → Settings → Secrets and variables → Actions → pestaña **Variables** → New repository variable: `FORMSPREE_ID`.

Sin esta variable, el botón abre el cliente de correo del visitante con el mensaje ya redactado.

## Publicación en GitHub Pages

1. Crea un repositorio en GitHub. Dos opciones:
   - `tu-usuario.github.io` → el sitio queda en `https://tu-usuario.github.io` (recomendado).
   - Cualquier otro nombre → queda en `https://tu-usuario.github.io/nombre-repo`.
2. Sube el código:
   ```bash
   git init
   git add .
   git commit -m "Primera versión del portafolio"
   git branch -M main
   git remote add origin https://github.com/tu-usuario/tu-repo.git
   git push -u origin main
   ```
3. En el repositorio: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
4. Cada push a `main` compila y publica el sitio (pestaña **Actions** para ver el progreso). La ruta base (`/nombre-repo`) y la URL pública se detectan solas.

### Alternativas

El proyecto genera HTML estático en `/out`, así que funciona sin cambios en Vercel, Netlify o Cloudflare Pages (comando `npm run build`, carpeta de salida `out`). En esas plataformas define `NEXT_PUBLIC_SITE_URL` y, si quieres, `NEXT_PUBLIC_FORMSPREE_ID`.

## Dominio personalizado

1. Compra el dominio (Namecheap, Cloudflare, GoDaddy, etc.).
2. En GitHub: **Settings → Pages → Custom domain**, escribe `tu-dominio.com` y guarda.
3. En el panel DNS de tu proveedor crea estos registros:

   | Tipo | Nombre | Valor |
   | --- | --- | --- |
   | A | @ | 185.199.108.153 |
   | A | @ | 185.199.109.153 |
   | A | @ | 185.199.110.153 |
   | A | @ | 185.199.111.153 |
   | AAAA | @ | 2606:50c0:8000::153 |
   | AAAA | @ | 2606:50c0:8001::153 |
   | AAAA | @ | 2606:50c0:8002::153 |
   | AAAA | @ | 2606:50c0:8003::153 |
   | CNAME | www | tu-usuario.github.io |

4. Espera la propagación DNS (de minutos a 24 h) y activa **Enforce HTTPS** en la misma pantalla.
5. Recomendado: verifica el dominio en tu cuenta (GitHub → Settings de tu perfil → Pages → Add a domain) para evitar que otro lo reclame.
6. Vuelve a ejecutar el workflow (Actions → Desplegar en GitHub Pages → Run workflow) para que la URL canónica, el sitemap y Open Graph usen el nuevo dominio.

Las IP anteriores son las publicadas por GitHub; confírmalas en la [documentación oficial](https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site) antes de configurarlas.

## Accesibilidad y rendimiento

- HTML semántico, un solo `h1`, jerarquía de encabezados correcta y `aria-labelledby` por sección.
- Foco visible en todos los elementos interactivos y navegación completa por teclado.
- Errores de formulario anunciados (`aria-invalid`, `aria-describedby`, `role="alert"`).
- Todas las animaciones se desactivan con `prefers-reduced-motion`.
- Canvas limitado a DPR 2 y en pausa cuando no está visible.
- Página principal: ~98 kB de JavaScript en la primera carga.

## Licencia

Código bajo licencia MIT. El contenido (textos, imágenes, CV) pertenece a Daniel Diaz Montiel.
