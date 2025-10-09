<script setup lang="ts">
import LeftView from '@renderer/views/leftView/index.vue'
import MiddleView from '@renderer/views/middleView/index.vue'
import RightView from '@renderer/views/rightView/index.vue'
import { ref, onUnmounted } from 'vue'

const isResizing = ref(false)
const startX = ref(0)
const middleWidth = ref(200) // 初始中间区域宽度，单位 px
const rightMinWidth = 200
const middleMinWidth = 100

const mainViewRef = ref<HTMLElement | null>(null)

const startResize = (event: MouseEvent) => {
  isResizing.value = true
  startX.value = event.clientX
  document.body.style.cursor = 'ew-resize'

  document.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('mouseup', stopResize)
}

const handleMouseMove = (event: MouseEvent) => {
  if (!mainViewRef.value) return

  const dx = event.clientX - startX.value
  const totalWidth = mainViewRef.value.clientWidth

  const newMiddle = middleWidth.value + dx
  const maxMiddle = totalWidth - rightMinWidth

  middleWidth.value = Math.max(middleMinWidth, Math.min(maxMiddle, newMiddle))
  startX.value = event.clientX // 更新 startX 防止溢出
}

const stopResize = () => {
  isResizing.value = false
  document.body.style.cursor = ''

  document.removeEventListener('mousemove', handleMouseMove)
  document.removeEventListener('mouseup', stopResize)
}

onUnmounted(() => {
  document.removeEventListener('mousemove', handleMouseMove)
  document.removeEventListener('mouseup', stopResize)
})
</script>

<template>
  <div id="main-view" ref="mainViewRef">
    <left-view class="left-view-container" />

    <middle-view class="middle-view-container" :style="{ width: `${middleWidth}px` }" />

    <div class="boundaryStyle" @mousedown="startResize"></div>

    <right-view
      class="right-view-container"
      :style="{ width: `calc(100% - 40px - 2px - ${middleWidth}px)` }"
    />
  </div>
</template>

<style lang="scss" scoped>
#main-view {
  display: flex;
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;

  .left-view-container {
    flex-shrink: 0;
    width: 40px;
    background-color: #2c2c2c;
  }

  .middle-view-container {
    flex-shrink: 0;
    height: 100%;
    background-color: #1e1e1e;
  }

  .right-view-container {
    flex-grow: 1;
    height: 100%;
    background-color: #1a1a1a;
  }

  .boundaryStyle {
    width: 2px;
    background-color: var(--ev-c-border-color1);
    cursor: ew-resize;
    flex-shrink: 0;
    z-index: 10;
    transition: background-color 0.2s;

    &:hover {
      background-color: var(--ev-c-border-color2);
    }

    &:active {
      background-color: #46ff40;
    }
  }

  .resize-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    cursor: ew-resize;
    z-index: 999;
  }
}
</style>
