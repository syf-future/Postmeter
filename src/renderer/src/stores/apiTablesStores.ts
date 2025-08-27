import { defineStore } from "pinia";
import { ref } from "vue";
import { ApiRequest } from "@renderer/interfaces/request"

// 定义请求列表的 Pinia store
export const apiTablesStore = defineStore("apiTablesStore", () => {
    const apiTables = ref<ApiRequest[]>([]);
    const nowApiTable = ref<ApiRequest>();
    const updateApiTables = ref<ApiRequest[]>([]);

    /**
     * 新增API请求标签
     * @param apiRequest api请求
     */
    function addApiTables(apiRequest: ApiRequest): void {
        const api = apiTables.value.find(item => item.apiId === apiRequest.apiId);
        if (!api) {
            console.log("新增API请求标签:", apiRequest.apiName);
            apiTables.value.push(apiRequest);
        }
    }

    /**
     * 删除api标签
     * @param apiId 
     */
    function deleteApiTables(apiId: string): void {
        apiTables.value = apiTables.value.filter(item => item.apiId !== apiId);
        if (apiTables.value.length > 0) {
            setNowApiTable(apiTables.value[apiTables.value.length - 1]);
        }
    }

    /**
     * 设置当前打开的api标签
     * @param apiRequest 
     */
    function setNowApiTable(apiRequest: ApiRequest): void {
        nowApiTable.value = apiRequest;
    }


    /**
     * 获取修改后的api请求
     * @param apiRequest 
     */
    function getUpdateApiTable(apiRequest: ApiRequest): ApiRequest {
        // 1. 查找是否存在具有相同 apiId 的对象
        const index = updateApiTables.value.findIndex(item => item.apiId === apiRequest.apiId);
        if (index !== -1) {
            // 2. 如果存在，返回修改后的值
            return updateApiTables.value[index]
        } else {
            return apiRequest
        }
    }
    /**
     * 记录修改后的api请求
     * @param apiRequest 
     */
    function setUpdateApiTable(apiRequest: ApiRequest): void {
        // 1. 查找是否存在具有相同 apiId 的对象
        const index = updateApiTables.value.findIndex(item => item.apiId === apiRequest.apiId);

        if (index !== -1) {
            // 2. 如果存在，用新值覆盖旧值
            updateApiTables.value[index] = apiRequest;
        } else {
            // 3. 如果不存在，将新值添加到数组末尾
            updateApiTables.value.push(apiRequest);
        }
    }

    /**
     * 清除已保存的api请求
     * @param apiRequest 
     */
    function clearUpdateApiTables(apiRequest: ApiRequest): void {
        updateApiTables.value = updateApiTables.value.filter(item => item.apiId !== apiRequest.apiId);
    }

    return { apiTables, nowApiTable, updateApiTables, addApiTables, deleteApiTables, setNowApiTable, getUpdateApiTable, setUpdateApiTable, clearUpdateApiTables };
})