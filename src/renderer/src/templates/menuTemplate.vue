<script setup lang="ts">
import { watchEffect } from 'vue';
import { EnumMenuCode } from "@renderer/enums/enumMenuCode";

const props = defineProps({
    visible: Boolean,
    x: Number,
    y: Number,
    items: Array<EnumMenuCode>,
});

const emit = defineEmits(['item-click', 'close']);

const handleItemClick = (item: EnumMenuCode) => {
    emit('item-click', item);
    emit('close'); // 点击后隐藏菜单
};

// 监听菜单外部的点击事件，当点击外部时隐藏菜单
watchEffect((onInvalidate) => {
    if (props.visible) {
        const handleOutsideClick = (e: MouseEvent) => {
            // 检查点击事件是否发生在菜单内部
            const menu = document.querySelector('.context-menu');
            if (menu && !menu.contains(e.target as Node)) {
                emit('close');
            }
        };
        document.addEventListener('mousedown', handleOutsideClick);

        onInvalidate(() => {
            // 清理副作用
            document.removeEventListener('mousedown', handleOutsideClick);
        });
    }
});
</script>

<!-- 右键菜单模板 -->
<template>
    <ul v-if="visible" :style="{ left: x + 'px', top: y + 'px' }" class="context-menu">
        <li v-for="item in items" :key="item" @click="handleItemClick(item)">
            <div class="labelStyle">
                {{ item }}
            </div>
        </li>
    </ul>
</template>

<style lang="scss" scoped>
.context-menu {
    position: fixed;
    background-color: #3d3d3d;
    color: white;
    border-radius: 5px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    padding: 2px 0;
    z-index: 1000;
    list-style: none;
    margin: 0;
}

.context-menu li {
    padding: 3px 8px;
}

.labelStyle {
    padding: 3px 8px;
    font-size: 0.8em;
    border-radius: 5px;
    letter-spacing: 1px;

    &:hover {
        cursor: pointer;
        background-color: #67c23a;
    }
}
</style>