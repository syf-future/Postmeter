<script setup lang="ts"></script>

<template>
  <div id="workflowTabs">
    <div class="flowTabStyle">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-HTTP">˝</use>
      </svg>
    </div>
    <div class="flowTabStyle">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-icon_SQL">˝</use>
      </svg>
    </div>
    <div class="flowTabStyle">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-loading-v">˝</use>
      </svg>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#workflowTabs {
  width: 100%;
  height: 100%;
  border-bottom: 1px solid var(--ev-c-border-color1);
  display: flex;
  align-items: center;

  .flowTabStyle {
    width: 30px;
    height: 30px;
    border-radius: 20%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 10px;
    &:hover {
      background-color: var(--ev-c-background-color3);
      cursor: pointer;
    }
    &:active {
      background-color: var(--ev-c-background-color1);
    }
    .icon {
      width: 20px;
      height: 20px;
    }
  }
}
</style>
