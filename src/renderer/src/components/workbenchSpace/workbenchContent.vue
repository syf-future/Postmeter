<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import WorkbenchRequest from './workbenchRequest.vue'
import WorkbenchResponse from './workbenchResponse.vue'

import { storeToRefs } from 'pinia'
import { useLayoutStore } from '@renderer/stores/layoutStores'

const { layout } = storeToRefs(useLayoutStore()) // layout: false=水平，true=垂直

const requestSize = ref(50) // 左侧/上方默认占比 %
let isDragging = false

const startDrag = () => {
  isDragging = true
  document.body.style.cursor = layout.value ? 'ns-resize' : 'ew-resize'
}

const stopDrag = () => {
  isDragging = false
  document.body.style.cursor = 'default'
}

const onDrag = (e: MouseEvent) => {
  if (!isDragging) return
  const container = document.getElementById('workbench-content')
  if (!container) return

  const rect = container.getBoundingClientRect()
  let percent = 50

  if (layout.value) {
    // 垂直方向，计算高度百分比
    percent = ((e.clientY - rect.top) / rect.height) * 100
  } else {
    // 水平方向，计算宽度百分比
    percent = ((e.clientX - rect.left) / rect.width) * 100
  }

  // 限制范围 10% - 90%
  if (percent < 10) percent = 10
  if (percent > 90) percent = 90

  requestSize.value = percent
}

onMounted(() => {
  window.addEventListener('mousemove', onDrag)
  window.addEventListener('mouseup', stopDrag)
})

onBeforeUnmount(() => {
  window.removeEventListener('mousemove', onDrag)
  window.removeEventListener('mouseup', stopDrag)
})
</script>

<template>
  <div id="workbench-content" :class="{ vertical: layout }">
    <!-- 左侧/上方 -->
    <div
      class="workbench-request"
      :style="layout ? { height: requestSize + '%' } : { width: requestSize + '%' }"
    >
      <WorkbenchRequest />
    </div>

    <!-- 分割线 -->
    <div class="boundaryStyle" :class="{ vertical: layout }" @mousedown="startDrag"></div>

    <!-- 右侧/下方 -->
    <div
      class="workbench-response"
      :style="layout ? { height: 100 - requestSize + '%' } : { width: 100 - requestSize + '%' }"
    >
      <WorkbenchResponse />
    </div>
  </div>
</template>

<style lang="scss" scoped>
#workbench-content {
  width: 100%;
  height: 100%;
  display: flex;
  overflow: hidden;
  border: 1px solid var(--ev-c-border-color1);

  &.vertical {
    flex-direction: column;
  }
}

.boundaryStyle {
  width: 2px;
  height: 100%;
  background-color: var(--ev-c-border-color1);
  cursor: ew-resize;
  flex-shrink: 0;
  z-index: 10;
  transition: background-color 0.2s;

  &:hover {
    background-color: var(--ev-c-border-color2);
  }
  &:active {
    background-color: var(--en-c-subject-color1);
  }

  &.vertical {
    width: 100%;
    height: 2px;
    cursor: ns-resize;
  }
}
</style>
