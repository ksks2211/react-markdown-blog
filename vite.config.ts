import { defineConfig } from "vite";
import { terser } from "rollup-plugin-terser";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    ...(process.env.NODE_ENV === "production"
      ? [
          terser({
            compress: {
              drop_console: true,
            },
          }),
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@customTypes": path.resolve(__dirname, "./src/types"),
    },
  },
});
