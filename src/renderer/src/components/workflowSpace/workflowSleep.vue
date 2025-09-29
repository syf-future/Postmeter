<script setup lang="ts">
import { WorkFlowSleep } from '@renderer/interfaces/workFlow'
import { ref } from 'vue'
import { EnumWorkFlowCode } from '@renderer/enums/enumWorkCode'
import { workFlowStore } from '@renderer/stores/workFlowStores'

// 通过defineProps 宏函数来接收父组件传的数据
const props = defineProps<{
  workFlowSleep?: WorkFlowSleep
  workFlowId?: string
}>()
// 定义工作流名称、循环次数、线程数的响应式变量
const workflowName = ref<string>(props.workFlowSleep?.name || '')
const wordFlowCycleNum = ref<number>(0)
const wordFlowThreadNum = ref<number>(0)
const wordFlowIntervalTime = ref<number>(0)
</script>

<template>
  <div id="workflowStyle">
    <div class="workflowInfoStyle">
      <p class="title">工作流组件-SLEEP</p>

      <!-- 名称 + 是否启用 -->
      <div class="row">
        <div class="item">
          <label class="field-label" for="workflowName">名称</label>
          <div class="control">
            <input id="workflowName" type="text" placeholder="请输入名称" v-model="workflowName" />
          </div>
        </div>

        <div class="item">
          <span class="field-label">是否启用</span>
          <div class="control radios">
            <label><input type="radio" name="enabled" value="yes" checked /> 是</label>
            <label><input type="radio" name="enabled" value="no" /> 否</label>
          </div>
        </div>
      </div>

      <!-- 线程数 + 循环次数 -->
      <div class="row">
        <div class="item">
          <label class="field-label">等待时间</label>
          <div class="control">
            <input type="text" placeholder="ms" v-model="wordFlowThreadNum" />
          </div>
        </div>

        <div class="item"></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#workflowStyle {
  height: 100%;
  width: 100%;
}

/* 可通过修改这个变量来控制 label 宽度 */
.workflowInfoStyle {
  --label-width: 90px; /* 改成你需要的宽度，比如 80px / 100px */
  width: 100%;
  height: 35%;
  border-bottom: 1px solid var(--ev-c-border-color1);
  padding: 10px 20px;
  overflow: auto;

  .title {
    font-size: 24px;
    font-weight: 800;
    margin-bottom: 15px;
  }

  .row {
    display: flex;
    gap: 20px; /* 两列间距 */
    margin-bottom: 12px;
  }

  .item {
    flex: 1; /* 平分两列宽度 */
    display: flex;
    align-items: center;
  }

  /* label 固定宽度（保证每列内部左对齐） */
  .field-label {
    width: var(--label-width);
    min-width: var(--label-width);
    margin-right: 8px;
    display: inline-block;
    text-align: left;
  }

  .control {
    flex: 1; /* 控件占剩余空间 */
    display: flex;
    align-items: center;
  }

  /* 输入框样式 */
  .control input[type='text'],
  .control input[type='number'],
  .control input[type='password'],
  .control input:not([type]) {
    width: 100%;
    padding: 6px 8px;
    font-size: 16px;
    background-color: var(--ev-c-background-color1);
    border: 1px solid var(--ev-c-border-color1);
    border-radius: 4px;
    color: var(--en-c-text-color2);
  }

  /* 单选按钮的 label 调整 */
  .radios label {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    margin-right: 12px;
    cursor: pointer;
    user-select: none;
  }

  /* 焦点样式（可选） */
  .control input:focus {
    outline: 1px solid var(--en-c-subject-color2);
    border-color: var(--en-c-subject-color2);
  }
}
</style>
