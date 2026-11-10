"use client";
import { useState } from "react";
import { perfil } from "@/data/profile";
import { FORMSPREE_ID } from "@/lib/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { IconCheck, IconCopy, IconGitHub, IconLinkedIn } from "@/components/ui/Icons";

type Errores = Partial<Record<"nombre" | "email" | "mensaje", string>>;
type Envio = "inactivo" | "enviando" | "enviado" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validar(d: FormData): Errores {
  const e: Errores = {};
  if (String(d.get("nombre") ?? "").trim().length < 2) e.nombre = "Escribe tu nombre.";
  if (!EMAIL_RE.test(String(d.get("email") ?? "").trim())) e.email = "Escribe un correo válido, por ejemplo nombre@empresa.com.";
  if (String(d.get("mensaje") ?? "").trim().length < 10) e.mensaje = "Cuéntame un poco más (mínimo 10 caracteres).";
  return e;
}

export function Contact() {
  const [errores, setErrores] = useState<Errores>({});
  const [envio, setEnvio] = useState<Envio>("inactivo");
  const [copiado, setCopiado] = useState(false);

  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(perfil.email);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch {
      window.location.href = `mailto:${perfil.email}`;
    }
  };

  const enviar = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const form = ev.currentTarget;
    const datos = new FormData(form);
    if (datos.get("_gotcha")) return; // trampa anti-spam

    const e = validar(datos);
    setErrores(e);
    if (Object.keys(e).length) {
      form.querySelector<HTMLElement>(`[name="${Object.keys(e)[0]}"]`)?.focus();
      return;
    }

    // Sin Formspree configurado: se abre el cliente de correo del visitante.
    if (!FORMSPREE_ID) {
      const asunto = encodeURIComponent(`Contacto desde el portafolio: ${datos.get("nombre")}`);
      const cuerpo = encodeURIComponent(
        `${datos.get("mensaje")}\n\n${datos.get("nombre")}\n${datos.get("email")}${datos.get("empresa") ? `\n${datos.get("empresa")}` : ""}`
      );
      window.location.href = `mailto:${perfil.email}?subject=${asunto}&body=${cuerpo}`;
      return;
    }

    setEnvio("enviando");
    try {
      const r = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: datos,
      });
      if (!r.ok) throw new Error();
      setEnvio("enviado");
      form.reset();
    } catch {
      setEnvio("error");
    }
  };

  const campo = (nombre: keyof Errores) => ({
    name: nombre,
    id: `c-${nombre}`,
    "aria-invalid": errores[nombre] ? true : undefined,
    "aria-describedby": errores[nombre] ? `e-${nombre}` : undefined,
  });

  return (
    <section id="contacto" aria-labelledby="t-contacto" className="seccion relative z-10 border-t border-trazo/50">
      <div className="contenedor grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <div>
          <SectionHeading
            id="t-contacto"
            titulo="Hablemos"
            intro="¿Tienes una vacante, un proyecto o una idea que necesita ingeniería? Escríbeme y te responderé lo antes posible."
            provisional={perfil.provisional}
          />

          <div className="space-y-6">
            <div>
              <p className="text-sm text-niebla">Correo directo</p>
              <div className="mt-1 flex flex-wrap items-center gap-3">
                <a href={`mailto:${perfil.email}`} className="font-display text-lg font-medium text-hielo hover:text-cian sm:text-xl break-all">
                  {perfil.email}
                </a>
                <button type="button" onClick={copiar} className="inline-flex items-center gap-1.5 rounded-full border border-trazo px-3 py-1 text-sm text-niebla transition-colors hover:border-cian hover:text-hielo">
                  {copiado ? <IconCheck width={16} height={16} /> : <IconCopy width={16} height={16} />}
                  <span aria-live="polite">{copiado ? "Copiado" : "Copiar"}</span>
                </button>
              </div>
            </div>
            <ul className="flex flex-wrap gap-3">
              <li><a href={perfil.redes.linkedin} target="_blank" rel="noopener noreferrer" className="btn-secundario"><IconLinkedIn width={18} height={18} /> LinkedIn</a></li>
              <li><a href={perfil.redes.github} target="_blank" rel="noopener noreferrer" className="btn-secundario"><IconGitHub width={18} height={18} /> GitHub</a></li>
              {perfil.redes.otras.map((r) => (
                <li key={r.url}><a href={r.url} target="_blank" rel="noopener noreferrer" className="btn-secundario">{r.etiqueta}</a></li>
              ))}
            </ul>
            <p className="text-niebla">{perfil.ubicacion}. Zona horaria {perfil.zonaHoraria}.</p>
          </div>
        </div>

        <form onSubmit={enviar} noValidate className="rounded-3xl border border-trazo bg-pizarra/40 p-6 sm:p-8" aria-label="Formulario de contacto">
          {envio === "enviado" ? (
            <div role="status" className="flex min-h-[22rem] flex-col items-start justify-center gap-4">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-cian/15 text-cian"><IconCheck /></span>
              <p className="font-display text-2xl font-medium">Mensaje enviado</p>
              <p className="text-niebla">Gracias por escribir. Te responderé al correo que indicaste.</p>
              <button type="button" onClick={() => setEnvio("inactivo")} className="btn-secundario mt-2">Escribir otro mensaje</button>
            </div>
          ) : (
            <div className="grid gap-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="c-nombre" className="mb-2 block text-sm font-medium">Nombre</label>
                  <input {...campo("nombre")} autoComplete="name" className="campo" />
                  {errores.nombre && <p id="e-nombre" className="mt-1.5 text-sm text-rose-300">{errores.nombre}</p>}
                </div>
                <div>
                  <label htmlFor="c-email" className="mb-2 block text-sm font-medium">Correo</label>
                  <input {...campo("email")} type="email" autoComplete="email" inputMode="email" className="campo" />
                  {errores.email && <p id="e-email" className="mt-1.5 text-sm text-rose-300">{errores.email}</p>}
                </div>
              </div>
              <div>
                <label htmlFor="c-empresa" className="mb-2 block text-sm font-medium">
                  Empresa <span className="font-normal text-niebla">(opcional)</span>
                </label>
                <input id="c-empresa" name="empresa" autoComplete="organization" className="campo" />
              </div>
              <div>
                <label htmlFor="c-mensaje" className="mb-2 block text-sm font-medium">Mensaje</label>
                <textarea {...campo("mensaje")} rows={6} className="campo resize-y" />
                {errores.mensaje && <p id="e-mensaje" className="mt-1.5 text-sm text-rose-300">{errores.mensaje}</p>}
              </div>
              {/* Honeypot: invisible para personas, los bots lo rellenan */}
              <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

              {envio === "error" && (
                <p role="alert" className="rounded-xl border border-rose-400/30 bg-rose-400/10 px-4 py-3 text-sm text-rose-200">
                  El mensaje no se envió. Revisa tu conexión e inténtalo de nuevo, o escríbeme directamente a {perfil.email}.
                </p>
              )}

              <button type="submit" disabled={envio === "enviando"} className="btn-primario w-full disabled:opacity-60 sm:w-auto sm:justify-self-start">
                {envio === "enviando" ? "Enviando…" : "Enviar mensaje"}
              </button>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
