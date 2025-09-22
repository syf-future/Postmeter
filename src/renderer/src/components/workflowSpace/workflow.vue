<script setup lang="ts">
import { ref } from 'vue'

const flowIcons = ref<string[]>(['#icon-HTTP', '#icon-icon_SQL', '#icon-loading-v'])

const isEdit = ref<boolean>(false)
</script>

<template>
  <div id="workflowStyle">
    <div class="workflowInfoStyle">
      <p class="title">工作流</p>

      <!-- 名称 + 是否启用 -->
      <div class="row">
        <div class="item">
          <label class="field-label" for="workflowName">名称</label>
          <div class="control">
            <input id="workflowName" type="text" placeholder="请输入名称" />
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
          <label class="field-label">线程数</label>
          <div class="control">
            <input type="number" min="1" placeholder="线程数" />
          </div>
        </div>

        <div class="item">
          <label class="field-label">循环次数</label>
          <div class="control">
            <input type="number" min="0" placeholder="循环次数" />
          </div>
        </div>
      </div>

      <!-- 间隔时间 + 循环次数 -->
      <div class="row">
        <div class="item">
          <label class="field-label">间隔时间</label>
          <div class="control">
            <input type="text" placeholder="ms" />
          </div>
        </div>

        <div class="item"></div>
      </div>
    </div>

    <div class="workflowSubStyle">
      <div class="subTitleStyle">
        <p>工作流子项</p>
        <div class="subTabs">
          <div style="width: 100%; height: 100%; display: flex">
            <div
              class="flowTabStyle"
              v-for="(flowIcon, index) in flowIcons"
              :key="index"
              v-show="isEdit === true"
            >
              <svg class="icon" aria-hidden="true">
                <use :xlink:href="flowIcon"></use>
              </svg>
            </div>
          </div>

          <div style="margin-right: 10px">
            <div class="flowTabStyle2" @click="isEdit = !isEdit">
              <p v-show="isEdit === false">编辑</p>
              <P v-show="isEdit === true">保存</P>
            </div>
          </div>
        </div>
      </div>
      <div class="subStyle">
        <div class="subFlowStyle">
          <svg class="icon" aria-hidden="true" style="margin-left: 10px">
            <use xlink:href="#icon-HTTP"></use>
          </svg>
          <span style="margin-left: 10px"> 授信申请 </span>
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
      // justify-content: center;
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
