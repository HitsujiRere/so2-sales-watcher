import { crx, defineManifest } from "@crxjs/vite-plugin";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { defineConfig } from "vite";

const manifest = defineManifest({
  manifest_version: 3,
  name: "SO2 Sales Watcher",
  version: "0.1.0",
  action: { default_popup: "index.html" },
  host_permissions: ["https://so2-api.mutoys.com/"],
  permissions: ["storage"],
});

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), crx({ manifest })],
  server: {
    port: 5173,
    strictPort: true,
    hmr: {
      port: 5173,
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
