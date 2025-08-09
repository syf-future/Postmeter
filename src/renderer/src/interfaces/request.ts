// 定义单个 API 请求的类型
export interface ApiRequest {
  apiId: string;
  apiName: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  url: string;
  headers?: Map<string, string>; // 使用 Map 来存储 Headers
  body?: string; // POST 请求可能有 body，所以是可选的
}

// 定义文件夹的类型，它包含一个 ApiRequest 数组
export interface RequestFolder {
  folderId: string; // 唯一标识符
  folderName: string;   // 文件夹名称
  apiItems: ApiRequest[]; // 可选的 API 请求列表
}


