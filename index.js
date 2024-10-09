import path from "path";
import fs from "fs";
import { callbackWrapper } from "./helpers/callbackWrapper.js";
import { formatPathForDisplay } from "./helpers/formatPath.js";

const welcomeUser = (userName) => {
  if (userName) console.log(`Welcome to the File Manager, ${userName}!\n`);
  console.log(`You are currently in ${formatPathForDisplay(process.cwd())}\n`);
};

const exitGracefully = (userName) => {
  console.log(`Thank you for using File Manager, ${userName}, goodbye!`);
  process.exit();
};

const goToUpperDirectory = () => {
  return callbackWrapper(() => {
    const upperDir = path.join(process.cwd(), "..");
    process.chdir(upperDir);
  });
};

const changeDirectory = (dirName) => {
  if (!dirName) {
    console.error("Error: No directory specified.");
    return process.cwd();
  }

  return callbackWrapper(() => {
    const openDirPath = path.isAbsolute(dirName)
      ? dirName
      : path.join(process.cwd(), dirName);
    process.chdir(openDirPath);
  });
};

const listDirectoryContents = () => {
  return callbackWrapper(() => {
    const currentDirectory = process.cwd();
    const directoryContents = fs.readdirSync(currentDirectory);

    const formattedContents = directoryContents.map((name) => {
      const itemPath = path.join(currentDirectory, name);
      const type = fs.lstatSync(itemPath).isDirectory() ? "Directory" : "File";
      return { Name: name, Type: type };
    });

    console.table(formattedContents);
  });
};

const processCommand = (data, userName) => {
  const command = data.toString().trim().split(" ")[0];
  let currentDir;

  switch (command) {
    case "up":
      currentDir = goToUpperDirectory();
      break;
    case "cd":
      const dirName = data.toString().slice(3).trim();
      currentDir = changeDirectory(dirName);
      break;
    case "ls":
      currentDir = listDirectoryContents();
      break;
    case ".exit":
      exitGracefully(userName);
      break;
    default:
      console.log("Invalid input");
      currentDir = process.cwd();
  }

  console.log(`You are currently in /${formatPathForDisplay(currentDir)}\n`);
};

const main = () => {
  const args = process.argv.slice(2);
  const userName = args?.[0]?.split("=")[1];
  welcomeUser(userName);

  process.stdin.on("data", (data) => processCommand(data, userName));

  process.on("SIGINT", () => exitGracefully(userName));
};

main();
