import path from "path";
import { writeFile, access } from "fs/promises";

export const createFile = (fileName) => {
  const filePath = path.join(process.cwd(), fileName);

  access(filePath)
    .then(() => {
      console.log("File already exists");
    })
    .catch((error) => {
      if (error.code === "ENOENT") {
        writeFile(filePath, "")
          .then(() => {
            console.log("File created successfully!");
          })
          .catch(() => {
            console.error("Operation failed");
          });
      } else {
        console.error("Operation failed");
      }
    });

  return process.cwd();
};
