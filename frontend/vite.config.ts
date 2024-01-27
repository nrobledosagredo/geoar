import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import fs from "fs";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    https: {
      key: fs.readFileSync(
        path.resolve(__dirname, "./192.168.159.129+3-key.pem")
      ),
      cert: fs.readFileSync(path.resolve(__dirname, "./192.168.159.129+3.pem")),
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
