import { OS_FLAGS } from "./commands";

export const handleOsCommand = (flag) => {
  switch (flag) {
    case OS_FLAGS.EOL:
      console.log(JSON.stringify(os.EOL));
      break;
    case OS_FLAGS.CPUS:
      console.log(os.cpus());
      break;
    case OS_FLAGS.HOMEDIR:
      console.log(os.homedir());
      break;
    case OS_FLAGS.USERNAME:
      console.log(os.userInfo().username);
      break;
    case OS_FLAGS.ARCHITECTURE:
      console.log(os.arch());
      break;

    default:
      console.log("Invalid os command");
  }
};
