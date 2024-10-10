import { createReadStream, createWriteStream } from "fs";
import { mkdir } from "fs/promises";
import path from "path";
import { pipeline } from "stream/promises";

export const copyFile = async (sourcePath, destinationDir) => {
  try {
    await mkdir(destinationDir, { recursive: true });

    const fileName = path.basename(sourcePath);
    const destinationPath = path.join(destinationDir, fileName);

    const readableFile = createReadStream(sourcePath, {
      encoding: "utf-8",
    });
    const writableFile = createWriteStream(destinationPath);

    await pipeline(readableFile, writableFile);
  } catch (error) {
    throw error;
  }
};
