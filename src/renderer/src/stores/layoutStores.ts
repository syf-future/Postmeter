import { defineStore } from "pinia";
import { ref } from "vue";

// 定义布局的 Pinia store（水平布局/垂直布局）
export const useLayoutStore = defineStore("layoutStore", () => {
    // 默认是水平布局
    const layout = ref<boolean>(false);

    // 切换布局
    const updateLayout = (): void => {
        layout.value = !layout.value;
    };

    return { layout, updateLayout };
});
