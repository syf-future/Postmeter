<script setup lang="ts">
import { ref } from 'vue'
import WorkbenchRespHeader from '@renderer/templates/workbenchRespHeader.vue'
import WorkbenchRespBody from '@renderer/templates/workbenchRespBody.vue'
import WorkbenchRespError from '@renderer/templates/workbenchRespError.vue'
import { storeToRefs } from 'pinia'
// 引入 requestListStore
import { responseStore } from '@renderer/stores/responseStores'
const { apiResponse } = storeToRefs(responseStore())

// 表示选中的标签
const labelRef = ref<string>('2')
</script>
<!-- 工作台响应 -->
<template>
  <div style="width: 100%; height: 100%">
    <!-- 如果没有响应数据或响应异常，显示错误组件 -->
    <div
      style="width: 100%; height: 100%"
      v-if="
        !apiResponse ||
        !apiResponse.isResponse ||
        apiResponse.status === 0 ||
        apiResponse.status === 502
      "
    >
      <WorkbenchRespError :apiResponse="apiResponse" />
    </div>
    <!-- 有响应数据时，显示响应内容 -->
    <div class="request-label-style" v-else>
      <div class="label-test-style" @click="labelRef = '1'" :class="{ active: labelRef === '1' }">
        <span>响应头</span>
        <span v-if="apiResponse" class="text-count"
          >({{ Object.keys(apiResponse.headers).length }})</span
        >
      </div>
      <div class="label-test-style" @click="labelRef = '2'" :class="{ active: labelRef === '2' }">
        <span>响应体</span>
      </div>
      <div class="label-test-style" @click="labelRef = '3'" :class="{ active: labelRef === '3' }">
        <span>性能</span>
      </div>
      <div class="label-status-style" v-if="apiResponse && apiResponse.status">
        <div
          :style="{
            backgroundColor: apiResponse.status.toString().startsWith('2')
              ? 'var(--en-c-subject-color2)'
              : 'var(--ev-c-delete-color1)'
          }"
        >
          <p>{{ apiResponse.status }}</p>
        </div>
      </div>
    </div>

    <!-- 根据选中的标签 显示对应的组件 -->
    <WorkbenchRespHeader v-show="labelRef === '1'" :headers="apiResponse?.headers" />
    <WorkbenchRespBody
      v-show="labelRef === '2'"
      :respDate="JSON.stringify(apiResponse?.date, null, 2)"
    />
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

.label-status-style {
  height: auto;
  margin-left: auto; /* 自动左边距将其推到最右侧 */
  margin-right: 10px; /* 右边距 */
  display: flex; /* 开启 flex 布局 */
  align-items: center; /* 垂直居中 */
  justify-content: center; /* 水平居中 */
  font-size: 12px;
  color: var(--ev-c-text-color3);

  div {
    padding: 2px 6px; /* 内边距上下3px，左右8px */
    border-radius: 20px; /* 圆角 */
  }
  p {
    font-weight: bold;
  }
}
</style>
