import * as fs from "fs";

await Bun.$`bun run astro build`;
const cnt = fs.readFileSync("docs/index.html", { encoding: "utf-8" });
const newStr = cnt.replaceAll(/(?=<!--)([\s\S]*?)-->/g, "");
fs.writeFileSync("docs/index.html", newStr);
export { };
