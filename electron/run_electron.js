const { exec, execSync } = require('child_process');

execSync("sleep 13");

exec('electron .', (err, stdout, stderr) => {
  if (err) {
	  console.log("error!");
    // node couldn't execute the command
    return;
  }
  console.log("success");

  // the *entire* stdout and stderr (buffered)
  console.log(`stdout: ${stdout}`);
  console.log(`stderr: ${stderr}`);
});
