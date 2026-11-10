import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        abismo: "#060914",   // fondo base: azul casi negro, no gris neutro
        pizarra: "#0D1326",  // superficies elevadas
        trazo: "#1C2647",    // bordes y líneas de sistema
        niebla: "#9AA6C7",   // texto secundario
        hielo: "#E9EEFB",    // texto principal
        cian: "#3BE3F5",     // acento eléctrico principal (señal)
        violeta: "#8D7BFF",  // acento secundario (profundidad)
      },
      fontFamily: {
        display: ['"Unbounded Variable"', "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ['"Instrument Sans Variable"', "ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
      },
      maxWidth: { contenido: "72rem", lectura: "38rem" },
    },
  },
  plugins: [],
};

export default config;
