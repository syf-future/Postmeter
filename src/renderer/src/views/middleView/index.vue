<script setup lang="ts">
import { ref, onUnmounted } from 'vue';

// middle-view 元素的引用
const middleViewRef = ref<HTMLElement | null>(null);
// viewStyle 元素的引用 (虽然在这个例子中主要通过父元素调整)
const viewStyleRef = ref<HTMLElement | null>(null);
// 响应式变量，表示当前是否正在调整大小
const isResizing = ref(false);
// 存储鼠标按下时的初始 X 坐标
let startX = 0;
// 存储开始调整大小时 middle-view 的初始宽度
let initialWidth = 0;

/**
 * 鼠标按下事件处理函数，开始调整大小操作。
 * @param event 鼠标事件对象
 */
const startResize = (event: MouseEvent) => {
  isResizing.value = true;
  startX = event.clientX;
  // 获取 middle-view 的当前宽度，作为调整大小的基准
  if (middleViewRef.value) {
    initialWidth = middleViewRef.value.offsetWidth;
  }
  // 为 document 添加 mousemove 和 mouseup 事件监听器
  // 这样做是为了确保即使鼠标移出拖动条，也能继续跟踪鼠标移动和释放事件
  document.addEventListener('mousemove', handleMouseMove);
  document.addEventListener('mouseup', stopResize);
};

/**
 * 鼠标移动事件处理函数，实时调整宽度。
 * @param event 鼠标事件对象
 */
const handleMouseMove = (event: MouseEvent) => {
  if (!isResizing.value) return;
  // 计算鼠标在 X 轴上的移动距离 (当前位置 - 起始位置)
  const dx = event.clientX - startX;
  // 计算新的宽度 (初始宽度 + 鼠标移动距离)
  const newWidth = initialWidth + dx;
  // 限制宽度最大值要保留100px
  const constrainedWidth = Math.max(70, Math.min(window.innerWidth - 100, newWidth));
  if (middleViewRef.value) {
    if (newWidth < 50) {
      middleViewRef.value.style.width = `2px`;
    } else {
      middleViewRef.value.style.width = `${constrainedWidth}px`;
    }
  }
};

const stopResize = () => {
  isResizing.value = false;
  document.removeEventListener('mousemove', handleMouseMove);
  document.removeEventListener('mouseup', stopResize);
};


onUnmounted(() => {
  // 如果组件在调整大小时卸载，则清理事件监听器
  document.removeEventListener('mousemove', handleMouseMove);
  document.removeEventListener('mouseup', stopResize);
});
</script>

<template>
  <div id="middle-view" ref="middleViewRef">
    <div class="viewStyle" ref="viewStyleRef">
      <RouterView />
    </div>
    <div class="boundaryStyle" @mousedown="startResize">
    </div>
  </div>
</template>

<style lang="scss" scoped>
#middle-view {
  display: flex;
  height: 100%;
  background-color: var(--ev-c-background-color2);
  width: 20%;
  min-width: 2px;
  max-width: 70%;
  flex-shrink: 0;
}

.viewStyle {
  height: 100%;
  width: calc(100% - 2px);
  // 当内容超出容器时隐藏溢出部分
  overflow: hidden;
}

.boundaryStyle {
  width: 2px;
  height: 100%;
  background-color: var(--ev-c-border-color1);
  cursor: col-resize;

  &:hover {
    background-color: var(--ev-c-border-color2);
  }

  &:active {
    background-color: #46ff40;
  }
}
</style>