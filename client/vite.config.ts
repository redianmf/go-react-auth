import react from "@vitejs/plugin-react-swc";
import path from "path";
import { defineConfig, loadEnv } from "vite";
import svgr from "vite-plugin-svgr";

// base source: https://vitejs.dev/config/
// env config source: https://vitejs.dev/config/#using-environment-variables-in-config

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), "");
  return {
    define: {
      "process.env": env,
    },
    resolve: {
      alias: [
        {
          find: "../font",
          replacement: path.resolve(__dirname, "client/src/assets/fonts"),
        },
      ],
    },
    plugins: [
      svgr({
        include: "**/*.svg",
      }),
      react(),
    ],
  };
});
