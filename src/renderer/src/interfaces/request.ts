import { ReqRow } from "./reqRow";
// 定义单个 API 请求的类型
export interface ApiRequest {
  apiId: string;
  apiName: string;
  method: string; // 请求方法，如 GET、POST 等
  url: string;
  param: ReqRow[]; // 请求参数(get请求时传输的传输)
  headers: ReqRow[]; // 请求头
  body: string; // POST 请求可能有 body，所以是可选的
}

// 定义文件夹的类型，它包含一个 ApiRequest 数组
export interface FolderRequest {
  folderId: string; // 唯一标识符
  folderName: string;   // 文件夹名称
  apiItems: ApiRequest[]; // 可选的 API 请求列表
}


