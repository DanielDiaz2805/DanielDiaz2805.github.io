"use client";
import { useEffect, useRef } from "react";

type Nodo = { x: number; y: number; vx: number; vy: number; r: number; hub: boolean };

/**
 * "Mapa de sistema": nodos que se conectan como servicios de una arquitectura.
 * El puntero actúa como una petición entrante: atrae los nodos cercanos
 * e ilumina sus conexiones. Se pausa fuera de pantalla y respeta
 * prefers-reduced-motion (dibuja un único fotograma estático).
 */
export function SystemCanvas({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reducido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0, h = 0, dpr = 1, nodos: Nodo[] = [], raf = 0, visible = true;
    const puntero = { x: -9999, y: -9999, activo: false };
    const inicio = performance.now();

    const crear = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width; h = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.max(24, Math.min(90, Math.round((w * h) / 12000)));
      nodos = Array.from({ length: n }, (_, i) => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        hub: i % 11 === 0,
        r: i % 11 === 0 ? 2.6 : 1.3 + Math.random() * 0.8,
      }));
    };

    const dibujar = (t: number) => {
      // Las conexiones "crecen" durante la entrada (1.6 s)
      const progreso = reducido ? 1 : Math.min(1, (t - inicio) / 1600);
      const alcance = Math.min(175, Math.max(115, w / 6)) * (0.2 + 0.8 * easeOut(progreso));
      const radioPuntero = 170;

      ctx.clearRect(0, 0, w, h);

      for (const n of nodos) {
        if (!reducido) {
          if (puntero.activo) {
            const dx = puntero.x - n.x, dy = puntero.y - n.y, d = Math.hypot(dx, dy);
            if (d < radioPuntero && d > 1) { n.vx += (dx / d) * 0.012; n.vy += (dy / d) * 0.012; }
          }
          n.vx *= 0.985; n.vy *= 0.985;
          // velocidad mínima: el sistema nunca está completamente quieto
          const v = Math.hypot(n.vx, n.vy);
          if (v < 0.08) { n.vx += (Math.random() - 0.5) * 0.02; n.vy += (Math.random() - 0.5) * 0.02; }
          n.x += n.vx; n.y += n.vy;
          if (n.x < -10) n.x = w + 10; else if (n.x > w + 10) n.x = -10;
          if (n.y < -10) n.y = h + 10; else if (n.y > h + 10) n.y = -10;
        }
      }

      ctx.lineWidth = 1;
      for (let i = 0; i < nodos.length; i++) {
        const a = nodos[i];
        for (let j = i + 1; j < nodos.length; j++) {
          const b = nodos[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d > alcance) continue;
          const base = 1 - d / alcance;
          const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
          const cerca = puntero.activo ? Math.max(0, 1 - Math.hypot(mx - puntero.x, my - puntero.y) / radioPuntero) : 0;
          ctx.strokeStyle = cerca > 0
            ? `rgba(59,227,245,${(base * (0.25 + cerca * 0.7)).toFixed(3)})`
            : `rgba(120,135,200,${(base * 0.22).toFixed(3)})`;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        }
      }

      for (const n of nodos) {
        const cerca = puntero.activo ? Math.max(0, 1 - Math.hypot(n.x - puntero.x, n.y - puntero.y) / radioPuntero) : 0;
        ctx.fillStyle = n.hub ? "rgba(141,123,255,0.95)" : cerca > 0 ? `rgba(59,227,245,${0.5 + cerca * 0.5})` : "rgba(170,182,225,0.55)";
        ctx.beginPath(); ctx.arc(n.x, n.y, n.r + cerca * 1.2, 0, Math.PI * 2); ctx.fill();
        if (n.hub) {
          ctx.strokeStyle = "rgba(141,123,255,0.25)";
          ctx.beginPath(); ctx.arc(n.x, n.y, n.r + 5, 0, Math.PI * 2); ctx.stroke();
        }
      }
    };

    const bucle = (t: number) => {
      if (visible && !document.hidden) dibujar(t);
      raf = requestAnimationFrame(bucle);
    };

    const mover = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      puntero.x = e.clientX - r.left; puntero.y = e.clientY - r.top;
      puntero.activo = puntero.x >= 0 && puntero.y >= 0 && puntero.x <= r.width && puntero.y <= r.height;
    };
    const salir = () => { puntero.activo = false; };

    crear();
    const ro = new ResizeObserver(() => { crear(); if (reducido) dibujar(performance.now()); });
    ro.observe(canvas);

    if (reducido) {
      dibujar(performance.now());
      return () => ro.disconnect();
    }

    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
    io.observe(canvas);
    window.addEventListener("pointermove", mover, { passive: true });
    window.addEventListener("pointerleave", salir);
    raf = requestAnimationFrame(bucle);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect(); io.disconnect();
      window.removeEventListener("pointermove", mover);
      window.removeEventListener("pointerleave", salir);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className={className} />;
}

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
