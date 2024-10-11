import path from "path";
import crypto from "crypto";

export const hashFile = (fileName) => {
  try {
    const filePath = path.resolve(fileName);
    const hash = crypto.createHash("sha256");
    console.log(hash.update(filePath).digest("hex"));
  } catch (error) {
    throw error;
  }
};
