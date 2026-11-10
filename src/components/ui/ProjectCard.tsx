"use client";
import type { Proyecto } from "@/data/profile";
import { withBase } from "@/lib/site";
import { ProjectPreview } from "@/components/ui/ProjectPreview";
import { IconExternal, IconGitHub } from "@/components/ui/Icons";

export function ProjectCard({ p, destacado = false }: { p: Proyecto; destacado?: boolean }) {
  // Luz que sigue al puntero dentro de la tarjeta (variables CSS, sin re-render)
  const onMove = (e: React.PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <article
      onPointerMove={onMove}
      className={`group relative overflow-hidden rounded-3xl border border-trazo bg-pizarra/40 transition-colors duration-300 hover:border-cian/40 ${
        destacado ? "lg:grid lg:grid-cols-[1.15fr_1fr]" : "flex flex-col"
      }`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: "radial-gradient(420px circle at var(--mx) var(--my), rgba(59,227,245,0.08), transparent 60%)" }}
      />

      {/* En el destacado, la vista previa se presenta como una pantalla dentro del panel */}
      <div className={`relative border-trazo ${destacado ? "flex items-center border-b p-5 sm:p-8 lg:border-b-0 lg:border-r" : "border-b"}`}>
        <div className={`aspect-[16/10] w-full overflow-hidden ${destacado ? "rounded-xl border border-trazo shadow-[0_30px_80px_-30px_rgba(59,227,245,0.25)]" : ""}`}>
          <div className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.03]">
            {p.imagen ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={withBase(p.imagen)} alt={`Captura de ${p.titulo}`} loading="lazy" decoding="async" className="h-full w-full object-cover object-top" />
            ) : (
              <ProjectPreview semilla={p.titulo + p.resumen} />
            )}
          </div>
        </div>
      </div>

      <div className={`relative flex flex-1 flex-col ${destacado ? "p-7 sm:p-10" : "p-7"}`}>
        <h3 className={`font-display font-medium text-hielo ${destacado ? "text-2xl sm:text-3xl" : "text-xl"}`}>{p.titulo}</h3>
        <p className="mt-2 text-niebla">{p.resumen}</p>

        <dl className="mt-6 space-y-4 text-[0.95rem]">
          <div>
            <dt className="font-semibold text-hielo">Problema</dt>
            <dd className="mt-1 text-niebla">{p.problema}</dd>
          </div>
          <div>
            <dt className="font-semibold text-hielo">Solución</dt>
            <dd className="mt-1 text-niebla">{p.solucion}</dd>
          </div>
          {destacado && p.funcionalidades.length > 0 && (
            <div>
              <dt className="font-semibold text-hielo">Funcionalidades</dt>
              <dd>
                <ul className="mt-1 list-disc space-y-1 pl-5 text-niebla marker:text-cian">
                  {p.funcionalidades.map((f, i) => <li key={i}>{f}</li>)}
                </ul>
              </dd>
            </div>
          )}
        </dl>

        <ul className="mt-6 flex flex-wrap gap-2" aria-label="Tecnologías utilizadas">
          {p.tecnologias.map((t, i) => (
            <li key={i} className="rounded-md border border-trazo px-2.5 py-1 text-sm text-niebla">{t}</li>
          ))}
        </ul>

        {(p.repo || p.demo) && (
          <div className="mt-auto flex flex-wrap gap-5 pt-8">
            {p.demo && (
              <a href={p.demo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-semibold text-cian hover:text-white">
                <IconExternal width={18} height={18} /> Ver demo<span className="sr-only"> de {p.titulo}</span>
              </a>
            )}
            {p.repo && (
              <a href={p.repo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-semibold text-hielo hover:text-cian">
                <IconGitHub width={18} height={18} /> Código<span className="sr-only"> de {p.titulo} en GitHub</span>
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
