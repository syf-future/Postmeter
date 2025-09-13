import { defineStore } from "pinia";
import { ref } from "vue";
import { FolderRequest, ApiRequest } from "@renderer/interfaces/request"
import { SequenceUtil } from "@renderer/utils/SequenceUtil";

// 定义请求列表的 Pinia store
export const requestListStore = defineStore("requestListStore", () => {

    const requestList = ref<FolderRequest[]>([]) // 先空数组初始化

    // 异步加载初始请求列表
    async function loadRequestList() {
        try {
            const list = await window.electronAPI.getApiConfig()
            requestList.value = list ?? []
            console.log("加载请求列表:", requestList.value)
        } catch (error) {
            console.error("加载请求列表失败:", error)
        }
    }

    /**
     * 添加一个新的请求文件夹到请求列表 
     * @param folderName  {string} - 要添加的请求文件夹名称
     */
    function addFolder(folderName: string): void {
        const requestFolder: FolderRequest = {
            folderId: SequenceUtil.nextId(),
            folderName: folderName,
            apiItems: []
        }
        console.log("添加请求文件夹:", requestList.value);
        requestList.value.push(requestFolder);
        saveRequestList();
    }

    /**
     * 更新请求列表名称
     * @param folderId {string} - 文件夹的唯一标识符
     * @param folderName {string} - 文件夹名称
     */
    function updateFolder(folderId: string, folderName: string): void {
        const folder = requestList.value.find(item => item.folderId === folderId);
        if (folder) {
            folder.folderName = folderName;
            saveRequestList();
        }
    }

    /**
     * 删除请求列表
     * @param folderName {string} - 文件夹名称
     */
    function deleteFolder(folderId: string): void {
        requestList.value = requestList.value.filter(item => item.folderId !== folderId);
        saveRequestList();
    }

    /**
     * 添加一个新的api到请求列表 
     * @param folderId  {string} - 文件夹的唯一标识符
     * @param apiName  {string} - 要添加的API名称
     */
    function addApi(folderId: string, apiName: string): void {
        const apiRequest: ApiRequest = {
            apiId: SequenceUtil.nextId(),
            apiName: apiName,
            method: 'GET',
            url: 'http://localhost:8080',
            param: [],
            headers: [
                { "checked": true, "key": "User-Agent", "value": "Postmeter/1.0" },
                { "checked": true, "key": "Connection", "value": "keep-alive" },
                { "checked": true, "key": "Accept", "value": "*/*" },
                { "checked": true, "key": "Accept-Encoding", "value": "gzip, deflate, br" }
            ],
            body: ''
        }
        const folder = requestList.value.find(item => item.folderId === folderId);
        if (folder) {
            folder.apiItems.push(apiRequest);
            saveRequestList();
        }
    }

    /**
     * 更新请求列表名称
     * @param apiRequest {ApiRequest} - 要更新的 API 请求对象
     * @param folderId {string} - （可选）文件夹的唯一标识符
     */
    function updateApi(apiRequest: ApiRequest, folderId?: string): void {
        // 根据 folderId 或 apiId 找到父文件夹
        const folder = folderId
            ? requestList.value.find(item => item.folderId === folderId)
            : requestList.value.find(item => item.apiItems.some(x => x.apiId === apiRequest.apiId));

        // 如果找到了文件夹
        if (folder) {
            const apiList = folder.apiItems;
            // 在 apiItems 中找到并更新对应的 API
            const apiIndex = apiList.findIndex(api => api.apiId === apiRequest.apiId);

            if (apiIndex !== -1) {
                apiList[apiIndex] = apiRequest;
                saveRequestList();
            }
        }
    }

    /**
     * 删除api
     * @param folderId {string} - 文件夹的唯一标识符
     * @param apiId {string} - api请求的唯一标识符
     */
    function deleteApi(folderId: string, apiId: string): void {
        const folder = requestList.value.find(item => item.folderId === folderId);
        if (folder) {
            // 直接在 folder.apiItems 上进行操作
            if (folder.apiItems) {
                // 使用 filter 过滤出不等于 apiId 的项，然后将新数组赋值回去
                folder.apiItems = folder.apiItems.filter(item => item.apiId !== apiId);
                saveRequestList();
            }
        }
    }

    /**
     * 保存请求列表到本地存储
     */
    function saveRequestList() {
        const plainList = JSON.parse(JSON.stringify(requestList.value))
        console.log("保存请求列表:", plainList)
        window.electronAPI.saveApiConfig(plainList)
    }
    return { requestList, loadRequestList, addFolder, updateFolder, deleteFolder, addApi, updateApi, deleteApi, saveRequestList };
})