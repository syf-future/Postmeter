import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { CONSTANT } from "../renderer/src/utils/ConstantUtil";
// 自定义渲染进程可用的 API
const api = {}
// 仅在启用 context isolation 时，通过 contextBridge 暴露 API 给渲染进程
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
    contextBridge.exposeInMainWorld('electronAPI', {
      // 发送请求
      sendApiRequest: (config: any) => ipcRenderer.invoke(CONSTANT.SEND_API_REQUEST, config),
      // 读取api配置
      getApiConfig: () => ipcRenderer.invoke(CONSTANT.API_CONFIG_GET),
      // 保存api配置
      saveApiConfig: (config: any) => ipcRenderer.invoke(CONSTANT.API_CONFIG_SAVE, config),
    })
  } catch (error) {
    console.error(error)
  }
} else {
  // 如果未启用 context isolation，则直接挂载到全局 window 上
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
