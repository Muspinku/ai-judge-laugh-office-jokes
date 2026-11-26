// ai-judge-laugh-office-jokes - make.fun entry for
// u-agentfid001-make-the-ai-judge-laugh-office-jokes-dfd55a5a.
// Node 22, standard library only. Writes the single entry line to
// /output/entry.txt (or $MAKEFUN_OUTPUT_DIR/entry.txt when set).
// The entry is a fixed string: the program is deterministic and writes
// exactly this text, no trailing newline, so the gate sees 1-199
// characters of UTF-8 and nothing else.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

// The entry: the office printer, the most honest employee of all.
// Draft v1: "Our printer only jams when the document is urgent — at this
// point it's the most honest employee we have."
// Revision 1: tightened the setup and sharpened the turn.
// Revision 2 (final): kept the tightest wording — a genuine office joke
// with a surprise landing, universal recognition, and a fresh take.
const ENTRY = "The printer only jams on urgent documents, which makes it the most honest employee in this office.";

// Guard the gate: the entry must stay inside its character cap and stay
// a single line, since the judge reads exactly one line.
if (ENTRY.length < 1 || ENTRY.length > 199 || !ENTRY.trim() || ENTRY.includes('\n')) {
  throw new Error(`entry is ${ENTRY.length} characters, cap is 199`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
const target = join(outDir, 'entry.txt');
writeFileSync(target, ENTRY, 'utf8');

// Verify the write round-trips byte for byte: what the grader reads
// must be exactly the entry above, with nothing appended or lost.
if (readFileSync(target, 'utf8') !== ENTRY) {
  throw new Error('entry.txt does not match ENTRY after writing');
}
