import path from "path";
import { callbackWrapper } from "../helpers/callbackWrapper";

export const goToUpperDirectory = () => {
  return callbackWrapper(() => {
    const upperDir = path.join(process.cwd(), "..");
    process.chdir(upperDir);
  });
};
