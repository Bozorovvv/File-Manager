import path from "path";
import { callbackWrapper } from "../helpers/callbackWrapper";

export const changeDirectory = (dirName) => {
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
