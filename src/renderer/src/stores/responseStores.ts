import { defineStore } from "pinia";
import { ref } from "vue";
import { ApiResponse } from "@renderer/interfaces/response"

// 定义响应列表的 Pinia store
export const responseStore = defineStore("responseStore", () => {
    const responseList = ref<ApiResponse[]>([]);

    const apiResponse = ref<ApiResponse>({
        apiId: '',
        isResponse: false,
        status: 0,
        success: false,
        date: '',
        headers: {}
    });

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
        if (apiResponse.value.apiId === apiResp.apiId) {
            apiResponse.value = { ...apiResp } // 确保替换为新引用
        }
    }

    /**
     * 根据 apiId 获取对应的 API 响应
     * @param apiId {string} - 要查找的 API 响应的唯一标识符
     * @returns {ApiResponse | undefined} - 返回找到的 API 响应对象，若未找到则返回 undefined
     */
    function getResponseById(apiId: string): ApiResponse {
        const resp = responseList.value.find(response => response.apiId === apiId);
        if (!resp) {
            return {
                apiId: apiId,
                isResponse: false,
                status: 0,
                success: false,
                date: '',
                headers: {}
            }
        }
        return resp;
    }

    /**
     * 设置当前的 API 响应
     * @param apiId {string} - 要设置的 API 响应的唯一标识符
     */
    function setNowResponse(apiId: string): void {
        const response = getResponseById(apiId);
        if (response) {
            apiResponse.value = response;
        } else {
            apiResponse.value = {
                apiId: apiId,
                isResponse: false,
                status: 0,
                success: false,
                date: '',
                headers: {}
            };
        }
    }

    return { responseList, apiResponse, addOrUpdateResponse, getResponseById, setNowResponse };
})