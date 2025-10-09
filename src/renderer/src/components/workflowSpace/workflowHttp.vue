<script setup lang="ts">
import { WorkFlowHttp } from '@renderer/interfaces/workFlow'
import { ref } from 'vue'
import WorkflowHttpBody from '@renderer/templates/workFlowTemplate/workflowHttpBody.vue'
import WorkflowHttpHeader from '@renderer/templates/workFlowTemplate/workflowHttpHeader.vue'
import WorkflowHttpParam from '@renderer/templates/workFlowTemplate/workflowHttpParam.vue'
import WorkflowHttpResp from '@renderer/templates/workFlowTemplate/workflowHttpResp.vue'
// 通过defineProps 宏函数来接收父组件传的数据
const props = defineProps<{
  workFlowHttp?: WorkFlowHttp
  workFlowId?: string
}>()
// 定义工作流名称、循环次数、线程数的响应式变量
const httpName = ref<string>(props.workFlowHttp?.name || '')
const hettpIsUse = ref<boolean>(props.workFlowHttp?.isUse || false)
const httpMettod = ref<string>(props.workFlowHttp?.httpMethod || 'GET')
const httpUrl = ref<string>(props.workFlowHttp?.httpUrl || '')
const httpCount = ref<number>(props.workFlowHttp?.httpRespNum || 1)
const hettpSleep = ref<number>(props.workFlowHttp?.httpRespSleep || 0)

const labelRef = ref<string>('1')
</script>

<template>
  <div id="workflowHttpStyle">
    <div class="workflowInfoStyle">
      <p class="title">工作流组件-HTTP</p>

      <!-- 名称 + 是否启用 -->
      <div class="row">
        <div class="item">
          <label class="field-label" for="workflowName">名称</label>
          <div class="control">
            <input id="workflowName" type="text" placeholder="请输入名称" v-model="httpName" />
          </div>
        </div>

        <div class="item">
          <span class="field-label">是否启用</span>
          <div class="control radios">
            <label
              ><input type="radio" name="enabled" value="yes" checked v-model="hettpIsUse" />
              是</label
            >
            <label><input type="radio" name="enabled" value="no" v-model="hettpIsUse" /> 否</label>
          </div>
        </div>
      </div>

      <!-- 请求类型 -->
      <div class="row">
        <div class="item">
          <label class="field-label">请求类型</label>
          <div class="control">
            <input type="text" placeholder="类型" v-model="httpMettod" />
          </div>
        </div>

        <div class="item"></div>
      </div>

      <div class="row">
        <div class="item">
          <label class="field-label">请求URL</label>
          <div class="control">
            <input type="text" placeholder="url" v-model="httpUrl" />
          </div>
        </div>
      </div>
      <!-- 请求次数 请求间隔 -->
      <div class="row">
        <div class="item">
          <label class="field-label">请求次数</label>
          <div class="control">
            <input type="number" min="1" placeholder="请求次数" v-model="httpCount" />
          </div>
        </div>

        <div class="item">
          <label class="field-label">请求间隔</label>
          <div class="control">
            <input type="text" placeholder="间隔时间ms" v-model="hettpSleep" />
          </div>
        </div>
      </div>
    </div>
    <div style="height: 60%; width: 100%; overflow: hidden">
      <div class="request-label-style">
        <div class="label-test-style" @click="labelRef = '1'" :class="{ active: labelRef === '1' }">
          <span>参数</span>
          <span
            class="text-count"
            v-if="props.workFlowHttp && props.workFlowHttp.httpParam.length > 0"
            >({{ props.workFlowHttp ? props.workFlowHttp.httpParam.length : 0 }})</span
          >
        </div>
        <div class="label-test-style" @click="labelRef = '2'" :class="{ active: labelRef === '2' }">
          <span>请求头</span>
          <span class="text-count"
            >({{ props.workFlowHttp ? props.workFlowHttp.httpHeader.length : 0 }})</span
          >
        </div>
        <div class="label-test-style" @click="labelRef = '3'" :class="{ active: labelRef === '3' }">
          <span>请求体</span>
        </div>
        <div class="label-test-style" @click="labelRef = '4'" :class="{ active: labelRef === '4' }">
          <span>响应设置</span>
        </div>
      </div>
      <!-- 根据选中的标签 显示对应的组件 -->
      <WorkflowHttpParam
        v-if="labelRef === '1'"
        :workFlowHttp="props.workFlowHttp"
        :workFlowId="props.workFlowId"
      />
      <WorkflowHttpHeader
        v-if="labelRef === '2'"
        :workFlowHttp="props.workFlowHttp"
        :workFlowId="props.workFlowId"
      />
      <WorkflowHttpBody
        v-if="labelRef === '3'"
        :workFlowHttp="props.workFlowHttp"
        :workFlowId="props.workFlowId"
      />
      <WorkflowHttpResp
        v-if="labelRef === '4'"
        :workFlowHttp="props.workFlowHttp"
        :workFlowId="props.workFlowId"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
#workflowHttpStyle {
  height: 100%;
  width: 100%;
}

/* 可通过修改这个变量来控制 label 宽度 */
.workflowInfoStyle {
  --label-width: 90px; /* 改成你需要的宽度，比如 80px / 100px */
  width: 100%;
  height: 240px;
  border-bottom: 1px solid var(--ev-c-border-color1);
  padding: 8px 20px;
  overflow: auto;

  .title {
    font-size: 24px;
    font-weight: 800;
    margin-bottom: 8px;
  }

  .row {
    display: flex;
    gap: 20px; /* 两列间距 */
    margin-bottom: 10px;
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

// http请求部分样式
.request-label-style {
  width: 100%;
  height: 40px;
  display: flex;
  overflow: hidden; /*超出隐藏 */

  .label-test-style {
    height: 100%;
    margin: 0 10px;
    cursor: pointer;
    display: flex; /* 开启 flex 布局 */
    align-items: center; /* 垂直居中 */
    justify-content: center; /* 水平居中 */
    padding: 2px; /* 内边距上下左右 3px */
    color: var(--ev-c-text-color1);
    white-space: nowrap; /* 不换行 */
    overflow: hidden; /*超出隐藏 */
    flex-shrink: 0; /* 不压缩 */

    &:hover {
      background-color: var(--ev-c-background-color3);
    }
  }
  .label-test-style.active {
    border-bottom: 2px solid #46ff40; // 选中时底部高亮
    color: var(--ev-c-text-color2);
  }
  .text-count {
    color: var(--en-c-subject-color1);
  }
}
</style>
