<script setup lang="ts">
import { ref } from "vue";
import { ApiRequest } from "@renderer/interfaces/request"
import MenuTemplate from '@renderer/templates/menuTemplate.vue';
import { EnumMenuCode } from "@renderer/enums/enumMenuCode";

// 通过defineProps 宏函数来接收父组件传的数据
defineProps<{
    apiRequest: ApiRequest
}>();

//-------右键菜单相关变量----------
const isMenuVisible = ref(false);
const menuX = ref(0);
const menuY = ref(0);

const menuItems = new Array<EnumMenuCode>(
    EnumMenuCode.OPEN_API,
    EnumMenuCode.COPY_API,
    EnumMenuCode.RENAME_API,
    EnumMenuCode.DELETE_API
);

// 处理右键菜单的显示和位置
const handleContextMenu = (e: MouseEvent) => {
    // 获取鼠标点击的坐标
    menuX.value = e.clientX;
    menuY.value = e.clientY;
    isMenuVisible.value = true;
};

const onMenuItemClick = (enumMenuCode: EnumMenuCode) => {
    // 根据点击的菜单项执行相应操作
    console.log('执行操作：', enumMenuCode);
    // 这里可以根据 action 的值来触发不同的函数，例如：
    if (EnumMenuCode.OPEN_API === enumMenuCode) {
        // 处理新建API的逻辑
        console.log('打开API');
    }
    if (EnumMenuCode.COPY_API === enumMenuCode) {
        // 处理复制API的逻辑
        console.log('复制API');
    }
    if (EnumMenuCode.RENAME_API === enumMenuCode) {
        // 处理重命名API的逻辑
        console.log('重命名API');
    }
    if (EnumMenuCode.DELETE_API === enumMenuCode) {
        // 处理删除API的逻辑
        console.log('删除API');
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