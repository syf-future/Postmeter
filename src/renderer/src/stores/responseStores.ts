import { defineStore } from "pinia";
import { ref } from "vue";
import { ApiResponse } from "@renderer/interfaces/response"

// 定义响应列表的 Pinia store
export const responseStore = defineStore("responseStore", () => {
    const responseList = ref<ApiResponse[]>([]);

    const apiResponse = ref<ApiResponse>();

    /**
     * 添加或更新 API 响应
     * @param apiResp {ApiResponse} - 要添加或更新的 API 响应对象
     */
    function addOrUpdateResponse(apiResp: ApiResponse): void {
        const index = responseList.value.findIndex(response => response.apiId === apiResp.apiId);
        if (index !== -1) {
            // 如果找到相同 apiId 的响应，则更新该响应
            responseList.value[index] = { ...apiResp }  // 新对象
        } else {
            // 否则，添加新的响应
            responseList.value.push({ ...apiResp })
        }
        if (apiResponse.value && apiResp.apiId === apiResponse.value.apiId) {
            apiResponse.value = { ...apiResp } // 确保替换为新引用
            console.log("更新后的响应:", apiResponse.value);
        }
    }

    /**
     * 设置当前的 API 响应
     * @param apiId {string} - 要设置的 API 响应的唯一标识符
     */
    function setNowResponse(apiId: string): void {
        const response = responseList.value.find(response => response.apiId === apiId);
        if (response) {
            apiResponse.value = response;
        } else {
            apiResponse.value = { apiId: apiId, status: 0, isResponse: false, date: '', headers: {} } // 重置为空对象
        }
    }

    return { responseList, apiResponse, addOrUpdateResponse, setNowResponse };
})