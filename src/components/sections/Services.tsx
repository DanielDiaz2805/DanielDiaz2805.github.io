import { servicios } from "@/data/profile";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Services() {
  return (
    <section id="servicios" aria-labelledby="t-servicios" className="seccion relative z-10 border-t border-trazo/50">
      <div className="contenedor">
        <SectionHeading
          id="t-servicios"
          titulo="En qué puedo ayudar"
          intro="Áreas en las que aporto desde el primer día, ya sea dentro de un equipo o en un proyecto puntual."
          provisional={servicios.provisional}
        />
        <ul className="grid gap-x-12 sm:grid-cols-2">
          {servicios.items.map((s) => (
            <li key={s.titulo} className="group border-t border-trazo py-8">
              <h3 className="font-display text-xl font-medium text-hielo transition-colors group-hover:text-cian">{s.titulo}</h3>
              <p className="mt-3 max-w-md text-niebla">{s.descripcion}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
