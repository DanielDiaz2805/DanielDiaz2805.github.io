"use client";
import { useEffect, useState } from "react";
import { perfil } from "@/data/profile";
import { IconClose, IconMenu } from "@/components/ui/Icons";

const enlaces = [
  { id: "sobre-mi", texto: "Sobre mí" },
  { id: "stack", texto: "Stack" },
  { id: "proyectos", texto: "Proyectos" },
  { id: "trayectoria", texto: "Trayectoria" },
  { id: "github", texto: "GitHub" },
  { id: "contacto", texto: "Contacto" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [abierto, setAbierto] = useState(false);
  const [activo, setActivo] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // Resalta la sección visible en la navegación
    const io = new IntersectionObserver(
      (entradas) => entradas.forEach((e) => e.isIntersecting && setActivo(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    enlaces.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => { window.removeEventListener("scroll", onScroll); io.disconnect(); };
  }, []);

  useEffect(() => {
    if (!abierto) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setAbierto(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [abierto]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${
        scrolled || abierto ? "border-b border-trazo/70 bg-abismo/75 backdrop-blur-xl" : "border-b border-transparent"
      }`}
      style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}
    >
      <nav aria-label="Principal" className="contenedor flex h-[var(--header-h)] items-center justify-between gap-6">
        <a href="#inicio" className="group flex items-center gap-3" aria-label={`${perfil.nombre} ${perfil.apellido}, ir al inicio`}>
          <span className="grid h-9 w-9 place-items-center rounded-lg border border-trazo font-display text-sm font-semibold transition-colors group-hover:border-cian">
            {perfil.iniciales}
          </span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {enlaces.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                aria-current={activo === l.id ? "true" : undefined}
                className={`rounded-full px-3.5 py-2 text-sm transition-colors ${
                  activo === l.id ? "bg-white/[0.06] text-hielo" : "text-niebla hover:text-hielo"
                }`}
              >
                {l.texto}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          {perfil.disponibilidad.disponible && (
            <a href="#contacto" className="hidden items-center gap-2 rounded-full border border-trazo px-3.5 py-1.5 text-sm text-niebla transition-colors hover:border-emerald-400/50 hover:text-hielo sm:inline-flex">
              <span className="punto-disponible h-2 w-2 rounded-full bg-emerald-400" aria-hidden />
              Disponible
            </a>
          )}
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-lg border border-trazo lg:hidden"
            aria-expanded={abierto}
            aria-controls="menu-movil"
            aria-label={abierto ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setAbierto((v) => !v)}
          >
            {abierto ? <IconClose /> : <IconMenu />}
          </button>
        </div>
      </nav>

      {abierto && (
        <div id="menu-movil" className="contenedor h-[calc(100dvh-var(--header-h))] pb-10 pt-6 lg:hidden">
          <ul className="flex flex-col gap-1">
            {enlaces.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  onClick={() => setAbierto(false)}
                  className="block border-b border-trazo/60 py-4 font-display text-2xl font-medium text-hielo"
                >
                  {l.texto}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
