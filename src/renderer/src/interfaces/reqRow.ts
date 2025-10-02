export interface ReqRow {
  checked: boolean
  key: string
  value: string
}


export interface WorkFlowHttpResp {
  checked: boolean    // 是否启用
  respField: string     // 响应字段
  respValue: string     // 响应值
  respGlobalField: string // 全局变量字段
}