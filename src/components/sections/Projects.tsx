import { proyectos } from "@/data/profile";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/ui/ProjectCard";

export function Projects() {
  const principal = proyectos.items.find((p) => p.destacado);
  const resto = proyectos.items.filter((p) => p !== principal);

  return (
    <section id="proyectos" aria-labelledby="t-proyectos" className="seccion relative z-10 border-t border-trazo/50">
      <div className="contenedor">
        <SectionHeading
          id="t-proyectos"
          titulo="Proyectos destacados"
          intro="Cada proyecto parte de un problema concreto. Aquí está qué se resolvió, cómo y con qué."
          provisional={proyectos.provisional}
        />
        <div className="grid gap-6">
          {principal && <ProjectCard p={principal} destacado />}
          {resto.length > 0 && (
            <div className="grid gap-6 lg:grid-cols-3">
              {resto.map((p) => <ProjectCard key={p.titulo + p.resumen} p={p} />)}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
