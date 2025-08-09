<script setup lang="ts">
// 向主进程发送IPC消息“hello”
// const ipcHandle = (): void => window.electron.ipcRenderer.send('hello')
</script>

<template>
  <RouterView />
  <!-- <a target="_blank" rel="noreferrer" @click="ipcHandle">Send IPC</a> -->
</template>
