// electron.vite.config.ts
import { resolve } from "path";
import { defineConfig, externalizeDepsPlugin } from "electron-vite";
import react from "@vitejs/plugin-react";
import svgLoader from "vite-svg-loader";
var electron_vite_config_default = defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()],
    resolve: {
      alias: {
        "@models": resolve("src/models")
      }
    }
  },
  preload: {
    plugins: [externalizeDepsPlugin()],
    resolve: {
      alias: {
        "@models": resolve("src/models")
      }
    }
  },
  renderer: {
    resolve: {
      alias: {
        "@renderer": resolve("src/renderer/src"),
        "@models": resolve("src/models"),
        "@assets": resolve("src/renderer/src/assets")
      }
    },
    plugins: [react(), svgLoader()]
  }
});
export {
  electron_vite_config_default as default
};
