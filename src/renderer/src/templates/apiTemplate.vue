<script setup lang="ts">
import { ref } from "vue";
import { ApiRequest } from "@renderer/interfaces/request"
import MenuTemplate from '@renderer/templates/menuTemplate.vue';


// 通过defineProps 宏函数来接收父组件传的数据
defineProps<{
    apiRequest: ApiRequest
}>();

//-------右键菜单相关变量----------
const isMenuVisible = ref(false);
const menuX = ref(0);
const menuY = ref(0);

const menuItems = [
    { label: '打开API', action: 'open_api' },
    { label: '复制', action: 'copy' },
    { label: '重命名', action: 'rename' },
    { label: '删除', action: 'delete' },
];
// 处理右键菜单的显示和位置
const handleContextMenu = (e: MouseEvent) => {
    // 获取鼠标点击的坐标
    menuX.value = e.clientX;
    menuY.value = e.clientY;
    isMenuVisible.value = true;
};

const onMenuItemClick = (action: string) => {
    // 根据点击的菜单项执行相应操作
    console.log('执行操作：', action);
    // 这里可以根据 action 的值来触发不同的函数，例如：
    if (action === 'open_api') {
        // 处理新建API的逻辑
        console.log('打开API');
    }
    else if (action === 'copy') {
        // 处理复制的逻辑
        console.log('复制');
    }
    else if (action === 'rename') {
        // 处理重命名的逻辑
        console.log('重命名');
    }
    else if (action === 'delete') {
        // 处理删除的逻辑
        console.log('删除');
    }
};
</script>

<!-- api模板 -->
<template>
    <div id="api-template" @contextmenu.prevent="handleContextMenu">
        <div class="apiStyle">
            <span class="methodStyle" :class="`method-${apiRequest.method}`">{{ apiRequest.method }}</span>
            <span class="name">{{ apiRequest.apiName }}</span>
        </div>
    </div>
    <!-- 右键菜单 -->
    <div>
        <MenuTemplate :visible="isMenuVisible" :x="menuX" :y="menuY" :items="menuItems" @item-click="onMenuItemClick"
            @close="isMenuVisible = false" />
    </div>
</template>

<style lang="scss" scoped>
#api-template {
    width: 100%;
    height: 40px;

    white-space: nowrap;
    overflow: hidden;

    &:hover {
        background-color: var(--ev-c-background-color1);
        cursor: pointer
    }
}

.apiStyle {
    display: flex;
    display: flex;
    align-items: center;
    height: 100%;
    margin-left: 20px;
    border-left: 1px solid var(--ev-c-border-color1);
}

.icon {
    width: 21px;
    height: 21px;
    margin-left: 10px;
    flex-shrink: 0;
}

.name {
    margin-left: 10px;
    font-size: 14px;
    color: var(--ev-c-text-color2);
}

.methodStyle {
    margin-left: 10px;
    font-size: 14px;
    font-weight: 600;
}

// 3. 为每种请求方法定义颜色类
.method-GET {
    color: #4CAF50; // 绿色
}

.method-POST {
    color: #FFC107; // 黄色
}

.method-DELETE {
    color: #F44336; // 红色
}

.count {
    margin-left: 5px;
    font-size: 14px;
    color: var(--ev-c-text-color1);
}
</style>