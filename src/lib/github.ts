export type Repo = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  pushed_at: string;
  fork: boolean;
  archived: boolean;
};

export type UsuarioGitHub = {
  login: string;
  public_repos: number;
  followers: number;
  html_url: string;
  created_at: string;
};

export type DatosGitHub = { usuario: UsuarioGitHub; repos: Repo[] };

const CACHE_KEY = "gh-cache-v2";
const CACHE_MS = 1000 * 60 * 30; // 30 min: la API pública permite 60 peticiones/hora por IP

export type OpcionesGitHub = { fijados?: string[]; ocultar?: string[] };

export async function obtenerGitHub(
  usuario: string,
  { fijados = [], ocultar = [] }: OpcionesGitHub = {},
  signal?: AbortSignal
): Promise<DatosGitHub> {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (raw) {
      const { t, u, d } = JSON.parse(raw);
      if (u === usuario && Date.now() - t < CACHE_MS) return d as DatosGitHub;
    }
  } catch {
    /* almacenamiento no disponible: se consulta la API */
  }

  const base = `https://api.github.com/users/${encodeURIComponent(usuario)}`;
  const headers = { Accept: "application/vnd.github+json" };
  const [ru, rr] = await Promise.all([
    fetch(base, { headers, signal }),
    fetch(`${base}/repos?per_page=100&sort=pushed`, { headers, signal }),
  ]);

  if (ru.status === 404) throw new Error("No existe un usuario de GitHub con ese nombre.");
  if (ru.status === 403 || rr.status === 403)
    throw new Error("GitHub limitó las consultas temporalmente. Vuelve a intentarlo en unos minutos.");
  if (!ru.ok || !rr.ok) throw new Error("No se pudo conectar con GitHub.");

  const usuarioData = (await ru.json()) as UsuarioGitHub;
  const repos = ((await rr.json()) as Repo[])
    .filter((r) => !r.fork && !r.archived && !ocultar.includes(r.name))
    .sort((a, b) => {
      // Primero los fijados en su orden; luego por estrellas y actividad reciente
      const fa = fijados.indexOf(a.name), fb = fijados.indexOf(b.name);
      if (fa !== fb) return (fa === -1 ? Infinity : fa) - (fb === -1 ? Infinity : fb);
      return b.stargazers_count - a.stargazers_count || +new Date(b.pushed_at) - +new Date(a.pushed_at);
    })
    .slice(0, 6);

  const datos = { usuario: usuarioData, repos };
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ t: Date.now(), u: usuario, d: datos }));
  } catch {
    /* sin caché */
  }
  return datos;
}
