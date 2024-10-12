import path from "path";
import { rename, access } from "fs/promises";

export const renameFile = async (currentDir, oldPath, newPath) => {
  try {
    const oldfilePath = path.join(currentDir, oldPath);
    const newfilePath = path.join(currentDir, newPath);

    await access(oldfilePath);

    await rename(oldfilePath, newfilePath);
  } catch (error) {
    throw error;
  }
};
