import path from "path";
import { formatPathForDisplay } from "./utils/formatPath.js";
import * as handlers from "./handlers/index.js";
import { COMMANDS } from "./utils/commands.js";
import { handleOsCommand } from "./utils/handleOsCommands.js";

const processCommand = async (data, userName) => {
  const input = data.toString().trim();
  const [command, ...args] = input.split(" ");
  let currentDir = process.cwd();

  try {
    switch (command) {
      case COMMANDS.UP:
        currentDir = handlers.goToUpperDirectory(currentDir);
        break;
      case COMMANDS.CD:
        currentDir = await handlers.changeDirectory(currentDir, args.join(" "));
        break;
      case COMMANDS.LS:
        await handlers.listDirectoryContents(currentDir);
        break;
      case COMMANDS.CAT:
        await handlers.readFileStream(currentDir, args.join(" "));
        break;
      case COMMANDS.ADD:
        await handlers.createFile(currentDir, args.join(" "));
        break;
      case COMMANDS.RM:
        await handlers.deleteFile(currentDir, args.join(" "));
        break;
      case COMMANDS.RN:
        await handlers.renameFile(currentDir, args[0], args[1]);
        break;
      case COMMANDS.MV:
        await handlers.moveFile(args[0], args[1]);
        break;
      case COMMANDS.CP:
        await handlers.copyFile(args[0], args[1]);
        break;
      case COMMANDS.HASH:
        handlers.hashFile(args[0]);
        break;
      case COMMANDS.COMPRESS:
        await handlers.compressFile(currentDir, args[0], args[1]);
        break;
      case COMMANDS.DECOMPRESS:
        await handlers.decompressFile(currentDir, args[0], args[1]);
        break;
      case COMMANDS.OS:
        handleOsCommand(args[0]);
        break;
      case COMMANDS.EXIT:
        handlers.processExit(userName);
        return;
      default:
        console.log("Invalid input");
    }
  } catch (error) {
    console.error(`Operation failed: ${error.message}`);
  }

  console.log(
    `You are currently in ${path.sep}${formatPathForDisplay(currentDir)}\n`
  );
};

const main = () => {
  const args = process.argv.slice(2);
  const userName = args[0]?.split("=")[1];

  handlers.welcomeUser(userName);

  process.stdin.on("data", (data) => processCommand(data, userName));
  process.on("SIGINT", () => handlers.processExit(userName));
};

main();
