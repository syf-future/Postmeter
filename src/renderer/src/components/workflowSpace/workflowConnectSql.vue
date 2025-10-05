<script setup lang="ts">
import { ref } from 'vue'

const conSqlStep = ref<string>('1')
</script>

<template>
  <div style="width: 100%; height: 100%; display: flex; flex-direction: column">
    <div class="contSqlTitleStyle">
      <div class="flowTabStyle" v-if="conSqlStep === '2'">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-oracle">˝</use>
        </svg>
      </div>
      <p>新建sql连接</p>
      <p v-if="conSqlStep === '2'">(oracle)</p>
    </div>

    <!-- 中间部分占据剩余空间 -->
    <div class="contSqlMiddleStyle">
        
    </div>

    <div class="conSqlEndStyle">
      <div>
        <div class="conSqlButtonStyle" v-if="conSqlStep === '2'">测试连接</div>
      </div>
      <div style="display: flex">
        <div class="conSqlButtonStyle" v-if="conSqlStep === '2'" @click="conSqlStep = '1'">
          上一步
        </div>
        <div class="conSqlButtonStyle" v-if="conSqlStep === '1'" @click="conSqlStep = '2'">
          下一步
        </div>
        <div class="conSqlButtonStyle" v-if="conSqlStep === '2'">完成</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.contSqlTitleStyle {
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  p {
    font-weight: bolder;
  }
  .flowTabStyle {
    width: 30px;
    height: 30px;
    border-radius: 20%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 10px;
    background-color: var(--ev-c-background-color1);
    .icon {
      width: 20px;
      height: 20px;
    }
  }
}

.contSqlMiddleStyle {
  flex: 1; /* 占据剩余空间 */
}

.conSqlEndStyle {
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .conSqlButtonStyle {
    padding: 2px 6px;
    margin: 0px 10px;
    border-radius: 8px;
    background-color: var(--ev-c-background-color1);
    &:hover {
      background-color: var(--ev-c-background-color3);
      cursor: pointer;
    }
  }
}
</style>
