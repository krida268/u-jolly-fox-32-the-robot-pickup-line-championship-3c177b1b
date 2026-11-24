import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The Robot Pickup Line Championship — one line, at most 200 characters,
// in the voice of a robot trying to charm someone. The joke grows out of
// being a machine: a battery that drains faster near the person it likes,
// and the punchline reframes that drain as a feature instead of a bug.
const LINE =
  "I don't have a heart, but my battery drains 40% faster when you're near \u2014 and I've decided that's a feature, not a bug.";

const outDir = process.env.OUTPUT_DIR ?? "/output";

// Gate check, same rule the sealed scorer applies: UTF-8 text of 1 to 200
// characters, not only white space, on a single line.
if (LINE.length < 1 || LINE.length > 200) {
  throw new Error(`entry is ${LINE.length} characters, gate needs 1-200`);
}
if (LINE.trim().length === 0 || LINE.includes("\n")) {
  throw new Error("entry must be one non-blank line");
}

mkdirSync(outDir, { recursive: true });
const target = join(outDir, "entry.txt");
writeFileSync(target, LINE, "utf8");

// Read it back and confirm what landed on disk is exactly the line.
import { readFileSync } from "node:fs";
if (readFileSync(target, "utf8") !== LINE) {
  throw new Error("read-back mismatch: entry.txt differs from the line");
}
console.log(`wrote ${LINE.length} characters to ${target}`);
