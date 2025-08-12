<script setup lang="ts">
</script>

<template>
  <div id="middle-view" ref="middleViewRef">
    <RouterView />
  </div>
</template>

<style lang="scss" scoped>
#middle-view {
  display: flex;
  height: 100%;
  background-color: var(--ev-c-background-color2);
  width: 20%;
  min-width: 2px;
  max-width: 70%;
  flex-shrink: 0;
}
</style>