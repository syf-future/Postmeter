<script setup lang="ts">
import WorkflowTabs from './workflowTabs.vue'
import Workflow from './workflow.vue'
import WorkflowHttp from './workflowHttp.vue'
import WorkflowSql from './workflowSql.vue'
import WorkflowSleep from './workflowSleep.vue'
import { WorkFlow } from '@renderer/interfaces/workFlow'
import { EnumWorkFlowCode } from '@renderer/enums/enumWorkCode'
import { workSpaceStore } from '@renderer/stores/workSpaceStores'
import { workFlowStore } from '@renderer/stores/workFlowStores'
import { storeToRefs } from 'pinia'
const { workFlowName } = storeToRefs(workSpaceStore())
const { workFlow } = storeToRefs(workFlowStore())
</script>

<!-- 工作台主空间 -->
<template>
  <div id="workflow-space">
    <div class="tabs-style">
      <WorkflowTabs />
    </div>
    <div class="content-style">
      <Workflow v-show="workFlowName === EnumWorkFlowCode.WORK_FLOW" />
      <WorkflowHttp v-show="workFlowName === EnumWorkFlowCode.WORK_FLOW_HTTP" />
      <WorkflowSql v-show="workFlowName === EnumWorkFlowCode.WORK_FLOW_SQL" />
      <WorkflowSleep v-show="workFlowName === EnumWorkFlowCode.WORK_FLOW_SLEEP" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
#workflow-space {
  width: 100%;
  height: 100%;
}

.tabs-style {
  width: 100%;
  height: 40px;
}

.content-style {
  width: 100%;
  height: calc(100% - 120px);
}
</style>
