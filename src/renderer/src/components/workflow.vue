<script setup lang="ts">
import TempflowFolder from '@renderer/templates/workFlowTemplate/TempflowFolder.vue'
import { storeToRefs } from 'pinia'
import { workFlowStore } from '@renderer/stores/workFlowStores'
const { workFlowList } = storeToRefs(workFlowStore())
const { addWorkFlow } = workFlowStore()
// 新增工作流
function newWorkflow(): void {
  addWorkFlow()
}
</script>

<template>
  <div id="workflow">
    <!-- 标题栏 -->
    <div class="title-bar">
      <h5>工作流</h5>
      <div class="title-btn">
        <div class="iconStyle" @click="newWorkflow()">
          <el-tooltip effect="light" content="新建" placement="bottom" popper-class="is-customized">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-xinjian"></use>
            </svg>
          </el-tooltip>
        </div>
        <div class="iconStyle">
          <el-tooltip effect="light" content="导出" placement="bottom" popper-class="is-customized">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-daoru"></use>
            </svg>
          </el-tooltip>
        </div>
      </div>
    </div>
    <!-- 内容栏 -->
    <div class="content-bar">
      <div v-for="(workFlow, idx) in workFlowList" :key="idx">
        <TempflowFolder :workFlow="workFlow" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#workflow {
  width: 100%;
  height: 100%;
}

.title-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 40px;
  border-bottom: 1px solid var(--ev-c-border-color1);
  font-size: 18px;
  color: var(--ev-c-text-color1);

  h5 {
    padding-left: 10px;
    white-space: nowrap;
  }
}

.title-btn {
  width: 60px;
  display: flex;
  justify-content: space-around;

  .iconStyle {
    width: 25px;
    height: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;

    // 鼠标悬停时的样式
    &:hover {
      cursor: pointer;
      background-color: var(--ev-c-background-color3);
    }

    // 鼠标点击时的样式
    &:active {
      background-color: var(--ev-c-background-color1);
    }

    .icon {
      width: 15px;
      height: 15px;
    }
  }
}

.content-bar {
  width: 100%;
  height: 100%;
  overflow: auto;
}
</style>
