import { app, BrowserWindowConstructorOptions, ipcMain  } from 'electron';
import serve from 'electron-serve';
import { createWindow } from './helpers';
import ApplicationRunner from './services/app-runner';
import AppUpdater from "./appUpdater";
import log from 'electron-log';
import { dialog } from 'electron';

const isProd: boolean = process.env.NODE_ENV === 'production';
let needToUpdate: boolean = false;

if (isProd) {
  serve({ directory: 'app' });
} else {
  app.setPath('userData', `${app.getPath('userData')} (development)`);
}

const appUpdater = new AppUpdater();
log.transports.file.level = 'info';
console.log = log.log;
log.info('App starting...');

let mainWindow:Electron.CrossProcessExports.BrowserWindow;

(async () => {
  await app.whenReady();

  let windowsOption: BrowserWindowConstructorOptions = {
    width: 1000,
    height: 600,
    minWidth: 1000,
    minHeight: 600,
    title: 'AppLauncher',
    webPreferences: {
      nodeIntegration: true
    },
    titleBarStyle: 'hidden',
    titleBarOverlay: {
      color: '#121212bd',
      symbolColor: '#74b1be',
    }
  }

  if (!isProd) {
    windowsOption.frame = false
  }

  mainWindow = createWindow('main', windowsOption);

  if (isProd) {
    await mainWindow.loadURL('app://./home.html');
    mainWindow.removeMenu()
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}/home`);
    mainWindow.removeMenu()
    mainWindow.webContents.openDevTools();
  }

  const runner = new ApplicationRunner();
  ipcMain.on('run', (event, payload) => {
    console.log("Try run: " + JSON.stringify(payload));
    event.sender.send('handling-start', payload.name)
    runner.Process(payload)
      .finally(()=>{
        event.sender.send('handling-stop', payload.name)
      });
  });

})();

function sendStatusToWindow(text: string) {
  log.info(text);
}

appUpdater.internal.on('checking-for-update', () => {
  sendStatusToWindow('Checking for update...');
})
appUpdater.internal.on('update-available', (info) => {
  sendStatusToWindow('Update available.');
  dialog.showMessageBox({
    type: 'info',
    title: 'New Update!',
    message: 'Found updates, do you want install it now?',
    buttons: ['Yes', 'No']
  }).then((buttonIndex) => {
    if (buttonIndex.response === 0) {
      appUpdater.internal.downloadUpdate()
    }
  })
})
appUpdater.internal.on('update-not-available', (info) => {
  sendStatusToWindow('Update not available.');
})
appUpdater.internal.on('error', (err) => {
  sendStatusToWindow('Error in auto-updater. ' + err);
  dialog.showErrorBox('Error ', 'Error occured in updater. ' + err)
})
appUpdater.internal.on('download-progress', (progressObj) => {
  let log_message = "Download speed: " + progressObj.bytesPerSecond;
  log_message = log_message + ' - Downloaded ' + progressObj.percent + '%';
  log_message = log_message + ' (' + progressObj.transferred + "/" + progressObj.total + ')';
  sendStatusToWindow(log_message);
})
appUpdater.internal.on('update-downloaded', (info) => {
  sendStatusToWindow('Update downloaded');
  dialog.showMessageBox({
    title: 'Update downloaded',
    message: 'App will be updated after close'
  })
  needToUpdate = true;
});



app.on('window-all-closed', () => {
  appUpdater.internal.autoInstallOnAppQuit = needToUpdate
  app.quit();
});

app.on('ready', function()  {
  appUpdater.checkForUpdates();
});





