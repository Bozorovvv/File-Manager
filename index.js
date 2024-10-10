import os from "os";
import path from "path";
import { formatPathForDisplay } from "./utils/formatPath.js";
import * as handlers from "./handlers/index.js";

const COMMANDS = {
  UP: "up",
  CD: "cd",
  LS: "ls",
  CAT: "cat",
  ADD: "add",
  RM: "rm",
  RN: "rn",
  MV: "mv",
  CP: "cp",
  OS: "os",
  EXIT: ".exit",
};

const OS_FLAGS = {
  EOL: "--EOL",
  CPUS: "--cpus",
  HOMEDIR: "--homedir",
  USERNAME: "--username",
  ARCHITECTURE: "--architecture",
};

const handleOsCommand = (flag) => {
  switch (flag) {
    case OS_FLAGS.EOL:
      console.log(JSON.stringify(os.EOL));
      break;
    case OS_FLAGS.CPUS:
      console.log(os.cpus());
      break;
    case OS_FLAGS.HOMEDIR:
      console.log(os.homedir());
      break;
    case OS_FLAGS.USERNAME:
      console.log(os.userInfo().username);
      break;
    case OS_FLAGS.ARCHITECTURE:
      console.log(os.arch());
      break;

    default:
      console.log("Invalid os command");
  }
};

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
