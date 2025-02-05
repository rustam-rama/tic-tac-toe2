import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174,
    strictPort: true,
    open: true,
    headers: {
      // Отключаем кэширование для favicon
      "Cache-Control": "no-store",
    },
    // Добавляем обработку всех маршрутов
    historyApiFallback: {
      rewrites: [
        { from: /^\/task\/.*$/, to: "/index.html" },
        { from: /^\/404$/, to: "/index.html" },
        { from: /./, to: "/index.html" },
      ],
    },
  },
});
