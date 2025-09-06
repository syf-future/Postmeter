import { ipcMain } from 'electron'
import axios from 'axios'
import http from 'http'
import https from 'https'
import { CONSTANT } from '../renderer/src/utils/ConstantUtil'

// 创建支持 keep-alive 的 agent
const httpAgent = new http.Agent({ keepAlive: true })
const httpsAgent = new https.Agent({ keepAlive: true })

export function registerApiHandler() {
    ipcMain.handle(CONSTANT.SEND_API_REQUEST, async (_event, config) => {
        try {
            const res = await axios({
                ...config,
                httpAgent,   // 给 HTTP 请求用
                httpsAgent,  // 给 HTTPS 请求用
                headers: {
                    ...config.headers,
                    Connection: 'keep-alive' // 显式声明头部
                }
            })

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
