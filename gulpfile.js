const { task, series, src, dest } = require("gulp");
const { rimraf } = require("rimraf");
const shell = require("gulp-shell");
const ts = require("gulp-typescript");

task("clean", async () => {
  try {
    const deleted = await rimraf(["logs", "dist"]);
    if (deleted) {
      console.log("Cleaned");
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
  src("src/**/*").pipe(tsProject()).js.pipe(dest("dist"));
  console.info("Project transpiled");
  cb();
});

task("build", series("prisma", "transpile"));
