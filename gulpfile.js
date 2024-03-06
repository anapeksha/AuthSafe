const { task, series, src, dest } = require("gulp");
const { rimraf } = require("rimraf");
const shell = require("gulp-shell");
const ts = require("gulp-typescript");

task("clean", async () => {
  try {
    const deleted = await rimraf(["logs", "build"]);
    if (deleted) {
      console.log("Cleaned build/ and log/");
    } else {
      console.log("Not Cleaned");
    }
  } catch (error) {
    console.error(error);
  }
});

task("delete-nodeModules", async () => {
  try {
    const deleted = await rimraf(["node_modules"]);
    if (deleted) {
      console.log("Cleaned node_modules/");
    } else {
      console.log("Not Cleaned");
    }
  } catch (error) {
    console.error(error);
  }
});

task("prisma", shell.task(["prisma generate"]));

task("transpile", (cb) => {
  const tsProject = ts.createProject("tsconfig.json");
  src("src/**/*").pipe(tsProject()).js.pipe(dest("build"));
  console.log("Project transpiled successfully");
  cb();
});

task("install-production-dep", shell.task(["npm ci --only=production"]));

task(
  "build",
  series("prisma", "transpile", "delete-nodeModules", "install-production-dep")
);
