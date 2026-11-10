/**
 * ============================================================
 *  CONTENIDO DEL PORTAFOLIO — ÚNICO ARCHIVO QUE DEBES EDITAR
 * ============================================================
 *
 *  Fuentes: hoja de vida (HojadeVida.pdf) y repositorios públicos de
 *  github.com/DanielDiaz2805. Lo que sigue entre [corchetes] es un dato
 *  que falta confirmar. Cuando una sección quede completa, cambia
 *  `provisional` a `false` para quitar la etiqueta "Contenido provisional".
 */

export type Enlace = { etiqueta: string; url: string };

export type Proyecto = {
  titulo: string;
  resumen: string;
  problema: string;
  solucion: string;
  funcionalidades: string[];
  tecnologias: string[];
  imagen?: string; // ruta en /public, ej. "/proyectos/pmic.webp" (1600×1000 recomendado)
  repo?: string;
  demo?: string;
  destacado?: boolean; // el primero destacado se muestra a ancho completo
};

export type Hito = {
  tipo: "formacion" | "experiencia" | "certificacion" | "logro";
  titulo: string;
  entidad: string;
  periodo?: string;
  descripcion: string;
  items?: string[];
};

export const perfil = {
  provisional: false,

  nombre: "Daniel",
  apellido: "Diaz Montiel",
  iniciales: "DD",
  titulo: "Desarrollador full stack, finalizando Ingeniería de Sistemas",
  ubicacion: "Chinú, Córdoba, Colombia",
  zonaHoraria: "UTC−5",

  propuesta:
    "Construyo aplicaciones web y móviles, y las APIs que las conectan: desde la interfaz hasta el servicio que valida, transforma y procesa los datos, con arquitectura clara y manejo de errores pensado desde el inicio.",

  frase: "Un buen sistema no es el que nunca falla, sino el que sabe qué hacer cuando algo falla.",

  disponibilidad: {
    disponible: true,
    texto: "Disponible para nuevas oportunidades",
    detalle: "Desde Chinú, Córdoba, Colombia (UTC−5).",
  },

  email: "danieldiazmontiel05@gmail.com",
  cv: "/cv.pdf",

  redes: {
    github: "https://github.com/DanielDiaz2805",
    linkedin: "https://www.linkedin.com/in/daniel-diaz-225855294",
    otras: [] as Enlace[],
  },

  githubUsuario: "DanielDiaz2805",
  // Repositorios que aparecen primero en la sección GitHub, en este orden.
  githubFijados: ["PMIC", "middleware-hospitalario", "practica_integraci-n"],
  // Repositorios que nunca se muestran en el portafolio.
  githubOcultar: ["vida", "gesti-n", "parcial-asesor-academico"],
};

export const sobreMi = {
  provisional: false,
  parrafos: [
    "Estoy terminando el décimo semestre de Ingeniería de Sistemas en la Corporación Universitaria del Caribe (CECAR) y realicé mis prácticas profesionales en la Alcaldía de Chinú. Trabajo en todo el recorrido de una aplicación: maqueto la interfaz, construyo el back-end y diseño las APIs RESTful que conectan ambos, tanto en web como en móvil.",
    "Me gusta convertir un requerimiento difuso en un sistema con partes claras. En PMIC, por ejemplo, el procesamiento de imágenes se dividió en cuatro etapas independientes conectadas por colas, cada una con sus propios workers y métricas, para saber exactamente dónde se gasta el tiempo y qué falló. Aplico ese mismo criterio de separación de responsabilidades, siguiendo MVC, en cada proyecto.",
    "Mis proyectos más recientes giran en torno a la integración de sistemas: microservicios, un middleware con autenticación JWT y orquestadores que combinan varios servicios sin romperse cuando uno no responde. Busco sumarme a un equipo donde pueda aportar en desarrollo full stack e integración, y seguir creciendo junto a desarrolladores con más experiencia.",
  ],
  datos: [
    { valor: "Web y móvil", etiqueta: "full stack con Next.js y Node.js, y apps con Flutter" },
    { valor: "MVC y REST", etiqueta: "arquitectura y APIs aplicadas en cada proyecto" },
    { valor: "Scrum y Kanban", etiqueta: "metodologías ágiles de trabajo" },
  ],
};

/** Combina tu hoja de vida con lo que demuestra el código de tus repositorios. */
export const stack = {
  provisional: false,
  categorias: [
    { nombre: "Lenguajes", items: ["JavaScript (ES6+)", "Python", "HTML5", "CSS3"] },
    { nombre: "Frontend", items: ["React", "Next.js", "Bootstrap", "Tailwind CSS"] },
    { nombre: "Backend y APIs", items: ["Node.js", "Flask", "FastAPI", "APIs RESTful", "Autenticación JWT"] },
    { nombre: "Móvil", items: ["Flutter"] },
    { nombre: "Bases de datos", items: ["MongoDB", "Firebase", "SQLite"] },
    {
      nombre: "Herramientas y prácticas",
      items: ["Git y GitHub", "Excel", "Arquitectura MVC", "Microservicios", "Scrum y Kanban", "Depuración y documentación"],
    },
  ],
};

export const proyectos: { provisional: boolean; items: Proyecto[] } = {
  provisional: false,
  items: [
    {
      destacado: true,
      titulo: "PMIC: procesamiento masivo de imágenes",
      resumen: "Proyecto académico. Plataforma que descarga, redimensiona, convierte y marca con agua lotes de imágenes de forma concurrente.",
      problema:
        "Procesar decenas de imágenes una por una es lento, y cuando algo falla a mitad del lote no queda claro en qué paso ni con qué archivo.",
      solucion:
        "Un pipeline productor-consumidor de cuatro etapas conectadas por colas, cada una con workers configurables. La API lanza el pipeline en un hilo aparte para responder de inmediato, y cada etapa registra tiempos y errores en SQLite.",
      funcionalidades: [
        "Hasta 50 URLs por proceso, con validación de entrada mediante Pydantic",
        "Entre 1 y 10 workers configurables por etapa: descarga, redimensión, conversión y marca de agua",
        "Seguimiento del estado: en proceso, completado, completado con errores o fallido",
        "Métricas por etapa y metadatos de cada imagen guardados en SQLite con acceso thread-safe",
        "Dashboard en React para lanzar procesos y ver su avance",
      ],
      tecnologias: ["Python", "FastAPI", "Pillow", "SQLite", "React", "Vite", "Tailwind CSS"],
      repo: "https://github.com/DanielDiaz2805/PMIC",
    },
    {
      titulo: "Middleware hospitalario con JWT",
      resumen: "Proyecto académico. Intermediario REST entre el área de admisiones y cuatro sistemas del hospital.",
      problema:
        "Cada sistema del hospital (laboratorio, facturación, farmacia y radiología) espera los datos en un formato distinto, y no cualquiera debería poder enviarles solicitudes.",
      solucion:
        "Un middleware que verifica el token JWT, valida los campos, transforma la solicitud al formato de cada destino y la enruta, aplicando reglas de negocio como exigir autorización en farmacia cuando la cantidad supera 30 unidades.",
      funcionalidades: [
        "Autenticación con JWT y expiración configurable",
        "Validación de tipos y respuestas de error uniformes que indican la causa",
        "Destinos tolerantes a mayúsculas y tildes",
      ],
      tecnologias: ["Python", "Flask", "PyJWT", "Gunicorn", "REST"],
      repo: "https://github.com/DanielDiaz2805/middleware-hospitalario",
    },
    {
      titulo: "Microservicios hospitalarios y orquestador",
      resumen: "Proyecto académico. Seis microservicios independientes y un orquestador que los integra.",
      problema:
        "Una consulta de atención necesita información de varios servicios a la vez, y si uno no responde, la petición completa no debería quedarse colgada.",
      solucion:
        "Microservicios para pacientes, citas, laboratorio, facturación, farmacia y notificaciones, cada uno con endpoint de salud, y un orquestador que los consulta con tiempo de espera y traduce cada fallo a un error claro (502, 504 o 404).",
      funcionalidades: [
        "Endpoints REST de lectura y creación en cada servicio",
        "Orquestador configurable por variables de entorno",
      ],
      tecnologias: ["Python", "Flask", "Requests", "Gunicorn", "Microservicios"],
      repo: "https://github.com/DanielDiaz2805/practica_integraci-n",
    },
  ],
};

export const trayectoria: { provisional: boolean; items: Hito[] } = {
  provisional: false,
  items: [
    {
      tipo: "experiencia",
      titulo: "Practicante profesional de Ingeniería de Sistemas",
      entidad: "Alcaldía de Chinú, Córdoba. Área de Planeación",
      periodo: "Agosto — noviembre 2026",
      descripcion:
        "Unifiqué con Python y Excel las bases de datos de estratificación socioeconómica del municipio, y automaticé procesos del área de Planeación, entre ellos la expedición de certificaciones.",
    },
    {
      tipo: "formacion",
      titulo: "Ingeniería de Sistemas",
      entidad: "Corporación Universitaria del Caribe (CECAR), Sincelejo, Sucre",
      periodo: "2021 — 2026",
      descripcion:
        "Cursando el décimo y último semestre. Formación en desarrollo de software front-end y back-end, aplicaciones web y móviles, arquitectura MVC, integración de sistemas y metodologías ágiles.",
    },
    {
      tipo: "certificacion",
      titulo: "Formación complementaria",
      entidad: "Udemy, Capacítate para el Empleo, Coursera y Gobernación de Sucre",
      descripcion: "Cursos realizados:",
      items: [
        "Desarrollador web full stack (Udemy)",
        "Desarrollador de aplicaciones (Gobernación de Sucre y ParqueSoft)",
        "Programador orientado a objetos (Capacítate para el Empleo)",
        "Paradigma de programación orientado a objetos (Capacítate para el Empleo)",
        "Seguridad y privacidad en el manejo de información, regulación (Capacítate para el Empleo)",
        "Fundamentos de finanzas empresariales (Coursera y Universidad de los Andes)",
      ],
    },
  ],
};

export const servicios = {
  provisional: false,
  items: [
    {
      titulo: "Aplicaciones web full stack",
      descripcion: "Interfaces con React, Next.js o Bootstrap conectadas a un back-end en Node.js o Python, desde la maqueta hasta el despliegue.",
    },
    {
      titulo: "APIs e integración de sistemas",
      descripcion: "APIs RESTful con validación y autenticación JWT, middleware y orquestadores que hacen hablar a sistemas distintos.",
    },
    {
      titulo: "Aplicaciones móviles",
      descripcion: "Apps multiplataforma con Flutter, conectadas a Firebase o a una API propia.",
    },
    {
      titulo: "Bases de datos",
      descripcion: "Modelado y persistencia con MongoDB, Firebase y SQLite, según lo que necesite cada proyecto.",
    },
  ],
};

export const seo = {
  descripcion:
    "Daniel Diaz Montiel, desarrollador full stack y estudiante de último semestre de Ingeniería de Sistemas en Colombia. Aplicaciones web y móviles, APIs RESTful e integración de sistemas.",
  palabrasClave: [
    "Daniel Diaz Montiel",
    "Ingeniero de Sistemas",
    "Desarrollador Full Stack",
    "Desarrollador web Colombia",
    "APIs RESTful",
    "Flutter",
    "Next.js",
    "Python",
  ],
};

/** Utilidad: detecta si un texto sigue siendo provisional. */
export const esProvisional = (texto: string) => /\[.*\]/.test(texto);
