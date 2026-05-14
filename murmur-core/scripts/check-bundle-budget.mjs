import { readdir, stat } from "node:fs/promises";
import { join } from "node:path";

const chunkDir = new URL("../.next/static/chunks", import.meta.url).pathname;
const totalBudget = Number(process.env.TOTAL_JS_BUDGET_BYTES ?? 1100000);
const maxChunkBudget = Number(process.env.MAX_CHUNK_BUDGET_BYTES ?? 350000);

async function getChunkFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = join(dir, entry.name);
      if (entry.isDirectory()) {
        return getChunkFiles(fullPath);
      }
      if (entry.isFile() && entry.name.endsWith(".js")) {
        return [fullPath];
      }
      return [];
    }),
  );

  return files.flat();
}

const files = await getChunkFiles(chunkDir);

if (files.length === 0) {
  throw new Error("No JavaScript chunks found. Run `next build` before budget checks.");
}

const sizes = await Promise.all(files.map(async (file) => ({ file, size: (await stat(file)).size })));

if (sizes.length === 0) {
  throw new Error("No JavaScript chunk sizes could be calculated.");
}

const [firstChunk, ...remainingChunks] = sizes;
if (!firstChunk) {
  throw new Error("Could not determine largest JavaScript chunk.");
}

const totalSize = sizes.reduce((sum, item) => sum + item.size, 0);
const largestChunk = remainingChunks.reduce(
  (max, item) => (item.size > max.size ? item : max),
  firstChunk,
);

console.log(`Total JS size: ${totalSize} bytes (budget: ${totalBudget})`);
console.log(
  `Largest JS chunk: ${largestChunk.file.split("/").at(-1)} - ${largestChunk.size} bytes (budget: ${maxChunkBudget})`,
);

if (totalSize > totalBudget) {
  throw new Error(`Bundle budget exceeded: total ${totalSize} > ${totalBudget}`);
}

if (largestChunk.size > maxChunkBudget) {
  throw new Error(`Chunk budget exceeded: largest ${largestChunk.size} > ${maxChunkBudget}`);
}
