<script setup lang="ts">
import { ref } from 'vue'
import { WorkFlowHttp, WorkFlowSleep, WorkFlowSql } from '@renderer/interfaces/workFlow'
import { EnumWorkSpaceCode } from '@renderer/enums/enumWorkCode'
import { EnumWorkFlowCode } from '@renderer/enums/enumWorkCode'
import { workSpaceStore } from '@renderer/stores/workSpaceStores'
const { setWorkSpace } = workSpaceStore()
import { workFlowStore } from '@renderer/stores/workFlowStores'
const { setNowWorkFlow, setWorkFlowType, setWorkFLowSub } = workFlowStore()

// 通过defineProps 宏函数来接收父组件传的数据
const props = defineProps<{
  workflowSub: WorkFlowHttp | WorkFlowSql | WorkFlowSleep
  workflowId: string
}>()

function clickFlowSubFolder(): void {
  setNowWorkFlow(props.workflowId)
  setWorkSpace(EnumWorkSpaceCode.WORK_SPACE_WORKFLOW)
  setWorkFlowType(props.workflowSub.type)
  setWorkFLowSub(props.workflowSub)
}
const flowIcons = ref<Map<string, string>>(
  new Map<string, string>()
    .set(EnumWorkFlowCode.WORK_FLOW_HTTP, '#icon-HTTP')
    .set(EnumWorkFlowCode.WORK_FLOW_SQL, '#icon-icon_SQL')
    .set(EnumWorkFlowCode.WORK_FLOW_SLEEP, '#icon-loading-v')
)

const getFlowIcons = (workflowType: string) => {
  return flowIcons.value.get(workflowType)
}
</script>

<!-- 文件夹模板 -->
<template>
  <div id="flowSub-template" @click="clickFlowSubFolder">
    <div style="width: 1px; height: 100%; background-color: var(--ev-c-border-color1); margin-left: 17px;"></div>
    <div style="width: 100px; height: 100%; display: flex; align-items: center">
      <svg class="icon" aria-hidden="true">
        <use :xlink:href="getFlowIcons(props.workflowSub.type)"></use>
      </svg>
      <span class="name">{{ props.workflowSub.name }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#flowSub-template {
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
  width: 15px;
  height: 15px;
  margin-left: 20px;
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
