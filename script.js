const args = process.argv.slice(2);
const userName = args?.[0]?.split("=")[1];
if (userName) console.log(`Welcome to the File Manager, ${userName}!`);

const echoInput = (chunk) => {
  const chunkStringified = chunk.toString();
  //   console.log(chunkStringified);
  if (chunkStringified.includes(".exit")) {
    process.exit(0);
  }
  process.on("exit", () => {
    console.log(`Thank you for using File Manager, ${userName}, goodbye!`);
  });
  process.stdout.write(`Received from master process: ${chunk.toString()}\n`);
};

process.stdin.on("data", echoInput);
