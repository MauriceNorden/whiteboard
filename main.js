const { app, BrowserWindow, ipcMain } = require("electron");

let splash;

app.on("ready", () => {
    mainWindow = new BrowserWindow({
        title: "Electron-Example",
        width: 1150,
        height: 650,
        minWidth: 550,
        minHeight: 417,
		
        webPreferences: {
          nodeIntegration: true,
          contextIsolation: false
      },
        frame: false,
        show: false,
    });

    splash = new BrowserWindow({ 
      width: 350, 
      height: 350, 
      transparent: true, 
      frame: false, 
      alwaysOnTop: true, 
	  resizable: false,
      title: "Electron-Example" 
    });


    splash.loadURL(`file://${__dirname}/app/splash.html`);
    mainWindow.loadURL(`file://${__dirname}/app/index.html`);

    ipcMain.handle("exit", () => {
      BrowserWindow.getFocusedWindow().destroy();
      console.log("exit-main");

    });

    ipcMain.handle("min", () => {
      BrowserWindow.getFocusedWindow().minimize();
      console.log("minimize-main");
    });

    ipcMain.handle("max", () => {
      BrowserWindow.getFocusedWindow().maximize();
      console.log("max-main");

    });


    mainWindow.once("ready-to-show", () => {
        splash.destroy();
        mainWindow.show();
    });
});
