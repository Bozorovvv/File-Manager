import path from "path";
import { rename, access } from "fs/promises";

export const renameFile = (oldPath, newPath) => {
  console.log(oldPath, newPath);
  const oldfilePath = path.join(process.cwd(), oldPath);
  const newfilePath = path.join(process.cwd(), newPath);

  access(oldfilePath)
    .then(() => {
      rename(oldfilePath, newfilePath)
        .then(() => {
          console.log("File renamed successfully!");
        })
        .catch(() => {
          console.error("Operation failed");
        });
    })
    .catch(() => {
      console.error("Operation failed");
    });

  return process.cwd();
};
