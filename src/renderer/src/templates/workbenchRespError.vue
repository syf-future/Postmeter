<script setup lang="ts">
import { ApiResponse } from '@renderer/interfaces/response'

const props = defineProps<{
  apiResponse?: ApiResponse
}>()
</script>

<template>
  <div id="respError">
    <div v-if="!props.apiResponse || props.apiResponse.status === 0">
      <span>请求尚未开始</span>
    </div>
    <div v-else-if="props.apiResponse && props.apiResponse.status === 1">
      <span>请求中...</span>
    </div>
    <div v-else-if="props.apiResponse && props.apiResponse.status === 502">
      <span>{{ props.apiResponse.status }} {{ props.apiResponse.date }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#respError {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--ev-c-text-color1);
  font-size: 14px;
  span {
    font-size: 24px;
    font-weight: bold;
  }
}
</style>
