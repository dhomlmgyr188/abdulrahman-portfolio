import { defineConfig } from "vite";
import { resolve } from "path";
import handlebars from "vite-plugin-handlebars";

export default defineConfig({
  base: "/",

  plugins: [
    handlebars({
      partialDirectory: resolve(__dirname, "src/partials"),
    }),
  ],

  build: {
    outDir: resolve(__dirname, "dist"),
    emptyOutDir: true,

    rollupOptions: {
      output: {
        // ملفات JS
        entryFileNames: "js/[name]-[hash].js",
        chunkFileNames: "js/[name]-[hash].js",

        // تنظيم جميع الـ assets
        assetFileNames: (assetInfo) => {
          const name = assetInfo.name ?? "";
          const ext = name.split(".").pop()?.toLowerCase();

          // CSS
          if (ext === "css") {
            return "css/[name]-[hash][extname]";
          }

          // Images
          if (["png", "jpg", "jpeg", "svg", "gif", "webp", "avif"].includes(ext)) {
            return "assets/images/[name]-[hash][extname]";
          }

          // Fonts
          if (["woff", "woff2", "ttf", "eot", "otf"].includes(ext)) {
            return "assets/fonts/[name]-[hash][extname]";
          }

          // باقي الملفات
          return "assets/[name]-[hash][extname]";
        },
      },
    },
  },

  server: {
    port: 8080,
    open: true,
  },

  css: {
    devSourcemap: true,
    preprocessorOptions: {
      scss: {
        silenceDeprecations: [
          "import",
          "mixed-decls",
          "color-functions",
          "global-builtin",
        ],
      },
    },
  },
});