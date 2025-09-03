import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import { registerApiHandler } from '../ipcHandlers/apiHandler'

// 创建主窗口
function createWindow(): void {
  // 创建浏览器窗口
  const mainWindow = new BrowserWindow({
    width: 1100, // 窗口宽度
    minWidth: 1100, // 最小宽度
    height: 750, // 窗口高度
    minHeight: 750, // 最小高度
    show: false, // 初始不显示，等准备好再显示
    autoHideMenuBar: true, // 自动隐藏菜单栏
    title: "Postmeter", // 窗口标题
    ...(process.platform === 'linux' ? { icon } : {}), // Linux下设置图标
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'), // 预加载脚本
      sandbox: false // 关闭沙盒
    }
  })

  // 当窗口准备好显示时触发
  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  // 拦截新窗口打开，使用默认浏览器打开外部链接
  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // 根据环境加载页面，开发环境加载远程URL，生产环境加载本地html
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// Electron初始化完成后调用
app.whenReady().then(() => {
  // 设置应用的用户模型ID（Windows通知等需要）
  electronApp.setAppUserModelId('com.electron')

  // 监听窗口创建事件，注册开发快捷键（F12打开/关闭DevTools等）
  // 生产环境下屏蔽Ctrl+R刷新
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC测试，收到'ping'消息时输出'pong'
  ipcMain.on('ping', () => console.log('pong'))
  ipcMain.on('hello', () => console.log('word'))

  // ⭐ 注册 API 请求 handler
  registerApiHandler()

  // 创建主窗口
  createWindow()

  // macOS下点击Dock图标时无窗口则重新创建窗口
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// 所有窗口关闭时退出应用（macOS除外）
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
