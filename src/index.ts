import * as core from "@actions/core";
import cp from "child_process";

export async function run() {
  const protoconfRoot = core.getInput("protoconf_root");
  core.info(`protoconf_root: ${protoconfRoot}`);
  const shouldCompile = core.getInput("compile").toLowerCase() === "true";
  if (shouldCompile) {
    core.info("Compiling protoconf...");
    cp.execSync(`protoconf compile ${protoconfRoot}`, {});
  }
}

run();
