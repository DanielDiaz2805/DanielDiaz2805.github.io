import { stack } from "@/data/profile";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Stack() {
  return (
    <section id="stack" aria-labelledby="t-stack" className="seccion relative z-10 border-t border-trazo/50">
      <div className="contenedor">
        <SectionHeading
          id="t-stack"
          titulo="Stack tecnológico"
          intro="Las herramientas con las que diseño, construyo y despliego, agrupadas por la capa del sistema en la que trabajan."
          provisional={stack.provisional}
        />
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 sm:gap-x-10 lg:grid-cols-3">
          {stack.categorias.map((c) => (
            <div key={c.nombre}>
              <h3 className="flex items-center gap-3 font-display text-base font-medium text-hielo">
                <span className="h-2.5 w-2.5 rounded-full border-2 border-violeta" aria-hidden />
                {c.nombre}
              </h3>
              {/* Los elementos cuelgan de una línea vertical: la misma metáfora de nodos del hero */}
              <ul className="ml-[0.3rem] mt-4 border-l border-trazo pl-6">
                {c.items.map((item) => (
                  <li key={item} className="group relative py-1.5 text-niebla transition-colors hover:text-hielo">
                    <span className="absolute -left-[1.6rem] top-1/2 h-px w-4 bg-trazo transition-colors group-hover:bg-cian" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
