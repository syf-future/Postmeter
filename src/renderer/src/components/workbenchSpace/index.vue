<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { apiTablesStore } from '@renderer/stores/apiTablesStores'
const { apiTables } = storeToRefs(apiTablesStore())
import WorkbenchTabs from './workbenchTabs.vue'
import WorkbenchContent from './workbenchContent.vue'
import WorkbenchSendApi from './workbenchSendApi.vue'
</script>
<!-- 工作台主空间 -->
<template>
  <div v-if="apiTables.length === 0" id="workbench-space-default"><p>POSTMETER</p></div>
  <div id="workbench-space" v-else>
    <div class="tabs-style">
      <WorkbenchTabs />
    </div>
    <div class="content-style">
      <WorkbenchSendApi />
      <WorkbenchContent />
    </div>
  </div>
</template>

<style lang="scss" scoped>
#workbench-space-default {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  color: var(--ev-c-text-color3);
  font-weight: bold;
}
#workbench-space {
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
