<script setup lang="ts">
import { ref } from 'vue'
import Dropdown from '@renderer/templates/dropdown.vue'
import { Option } from '@renderer/interfaces/option'

const apiType = ref('GET')
const apiInput = ref('')
const onSelect = (item: Option) => {
  apiType.value = item.value
}
const options = [
  {
    label: 'GET',
    value: 'GET'
  },
  {
    label: 'POST',
    value: 'POST'
  },
  {
    label: 'PUT',
    value: 'PUT'
  },
  {
    label: 'DELETE',
    value: 'DELETE'
  }
]
</script>

<template>
  <div id="workbench-send-api">
    <div class="api-input">
      <div class="api-dropdow">
        <Dropdown :label="apiType" :options="options" @select="onSelect" />
      </div>
      <input v-model="apiInput" class="custom-input" />
    </div>
    <div class="api-send">
      <span @click="" style="margin-left: 10px">发送</span>
    </div>
  </div>
</template>

<style lang="scss">
#workbench-send-api {
  width: 100%;
  height: 80px;
  border: none;
  border-bottom: 1px solid var(--ev-c-border-color1);
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.api-input {
  display: flex;
  height: 50px;
  width: 85%;
  margin-left: 10px;
  .api-dropdow {
    height: 100%;
    width: 140px;
    border: 2px solid var(--ev-c-border-color1);
    border-right: none;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    background-color: var(--ev-c-background-color1);
    color: var(--ev-c-text-color2);
    font-size: 20px;
 
  }

  .custom-input {
    height: 100%;
    width: 80%;
    border: 2px solid var(--ev-c-border-color1);
    font-size: 20px;
    background-color: var(--ev-c-background-color1);
    /* 设置右上角圆角 */
    border-top-right-radius: 5px;
    /* 设置右下角圆角 */
    border-bottom-right-radius: 5px;
    color: var(--ev-c-text-color2);
    padding: 0 5px;
    box-sizing: border-box;

    // 正确的聚焦样式
    &:focus {
      outline: none; // 移除浏览器默认的焦点轮廓
      border-color: #67c23a;
    }
  }
}

.api-send {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  width: 80px;
  color: var(--ev-c-text-color1);
  font-size: 20px;
  border-radius: 5px;
  border: 2px solid var(--ev-c-border-color1);
  cursor: pointer;
  background-color: var(--ev-c-background-color1);


  &:hover {
    background-color: var(--ev-c-background-color3);
    color: var(--ev-c-text-color2);
  }
}
</style>
