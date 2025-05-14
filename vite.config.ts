import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  base: "/Love",
  plugins: [
    react(),
    svgr({
      // Настройка плагина, чтобы экспортировать SVG как обычный React-компонент
      svgrOptions: {
        icon: true, // Это позволяет экспортировать как обычный компонент, а не как строку
      },
    }),
  ],
  server: {
    allowedHosts: ["3c3b-212-34-140-176.ngrok-free.app"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "@/shared/styles/func.scss" as *;
          @use "@/shared/styles/variables/primary-colors.scss" as *;
          @use "@/shared/styles/variables/_margin.scss" as *;
          @use "@/shared/styles/variables/_media.scss" as *;
          @use "@/shared/styles/variables/_borderRadius.scss" as *;
          @use "@/shared/styles/variables/_fontSize.scss" as *;
          @use "@/shared/styles/variables/_transform.scss" as *;
          @use "@/shared/styles/variables/_pageSize.scss" as *;
        `,
      },
    },
  },
});
