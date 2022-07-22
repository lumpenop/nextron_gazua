import serve from "electron-serve";
import { createWindow } from "./helpers";
import { ipcMain, app } from "electron";

import { jwtToken } from "./jwt";

const isProd: boolean = process.env.NODE_ENV === "production";

if (isProd) {
  serve({ directory: "app" });
} else {
  app.setPath("userData", `${app.getPath("userData")} (development)`);
}

(async () => {
  await app.whenReady();

  const mainWindow = createWindow("main", {
    width: 1000,
    height: 600,
  });

  if (isProd) {
    await mainWindow.loadURL("app://./home.html");
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}/home`);
    mainWindow.webContents.openDevTools();
  }
})();

ipcMain.on("SIGN_IN", (evt, payload: string) => {
  const userId = payload;
  if (userId) {
    const accessToken = jwtToken.access(userId);
    const refreshToken = jwtToken.refresh();

    evt.reply("TOKEN", { accessToken, refreshToken });
  }
});

ipcMain.on("SIGN_UP", (evt, payload) => {
  console.log(payload);
});

ipcMain.on("FIRST_CONNECTION", (evt, payload) => {
  const isLogin = jwtToken.verify(payload.token.accessToken).ok;

  evt.reply("FIRST_CONNECTION", { isLogin });
});

app.on("window-all-closed", () => {
  app.quit();
});
