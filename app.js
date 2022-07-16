const { app, BrowserWindow, Menu } = require('electron');

function createWindow() {
    const win = new BrowserWindow({
        height: 600,
        width: 800,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true
        },
        title: 'Loading...',
    });

    win.setTitle('Starting...');
    win.loadFile('index.html');
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

var go_back = () => {
    return BrowserWindow.getFocusedWindow().webContents.goBack()
}

var go_forward = () => {
    return BrowserWindow.getFocusedWindow().webContents.goForward()
}

var home_page = () => {
    return BrowserWindow.getFocusedWindow().loadFile("index.html");
}

var dev_tools = () => {
    return BrowserWindow.getFocusedWindow().webContents.openDevTools();
}

const isMac = process.platform === "darwin";

const template = [
    {
        label: "<-",
        click: () => {
            go_back()
        }
    },
    {
        label: "->",
        click: () => {
            go_forward()
        }
    },
    {
        label: "Home",
        click: () => {
            home_page();
        },
    },
    {   
        label: "File",
        submenu: [
            { role: "close" },
            { label: "Developer Tools", click: () => { dev_tools() } }
        ],
    },
];

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);

module.exports = {
    menu,
};