<script setup lang="ts">
import WorkbenchSpace from '@renderer/components/workbenchSpace/index.vue'
import WorkflowSpace from '@renderer/components/workflowSpace/index.vue'
import { EnumWorkSpaceCode } from '@renderer/enums/enumWorkCode'
import { storeToRefs } from 'pinia'
import { workSpaceStore } from '@renderer/stores/workSpaceStores'
const { workSpace } = storeToRefs(workSpaceStore())
</script>

<template>
  <!-- <div id="right-view">欢迎使用Postmeter</div> -->
  <div id="right-view">
    <WorkbenchSpace v-if="workSpace === EnumWorkSpaceCode.WORK_SPACE_API" />
    <WorkflowSpace v-else-if="workSpace === EnumWorkSpaceCode.WORK_SPACE_WORKFLOW" />
    <div v-else class="workbench-space-default"><p>欢迎使用POSTMETER</p></div>
  </div>
</template>
<style lang="scss" scoped>
#right-view {
  flex-grow: 1;
  background-color: var(--ev-c-background-color2);
  letter-spacing: 1px;
}
.workbench-space-default {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  color: var(--ev-c-text-color3);
  p {
    font-weight: bold;
  }
}
</style>
