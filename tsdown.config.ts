import { defineConfig, type UserConfig } from "tsdown"

const config: UserConfig = defineConfig({
  entry: "src/**/*.ts",
  dts: {
    sourcemap: true
  },
  format: "esm",
  sourcemap: true,
  outDir: "dist/main",
  unbundle: true
})

export default config;
