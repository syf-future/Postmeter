import { ipcMain } from 'electron'
import { CONSTANT } from '../renderer/src/utils/ConstantUtil'
import Store from 'electron-store'
const store = new Store({
    name: 'api-config', // 文件名 -> config.json
    defaults: {
        apiConfig: []
    }
})
console.log('配置文件路径:', store.path)

export function apiConfig() {
    // 读取API配置
    ipcMain.handle(CONSTANT.API_CONFIG_GET, async (_event) => {
        return store.get('apiConfig')
    })
    // 保存API配置
    ipcMain.handle(CONSTANT.API_CONFIG_SAVE, async (_event, config) => {
        store.set('apiConfig', config)
    })
}
