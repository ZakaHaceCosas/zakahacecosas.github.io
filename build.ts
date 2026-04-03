import * as fs from "fs";

await Bun.$`bun run astro build`;
const dir = fs.readdirSync("docs/_astro/");
dir.forEach((v) => fs.renameSync("docs/_astro/" + v, "docs/" + v))
fs.rmdirSync("docs/_astro");
const cnt = fs.readFileSync("docs/index.html", { encoding: "utf-8" });
const newStr = cnt
    .replace("<head>", `<head><link rel="stylesheet" href="/${dir.find((v) => v.endsWith(".css"))}">`)
    .replaceAll(/(?=<!--)([\s\S]*?)-->/g, "");
fs.writeFileSync("docs/index.html", newStr);
export { };
