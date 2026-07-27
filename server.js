/**
 * OmniRoute Hostinger Production Server Entry Point
 */
import { existsSync } from "node:fs";
import { join } from "node:path";
import { createServer } from "node:http";

const port = process.env.PORT || 20128;
const host = process.env.HOST || "0.0.0.0";

const standaloneServer = join(process.cwd(), "dist", "server.js");
const standaloneWsServer = join(process.cwd(), "dist", "server-ws.mjs");
const buildServer = join(process.cwd(), ".build", "next", "standalone", "server.js");
const dotNextServer = join(process.cwd(), ".next", "standalone", "server.js");

if (existsSync(standaloneWsServer)) {
  console.log("> Launching OmniRoute via standalone server-ws.mjs");
  await import(standaloneWsServer);
} else if (existsSync(standaloneServer)) {
  console.log("> Launching OmniRoute via standalone server.js");
  await import(standaloneServer);
} else if (existsSync(dotNextServer)) {
  console.log("> Launching OmniRoute via .next standalone server.js");
  await import(dotNextServer);
} else if (existsSync(buildServer)) {
  console.log("> Launching OmniRoute via .build standalone server.js");
  await import(buildServer);
} else {
  console.log("> Launching OmniRoute via Next.js custom server loader");
  const next = (await import("next")).default;
  const app = next({ dev: false, dir: process.cwd(), conf: { distDir: ".build/next" } });
  const handle = app.getRequestHandler();
  await app.prepare();
  createServer((req, res) => handle(req, res)).listen(port, host, () => {
    console.log(`> OmniRoute Gateway ready on http://${host}:${port}`);
  });
}
