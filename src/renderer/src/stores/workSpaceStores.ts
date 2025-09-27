import { defineStore } from "pinia";
import { ref } from "vue";

// 定义响应列表的 Pinia store
export const workSpaceStore = defineStore("workSpaceStore", () => {
    // 工作台当前工作区。
    const workSpace = ref<string>('');

    function setWorkSpace(workSpaceName: string): void {
        workSpace.value = workSpaceName;
    }
    return { workSpace, setWorkSpace };
})