import path from "path";

export const goToUpperDirectory = () => {
  const upperDir = path.join(process.cwd(), "..");
  process.chdir(upperDir);
  return process.cwd();
};
