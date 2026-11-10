"use client";
import { useEffect, useState } from "react";
import { perfil, esProvisional } from "@/data/profile";
import { obtenerGitHub, type DatosGitHub } from "@/lib/github";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { IconExternal, IconFork, IconGitHub, IconStar } from "@/components/ui/Icons";

type Estado = { tipo: "cargando" } | { tipo: "error"; mensaje: string } | { tipo: "listo"; datos: DatosGitHub };

const fecha = new Intl.DateTimeFormat("es", { month: "short", year: "numeric" });

export function GitHubActivity() {
  const usuario = perfil.githubUsuario;
  const sinConfigurar = esProvisional(usuario);
  const [estado, setEstado] = useState<Estado>({ tipo: "cargando" });
  const [graficoOk, setGraficoOk] = useState(true);

  useEffect(() => {
    if (sinConfigurar) return;
    const ctrl = new AbortController();
    obtenerGitHub(usuario, { fijados: perfil.githubFijados, ocultar: perfil.githubOcultar }, ctrl.signal)
      .then((datos) => setEstado({ tipo: "listo", datos }))
      .catch((e: Error) => { if (e.name !== "AbortError") setEstado({ tipo: "error", mensaje: e.message }); });
    return () => ctrl.abort();
  }, [usuario, sinConfigurar]);

  return (
    <section id="github" aria-labelledby="t-github" className="seccion relative z-10 border-t border-trazo/50">
      <div className="contenedor">
        <SectionHeading
          id="t-github"
          titulo="Código en GitHub"
          intro="Repositorios públicos y actividad reciente, cargados en vivo desde GitHub."
          provisional={sinConfigurar}
        />

        {sinConfigurar ? (
          <div className="rounded-2xl border border-dashed border-trazo p-8 text-niebla">
            <p className="text-hielo">Conecta tu cuenta para mostrar tus repositorios.</p>
            <p className="mt-2">
              Escribe tu usuario en <code className="rounded bg-pizarra px-1.5 py-0.5 text-cian">githubUsuario</code> dentro de{" "}
              <code className="rounded bg-pizarra px-1.5 py-0.5 text-cian">src/data/profile.ts</code>. Esta sección se rellenará sola.
            </p>
          </div>
        ) : (
          <>
            {estado.tipo === "listo" && (
              <dl className="mb-10 flex flex-wrap gap-x-12 gap-y-4">
                <div><dt className="text-sm text-niebla">Repositorios públicos</dt><dd className="font-display text-3xl font-medium">{estado.datos.usuario.public_repos.toLocaleString("es")}</dd></div>
                {estado.datos.usuario.followers > 0 && (<div><dt className="text-sm text-niebla">Seguidores</dt><dd className="font-display text-3xl font-medium">{estado.datos.usuario.followers.toLocaleString("es")}</dd></div>)}
                <div><dt className="text-sm text-niebla">En GitHub desde</dt><dd className="font-display text-3xl font-medium">{new Date(estado.datos.usuario.created_at).getFullYear()}</dd></div>
              </dl>
            )}

            {graficoOk && (
              <div className="mb-10 overflow-x-auto rounded-2xl border border-trazo bg-pizarra/40 p-5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://ghchart.rshah.org/3BE3F5/${encodeURIComponent(usuario)}`}
                  alt={`Gráfico de contribuciones de ${usuario} en el último año`}
                  loading="lazy"
                  onError={() => setGraficoOk(false)}
                  className="min-w-[680px] w-full opacity-90 [filter:invert(1)_hue-rotate(180deg)]"
                />
              </div>
            )}

            <div aria-live="polite" aria-busy={estado.tipo === "cargando"}>
              {estado.tipo === "cargando" && (
                <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <li key={i} className="h-36 animate-pulse rounded-2xl border border-trazo bg-pizarra/40" />
                  ))}
                </ul>
              )}

              {estado.tipo === "error" && (
                <div className="rounded-2xl border border-trazo p-8">
                  <p className="text-hielo">{estado.mensaje}</p>
                  <a href={perfil.redes.github} target="_blank" rel="noopener noreferrer" className="enlace mt-3 inline-block">Ver el perfil directamente en GitHub</a>
                </div>
              )}

              {estado.tipo === "listo" && (
                <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {estado.datos.repos.map((r) => (
                    <li key={r.id}>
                      <a
                        href={r.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-full flex-col rounded-2xl border border-trazo bg-pizarra/40 p-6 transition-colors hover:border-cian/40"
                      >
                        <span className="flex items-start justify-between gap-3">
                          <span className="break-words font-display text-base font-medium text-hielo">{r.name}</span>
                          <IconExternal width={16} height={16} className="mt-1 shrink-0 text-niebla" />
                        </span>
                        <span className="mt-2 line-clamp-2 text-[0.95rem] text-niebla">{r.description ?? "Sin descripción."}</span>
                        <span className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1 pt-5 text-sm text-niebla">
                          {r.language && <span className="text-hielo">{r.language}</span>}
                          <span className="inline-flex items-center gap-1"><IconStar width={14} height={14} />{r.stargazers_count}<span className="sr-only"> estrellas</span></span>
                          <span className="inline-flex items-center gap-1"><IconFork width={14} height={14} />{r.forks_count}<span className="sr-only"> forks</span></span>
                          <span>Actualizado {fecha.format(new Date(r.pushed_at))}</span>
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </>
        )}

        <a href={perfil.redes.github} target="_blank" rel="noopener noreferrer" className="btn-secundario mt-10">
          <IconGitHub width={18} height={18} /> Ver perfil completo
        </a>
      </div>
    </section>
  );
}
