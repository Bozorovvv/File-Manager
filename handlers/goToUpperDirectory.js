import path from "path";

export const goToUpperDirectory = (currentDir) => {
  const upperDir = path.join(currentDir, "..");

  try {
    process.chdir(upperDir);
    return process.cwd();
  } catch (error) {
    throw error;
  }
};
