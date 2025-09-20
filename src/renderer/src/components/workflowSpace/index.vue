<script setup lang="ts">
import { storeToRefs } from 'pinia'
</script>
<!-- 工作台主空间 -->
<template>
  <div id="workflow-space"></div>
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
