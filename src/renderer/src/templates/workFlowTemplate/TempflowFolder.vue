/** 工作流文件夹模板 */
<script setup lang="ts">
import { ref } from 'vue'
import { WorkFlow } from '@renderer/interfaces/workFlow'
import { EnumWorkSpaceCode } from '@renderer/enums/enumWorkCode'
import { EnumWorkFlowCode } from '@renderer/enums/enumWorkCode'
import { workSpaceStore } from '@renderer/stores/workSpaceStores'
const { setWorkSpace } = workSpaceStore()
import { workFlowStore } from '@renderer/stores/workFlowStores'
const { setNowWorkFlow, setWorkFlowType } = workFlowStore()
// 每个组件实例都会有自己的 isFolderOpen 状态
const isFolderOpen = ref(false)

// 通过defineProps 宏函数来接收父组件传的数据
const props = defineProps<{
  workFlow: WorkFlow
}>()

function clickFlowFolder(): void {
  setNowWorkFlow(props.workFlow.workFlowId)
  setWorkSpace(EnumWorkSpaceCode.WORK_SPACE_WORKFLOW)
  setWorkFlowType(EnumWorkFlowCode.WORK_FLOW)
}
</script>

<!-- 文件夹模板 -->
<template>
  <div id="folder-template" @click="clickFlowFolder">
    <div style="width: 100px; height: 100%; display: flex; align-items: center">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-gongzuoliu"></use>
      </svg>
      <span class="name">{{ props.workFlow.workFlowName }}</span>
    </div>
    <div style="margin-right: 10px; height: 100%; display: flex; align-items: center">
      <div class="zhaunkaiStyle" @click="isFolderOpen = !isFolderOpen">
        <svg class="icon2" aria-hidden="true">
          <use v-if="!isFolderOpen" xlink:href="#icon-suohui"></use>
          <use v-else xlink:href="#icon-zhankai"></use>
        </svg>
      </div>
    </div>
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
  justify-content: space-between;
  white-space: nowrap;
  /* 核心属性：如果内容溢出，就将其隐藏 */
  overflow: hidden;

  &:hover {
    background-color: var(--ev-c-background-color1);
    cursor: pointer;
  }
}

.icon {
  width: 25px;
  height: 25px;
  margin-left: 10px;
  /* 关键：防止 Flexbox 压缩图标 */
  flex-shrink: 0;
}
.zhaunkaiStyle {
  width: 25px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20%;
  &:hover {
    background-color: var(--ev-c-background-color3);
    cursor: pointer;
  }
}
.icon2 {
  width: 12px;
  height: 12px;
  /* 关键：防止 Flexbox 压缩图标 */
  flex-shrink: 0;
}

.name {
  margin-left: 10px;
  font-size: 14px;
  color: var(--ev-c-text-color2);
}
</style>
