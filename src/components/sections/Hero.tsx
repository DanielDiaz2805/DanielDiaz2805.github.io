import { perfil } from "@/data/profile";
import { withBase } from "@/lib/site";
import { SystemCanvas } from "@/components/ui/SystemCanvas";
import { ProvisionalTag } from "@/components/ui/SectionHeading";
import { IconDownload } from "@/components/ui/Icons";

const retraso = (ms: number) => ({ animationDelay: `${ms}ms` });

export function Hero() {
  return (
    <section
      id="inicio"
      aria-labelledby="titulo-hero"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden pb-16 pt-[calc(var(--header-h)+3rem)]"
    >
      {/* Mapa de sistema interactivo: ocupa la mitad derecha en escritorio y todo el fondo en móvil */}
      <div className="entrada-lienzo absolute inset-0 -z-10 lg:left-[38%]">
        <SystemCanvas className="h-full w-full" />
        <div className="absolute inset-0 bg-gradient-to-r from-abismo via-abismo/60 to-transparent lg:via-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-abismo to-transparent" />
      </div>

      <div className="contenedor">
        {perfil.provisional && (
          <div className="entrada mb-8" style={retraso(0)}><ProvisionalTag /></div>
        )}

        <h1 id="titulo-hero" className="font-display font-semibold leading-[0.92] tracking-[-0.035em]" style={{ fontSize: "clamp(2.75rem, 9vw, 7.5rem)" }}>
          <span className="linea-mascara"><span style={retraso(100)}>{perfil.nombre}</span></span>
          <span className="linea-mascara">
            <span style={retraso(220)} className="font-extralight text-hielo/80">
              {perfil.apellido}
            </span>
          </span>
        </h1>

        <p className="entrada mt-8 font-display text-lg font-normal text-hielo sm:text-xl" style={retraso(450)}>
          {perfil.titulo}
        </p>

        <p className="entrada mt-5 max-w-lectura text-lg text-niebla" style={retraso(550)}>
          {perfil.propuesta}
        </p>

        <div className="entrada mt-10 flex flex-wrap gap-3" style={retraso(650)}>
          <a href="#proyectos" className="btn-primario">Ver proyectos</a>
          <a href="#contacto" className="btn-secundario">Contactar</a>
          <a href={withBase(perfil.cv)} download className="btn-secundario">
            <IconDownload width={18} height={18} /> Descargar CV
          </a>
        </div>

        <figure className="entrada mt-16 max-w-md border-l-2 border-violeta/70 pl-5" style={retraso(800)}>
          <blockquote className="text-lg italic leading-relaxed text-hielo/90">“{perfil.frase}”</blockquote>
          {perfil.disponibilidad.disponible && (
            <figcaption className="mt-4 flex items-center gap-2.5 text-sm text-niebla">
              <span className="punto-disponible h-2 w-2 shrink-0 rounded-full bg-emerald-400" aria-hidden />
              <span>{perfil.disponibilidad.texto}. {perfil.disponibilidad.detalle}</span>
            </figcaption>
          )}
        </figure>
      </div>
    </section>
  );
}
