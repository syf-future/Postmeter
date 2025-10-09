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
  <div style="width: 100vw; height: 100vh">
    <RouterView />
  </div>
</template>
