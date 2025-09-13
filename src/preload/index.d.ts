import { FolderRequest, ApiRequest } from "@renderer/interfaces/request"

export { }  // 确保这是模块

declare global {
  interface ElectronAPI {
    sendApiRequest(config: any): Promise<any>;
    getApiConfig(): FolderRequest[];
    saveApiConfig(config: FolderRequest[]);
  }

  interface Window {
    electronAPI: ElectronAPI;
  }

}
