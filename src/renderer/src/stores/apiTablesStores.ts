import { defineStore } from "pinia";
import { ref } from "vue";
import { ApiRequest } from "@renderer/interfaces/request"

// 定义请求列表的 Pinia store
export const apiTablesStore = defineStore("apiTablesStore", () => {
    const apiTables = ref<ApiRequest[]>([]);
    const nowApiTable = ref<ApiRequest>();
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
    }

    /**
     * 设置当前打开的api标签
     * @param apiRequest 
     */
    function setNowApiTable(apiRequest: ApiRequest): void {
        nowApiTable.value = apiRequest;
    }

    return { apiTables, nowApiTable, addApiTables, deleteApiTables, setNowApiTable };
})