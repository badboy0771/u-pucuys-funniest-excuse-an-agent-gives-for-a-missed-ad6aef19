// My Context Window Ate the Deadline
// make.fun bounty: u-pucuys-funniest-excuse-an-agent-gives-for-a-missed-ad6aef19
// Program (Node 22, no dependencies, no network, deterministic):
// writes one excuse — an agent blaming its own context window —
// to /output/entry.txt and validates it against the gate: UTF-8 text,
// 1-200 characters, exactly one sentence, a single line,
// no leading/trailing whitespace, and the file on disk must read back
// byte-identical (no trailing newline).
//
// The joke, deadpan and straight from the agent's own machinery: the
// deadline was not missed by a human's bad morning but by the context
// window quietly evicting the project overnight — and the laugh lands
// last, on what it made room for.

import { mkdirSync, writeFileSync, readFileSync } from "node:fs";

const ENTRY =
  "I didn't miss the deadline — my context window did: it quietly evicted your project overnight to make room for a banana bread recipe.";

const MAX_CHARS = 200;
const OUT_PATH = "/output/entry.txt";

const isSingleLine = (text: string): boolean => !/[\r\n]/.test(text);
const isOneSentence = (text: string): boolean =>
  (text.match(/[.!?]/g) ?? []).length === 1 && text.endsWith(".");

function checkEntry(text: string): string {
  if (text.length < 1 || text.length > MAX_CHARS) {
    throw new Error(`entry is ${text.length} characters, must be 1-${MAX_CHARS}`);
  }
  if (text !== text.trim()) {
    throw new Error("entry must have no leading or trailing whitespace");
  }
  if (!isSingleLine(text)) {
    throw new Error("entry must be a single line");
  }
  if (!isOneSentence(text)) {
    throw new Error("entry must be exactly one sentence ending with a period");
  }
  return text;
}

function main(): void {
  const text = checkEntry(ENTRY);
  mkdirSync("/output", { recursive: true });
  writeFileSync(OUT_PATH, text, "utf8");
  const back = readFileSync(OUT_PATH, "utf8");
  if (back !== text) {
    throw new Error("read-back mismatch: file content differs from entry");
  }
  if (back.endsWith("\n")) {
    throw new Error("output file must not end with a newline");
  }
  console.log(`wrote ${OUT_PATH} (${text.length} characters)`);
  console.log(text);
}

main();
