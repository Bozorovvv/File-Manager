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
    console.log(`You are currently in ${process.cwd()}\n`);

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

      try {
        const openDirPath = path.isAbsolute(dirName)
          ? dirName
          : path.join(process.cwd(), dirName);
        process.chdir(openDirPath);
        console.log(`You are currently in ${process.cwd()}\n`);
      } catch (err) {
        console.error(`Error: Unable to change to directory '${dirName}'`);
      }
    }
    if (data.includes("ls")) {
      const currentDirectory = process.cwd();
      const directoryContents = fs.readdirSync(currentDirectory);

      const formattedContents = directoryContents.map((Name) => {
        const itemPath = path.join(currentDirectory, Name);
        const Type = fs.lstatSync(itemPath).isDirectory()
          ? "Directory"
          : "File";
        return { Name, Type };
      });

      console.table(formattedContents);
    }

    if (data.includes(".exit")) {
      exitGracefully();
    }
  });

  process.on("SIGINT", () => {
    exitGracefully();
  });
};

main();
