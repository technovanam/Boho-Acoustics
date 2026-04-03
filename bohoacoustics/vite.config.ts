import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { visualizer } from "rollup-plugin-visualizer";
import { brotliCompressSync, constants } from "node:zlib";

const brotliCompression = () => ({
  name: "brotli-compression",
  apply: "build",
  generateBundle(this: { emitFile: (asset: { type: "asset"; fileName: string; source: Uint8Array }) => void }, _: unknown, bundle: Record<string, { type: string; code?: string; source?: string | Uint8Array }>) {
    for (const [fileName, output] of Object.entries(bundle)) {
      if (!/\.(js|css|html)$/.test(fileName)) {
        continue;
      }

      const source = output.type === "chunk" ? output.code || "" : typeof output.source === "string" ? output.source : Buffer.from(output.source || []).toString();
      const compressed = brotliCompressSync(Buffer.from(source), {
        params: {
          [constants.BROTLI_PARAM_QUALITY]: 11,
        },
      });

      this.emitFile({
        type: "asset",
        fileName: `${fileName}.br`,
        source: compressed,
      });
    }
  },
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    brotliCompression(),
    visualizer({
      filename: "stats.html",
      template: "treemap",
      gzipSize: true,
      brotliSize: true,
      open: false,
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom", "react-router-dom"],
          motion: ["framer-motion", "lenis"],
          firebase: ["firebase/app", "firebase/auth", "firebase/firestore", "firebase/functions", "firebase/storage"],
          ui: ["@radix-ui/react-dialog", "@radix-ui/react-select", "@radix-ui/react-toast", "sonner", "lucide-react"],
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime"],
  },
}));
