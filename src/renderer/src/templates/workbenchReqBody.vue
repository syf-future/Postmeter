<script setup lang="ts">
import { ref } from 'vue'
import Dropdown from '@renderer/templates/dropdown.vue'
import { Option } from '@renderer/interfaces/option'

const apiType = ref('JSON')
const onSelect = (item: Option) => {
  apiType.value = item.value
}
const options = [
  {
    label: 'JSON',
    value: 'JSON'
  },
  {
    label: 'TEXT',
    value: 'TEXT'
  },
  {
    label: 'XML',
    value: 'XML'
  }
]
</script>

<template>
  <div id="workbench-body">
    <div class="param-title">
      <div class="param-type">
        <span>数据类型</span>
        <div class="title-type">
          <Dropdown :label="apiType" :options="options" @select="onSelect" />
        </div>
      </div>

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
  margin-left: 10px;
  margin-right: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(--ev-c-text-color1);
  font-size: 14px;

  .param-type {
    display: flex;

    .title-type {
      margin-left: 5px;
      font-size: 15px;
      color: var(--ev-c-text-color2);
    }
  }
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
