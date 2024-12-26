import * as core from "@actions/core";
import * as tc from "@actions/tool-cache";
import * as os from "os";

export async function run() {
  try {
    // https://github.com/protoconf/protoconf/releases/download/v0.2.0-alpha1/protoconf_0.2.0-alpha1_darwin_amd64.tar.gz
    const version = core.getInput("version");
    const platform = os.platform;
    const arch = os.arch;
    const url = `https://github.com/protoconf/protoconf/releases/download/v${version}/protoconf_${version}_${platform}_${arch}.tar.gz`;
    const pathToGzip = await tc.downloadTool(url);
    const pathToTar = await tc.extractTar(pathToGzip);
    const pathToBin = `${pathToTar}/protoconf`;
    core.addPath(pathToBin);
  } catch (error) {
    core.error(error.message);
  }
}

run();
