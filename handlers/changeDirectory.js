import path from "path";

export const changeDirectory = (dirName) => {
  if (!dirName) {
    console.error("Error: No directory specified.");
    return process.cwd();
  }

  const openDirPath = path.isAbsolute(dirName)
    ? dirName
    : path.join(process.cwd(), dirName);
  process.chdir(openDirPath);
  return process.cwd();
};
