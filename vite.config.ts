import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/loveproject", // 👈 ОБЯЗАТЕЛЬНО укажи название репозитория с косой чертой
  plugins: [react()],
});
