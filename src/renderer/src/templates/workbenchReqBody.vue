<script setup lang="ts"></script>

<template>
  <div id="workbench-body">
    <div class="param-title">
      <div><span>数据类型</span> <span>JSON</span></div>

      <div class="add-btn" @click=""><p>+</p></div>
    </div>
    <div class="param-list"></div>
  </div>
</template>

<style lang="scss" scoped>
#workbench-body {
  width: 100%;
  height: 100%;
}
.param-title {
  margin-top: 5px;
  margin-left: 10px;
  margin-right: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(--ev-c-text-color1);
  font-size: 14px;
}

.add-btn {
  display: flex;
  width: 30px;
  height: 30px;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  border-radius: 50px;
  color: var(--ev-c-text-color1);
  cursor: pointer;
  &:hover {
    color: var(--ev-c-text-color2);
    background: var(--ev-c-background-color1);
  }
  P {
    margin-bottom: 4px;
    margin-left: 2px;
  }
}

.param-list {
  width: calc(100% - 20px);
  height: calc(100% - 100px);
  margin-left: 10px;
  margin-top: 5px;
  border: 1px solid var(--ev-c-border-color2);
}
</style>
