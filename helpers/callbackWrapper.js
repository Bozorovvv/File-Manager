export const callbackWrapper = (cb) => {
  try {
    cb();
    return process.cwd();
  } catch (error) {
    console.error("Operation failed:", error.message);
    return "Operation failed";
  }
};
