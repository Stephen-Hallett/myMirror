const { app, BrowserWindow } = require('electron')

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const createWindow = async () => {
  
  const win = new BrowserWindow({
      fullscreen: true,
      autoHideMenuBar: true,
      backgroundColor: '#000000',
      webPreferences: {
        nodeIntegration: true
      }});
    

      
  win.maximize();
  win.loadURL('http://localhost:3000');
  console.log("Sleeping");
  await sleep(10000);
  console.log("reloading");
  win.reload();
  console.log("reload done");
}
app.whenReady().then(createWindow)

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  
  if (BrowserWindow.getAllWindows().length === 0) {
    app.whenReady().then(createWindow)
  }
})

process.on('uncaughtException', function (err) {
  console.log(err);
})
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
