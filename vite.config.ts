import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  base: "/loveproject",
  plugins: [react()],
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
        `,
      },
    },
  },
});
