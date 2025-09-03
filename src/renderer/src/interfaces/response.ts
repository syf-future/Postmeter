// 定义单个 API 响应的类型
export interface ApiResponse {
    apiId: string;
    status: number; // 响应状态码
    success: boolean; // 请求是否成功
    date: string; // 响应参数
    headers: Map<string, string>; // 响应头
}


