import path from "path";

export const formatPathForDisplay = (cwd) => {
  if (!cwd) return process.cwd();
  return cwd.split(path.sep).join("/").replace(/^C:\//, "");
};
