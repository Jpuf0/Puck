'use strict';

/* eslint-disable no-console */

const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');
const DiscordRPC = require('../src');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 340,
    height: 380,
    resizable: false,
    titleBarStyle: 'hidden',
    webPreferences: {
      nodeIntegration: true,
    },
  });

  mainWindow.setMenuBarVisibility(false)

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true,
  }));

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  app.quit();
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

// Set this to your Client ID.
const clientId = '815583946938646528';

// Only needed if you want to use spectate, join, or ask to join
DiscordRPC.register(clientId);

console.log(`Registered ClientId. (${clientId})`)

const rpc = new DiscordRPC.Client({ transport: 'ipc' });
const startTimestamp = new Date();

async function setActivity() {
  if (!rpc || !mainWindow) {
    return;
  }

  const ass = await mainWindow.webContents.executeJavaScript('window.ass');

  rpc.setActivity({
    details: `Puck has clapped ${ass} time${ass>1 ? "s" : ""}.`,
    state: 'clap clap',
    startTimestamp,
    largeImageKey: 'large',
    largeImageText: 'Look at him go',
    smallImageKey: 'smol',
    smallImageText: 'cute boi',
    instance: false,
  });
}

rpc.on('ready', () => {
  setActivity();
  console.log("setActivity")

  // activity can only be set every 15 seconds
  setInterval(() => {
    setActivity();
  }, 15e3);
});

rpc.login({ clientId }).catch(console.error);
