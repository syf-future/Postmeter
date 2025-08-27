<script setup lang="ts">
import { ref } from 'vue'
import WorkbenchRespHeader from '@renderer/templates/workbenchRespHeader.vue'
import WorkbenchRespBody from '@renderer/templates/workbenchRespBody.vue'

// 表示选中的标签
const labelRef = ref<string>('1')
</script>
<!-- 工作台响应 -->
<template>
  <div style="width: 100%; height: 100%">
    <div class="request-label-style">
      <div class="label-test-style" @click="labelRef = '1'" :class="{ active: labelRef === '1' }">
        <span>响应头</span> <span class="text-count">({{ 0 }})</span>
      </div>
      <div class="label-test-style" @click="labelRef = '2'" :class="{ active: labelRef === '2' }">
        <span>响应体</span>
      </div>
      <div class="label-test-style" @click="labelRef = '3'" :class="{ active: labelRef === '3' }">
        <span>性能</span>
      </div>
    </div>

    <!-- 根据选中的标签 显示对应的组件 -->
    <WorkbenchRespHeader v-show="labelRef === '1'" />
    <WorkbenchRespBody v-show="labelRef === '2'" />
  </div>
</template>

<style lang="scss" scoped>
.request-label-style {
  width: 100%;
  height: 40px;
  display: flex;

  .label-test-style {
    height: 100%;
    margin: 0 10px;
    cursor: pointer;
    display: flex; /* 开启 flex 布局 */
    align-items: center; /* 垂直居中 */
    justify-content: center; /* 水平居中 */
    padding: 2px; /* 内边距上下左右 3px */
    color: var(--ev-c-text-color1);
    white-space: nowrap; /* 不换行 */
    overflow: hidden; /*超出隐藏 */
    flex-shrink: 0; /* 不压缩 */

    &:hover {
      background-color: var(--ev-c-background-color3);
    }
  }
  .label-test-style.active {
    border-bottom: 2px solid #46ff40; // 选中时底部高亮
    color: var(--ev-c-text-color2);
  }
  .text-count {
    color: var(--en-c-subject-color1);
  }
}
</style>
