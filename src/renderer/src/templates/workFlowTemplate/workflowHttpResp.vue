/** 参数列表模板 */
<script setup lang="ts">
import { ref } from 'vue'
import { WorkFlowHttpResp } from '@renderer/interfaces/reqRow'
import { WorkFlowHttp } from '@renderer/interfaces/workFlow'
const props = defineProps<{
  workFlowHttp?: WorkFlowHttp
  workFlowId?: string
}>()

// 请求参数
const rows = ref<WorkFlowHttpResp[]>([])

// 删除行
const removeRow = (index: number) => {
  rows.value.splice(index, 1)
  if (props.workFlowHttp) {
    props.workFlowHttp.httpResp = rows.value
  }
}

// 新增行
const addRow = () => {
  rows.value.push({ checked: false, respField: '', respValue: '', respGlobalField: '' })
  if (props.workFlowHttp) {
    props.workFlowHttp.httpResp = rows.value
  }
}
</script>

<template>
  <div id="workflow-httpResp">
    <div class="param-title">
      <span>响应列表</span>
      <div class="add-btn" @click="addRow"><p>+</p></div>
    </div>
    <div class="param-list">
      <table
        border="1"
        style="border-collapse: collapse; width: 100%; background: var(--ev-c-background-color2)"
      >
        <!-- 表头 -->
        <thead>
          <tr>
            <th>启用</th>
            <th>响应字段</th>
            <th>响应值</th>
            <th>全局字段</th>
            <th>删除</th>
          </tr>
        </thead>
        <!-- 表体 -->
        <tbody>
          <tr v-for="(row, index) in rows" :key="index">
            <!-- 复选框 -->
            <td class="checkbox-cell">
              <input class="checkbox-style" type="checkbox" v-model="row.checked" />
            </td>

            <!-- 响应字段 -->
            <td style="">
              <input
                v-model="row.respField"
                placeholder=""
                :class="['param-input', row.checked ? 'checked' : 'unchecked']"
              />
            </td>

            <!-- 响应值 -->
            <td style="">
              <input
                v-model="row.respValue"
                placeholder=""
                :class="['param-input', row.checked ? 'checked' : 'unchecked']"
              />
            </td>
            <!-- 设置全局字段 -->
            <td style="">
              <input
                v-model="row.respGlobalField"
                placeholder=""
                :class="['param-input', row.checked ? 'checked' : 'unchecked']"
              />
            </td>
            <!-- 删除按钮 -->
            <td class="delete-align" @click="removeRow(index)">⊖</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#workflow-httpResp {
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
  width: 25px;
  height: 25px;
  align-items: center;
  justify-content: center;
  font-size: 25px;
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
  height: calc(100% - 10px);
  margin-left: 10px;
  margin-top: 5px;
  overflow: auto; /* 超出部分显示滚动条 */
}

.param-list table tr {
  height: 40px; // 每行固定高度
}

.param-list table td {
  height: 40px;
}

/* 选项框 */
.checkbox-cell {
  height: 40px;
  text-align: center;
  padding-top: 8px;
}
.checkbox-style {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;

  width: 15px;
  height: 15px;
  border: 1px solid var(--ev-c-text-color1);
  border-radius: 4px;
  background-color: transparent;
  cursor: pointer;
  position: relative;
  transition: all 0.2s;
}
.checkbox-style:checked {
  border-color: var(--en-c-subject-color1);
}
.checkbox-style:checked::after {
  content: '';
  position: absolute;
  left: 4px;
  top: 1px;
  width: 5px;
  height: 8px;
  border: solid var(--en-c-subject-color1);
  border-width: 0 1px 1px 0;
  transform: rotate(45deg);
}

/* 输入框样式 */
.param-input {
  height: 100%;
  width: 100%;
  background: transparent;
  border: 1px solid transparent; /* 先留一个边框 */
  outline: none;
  font-size: 18px;
  // 正确的聚焦样式
  &:focus {
    border-color: #67c23a;
  }
}
.param-input.checked {
  color: var(--ev-c-text-color2); /* 勾选时白色 */
}
.param-input.unchecked {
  color: var(--ev-c-text-color1); /* 未勾选时红色 */
}

/* 删除按钮 */
.delete-align {
  font-size: 20px;
  text-align: center;
  height: 40px;
  cursor: pointer;
  color: var(--ev-c-text-color1);
  &:hover {
    color: var(--ev-c-delete-color1);
  }
}
</style>
