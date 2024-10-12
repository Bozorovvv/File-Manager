import path from "path";
import { createReadStream, createWriteStream } from "fs";
import { mkdir, rm, access, constants } from "fs/promises";
import { pipeline } from "stream/promises";
1;

export const moveFile = async (movefilePath, moveNewDir) => {
  try {
    await access(movefilePath, constants.F_OK);

    await mkdir(moveNewDir, { recursive: true });

    const fileName = path.basename(movefilePath);
    const destinationPath = path.join(moveNewDir, fileName);

    const readableFile = createReadStream(movefilePath, {
      encoding: "utf-8",
    });
    const writableFile = createWriteStream(destinationPath);

    await pipeline(readableFile, writableFile);

    await rm(movefilePath);
  } catch (error) {
    throw error;
  }
};
