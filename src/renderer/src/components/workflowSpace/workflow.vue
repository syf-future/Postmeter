<script setup lang="ts">
import { WorkFlow, WorkFlowHttp, WorkFlowSleep, WorkFlowSql } from '@renderer/interfaces/workFlow'
import { ref } from 'vue'
import { EnumWorkFlowCode } from '@renderer/enums/enumWorkCode'
import { workFlowStore } from '@renderer/stores/workFlowStores'
const { addWorkflowSub, setWorkFlowType, setWorkFLowSub } = workFlowStore()
// 定义工作流编辑组件
const flowIcons = ref<Map<string, string>>(
  new Map<string, string>()
    .set(EnumWorkFlowCode.WORK_FLOW_HTTP, '#icon-HTTP')
    .set(EnumWorkFlowCode.WORK_FLOW_SQL, '#icon-icon_SQL')
    .set(EnumWorkFlowCode.WORK_FLOW_SLEEP, '#icon-loading-v')
)

// const flowIcons = ref<string[]>(['#icon-HTTP', '#icon-icon_SQL', '#icon-loading-v'])
const getFlowIcons = (workflowType: string) => {
  return flowIcons.value.get(workflowType)
}
// 是否编辑
const isEdit = ref<boolean>(false)
// 通过defineProps 宏函数来接收父组件传的数据
const props = defineProps<{
  workFlow?: WorkFlow
}>()
// 定义工作流名称、循环次数、线程数的响应式变量
const workflowName = ref<string>(props.workFlow?.workFlowName || '')
const wordFlowCycleNum = ref<number>(props.workFlow?.wordFlowCycleNum || 1)
const wordFlowThreadNum = ref<number>(props.workFlow?.wordFlowThreadNum || 1)
const wordFlowIntervalTime = ref<number>(props.workFlow?.wordFlowIntervalTime || 0)

// 增加工作流子项
function addWorkflowSub1(addType: string): void {
  let workflowSub: WorkFlowHttp | WorkFlowSql | WorkFlowSleep
  switch (addType) {
    case EnumWorkFlowCode.WORK_FLOW_HTTP:
      console.log('添加http')
      workflowSub = {
        type: EnumWorkFlowCode.WORK_FLOW_HTTP,
        name: '发送http请求',
        isUse: true,
        httpMethod: '',
        httpUrl: '',
        httpParam: new Map<string, string>(),
        httpHeader: new Map<string, string>(),
        httpBody: '',
        httpResp: '',
        httpRespSleep: 0,
        httpRespNum: 1
      }
      break
    case EnumWorkFlowCode.WORK_FLOW_SQL:
      console.log('添加sql')
      workflowSub = {
        type: EnumWorkFlowCode.WORK_FLOW_SQL,
        name: '查询sql',
        isUse: true,
        sqlDate: 'select * from credit_apply',
        sqlResp: '',
        sqlNum: 1,
        sqlSleep: 0
      }
      break
    case EnumWorkFlowCode.WORK_FLOW_SLEEP:
      console.log('添加sleep')
      workflowSub = {
        type: EnumWorkFlowCode.WORK_FLOW_SLEEP,
        name: '等待',
        isUse: true,
        sleepTime: 1000
      }
      break
    default:
      console.log('未知类型:', addType)
      return
  }
  addWorkflowSub(workflowSub)
}

function clickWorkFlowSub(item: WorkFlowHttp | WorkFlowSql | WorkFlowSleep): void {
  setWorkFLowSub(item)
  setWorkFlowType(item.type)
}
</script>

<template>
  <div id="workflowStyle">
    <div class="workflowInfoStyle">
      <p class="title">工作流</p>

      <!-- 名称 + 线程数 -->
      <div class="row">
        <div class="item">
          <label class="field-label" for="workflowName">名称</label>
          <div class="control">
            <input id="workflowName" type="text" placeholder="请输入名称" v-model="workflowName" />
          </div>
        </div>

        <div class="item">
          <label class="field-label">线程数</label>
          <div class="control">
            <input type="number" min="1" placeholder="线程数" v-model="wordFlowThreadNum" />
          </div>
        </div>
      </div>

      <!-- 线程数 + 循环次数 -->
      <div class="row">
        <div class="item">
          <label class="field-label">循环次数</label>
          <div class="control">
            <input type="number" min="0" placeholder="循环次数" v-model="wordFlowCycleNum" />
          </div>
        </div>

        <div class="item">
          <label class="field-label">间隔时间</label>
          <div class="control">
            <input type="text" placeholder="ms" v-model="wordFlowIntervalTime" />
          </div>
        </div>
      </div>
    </div>

    <div class="workflowSubStyle">
      <div class="subTitleStyle">
        <p>工作流子项</p>
        <div class="subTabs">
          <div style="width: 100%; height: 100%; display: flex">
            <div
              class="flowTabStyle"
              v-for="([key, value], index) in Array.from(flowIcons.entries())"
              :key="index"
              v-show="isEdit === true"
            >
              <svg class="icon" aria-hidden="true" @click="addWorkflowSub1(key)">
                <use :xlink:href="value"></use>
              </svg>
            </div>
          </div>

          <div style="margin-right: 10px">
            <div class="flowTabStyle2" @click="isEdit = !isEdit">
              <p v-show="isEdit === false">编辑</p>
              <p v-show="isEdit === true">保存</p>
            </div>
          </div>
        </div>
      </div>
      <div class="subStyle">
        <div
          class="subFlowStyle"
          v-for="(item, idx) in props.workFlow?.wordFlowWorkList"
          :key="idx"
          @click="clickWorkFlowSub(item)"
        >
          <div
            style="width: 5px; height: 5px; border-radius: 50%; margin-left: 5px"
            :style="{ backgroundColor: item.isUse ? 'var(--en-c-subject-color1)' : 'yellow' }"
          ></div>
          <svg class="icon" aria-hidden="true" style="margin-left: 5px">
            <use :xlink:href="getFlowIcons(item.type)"></use>
          </svg>
          <span style="margin-left: 10px"> {{ item.name }} </span>
        </div>
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

/* 工作流子项样式 */
.workflowSubStyle {
  width: 100%;
  height: 75%;
  padding: 0px 20px;

  .subTitleStyle {
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .subTabs {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
  .subStyle {
    width: 100%;
    height: calc(100% - 40px);
    border: 1px solid var(--ev-c-border-color1);
    overflow: auto;
    .subFlowStyle {
      display: flex;
      align-items: center;
      width: 100%;
      height: 35px;
      &:hover {
        background-color: var(--ev-c-background-color3);
        cursor: pointer;
      }
    }
  }
}

.flowTabStyle {
  width: 25px;
  height: 25px;
  border-radius: 20%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
  background-color: var(--ev-c-background-color1);

  &:hover {
    background-color: var(--ev-c-background-color3);
    cursor: pointer;
  }
  &:active {
    background-color: var(--ev-c-background-color1);
  }
}
.icon {
  width: 15px;
  height: 15px;
}
.flowTabStyle2 {
  width: 50px;
  height: 25px;
  border-radius: 8%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
  background-color: var(--ev-c-background-color1);
  p {
    font-weight: bold;
  }

  &:hover {
    background-color: var(--ev-c-background-color3);
    cursor: pointer;
  }
  &:active {
    background-color: var(--ev-c-background-color1);
  }
}
</style>
