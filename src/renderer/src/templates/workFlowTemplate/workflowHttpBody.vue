/** 请求体模板 */
<script setup lang="ts">
import { ref, watch } from 'vue'
import Dropdown from '@renderer/templates/dropdown.vue'
import JsonEditorTemplate from '../jsonEditorTemplate.vue'
import { WorkFlowHttp } from '@renderer/interfaces/workFlow'
const props = defineProps<{
  workFlowHttp?: WorkFlowHttp
  workFlowId?: string
}>()

const types = ['无', 'TEXT', 'JSON', 'XML']
// 下拉选择数据类型
const apiType = ref<string>('JSON')

const onSelect = (item: string) => {
  console.log('点击下拉框类型：', item)
}
// 是否格式化
const isFormat = ref<'off' | 'on'>('off')
// 是否自动换行
const isLine = ref<'off' | 'on'>('off')
// 输入的数据
const sendDate = ref<string>(props.workFlowHttp ? props.workFlowHttp.httpBody : '')
watch(sendDate, (newDate) => {
  if (props.workFlowHttp && props.workFlowHttp.httpBody !== newDate) {
    props.workFlowHttp.httpBody = newDate
  }
})
// 点击格式化
function onIsFormat(): void {
  if (isFormat.value === 'off') {
    isFormat.value = 'on'
  } else {
    isFormat.value = 'off'
  }
}
// 点击自动换行
function onIsLine(): void {
  if (isLine.value === 'off') {
    isLine.value = 'on'
  } else {
    isLine.value = 'off'
  }
}
</script>

<template>
  <div id="workbench-body">
    <div class="param-title">
      <div class="param-type">
        <span>数据类型</span>
        <div class="title-type">
          <Dropdown :label="apiType" :types="types" @select="onSelect" />
        </div>
      </div>
      <div style="display: flex">
        <div class="param-tab" @click="onIsLine">
          <el-tooltip
            effect="light"
            content="自动换行"
            placement="bottom"
            popper-class="is-customized"
          >
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-zidonghuanhang"></use>
            </svg>
          </el-tooltip>
        </div>
        <div class="param-tab" @click="onIsFormat">
          <el-tooltip
            effect="light"
            content="格式化"
            placement="bottom"
            popper-class="is-customized"
          >
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-geshihua"></use>
            </svg>
          </el-tooltip>
        </div>
      </div>
    </div>

    <!-- JSON 编辑器区域 -->
    <div class="param-json" v-if="apiType !== '无'">
      <JsonEditorTemplate
        v-model="sendDate"
        :language="apiType.toLowerCase()"
        :isFormat="isFormat"
        :isLine="isLine"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
#workbench-body {
  width: 100%;
  height: 100%;
}

.param-title {
  margin: 5px 10px;
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

.param-tab {
  margin-left: 5px;
  border-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 25px;
  height: 25px;

  &:hover {
    cursor: pointer;
    background-color: var(--ev-c-background-color3);
  }
  &:active {
    background-color: var(--ev-c-background-color2);
  }
  .icon {
    margin-top: 4px;
    width: 15px;
    height: 15px;
  }
}

.param-json {
  width: calc(100% - 25px);
  height: calc(100% - 10px);
  margin: 5px 10px;
  border: 1px solid var(--ev-c-border-color1);
  overflow: auto;
  font-size: 18px;
}
</style>
