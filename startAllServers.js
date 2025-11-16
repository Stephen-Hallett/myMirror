const child_process = require("child_process");

// commands list
const commands = [
  {
    name: "NodeJS server",
    command: "node ./backend/index.js",
  },
  {
    name: "React Server",
    command: "cd ./mirror_react && react-scripts start",
  },
  {
    name: "Electron server",
    command: "cd ./mirror_react && electron .",
  },
];

// run command
function runCommand(command, name, callback) {
  child_process.exec(command, function(error, stdout, stderr) {
    if (stderr) {
      callback(stderr, null);
    } else {
      callback(null, `Successfully executed ${name} ...`);
    }
  });
}

// main calling function
function main() {
  commands.forEach((element) => {
    runCommand(element.command, element.name, (err, res) => {
      if (err) {
        console.error(err);
      } else {
        console.log(res);
      }
    });
  });
}

// call main
main();
