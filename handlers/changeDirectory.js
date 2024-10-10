import path from "path";

export const changeDirectory = async (currentDir, dirName) => {
  if (!dirName || dirName === "/") {
    return currentDir;
  }

  const openDirPath = path.isAbsolute(dirName)
    ? dirName
    : path.join(currentDir, dirName);

  try {
    if (openDirPath === path.resolve("/")) {
      return currentDir;
    }

    process.chdir(openDirPath);
    return process.cwd();
  } catch (error) {
    throw error;
  }
};
