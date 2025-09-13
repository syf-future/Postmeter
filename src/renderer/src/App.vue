<script setup lang="ts">
// 向主进程发送IPC消息“hello”
// const ipcHandle = (): void => window.electron.ipcRenderer.send('hello')
import { onMounted } from 'vue'

import { requestListStore } from '@renderer/stores/requestList'
const { loadRequestList } = requestListStore()
onMounted(() => {
  // 初始化加载配置文件
  loadRequestList()
})
</script>

<template>
  <RouterView />
  <!-- <a target="_blank" rel="noreferrer" @click="ipcHandle">Send IPC</a> -->
</template>
