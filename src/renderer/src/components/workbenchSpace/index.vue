<script setup lang="ts">
import WorkbenchTabs from './workbenchTabs.vue'
import WorkbenchContent from './workbenchContent.vue'
import WorkbenchSendApi from './workbenchSendApi.vue'
</script>
<!-- 工作台主空间 -->
<template>
  <div id="workbench-space">
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
