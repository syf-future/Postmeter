// 定义工作区类型枚举
export enum EnumWorkSpaceCode {
    WORK_SPACE_API = "WORK_SPACE_API", // 工作空间API
    WORK_SPACE_WORKFLOW = "WORK_SPACE_WORKFLOW",// 工作空间工作流
    WORK_SPACE_ENV = "WORK_SPACE_ENV",// 工作空间环境变量
    WORK_SPACE_BOX = "WORK_SPACE_BOX"// 工作空间工具箱
}

// 定义工作流类型枚举
export enum EnumWorkFlowCode {
    WORK_FLOW = "WORK_FLOW", // 工作流
    WORK_FLOW_HTTP = "WORK_FLOW_HTTP", // 工作流HTTP请求
    WORK_FLOW_SQL = "WORK_FLOW_SQL",// 工作流SQL请求
    WORK_FLOW_SLEEP = "WORK_FLOW_SLEEP",// 工作流等待请求

    WORK_FLOW_CONNECT_SQL = "WORK_FLOW_CONNECT_SQL",// 连接数据库
}