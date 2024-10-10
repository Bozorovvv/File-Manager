import path from "path";
import { createReadStream, promises as fs } from "fs";
import { stdout } from "process";

export const readFileStream = async (currentDir, fileName) => {
  try {
    if (!fileName) {
      throw new Error("No file specified.");
    }

    const filePath = path.isAbsolute(fileName)
      ? fileName
      : path.join(currentDir, fileName);

    await fs.access(filePath);

    const readableFile = createReadStream(filePath, { encoding: "utf-8" });

    readableFile.pipe(stdout);
  } catch (error) {
    throw error;
  }
};
