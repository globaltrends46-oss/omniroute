/**
 * OmniRoute Hostinger Production Server Entry Point
 */
process.argv[2] = "start";
await import("./scripts/dev/run-next.mjs");
