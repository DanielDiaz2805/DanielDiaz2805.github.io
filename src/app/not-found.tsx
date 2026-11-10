import Link from "next/link";

export default function NoEncontrado() {
  return (
    <main className="contenedor flex min-h-screen flex-col items-start justify-center gap-6">
      <p className="text-niebla">Error 404</p>
      <h1 className="titulo-seccion">Esta ruta no existe en el sistema.</h1>
      <Link href="/" className="btn-primario">Volver al inicio</Link>
    </main>
  );
}
