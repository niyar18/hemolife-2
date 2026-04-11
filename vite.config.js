import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
<<<<<<< HEAD
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
=======
>>>>>>> 89fdc1aff146c1b3547e27112ba32b0457979d87
  },
});
