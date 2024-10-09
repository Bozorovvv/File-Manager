import fs from "fs";
import path from "path";
import { callbackWrapper } from "../helpers/callbackWrapper";

export const listDirectoryContents = () => {
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
