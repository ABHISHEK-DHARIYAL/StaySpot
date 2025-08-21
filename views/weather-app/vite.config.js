import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "fs/promises";

export default defineConfig({
  plugins: [
    react(), // Official React plugin (JSX, Fast Refresh)

    // Optional: treat .js files in src/ as JSX
    {
      name: "load-js-files-as-jsx",
      enforce: "pre",
      setup(build) {
        build.onLoad({ filter: /src\/.*\.js$/ }, async (args) => ({
          loader: "jsx",
          contents: await fs.readFile(args.path, "utf8"),
        }));
      },
    },
  ],

  esbuild: {
    loader: "jsx",
    include: /src\/.*\.jsx?$/, // handle .js and .jsx
    exclude: [],
  },

  build: {
    outDir: "views/weather-app", // output folder for EJS + built assets
    emptyOutDir: true, // clear old build files
    rollupOptions: {
      input: "src/main.jsx", // entry point
      output: {
        entryFileNames: "assets/main.js", // fixed main JS file
        chunkFileNames: "assets/chunk-[name].js", // optional chunks
        assetFileNames: "assets/[name].[ext]", // other assets like CSS/images
      },
    },
  },

  server: {
    port: 5173, // optional dev server port
  },
});
