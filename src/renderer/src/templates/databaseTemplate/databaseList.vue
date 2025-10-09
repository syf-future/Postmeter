<script setup lang="ts">
import { databaseStore } from '@renderer/stores/databaseStore'
import { storeToRefs } from 'pinia'
// 获取点击的工作流名称
const { databaseList } = storeToRefs(databaseStore())
</script>

<template>
  <div id="databaseListStyle">
    <div class="listStyle" v-for="db in databaseList">
      <div>
        {{ db.databaseName }}
      </div>
      <div>操作</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#databaseListStyle {
  width: 100%;
  height: 100%;
  overflow: auto;

  .listStyle {
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 20px;

    &:hover {
      background-color: var(--ev-c-background-color2);
      cursor: pointer;
    }
    &:active {
      background-color: var(--ev-c-background-color3);
    }
  }
}
</style>
