import path from "path";
import { writeFile } from "fs/promises";

export const createFile = async (currentDir, fileName) => {
  const filePath = path.join(currentDir, fileName);

  try {
    await writeFile(filePath, "");
  } catch (error) {
    console.log(error);
    throw error;
  }
};
