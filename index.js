import { formatPathForDisplay } from "./utils/formatPath.js";
import { welcomeUser } from "./handlers/welcomeUser.js";
import { readFileStream } from "./handlers/readFileStream.js";
import { goToUpperDirectory } from "./handlers/goToUpperDirectory.js";
import { changeDirectory } from "./handlers/changeDirectory.js";
import { listDirectoryContents } from "./handlers/listDirectoryContents.js";
import { proccessExit } from "./handlers/proccessExit.js";
import { createFile } from "./handlers/createFile.js";
import { deleteFile } from "./handlers/deleteFile.js";
import { renameFile } from "./handlers/renameFile.js";
import { copyFile } from "./handlers/copyFile.js";
import { moveFile } from "./handlers/moveFile.js";

const processCommand = async (data, userName) => {
  const input = data.toString().trim();
  const [command, ...args] = input.split(" ");
  let currentDir = process.cwd();

  try {
    switch (command) {
      case "up":
        currentDir = goToUpperDirectory(currentDir);
        break;

      case "cd":
        const dirName = args.join(" ");
        currentDir = await changeDirectory(currentDir, dirName);
        break;

      case "ls":
        await listDirectoryContents(currentDir);
        break;

      case "cat":
        const fileName = args.join(" ");
        await readFileStream(currentDir, fileName);
        break;

      case "add":
        const newFileName = args.join(" ");
        await createFile(currentDir, newFileName);
        break;

      case "rm":
        const removefile = args.join(" ");
        await deleteFile(currentDir, removefile);
        break;

      case "rn":
        const [renameOldPath, renameNewPath] = args;
        await renameFile(currentDir, renameOldPath, renameNewPath);
        break;

      case "mv":
        const [movefilePath, moveNewDir] = args;
        await moveFile(movefilePath, moveNewDir);
        break;

      case "cp":
        const [copyOldPath, copyNewPath] = args;
        await copyFile(copyOldPath, copyNewPath);
        break;

      case ".exit":
        proccessExit(userName);
        return;

      case "clear":
        console.clear();
        break;

      default:
        console.log("Invalid input");
    }
  } catch (error) {
    console.error("Operation failed");
  }

  console.log(`You are currently in /${formatPathForDisplay(currentDir)}\n`);
};

const main = () => {
  const args = process.argv.slice(2);
  const userName = args?.[0]?.split("=")[1];

  welcomeUser(userName);

  process.stdin.on("data", (data) => processCommand(data, userName));

  process.on("SIGINT", () => proccessExit(userName));
};

main();
