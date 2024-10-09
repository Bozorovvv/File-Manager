export const welcomeUser = (userName) => {
  if (userName) console.log(`Welcome to the File Manager, ${userName}!\n`);
  console.log(`You are currently in ${formatPathForDisplay(process.cwd())}\n`);
};
