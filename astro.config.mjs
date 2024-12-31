// @ts-check
import { defineConfig } from "astro/config";
import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
    site: "https://zakahacecosas.github.io/",
    trailingSlash: "ignore",
    compressHTML: true,
    integrations: [icon()],
    outDir: "./docs",
});
