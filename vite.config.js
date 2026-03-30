import { defineConfig } from "vite";
import { resolve } from "path";
import handlebars from "vite-plugin-handlebars";

export default defineConfig({
  base: "/abdulrahman-portfolio/",

  plugins: [
    handlebars({
      partialDirectory: resolve("./src/partials"),
    }),
  ],
  root: resolve(__dirname, "src"),

  build: {
    outDir: "../dist",
    emptyOutDir: true,

    rollupOptions: {
      output: {
        entryFileNames: "js/[name]-[hash].js",

        chunkFileNames: "js/[name]-[hash].js",

        assetFileNames: (assetInfo) => {
          const name = assetInfo.name || "";
          const ext = name.split(".").pop();

          if (ext === "css") {
            return "css/[name]-[hash][extname]";
          }

          if (["png", "jpg", "jpeg", "svg", "gif", "webp"].includes(ext)) {
            return "assets/images/[name]-[hash][extname]";
          }

          if (["woff", "woff2", "ttf", "eot"].includes(ext)) {
            return "assets/fonts/[name]-[hash][extname]";
          }

          return "assets/[name]-[hash][extname]";
        },
      },
    },
  },

  server: {
    port: 8080,
  },

  css: {
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
