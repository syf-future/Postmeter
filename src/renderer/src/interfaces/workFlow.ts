// 定义类型
export interface WorkFlow {
    workFlowId: string;
    workFlowName: string; // 工作流名称
    wordFlowThreadNum: number; // 线程数(代表同时起几个线程执行)
    wordFlowCycleNum: number; // 循环次数
    wordFlowWorkList: []
}


// http结构
export interface WorkFlowHttp {
    httpName: string // 请求名称,
    httpMethod: string, // 请求方法，如 GET、POST 等
    httpUrl: string, // 请求地址
    httpParam: Map<string, string>, // 请求参数(get请求时传输的传输)
    httpHeard: Map<string, string>,
    httpBody: string
    httpResp: string,       // 期待的响应。若返回不匹配则请求失败
    httpRespNum: number,     // 请求次数
    httpRespTime: number,   // 请求时间。超过时间则拒绝
    httpRespSleep: number    // 请求间隔时间
}

// sql结构
export interface WorkFlowSql {
    sqlName: string, // 请求名称,
    sqlDate: string,
    sqlResp: string,
    sqlNum: number,
    sqlTime: number,
    sqlSleep: number
}