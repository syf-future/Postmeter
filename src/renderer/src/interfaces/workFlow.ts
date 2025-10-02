import { EnumWorkFlowCode } from "@renderer/enums/enumWorkCode";
import { ReqRow, WorkFlowHttpResp } from "./reqRow";

// 定义类型
export interface WorkFlow {
    workFlowId: string;
    workFlowName: string; // 工作流名称
    wordFlowThreadNum: number; // 线程数(代表同时起几个线程执行)
    wordFlowCycleNum: number; // 循环次数
    wordFlowIntervalTime: number; // 循环间隔时间，单位毫秒
    wordFlowWorkList?: (Array<WorkFlowHttp | WorkFlowSql | WorkFlowSleep>); // 工作流工作列表
}


// http结构
export interface WorkFlowHttp {
    type: EnumWorkFlowCode.WORK_FLOW_HTTP, // 工作流类型 
    name: string // 请求名称,
    isUse: boolean, // 是否启用
    httpMethod: string, // 请求方法，如 GET、POST 等
    httpUrl: string, // 请求地址
    httpParam: ReqRow[], // 请求参数(get请求时传输的传输)
    httpHeader: ReqRow[],
    httpBody: string
    httpResp: WorkFlowHttpResp[],       // 期待的响应。若返回不匹配则请求失败
    httpRespNum: number,     // 请求次数
    httpRespSleep: number    // 请求间隔时间
}

// sql结构
export interface WorkFlowSql {
    type: EnumWorkFlowCode.WORK_FLOW_SQL, // 工作流类型 
    name: string, // 请求名称,
    isUse: boolean, // 是否启用
    sqlDate: string, // sql内容
    sqlResp: string, // 期待的响应   
    sqlNum: number,
    sqlSleep: number
}
// sleep结构
export interface WorkFlowSleep {
    type: EnumWorkFlowCode.WORK_FLOW_SLEEP, // 工作流类型 
    name: string, // 请求名称,
    isUse: boolean, // 是否启用
    sleepTime: number    // 等待时间，单位毫秒
}