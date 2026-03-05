const { app, BrowserWindow } = require('electron');
const path = require('path');

const isDev = process.env.NODE_ENV === 'development';
const isKiosk = process.env.KIOSK_MODE === 'true';

function createWindow() {
  const windowOptions = {
    width: 1280,
    height: 720,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
    icon: path.join(__dirname, '../public/icon.png'),
    show: false,
  };

  if (isKiosk) {
    windowOptions.fullscreen = true;
    windowOptions.kiosk = true;
    windowOptions.autoHideMenuBar = true;
  }

  const win = new BrowserWindow(windowOptions);

  // Load the app
  if (isDev) {
    win.loadURL('http://localhost:3000');
    win.webContents.openDevTools();
  } else {
    win.loadFile(path.join(__dirname, '../out/index.html'));
  }

  win.once('ready-to-show', () => {
    win.show();
  });

  // Prevent external navigation (keep kids in the app)
  win.webContents.on('will-navigate', (event, url) => {
    const allowedHosts = ['localhost', 'www.youtube-nocookie.com'];
    const parsedUrl = new URL(url);
    
    if (!allowedHosts.includes(parsedUrl.hostname)) {
      event.preventDefault();
    }
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
