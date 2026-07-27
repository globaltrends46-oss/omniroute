/**
 * OmniRoute Hostinger Production Server Entry Point
 */
import http from "node:http";
import next from "next";

const port = process.env.PORT || 20128;
const host = process.env.HOST || "0.0.0.0";
const dev = false;

const app = next({
  dev,
  dir: process.cwd(),
  hostname: host,
  port: Number(port),
  conf: { distDir: ".next" },
});

const handle = app.getRequestHandler();

console.log("> Preparing OmniRoute Next.js app for Hostinger...");
await app.prepare();

const server = http.createServer((req, res) => {
  handle(req, res);
});

server.listen(port, host, (err) => {
  if (err) throw err;
  console.log(`> OmniRoute Gateway ready on http://${host}:${port}`);
});
