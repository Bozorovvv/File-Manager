import { fork } from "child_process";

const main = () => {
  const args = process.argv.slice(2);

  const childProcess = fork("./script.js", args, {
    silent: true,
  });

  process.stdin.pipe(childProcess.stdin);
  childProcess.stdout.pipe(process.stdout);
};

main();
