import fs from "fs";
import path from "path";
import { createReadStream } from "fs";
import { stdout } from "process";

export const readFileStream = (fileName) => {
  if (!fileName) {
    console.error("Error: No file specified.");
    return process.cwd();
  }

  const filePath = path.isAbsolute(fileName)
    ? fileName
    : path.join(process.cwd(), fileName);

  if (!fs.existsSync(filePath)) {
    console.error("Error: File does not exist.");
    return process.cwd();
  }

  if (fs.lstatSync(filePath).isDirectory()) {
    console.error("Error: The specified path is a directory, not a file.");
    return process.cwd();
  }

  const readableFile = createReadStream(filePath, { encoding: "utf-8" });

  readableFile.on("error", (err) => {
    console.error("Error reading file:", err.message);
  });

  readableFile.pipe(stdout);
  return process.cwd();
};
