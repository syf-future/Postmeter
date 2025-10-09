<script setup lang="ts">
import WorkflowTabs from './workflowTabs.vue'
import Workflow from './workflow.vue'
import WorkflowHttp from './workflowHttp.vue'
import WorkflowSql from './workflowSql.vue'
import WorkflowSleep from './workflowSleep.vue'
import { EnumWorkFlowCode } from '@renderer/enums/enumWorkCode'
import { workFlowStore } from '@renderer/stores/workFlowStores'
import { storeToRefs } from 'pinia'
import { WorkFlowHttp, WorkFlowSleep, WorkFlowSql } from '@renderer/interfaces/workFlow'
import WorkflowConnectSql from './workflowConnectSql.vue'
// 获取点击的工作流名称
const { workFlow, workFlowType, workFlowSub } = storeToRefs(workFlowStore())

function getWorkFlowHttp(): WorkFlowHttp | undefined {
  console.log('获取``,``', workFlowType?.value, workFlowSub?.value)
  if (workFlowType?.value === EnumWorkFlowCode.WORK_FLOW_HTTP) {
    return workFlowSub.value as WorkFlowHttp
  }
  return undefined
}
function getWorkFlowSql(): WorkFlowSql | undefined {
  console.log('获取``,``', workFlowType?.value, workFlowSub?.value)
  if (workFlowType?.value === EnumWorkFlowCode.WORK_FLOW_SQL) {
    return workFlowSub.value as WorkFlowSql
  }
  return undefined
}
function getWorkFlowSleep(): WorkFlowSleep | undefined {
  console.log('获取``,``', workFlowType?.value, workFlowSub?.value)
  if (workFlowType?.value === EnumWorkFlowCode.WORK_FLOW_SLEEP) {
    return workFlowSub.value as WorkFlowSleep
  }
  return undefined
}
</script>

<!-- 工作台主空间 -->
<template>
  <div id="workflow-space">
    <div class="tabs-style">
      <WorkflowTabs />
    </div>
    <div class="content-style">
      <Workflow v-if="workFlowType === EnumWorkFlowCode.WORK_FLOW" :workFlow="workFlow" />
      <WorkflowHttp
        v-if="workFlowType === EnumWorkFlowCode.WORK_FLOW_HTTP"
        :workFlowId="workFlow?.workFlowId"
        :workFlowHttp="getWorkFlowHttp()"
      />
      <WorkflowSql
        v-if="workFlowType === EnumWorkFlowCode.WORK_FLOW_SQL"
        :workFlowId="workFlow?.workFlowId"
        :workFlowSql="getWorkFlowSql()"
      />
      <WorkflowSleep
        v-if="workFlowType === EnumWorkFlowCode.WORK_FLOW_SLEEP"
        :workFlowId="workFlow?.workFlowId"
        :workFlowSleep="getWorkFlowSleep()"
      />
      <WorkflowConnectSql v-if="workFlowType === EnumWorkFlowCode.WORK_FLOW_CONNECT_SQL" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
#workflow-space {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column; /* 垂直排列 */
}

.tabs-style {
  width: 100%;
  min-height: 40px;
}

.content-style {
  flex: 1;
}
</style>
