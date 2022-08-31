import path from "path";
import * as fs from "fs";

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath: string) => path.resolve(appDirectory, relativePath);

const paths: any = {
  serverBuild: resolveApp("build/server"),
  dotenv: resolveApp("/env"),
  src: resolveApp("src"),
  srcServer: resolveApp("src/lib"),
  types: resolveApp("node_modules/@types"),
  staticAssetsPath: resolveApp("assets"),
  publicPath: "/static/",
  uploadsPath: "/var/www/uploads/seriousgame"
};

paths.resolveModules = [paths.srcServer, paths.src, "node_modules"];

export default paths;
