const main = () => {
  const args = process.argv.slice(2);

  const userName = args?.[0]?.split("=")[1];
  if (userName) console.log(`Welcome to the File Manager, ${userName}!`);

  const exitGracefully = () => {
    console.log(`Thank you for using File Manager, ${userName}, goodbye!`);
    process.exit();
  };

  process.stdin.on("data", (data) => {
    if (data.includes(".exit")) {
      exitGracefully();
    }
    process.stdout.write(`Received from master process: ${data.toString()}\n`);
  });

  process.on("SIGINT", () => {
    exitGracefully();
  });
};

main();
