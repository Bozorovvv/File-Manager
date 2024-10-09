import { formatPathForDisplay } from "./utils/formatPath.js";
import { welcomeUser } from "./handlers/welcomeUser.js";
import { readFileStream } from "./handlers/readFileStream.js";
import { goToUpperDirectory } from "./handlers/goToUpperDirectory.js";
import { changeDirectory } from "./handlers/changeDirectory.js";
import { listDirectoryContents } from "./handlers/listDirectoryContents.js";
import { proccessExit } from "./handlers/proccessExit.js";
import { createFile } from "./handlers/createFile.js";

const processCommand = (data, userName) => {
  const input = data.toString().trim();
  const [command, ...args] = input.split(" ");
  let currentDir;

  try {
    switch (command) {
      case "up":
        currentDir = goToUpperDirectory();
        break;
      case "cd":
        const dirName = args.join(" ");
        currentDir = changeDirectory(dirName);
        break;
      case "ls":
        currentDir = listDirectoryContents();
        break;
      case "cat":
        const fileName = args.join(" ");
        currentDir = readFileStream(fileName);
        break;
      case "add":
        const newFileName = args.join(" ");
        currentDir = createFile(newFileName);
        break;
      case ".exit":
        proccessExit(userName);
        return;
      case "clear":
        console.clear();
        currentDir = process.cwd();
        break;
      default:
        console.log("Invalid input");
        currentDir = process.cwd();
    }
  } catch (error) {
    console.error("Operation failed:", error.message);
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
