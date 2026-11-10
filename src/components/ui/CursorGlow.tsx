"use client";
import { useEffect, useRef } from "react";

/**
 * Halo de luz que sigue al puntero. Solo en dispositivos con ratón y
 * sin "reducir movimiento". Usa transform (GPU) y requestAnimationFrame.
 */
export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fino = window.matchMedia("(pointer: fine)").matches;
    const reducido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const el = ref.current;
    if (!fino || reducido || !el) return;

    let x = window.innerWidth / 2, y = window.innerHeight / 2, cx = x, cy = y, raf = 0;
    const mover = (e: PointerEvent) => { x = e.clientX; y = e.clientY; el.style.opacity = "1"; };
    const salir = () => { el.style.opacity = "0"; };
    const tick = () => {
      cx += (x - cx) * 0.15;
      cy += (y - cy) * 0.15;
      el.style.transform = `translate3d(${cx - 300}px, ${cy - 300}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("pointermove", mover, { passive: true });
    document.documentElement.addEventListener("pointerleave", salir);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", mover);
      document.documentElement.removeEventListener("pointerleave", salir);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-0 h-[600px] w-[600px] rounded-full opacity-0 transition-opacity duration-500"
      style={{ background: "radial-gradient(circle, rgba(59,227,245,0.07), transparent 60%)" }}
    />
  );
}
