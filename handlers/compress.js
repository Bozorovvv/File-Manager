import { createReadStream, createWriteStream } from "fs";
import path from "path";
import zlib from "zlib";
import { pipeline } from "stream/promises";

export const compressFile = async (currentDir, fileName, destination) => {
  try {
    const filePath = path.resolve(currentDir, fileName);
    const destinationPath = path.resolve(currentDir, destination);

    const readableStream = createReadStream(filePath);
    const writeableStream = createWriteStream(destinationPath);
    const brotli = zlib.createBrotliCompress();
    await pipeline(readableStream, brotli, writeableStream);
  } catch (error) {
    throw error;
  }
};
