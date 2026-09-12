#!/usr/bin/env node
/**
 * Static marketing export for GitHub Pages.
 * Temporarily moves app/api aside (Route Handlers unsupported with output: 'export').
 */
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const apiDir = path.join(root, "app", "api");
const backup = path.join(root, ".api-backup-pages");

function rmrf(p) {
  fs.rmSync(p, { recursive: true, force: true });
}

try {
  if (fs.existsSync(backup)) rmrf(backup);
  if (fs.existsSync(apiDir)) {
    fs.renameSync(apiDir, backup);
  }
  execSync("npx next build", {
    stdio: "inherit",
    env: {
      ...process.env,
      STATIC_EXPORT: "1",
      NEXT_PUBLIC_STATIC_DEMO: "1",
      NEXT_PUBLIC_BASE_PATH: "/dynamogic",
    },
  });
  const out = path.join(root, "out");
  if (!fs.existsSync(out)) throw new Error("Missing out/ after static build");
  fs.writeFileSync(path.join(out, ".nojekyll"), "");
  console.log("Static export ready in out/ (basePath /dynamogic)");
} finally {
  if (fs.existsSync(backup)) {
    if (fs.existsSync(apiDir)) rmrf(apiDir);
    fs.renameSync(backup, apiDir);
  }
}
