const { app, BrowserWindow, ipcMain, Menu, MenuItem } = require('electron');
const path = require('path');
const url = require('url');
const { ClientSocketHTTP } = require('./utils/clientSocket.js');
const {
    login,
    fetchUserInfo,
    updateUserInfo,
    exitDepartment,
    joinDepartment,
} = require('./utils/fetchAPI.js'); 

const socketURL = 'http://localhost:5000';
let win = null;
let socket;

const createBrowserWindow = () => {
    win = new BrowserWindow({
        width: 1200,
        height: 750,
        minHeight: 750,
        minWidth: 1200,
        frame: false, // Ẩn thanh tiêu đề mặc định
        webPreferences: {
            preload: path.join(__dirname,'preloads', 'Preload.js'),
            nodeIntegration: false,
            contextIsolation: true,
        },
    });

    win.loadURL(
        url.format({
            pathname: path.join(__dirname, '../public', 'index.html'),
            protocol: 'file:',
            slashes: true,
        })
    );

    win.removeMenu();
    socket = new ClientSocketHTTP(socketURL, win);

    win.on('close', () => {
        if (socket) socket.close();
    });

    const ctxMenu = new Menu();

    ctxMenu.append(
        new MenuItem({
            label: 'Open Dev Tools',
            accelerator: 'CmdOrCtrl+Shift+I',
            click: () => win.webContents.openDevTools(),
        })
    );

    ctxMenu.append(
        new MenuItem({
            label: 'Restart',
            accelerator: 'CmdOrCtrl+R',
            click: () => win.reload(),
        })
    );

    win.webContents.on('context-menu', (e, params) => {
        ctxMenu.popup({
            window: win,
            x: params.x,
            y: params.y,
        });
    });

    win.webContents.on('beforeunload', () => {
        if (socket) socket.close();
    });
};

app.whenReady().then(() => {
    createBrowserWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createBrowserWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (socket) socket.close();
    if (process.platform !== 'darwin') app.quit();
});

// Định nghĩa các handler IPC
ipcMain.handle('login', async (event, user) => {
    try {
        const loginData = await login(user);
        const userInfo = await fetchUserInfo(loginData.data.token, loginData.data.id);
        const { departmentDTOs: Departments, ...PersonInfor } = userInfo.data;
        PersonInfor.token = loginData.data.token;

        return { success: true, data: { Departments, PersonInfor, state: loginData.state, message: loginData.message } };
    } catch (error) {
        return { success: false, message: error.message, data: {} };
    }
});
ipcMain.handle('changeInfor-user', async (event, { token, id, user }) => {
    try {
        console.log('changeInfor-user, token: ',token);
        await updateUserInfo(token, id, user);
        return { success: true };
    } catch (error) {
        return { success: false, message: error.message };
    }
});

ipcMain.handle('exit-department', async (event, { token, idnv, mapb }) => {
    try {
        await exitDepartment(token, idnv, mapb);
        return { success: true, data: { state: true } };
    } catch (error) {
        return { success: false, data: { state: false }, message: error.message };
    }
});

ipcMain.handle('join-department', async (event, { token, idnv, mapb }) => {
    try {
        const responseData = await joinDepartment(token, idnv, mapb);
        return { success: true, data: responseData.data };
    } catch (error) {
        return { success: false, message: error.message, data: {} };
    }
});

ipcMain.handle('CloseSocket', () => {
    if (socket) {
        socket.close();
        console.log('Socket disconnected.');
    }
});