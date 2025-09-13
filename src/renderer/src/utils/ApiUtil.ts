import { ApiRequest } from '@renderer/interfaces/request'
import { ReqRow } from '@renderer/interfaces/reqRow'

/**
 * 根据 ApiRequest 发送请求
 */
export async function sendApiRequest(api: ApiRequest) {
  const config = {
    method: api.method,
    url: api.url,
    headers: rowsToObject(api.headers),
  } as any

  if (api.method.toUpperCase() === 'GET') {
    config.params = rowsToObject(api.param)
  } else {
    if (api.body) {
      try {
        config.data = JSON.parse(api.body)
      } catch {
        config.data = api.body
      }
    } else {
      config.data = rowsToObject(api.param)
    }
  }

  // 调用主进程
  const res = await window.electronAPI.sendApiRequest(config)
  return res
}

/**
 * 将 ReqRow[] 转换为对象
 */
function rowsToObject(rows: ReqRow[]): Record<string, string> {
  const obj: Record<string, string> = {}
  rows.forEach(row => {
    if (row.key && (row.checked ?? true)) {
      obj[row.key] = row.value
    }
  })
  return obj
}
