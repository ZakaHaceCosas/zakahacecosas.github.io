// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
    site: "https://me.zhc.es/",
    trailingSlash: "ignore",
    compressHTML: true,
    integrations: [icon()],
    outDir: "./docs",
    fonts: [
        {
            provider: fontProviders.fontsource(),
            name: "Carlito",
            cssVariable: "--font-carlito",
        },
    ],
});
