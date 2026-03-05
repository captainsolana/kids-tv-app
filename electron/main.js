const { app, BrowserWindow, shell } = require('electron');
const path = require('path');

// Keep a global reference of the window object
let mainWindow;

function createWindow() {
  // Create the browser window
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      webSecurity: true,
      allowRunningInsecureContent: false,
    },
    // Kiosk mode options (can be enabled via command line or settings)
    fullscreen: process.argv.includes('--kiosk'),
    kiosk: process.argv.includes('--kiosk'),
    autoHideMenuBar: true,
    titleBarStyle: 'default',
  });

  // Load the app
  const isDev = process.env.NODE_ENV === 'development';
  
  if (isDev) {
    mainWindow.loadURL('http://localhost:3000');
    mainWindow.webContents.openDevTools();
  } else {
    // Load the built Next.js app
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }

  // Block external navigation - only allow YouTube embeds
  mainWindow.webContents.on('will-navigate', (event, url) => {
    const allowedHosts = [
      'www.youtube-nocookie.com',
      'youtube-nocookie.com',
    ];
    
    const urlObj = new URL(url);
    
    // Allow navigation to YouTube embeds only
    if (!allowedHosts.includes(urlObj.hostname)) {
      event.preventDefault();
      console.log('Blocked navigation to:', url);
    }
  });

  // Block new window creation (popups)
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    console.log('Blocked popup:', url);
    return { action: 'deny' };
  });

  // Handle external links
  mainWindow.webContents.on('new-window', (event, url) => {
    event.preventDefault();
    console.log('Blocked new window:', url);
  });

  // Emitted when the window is closed
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// Create window when Electron is ready
app.whenReady().then(createWindow);

// Quit when all windows are closed
app.on('window-all-closed', () => {
  // On macOS, keep the app running unless Cmd+Q is pressed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS, recreate window when dock icon is clicked
  if (mainWindow === null) {
    createWindow();
  }
});

// Security: Prevent new window creation
app.on('web-contents-created', (event, contents) => {
  contents.on('new-window', (event, navigationUrl) => {
    event.preventDefault();
    console.log('Blocked new window from web-contents:', navigationUrl);
  });
});
