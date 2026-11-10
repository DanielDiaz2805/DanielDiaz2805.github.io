import { sobreMi } from "@/data/profile";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function About() {
  return (
    <section id="sobre-mi" aria-labelledby="t-sobre-mi" className="seccion relative z-10">
      <div className="contenedor">
        <SectionHeading id="t-sobre-mi" titulo="Sobre mí" provisional={sobreMi.provisional} />
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:gap-20">
          <div className="max-w-lectura space-y-6 text-lg text-niebla [&>p:first-child]:text-xl [&>p:first-child]:text-hielo">
            {sobreMi.parrafos.map((p, i) => <p key={i}>{p}</p>)}
          </div>
          <dl className="grid self-start content-start gap-px overflow-hidden rounded-2xl border border-trazo bg-trazo">
            {sobreMi.datos.map((d) => (
              <div key={d.etiqueta} className="bg-abismo p-6">
                <dt className="text-sm text-niebla">{d.etiqueta}</dt>
                <dd className="mt-1 font-display text-3xl font-medium text-hielo">{d.valor}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
