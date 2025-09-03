<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import Dropdown from '@renderer/templates/dropdown.vue'
import { storeToRefs } from 'pinia'
import { apiTablesStore } from '@renderer/stores/apiTablesStores'
const { nowApiTable } = storeToRefs(apiTablesStore())
const { setUpdateApiTable, getUpdateApiTable } = apiTablesStore()

// 请求的类型
const apiType = ref<string>('GET')
// 请求的url
const apiInput = ref<string>('')
const onSelect = (item: string) => {
  apiType.value = item
}
const types = ['GET', 'POST', 'PUT', 'DELETE']

onMounted(() => {
  if (nowApiTable.value) {
    apiType.value = nowApiTable.value.method
    apiInput.value = nowApiTable.value.url
  }
})
// 监听当前选中的apiTable变化，更新请求类型和url
watch(nowApiTable, (newVal) => {
  if (newVal) {
    apiType.value = newVal.method
    apiInput.value = newVal.url
  }
})

// 监听请求类型的变化。
watch(apiType, (newType) => {
  if (nowApiTable.value && nowApiTable.value.method !== newType) {
    nowApiTable.value.method = newType
    setUpdateApiTable(nowApiTable.value)
  }
})
// 监听请求url的变化
watch(apiInput, (newUrl) => {
  if (nowApiTable.value && nowApiTable.value.url !== newUrl) {
    nowApiTable.value.url = newUrl
    setUpdateApiTable(nowApiTable.value)
  }
})

/* 发送api请求 */
import { sendApiRequest } from '@renderer/utils/ApiUtil'
function sendApi() {
  console.log('发送API请求')
  if (nowApiTable.value) {
    const updatedRequest = getUpdateApiTable(nowApiTable.value)
    sendApiRequest(updatedRequest)
      .then((response) => {
        console.log('API请求成功,响应数据:', response)
        // 这里可以处理响应数据，比如更新UI等
      })
      .catch((error) => {
        console.error('API请求失败,错误信息:', error)
        // 这里可以处理错误信息，比如显示错误提示等
      })
  }
}
</script>

<template>
  <div id="workbench-send-api">
    <div class="api-input">
      <div class="api-dropdow">
        <Dropdown :label="apiType" :types="types" @select="onSelect" />
      </div>
      <el-input v-model="apiInput" class="custom-input" />
    </div>
    <div class="api-send" @click="sendApi">
      <p>发送</p>
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
  justify-content: space-between;
}

.api-input {
  display: flex;
  height: 50px;
  width: 85%;
  margin-left: 15px;
  .api-dropdow {
    height: 100%;
    width: 140px;
    border: 1px solid var(--ev-c-border-color1);
    border-right: none;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    background-color: var(--ev-c-background-color1);
    color: var(--ev-c-text-color2);
    font-size: 20px;
  }

  .custom-input {
    height: 100%;
    width: 100%;

    .el-input__wrapper {
      background-color: var(--ev-c-background-color1);
      border: 1px solid var(--ev-c-border-color1);
      box-shadow: none;
      font-size: 16px;
      border-top-left-radius: 0px;
      border-bottom-left-radius: 0px;
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
      // 输入框聚焦
      &.is-focus {
        box-shadow: 0 0 0 1px #67c23a;
        border-color: #67c23a;
      }

      // 输入框内容颜色
      .el-input__inner {
        color: #fff;
      }
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
  border: 1px solid var(--ev-c-border-color1);
  cursor: pointer;
  background-color: var(--ev-c-background-color1);
  margin-right: 15px;
  &:hover {
    background-color: var(--ev-c-background-color3);
    color: var(--ev-c-text-color2);
  }
}
</style>
