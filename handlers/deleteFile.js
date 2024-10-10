import path from "path";
import { rm, access } from "fs/promises";

export const deleteFile = async (currentDir, fileName) => {
  const filePath = path.join(currentDir, fileName);

  try {
    await access(filePath);
    await rm(filePath);
    console.log("File deleted successfully!");
  } catch (error) {
    throw error;
  }
};
