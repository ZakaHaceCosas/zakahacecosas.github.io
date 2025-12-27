import * as fs from "fs";

await Bun.$`bun run astro build`;
const dir = fs.readdirSync("docs/_astro/");
fs.renameSync("docs/_astro/" + dir[0], "docs/" + dir[0]);
fs.rmdirSync("docs/_astro");
const cnt = fs.readFileSync("docs/index.html", { encoding: "utf-8" });
const newStr = cnt
    .replace("<head>", `<head><link rel="stylesheet" href="/${dir[0]}">`)
    .replaceAll(/(?=<!--)([\s\S]*?)-->/g, "");
fs.writeFileSync("docs/index.html", newStr);
export {};
