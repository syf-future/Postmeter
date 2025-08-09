<script setup lang="ts">
import { ref } from 'vue';
import ApiTemplate from './apiTemplate.vue';
import { RequestFolder } from "@renderer/interfaces/request"
import MenuTemplate from '@renderer/templates/menuTemplate.vue';

// 每个组件实例都会有自己的 isFolderOpen 状态
const isFolderOpen = ref(false);

// 通过defineProps 宏函数来接收父组件传的数据
defineProps<{
    requestFolder: RequestFolder
}>();



//-------右键菜单相关变量----------
const isMenuVisible = ref(false);
const menuX = ref(0);
const menuY = ref(0);

const menuItems = [
    { label: '新建API', action: 'new_api' },
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
    if (action === 'new_api') {
        // 处理新建API的逻辑
        console.log('新建API');
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

<!-- 文件夹模板 -->
<template>
    <div id="folder-template" @click="isFolderOpen = !isFolderOpen" @contextmenu.prevent="handleContextMenu">
        <svg class="icon" aria-hidden="true">
            <use v-if="!isFolderOpen" xlink:href="#icon-wenjianjiaguan1"></use>
            <use v-else xlink:href="#icon-wenjianjiakai"></use>
        </svg>
        <span class="name">{{ requestFolder.folderName }}</span>
        <span class="count">({{ requestFolder.apiItems.length }})</span>
    </div>
    <div v-if="isFolderOpen" v-for="(api, index) in requestFolder.apiItems" :key="index">
        <ApiTemplate :apiRequest="api" />
    </div>

    <!-- 右键菜单 -->
    <div>
        <MenuTemplate :visible="isMenuVisible" :x="menuX" :y="menuY" :items="menuItems" @item-click="onMenuItemClick"
            @close="isMenuVisible = false" />
    </div>
</template>

<style lang="scss" scoped>
#folder-template {
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    white-space: nowrap;
    /* 核心属性：如果内容溢出，就将其隐藏 */
    overflow: hidden;

    &:hover {
        background-color: var(--ev-c-background-color1);
        cursor: pointer
    }
}

.icon {
    width: 21px;
    height: 21px;
    margin-left: 10px;
    /* 关键：防止 Flexbox 压缩图标 */
    flex-shrink: 0;
}

.name {
    margin-left: 10px;
    font-size: 14px;
    color: var(--ev-c-text-color2);
}

.count {
    margin-left: 5px;
    font-size: 14px;
    color: var(--ev-c-text-color1);
}
</style>