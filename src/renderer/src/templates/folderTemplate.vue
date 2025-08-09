<script setup lang="ts">
import { ref } from 'vue';
import ApiTemplate from './apiTemplate.vue';
import { FolderRequest } from "@renderer/interfaces/request"
import MenuTemplate from '@renderer/templates/menuTemplate.vue';
import AddFolderDialog from '@renderer/templates/addDialogTemplate.vue';
import { EnumMenuCode } from "@renderer/enums/enumMenuCode";

// 每个组件实例都会有自己的 isFolderOpen 状态
const isFolderOpen = ref(false);

// 通过defineProps 宏函数来接收父组件传的数据
const props = defineProps<{
    requestFolder: FolderRequest
}>();



//-------右键菜单相关变量----------
const isMenuVisible = ref(false);
const menuX = ref(0);
const menuY = ref(0);

const menuItems = new Array<EnumMenuCode>(
    EnumMenuCode.ADD_API,
    EnumMenuCode.COPY_FOLDER,
    EnumMenuCode.RENAME_FOLDER,
    EnumMenuCode.DELETE_FOLDER
);
// 处理右键菜单的显示和位置
const handleContextMenu = (e: MouseEvent) => {
    // 获取鼠标点击的坐标
    menuX.value = e.clientX;
    menuY.value = e.clientY;
    isMenuVisible.value = true;
};

// 处理菜单项点击事件
const isOpenDialog = ref<boolean>(false); // 定义新建集合弹窗的状态
const dialogLabel = ref<EnumMenuCode>(EnumMenuCode.ADD_FFOLDER); // 弹窗标题
const onMenuItemClick = (enumMenuCode: EnumMenuCode) => {
    dialogLabel.value = enumMenuCode;
    // 这里可以根据 action 的值来触发不同的函数，例如：
    if (EnumMenuCode.ADD_API === enumMenuCode) {
        console.log('新建API');
        isOpenDialog.value = true;
    }
    if (EnumMenuCode.COPY_FOLDER === enumMenuCode) {
        // 处理复制文件夹的逻辑
        console.log('复制文件夹');
    }
    if (EnumMenuCode.RENAME_FOLDER === enumMenuCode) {
        // 处理重命名文件夹的逻辑
        console.log('重命名文件夹');
        isOpenDialog.value = true;
    }
    if (EnumMenuCode.DELETE_FOLDER === enumMenuCode) {
        // 处理删除文件夹的逻辑
        console.log('删除文件夹');
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
        <span class="name">{{ props.requestFolder.folderName }}</span>
        <span class="count">({{ props.requestFolder.apiItems.length }})</span>
    </div>
    <div v-if="isFolderOpen" v-for="(api, index) in props.requestFolder.apiItems" :key="index">
        <ApiTemplate :apiRequest="api" />
    </div>

    <!-- 右键菜单 -->
    <div>
        <MenuTemplate :visible="isMenuVisible" :x="menuX" :y="menuY" :items="menuItems" @item-click="onMenuItemClick"
            @close="isMenuVisible = false" />
    </div>
    <!-- 新建集合弹窗 -->
    <div>
        <AddFolderDialog v-model:isOpenDialog="isOpenDialog" :label="dialogLabel" :requestFolder = "props.requestFolder"/>
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