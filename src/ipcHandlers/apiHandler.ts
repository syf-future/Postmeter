import { ipcMain } from 'electron'
import axios from 'axios'
import { CONSTANT } from '../renderer/src/utils/ConstantUtil'

export function registerApiHandler() {
    ipcMain.handle(CONSTANT.SEND_API_REQUEST, async (_event, config) => {
        try {
            const res = await axios(config)
            return {
                success: true,
                status: res.status,
                statusText: res.statusText,
                headers: res.headers,
                data: res.data
            }
        } catch (err: any) {
            return {
                success: false,
                error: err.message,
                status: err.response?.status,
                statusText: err.response?.statusText,
                headers: err.response?.headers,
                data: err.response?.data
            }
        }
    })
}
