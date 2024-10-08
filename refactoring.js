import path from "path";
import fs from "fs";

const operationWrapper = (operation) => {
  try {
    operation();
    return process.cwd();
  } catch (error) {
    console.error("Operation failed:", error.message);
    return "Operation failed";
  }
};

const welcomeUser = (userName) => {
  if (userName) console.log(`Welcome to the File Manager, ${userName}!\n`);
  console.log(`You are currently in ${process.cwd()}\n`);
};

const exitGracefully = (userName) => {
  console.log(`Thank you for using File Manager, ${userName}, goodbye!`);
  process.exit();
};

const goToUpperDirectory = () => {
  return operationWrapper(() => {
    const upperDir = path.join(process.cwd(), "..");
    process.chdir(upperDir);
  });
};

const changeDirectory = (dirName) => {
  if (!dirName) {
    console.error("Error: No directory specified.");
    return process.cwd();
  }

  return operationWrapper(() => {
    const openDirPath = path.isAbsolute(dirName)
      ? dirName
      : path.join(process.cwd(), dirName);
    process.chdir(openDirPath);
  });
};

const listDirectoryContents = () => {
  return operationWrapper(() => {
    const currentDirectory = process.cwd();
    const directoryContents = fs.readdirSync(currentDirectory);

    const formattedContents = directoryContents.map((Name) => {
      const itemPath = path.join(currentDirectory, Name);
      const Type = fs.lstatSync(itemPath).isDirectory() ? "Directory" : "File";
      return { Name, Type };
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
      console.log("Unknown command");
      currentDir = process.cwd();
  }

  console.log(`You are currently in ${currentDir}\n`);
};

const main = () => {
  const args = process.argv.slice(2);
  const userName = args?.[0]?.split("=")[1];

  welcomeUser(userName);

  process.stdin.on("data", (data) => processCommand(data, userName));

  process.on("SIGINT", () => exitGracefully(userName));
};

main();
