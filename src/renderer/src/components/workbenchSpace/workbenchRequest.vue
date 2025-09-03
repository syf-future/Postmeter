<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import WorkbenchParam from '@renderer/templates/workbenchReqParam.vue'
import WorkbenchReqHeader from '@renderer/templates/workbenchReqHeader.vue'
import WorkbenchReqBody from '@renderer/templates/workbenchReqBody.vue'
import { storeToRefs } from 'pinia'
import { apiTablesStore } from '@renderer/stores/apiTablesStores'
import { ApiRequest } from '@renderer/interfaces/request'
const { nowApiTable } = storeToRefs(apiTablesStore())
const { getUpdateApiTable } = apiTablesStore()
// 表示选中的标签
const labelRef = ref<string>('1')
const apiRequest = ref<ApiRequest>()
onMounted(() => {
  if (nowApiTable.value) {
    apiRequest.value = getUpdateApiTable(nowApiTable.value)
  }
})
watch(nowApiTable, (newVal) => {
  if (newVal) {
    apiRequest.value = getUpdateApiTable(newVal)
    labelRef.value = '1'
  }
})

function onClickReq(num: string): void {
  console.log('点击请求：', num)

  labelRef.value = num
}
</script>
<!-- 工作台请求 -->
<template>
  <div style="width: 100%; height: 100%">
    <div class="request-label-style">
      <div class="label-test-style" @click="onClickReq('1')" :class="{ active: labelRef === '1' }">
        <span>参数</span>
        <span class="text-count">({{ apiRequest ? apiRequest.param.length : 0 }})</span>
      </div>
      <div class="label-test-style" @click="onClickReq('2')" :class="{ active: labelRef === '2' }">
        <span>请求头</span>
        <span class="text-count">({{ apiRequest ? apiRequest.headers.length : 0 }})</span>
      </div>
      <div class="label-test-style" @click="onClickReq('3')" :class="{ active: labelRef === '3' }">
        <span>请求体</span>
      </div>
    </div>

    <!-- 根据选中的标签 显示对应的组件 -->
    <WorkbenchParam v-show="labelRef === '1'" :apiRequest="apiRequest" />
    <WorkbenchReqHeader v-show="labelRef === '2'" :apiRequest="apiRequest" />
    <WorkbenchReqBody v-show="labelRef === '3'" :apiRequest="apiRequest" />
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
