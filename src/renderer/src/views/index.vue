<script setup lang="ts">
import LeftView from '@renderer/views/leftView/index.vue';
import MiddleView from '@renderer/views/middleView/index.vue';
import RightView from '@renderer/views/rightView/index.vue';

import { ref, onMounted, onUnmounted } from 'vue';

const middleViewRef = ref<HTMLElement | null>(null);
const rightViewRef = ref<HTMLElement | null>(null);
const isResizing = ref(false);
let startX = 0;
let initialMiddleWidth = 0;
let initialRightWidth = 0;

// 确保DOM加载完成后获取元素引用
onMounted(() => {
    middleViewRef.value = document.querySelector('.middle-view-container');
    rightViewRef.value = document.querySelector('.right-view-container');
});

const startResize = (event: MouseEvent) => {
    if (!middleViewRef.value || !rightViewRef.value) return;

    isResizing.value = true;
    startX = event.clientX;
    initialMiddleWidth = middleViewRef.value.offsetWidth;
    initialRightWidth = rightViewRef.value.offsetWidth;

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', stopResize);
};

const handleMouseMove = (event: MouseEvent) => {
    if (!isResizing.value || !middleViewRef.value || !rightViewRef.value) return;

    const dx = event.clientX - startX;

    // 计算新的宽度
    const newMiddleWidth = Math.max(0, initialMiddleWidth + dx); // 最小宽度0px
    const newRightWidth = Math.max(100, initialRightWidth - dx); // 最小宽度100px

    // 应用新宽度
    if (newMiddleWidth > 100){
        middleViewRef.value.style.width = `${newMiddleWidth}px`;
    }
    if (newMiddleWidth < 50){
        middleViewRef.value.style.width = `${0}px`;
    }
    rightViewRef.value.style.width = `${newRightWidth}px`;
};

const stopResize = () => {
    isResizing.value = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', stopResize);
};

onUnmounted(() => {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', stopResize);
});
</script>

<template>
    <div id="main-view">
        <left-view class="left-view-container" />
        <middle-view ref="middleViewRef" class="middle-view-container" />
        <div class="boundaryStyle" @mousedown="startResize"></div>
        <right-view ref="rightViewRef" class="right-view-container" />
    </div>
</template>

<style lang="scss" scoped>
#main-view {
    display: flex;
    width: 100vw;
    height: 100vh;
    overflow: hidden;

    .left-view-container {
        flex-shrink: 0;
        /* 固定宽度 */
        width: 40px;
        /* 根据实际情况调整 */
    }

    .middle-view-container {
        flex-shrink: 0;
        /* 初始宽度 */
        width: 20%;
    }

    .right-view-container {
        flex-grow: 1;
        /* 初始宽度 */
        width: 80%;
    }
}

.boundaryStyle {
    width: 2px;
    height: 100%;
    background-color: var(--ev-c-border-color1);
    cursor: col-resize;
    flex-shrink: 0;
    z-index: 10;
    /* 确保分隔条在最上层 */

    &:hover {
        background-color: var(--ev-c-border-color2);
    }

    &:active {
        background-color: #46ff40;
    }
}
</style>