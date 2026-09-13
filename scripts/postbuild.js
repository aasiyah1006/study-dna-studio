import fs from "node:fs";
import path from "node:path";

const clientDir = path.resolve("dist/client");
const distDir = path.resolve("dist");

if (fs.existsSync(clientDir)) {
  fs.cpSync(clientDir, distDir, { recursive: true });
  console.log("[postbuild] Successfully copied client static build artifacts directly into dist/.");
} else {
  console.warn("[postbuild] dist/client not found, skipping copy.");
}
