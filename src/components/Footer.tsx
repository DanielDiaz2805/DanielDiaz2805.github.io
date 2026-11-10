import { perfil } from "@/data/profile";
import { IconGitHub, IconLinkedIn, IconMail } from "@/components/ui/Icons";

export function Footer() {
  const anio = new Date().getFullYear();
  return (
    <footer className="relative z-10 border-t border-trazo/70">
      <div className="contenedor flex flex-col gap-8 py-12 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-display text-lg font-medium">{perfil.nombre} {perfil.apellido}</p>
          <p className="mt-1 text-sm text-niebla">{perfil.titulo}, {perfil.ubicacion}</p>
        </div>
        <div className="flex flex-col gap-4 sm:items-end">
          <ul className="flex gap-2">
            <li><a href={perfil.redes.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="grid h-10 w-10 place-items-center rounded-lg border border-trazo text-niebla transition-colors hover:border-cian hover:text-hielo"><IconGitHub /></a></li>
            <li><a href={perfil.redes.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="grid h-10 w-10 place-items-center rounded-lg border border-trazo text-niebla transition-colors hover:border-cian hover:text-hielo"><IconLinkedIn /></a></li>
            <li><a href={`mailto:${perfil.email}`} aria-label="Correo electrónico" className="grid h-10 w-10 place-items-center rounded-lg border border-trazo text-niebla transition-colors hover:border-cian hover:text-hielo"><IconMail /></a></li>
          </ul>
          <p className="text-sm text-niebla">© {anio} {perfil.nombre} {perfil.apellido}. Diseñado y desarrollado con Next.js y TypeScript.</p>
        </div>
      </div>
    </footer>
  );
}
