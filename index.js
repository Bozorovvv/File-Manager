import path from "path";
import fs from "fs";

const main = () => {
  const args = process.argv.slice(2);

  const userName = args?.[0]?.split("=")[1];
  if (userName) console.log(`Welcome to the File Manager, ${userName}!\n`);
  console.log(`You are currently in ${process.cwd()}\n`);

  const exitGracefully = () => {
    console.log(`Thank you for using File Manager, ${userName}, goodbye!`);
    process.exit();
  };

  process.stdin.on("data", async (data) => {
    if (data.includes("up")) {
      const upperDir = path.join(process.cwd(), "..");
      process.chdir(upperDir);
    }

    if (data.includes("cd")) {
      const dirName = data.toString().slice(3).trim();

      if (!dirName) {
        console.error("Error: No directory specified.");
        return;
      }

      const openDirPath = path.isAbsolute(dirName)
        ? dirName
        : path.join(process.cwd(), dirName);

      fs.stat(openDirPath, (err, stats) => {
        if (err || !stats.isDirectory()) {
          console.error(`Operation failed`);
        } else {
          try {
            process.chdir(openDirPath);
            console.log(`You are currently in ${process.cwd()}\n`);
          } catch (err) {
            console.error(`Error: Unable to change to directory '${dirName}'`);
          }
        }
      });
    }
    console.log(`You are currently in ${process.cwd()}\n`);

    if (data.includes(".exit")) {
      exitGracefully();
    }
  });

  process.on("SIGINT", () => {
    exitGracefully();
  });
};

main();
