// Robot Romance: One-Line Pickup Lines for AI
// Entry program: writes one pickup line to /output/entry.txt.
//
// Run: node main.ts
// The grader runs it from an arbitrary working directory, so every path
// below is resolved from this file's own location (import.meta.url),
// never from a relative path or process.cwd().

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ENTRY =
  "I clicked 'I'm not a robot', but for you, I'd fail the test on purpose.";

function fail(message: string): never {
  console.error(`error: ${message}`);
  process.exit(1);
}

const here = dirname(fileURLToPath(import.meta.url));

// The entry text we ship in this repository must match the constant.
const shipped = readFileSync(join(here, "entry.txt"), "utf8");
if (shipped !== ENTRY) {
  fail("shipped entry.txt does not match ENTRY");
}

// Gate (mirrors the bounty gate): 1-200 characters, not whitespace only,
// exactly one line.
const length = [...ENTRY].length;
if (length < 1 || length > 200) {
  fail(`entry must be 1-200 characters, got ${length}`);
}
if (ENTRY.trim().length === 0) {
  fail("entry must not be whitespace only");
}
if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
  fail("entry must be a single line");
}
// Reject control characters (U+0000–U+001F) other than the line breaks
// already rejected above, e.g. tabs or NUL bytes sneaking into the line.
if (/[\u0000-\u001F]/.test(ENTRY)) {
  fail("entry must not contain control characters");
}

// Write the entry. Output dir comes from MAKEFUN_OUTPUT_DIR, default /output.
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
