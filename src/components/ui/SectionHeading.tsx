type Props = {
  id: string;
  titulo: string;
  intro?: string;
  provisional?: boolean;
};

/**
 * Encabezado de sección. Si `provisional` es true muestra un aviso visible
 * para que nadie confunda el contenido de ejemplo con información real.
 */
export function SectionHeading({ id, titulo, intro, provisional }: Props) {
  return (
    <header className="mb-12 max-w-2xl sm:mb-16">
      <div className="flex flex-wrap items-center gap-3">
        <h2 id={id} className="titulo-seccion">{titulo}</h2>
        {provisional && <ProvisionalTag />}
      </div>
      {intro && <p className="mt-5 max-w-lectura text-lg text-niebla">{intro}</p>}
    </header>
  );
}

export function ProvisionalTag() {
  return (
    <span
      className="inline-flex items-center rounded-full border border-dashed border-amber-300/50 bg-amber-300/[0.06] px-3 py-1 font-sans text-xs font-medium text-amber-200"
      title="Edita src/data/profile.ts y cambia provisional a false"
    >
      Contenido provisional
    </span>
  );
}
