<script setup lang="ts">
import WorkbenchSpace from "@renderer/components/workbenchSpace/index.vue";
</script>

<template>
  <!-- <div id="right-view">欢迎使用Postmeter</div> -->
  <div id="right-view">
    <WorkbenchSpace />
  </div>
</template>
<style lang="scss" scoped>
#right-view {
  flex-grow: 1;
  background-color: var(--ev-c-background-color2);
  letter-spacing: 1px;
}
</style>
