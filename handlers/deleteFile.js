import path from "path";
import { rm, access } from "fs/promises";

export const deleteFile = (fileName) => {
  const filePath = path.join(process.cwd(), fileName);

  access(filePath)
    .then(() => {
      rm(filePath)
        .then(() => {
          console.log("File deleted successfully!");
        })
        .catch(() => {
          console.error("Operation failed");
        });
    })
    .catch(() => {
      console.log("Operation failed");
    });

  return process.cwd();
};
