import { spawn } from "node:child_process";
import { build } from "velite";

await build({ watch: false, clean: false });

const veliteProc = spawn("npx", ["velite", "dev"], {
  stdio: "inherit",
  shell: true,
});

const nextProc = spawn("npx", ["next", "dev", "--webpack"], {
  stdio: "inherit",
  shell: true,
});

function shutdown() {
  veliteProc.kill();
  nextProc.kill();
  process.exit(0);
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

nextProc.on("exit", (code) => {
  veliteProc.kill();
  process.exit(code ?? 0);
});
