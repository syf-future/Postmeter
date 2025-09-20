/** 工作流文件夹模板 */
<script setup lang="ts">
import { ref } from 'vue'
import { WorkFlow } from '@renderer/interfaces/workFlow'
import { EnumWorkSpaceCode } from '@renderer/enums/enumWorkCode'
import { workSpaceStore } from '@renderer/stores/workSpaceStores'
const { setWorkSpace } = workSpaceStore()
import { workFlowStore } from '@renderer/stores/workFlowStores'
const { setNowWorkFlow } = workFlowStore()
// 每个组件实例都会有自己的 isFolderOpen 状态
const isFolderOpen = ref(false)

// 通过defineProps 宏函数来接收父组件传的数据
const props = defineProps<{
  workFlow: WorkFlow
}>()

function clickFlowFolder(): void {
  isFolderOpen.value = !isFolderOpen.value
  setNowWorkFlow(props.workFlow.workFlowId)
  setWorkSpace(EnumWorkSpaceCode.WORK_SPACE_WORKFLOW)
}
</script>

<!-- 文件夹模板 -->
<template>
  <div id="folder-template" @click="clickFlowFolder">
    <svg class="icon" aria-hidden="true">
      <use v-if="!isFolderOpen" xlink:href="#icon-wenjianjiaguan1"></use>
      <use v-else xlink:href="#icon-wenjianjiakai"></use>
    </svg>
    <span class="name">{{ props.workFlow.workFlowName }}</span>
  </div>
  <!-- 工作流 子任务 -->
  <!-- <div v-if="isFolderOpen" v-for="(api, index) in props.requestFolder.apiItems" :key="index">
    <ApiTemplate :requestFolder="props.requestFolder" :apiRequest="api" />
  </div> -->
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
    cursor: pointer;
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
</style>
