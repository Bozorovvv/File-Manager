import fs from "fs/promises";
import path from "path";

export const listDirectoryContents = async (currentDirectory) => {
  try {
    const directoryContents = await fs.readdir(currentDirectory);

    const formattedContents = await Promise.all(
      directoryContents.map(async (name) => {
        const itemPath = path.join(currentDirectory, name);
        const stats = await fs.lstat(itemPath);
        const type = stats.isDirectory() ? "Directory" : "File";
        return { Name: name, Type: type };
      })
    );

    console.table(formattedContents);
  } catch (error) {
    throw error;
  }
};
