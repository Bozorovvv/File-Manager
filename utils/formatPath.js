import path from "path";

export const formatPathForDisplay = (cwd) => {
  return cwd.split(path.sep).join("/").replace(/^C:\//, "");
};
