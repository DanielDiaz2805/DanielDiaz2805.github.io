import { trayectoria, type Hito } from "@/data/profile";
import { SectionHeading } from "@/components/ui/SectionHeading";

const tipos: Record<Hito["tipo"], { texto: string; color: string }> = {
  experiencia: { texto: "Experiencia", color: "text-cian border-cian" },
  formacion: { texto: "Formación", color: "text-violeta border-violeta" },
  certificacion: { texto: "Certificación", color: "text-sky-300 border-sky-300" },
  logro: { texto: "Logro", color: "text-emerald-300 border-emerald-300" },
};

export function Timeline() {
  return (
    <section id="trayectoria" aria-labelledby="t-trayectoria" className="seccion relative z-10 border-t border-trazo/50">
      <div className="contenedor">
        <SectionHeading
          id="t-trayectoria"
          titulo="Experiencia y formación"
          intro="Prácticas profesionales, formación académica y cursos complementarios."
          provisional={trayectoria.provisional}
        />
        <ol className="relative max-w-3xl">
          {/* Línea temporal: degradado de presente (cian) a pasado (violeta) */}
          <span aria-hidden className="absolute bottom-2 left-[7px] top-2 w-px bg-gradient-to-b from-cian via-violeta/60 to-trazo" />
          {trayectoria.items.map((h, i) => {
            const t = tipos[h.tipo];
            return (
              <li key={i} className="relative pb-12 pl-10 last:pb-0">
                <span aria-hidden className={`absolute left-0 top-1.5 h-[15px] w-[15px] rounded-full border-2 bg-abismo ${t.color.split(" ")[1]}`} />
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <span className={`text-sm font-semibold ${t.color.split(" ")[0]}`}>{t.texto}</span>
                  {h.periodo && <time className="text-sm text-niebla">{h.periodo}</time>}
                </div>
                <h3 className="mt-2 font-display text-xl font-medium text-hielo">{h.titulo}</h3>
                <p className="text-niebla">{h.entidad}</p>
                <p className="mt-3 max-w-lectura text-niebla/90">{h.descripcion}</p>
                {h.items && h.items.length > 0 && (
                  <ul className="mt-2 max-w-lectura list-disc space-y-1 pl-5 text-niebla/90 marker:text-violeta">
                    {h.items.map((it) => <li key={it}>{it}</li>)}
                  </ul>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
