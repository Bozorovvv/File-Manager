import { createReadStream, createWriteStream, mkdir } from "fs";
import path from "path";

export const copyFile = (sourcePath, destinationDir) => {
  mkdir(destinationDir, { recursive: true }, (err) => {
    if (err) {
      console.error("Operation failed!");
      return;
    }
  });

  const fileName = path.basename(sourcePath);
  const destinationPath = path.join(destinationDir, fileName);

  const readableFile = createReadStream(sourcePath, {
    encoding: "utf-8",
  });
  const writeableFile = createWriteStream(destinationPath);

  readableFile.pipe(writeableFile);
  return process.cwd();
};
