/** 请求头列表模板 */
<script setup lang="ts">
import { ref } from 'vue'
interface Row {
  checked: boolean
  key: string
  value: string
}

const rows = ref<Row[]>([
  { checked: true, key: 'foo', value: 'bar' },
  { checked: false, key: 'hello', value: 'reqable' }
])
</script>

<template>
  <div id="workbench-header">
    <div class="param-title">
      <span>响应头列表</span>
    </div>
    <div class="param-list">
      <table
        border="1"
        style="border-collapse: collapse; width: 100%; background: var(--ev-c-background-color2)"
      >
        <tr v-for="(row, index) in rows" :key="index">
          <!-- 可输入的 key -->
          <td>
            <p class="table-title">{{ row.key }}</p>
          </td>

          <!-- 可输入的 value -->
          <td>
            <p class="table-title">{{ row.value }}</p>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#workbench-header {
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

.param-list {
  width: calc(100% - 20px);
  height: calc(100% - 100px);
  margin-left: 10px;
  margin-top: 6px;
  overflow: auto; /* 超出部分显示滚动条 */
}

/* 输入框样式 */
.table-title {
  width: 50%;
  height: 39px;
  background: transparent;
  display: flex;
  align-items: center;
  border: 1px solid transparent; /* 先留一个边框 */
  outline: none;
  font-size: 18px;
  margin-left: 10px;
}
</style>
