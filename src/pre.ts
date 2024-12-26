import * as core from "@actions/core";
import * as tc from "@actions/tool-cache";
import * as os from "os";

export async function run() {
  try {
    // https://github.com/protoconf/protoconf/releases/download/v0.2.0-alpha1/protoconf_0.2.0-alpha1_darwin_amd64.tar.gz
    const version = core.getInput("version");
    const details = await core.platform.getDetails();
    const platform = details.platform;
    let arch = details.arch;
    if (details.arch === "x64") {
      arch = "amd64";
    }
    core.info(`Platform:`);
    core.info(`  OS: ${details.name}`);
    core.info(`  Arch: ${details.arch}`);
    core.info(JSON.stringify(details));

    const url = `https://github.com/protoconf/protoconf/releases/download/v${version}/protoconf_${version}_${platform}_${arch}.tar.gz`;
    core.info(`Downloading ${url}`);
    const pathToGzip = await tc.downloadTool(url);
    const pathToTar = await tc.extractTar(pathToGzip);
    core.addPath(pathToTar);
  } catch (error) {
    core.error(error.message);
  }
}

run();
