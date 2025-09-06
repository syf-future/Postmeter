<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'
// 水平/垂直布局状态
import { useLayoutStore } from '@renderer/stores/layoutStores'
const { updateLayout } = useLayoutStore()

// 存储 apiTabsContainer 的引用
const apiTabsContainer = ref<HTMLElement | null>(null)

// 向左移动函数
function startScrollLeft(): void {
  if (apiTabsContainer.value) {
    apiTabsContainer.value!.scrollLeft -= 80 // 每次滚动50px
  }
}

// 向右移动函数
function startScrollRight(): void {
  if (apiTabsContainer.value) {
    apiTabsContainer.value!.scrollLeft += 80 // 每次滚动10px
  }
}

/**api标签用法 */
import { ApiRequest } from '@renderer/interfaces/request'
import { storeToRefs } from 'pinia'
import { EnumMenuCode } from '@renderer/enums/enumMenuCode'
import AddDialogTemplate from '@renderer/templates/addDialogTemplate.vue'
// 引入 apiTablesStore
import { apiTablesStore } from '@renderer/stores/apiTablesStores'
const { apiTables, nowApiTable, updateApiTables } = storeToRefs(apiTablesStore())
const { setNowApiTable, deleteApiTables, getUpdateApiTable, clearUpdateApiTables } =
  apiTablesStore()
// 引入 requestListStore
import { requestListStore } from '@renderer/stores/requestList'
const { updateApi } = requestListStore()
// 引入 responseStore
import { responseStore } from '@renderer/stores/responseStores'
const { setNowResponse } = responseStore()
// 点击标签
function onClickApiTable(apiTable: ApiRequest): void {
  setNowApiTable(apiTable)
  setNowResponse(apiTable.apiId)
}
const saveApiRequest = ref<ApiRequest>()
const isOpenDialog = ref<boolean>(false) // 定义弹窗的状态

// 保存api请求
function saveApi(): void {
  if (nowApiTable.value) {
    const apiRequest = getUpdateApiTable(nowApiTable.value)
    updateApi(apiRequest)
    clearUpdateApiTables(apiRequest)
  }
}

// 点击删除
function onCLickDeleteApiTable(apiTable: ApiRequest): void {
  // 已经保存则直接退出
  if (!updateApiIds.value.includes(apiTable.apiId)) {
    deleteApiTables(apiTable.apiId)
    setNowResponse(apiTable.apiId)
    return
  }
  // 未保存则打开弹窗
  saveApiRequest.value = apiTable
  isOpenDialog.value = true
}

const updateApiIds = ref<string[]>([])
watch(
  updateApiTables,
  (newUpdateApiTables) => {
    updateApiIds.value = newUpdateApiTables.map((item) => item.apiId)
  },
  { deep: true } // deep深度监听
)
// 监听 保存快捷键 Ctrl+S 或 Cmd+S
onMounted(() => {
  const handleSaveShortcut = (event: KeyboardEvent) => {
    // Mac ⌘Command + S   或   Windows Ctrl + S
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 's') {
      event.preventDefault() // 阻止默认的“保存网页”行为
      saveApi() // 调用你的保存方法
    }
  }

  window.addEventListener('keydown', handleSaveShortcut)

  onUnmounted(() => {
    window.removeEventListener('keydown', handleSaveShortcut)
  })
})
</script>

<template>
  <div id="workbench-tabs">
    <div class="tabs-first">
      <!-- mousedown 鼠标按下执行  mouseup 鼠标松开执行  mouseleave 鼠标离开执行 -->
      <div class="tab-title" @click="startScrollLeft">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-icon_on_the_left"></use>
        </svg>
      </div>
    </div>

    <!-- api标签 -->
    <div class="api-tabs-container" ref="apiTabsContainer">
      <div
        class="apiTabsStyle"
        v-for="(apiTable, index) in apiTables"
        :key="index"
        :class="{
          active: nowApiTable?.apiId === apiTable.apiId,
          'need-save': updateApiIds.includes(apiTable.apiId)
        }"
      >
        <div class="tab-title-api" @click="onClickApiTable(apiTable)">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-faqiqingqiu"></use>
          </svg>
          <span>{{ apiTable.apiName }}</span>
        </div>
        <div class="tab-title-close" @click="onCLickDeleteApiTable(apiTable)">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-guanbi"></use>
          </svg>
        </div>
      </div>
    </div>

    <!-- 其他标签 -->
    <div class="tabs-end">
      <div class="tab-title" @click="startScrollRight">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-icon_on_the_right"></use>
        </svg>
      </div>
      <div class="tab-title">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-tianjia"></use>
        </svg>
      </div>
      <!-- 目前当作改变布局用 -->
      <div class="tab-title" @click="updateLayout">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-gengduo"></use>
        </svg>
      </div>
    </div>

    <!-- 是否保存弹窗 -->
    <div>
      <AddDialogTemplate
        v-model:isOpenDialog="isOpenDialog"
        :label="EnumMenuCode.SAVE_API"
        :apiRequest="saveApiRequest"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
#workbench-tabs {
  display: flex;
  align-items: center;
  height: 40px;
  overflow: hidden; // 防止整体溢出
}

.tabs-first {
  height: 100%;
  width: 40px;
  min-width: 40px; // 确保固定宽度
  font-size: 24px;
  display: flex;
  align-items: center;
  flex-shrink: 0;
  border-bottom: 1px solid var(--ev-c-border-color1);
}

.tabs-end {
  position: relative;
  display: flex;
  align-items: center;
  height: 100%;
  width: 120px;
  min-width: 120px; // 确保固定宽度
  flex-shrink: 0;
  border-left: 1px solid var(--ev-c-border-color1);
  font-weight: bold;
  font-size: 24px;
  border-bottom: 1px solid var(--ev-c-border-color1);
}

.tab-title {
  width: 30px;
  height: 30px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 5px;

  &:hover {
    cursor: pointer;
    background-color: var(--ev-c-background-color3);
  }
}

.icon {
  width: 16px;
  height: 16px;
}

.api-tabs-container {
  display: flex;
  height: 100%;
  max-width: calc(100% - 120px); // 减去两端固定宽度
  min-width: 0; // 允许缩小
  overflow-x: auto; // 启用水平滚动
  scroll-behavior: smooth; // 平滑滚动

  // 隐藏滚动条
  &::-webkit-scrollbar {
    display: none; // 隐藏滚动条
  }
}

.apiTabsStyle {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: var(--ev-c-text-color1);
  border: 1px solid var(--ev-c-border-color1);
  height: 100%;
  padding: 0 8px;
  flex-shrink: 0; // 防止标签被压缩

  &:hover {
    cursor: pointer;
    background-color: var(--ev-c-background-color1);
  }

  &.active {
    color: var(--ev-c-text-color3);
    border-top: 3px solid var(--en-c-subject-color1); // 上边框绿色
    border-bottom: none; // 去掉下边框（可选）
  }
  .tab-title-api {
    height: 100%;
    display: flex;
    align-items: center;

    span {
      margin: 0 5px;
    }
  }

  .tab-title-close {
    margin-left: 5px;
    border-radius: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;

    .icon {
      width: 0;
      height: 0;
      transition: all 0.2s ease;
    }
  }

  &:hover .tab-title-close {
    &:hover {
      cursor: pointer;
      background-color: var(--ev-c-background-color3);
    }

    .icon {
      width: 16px;
      height: 16px;
    }
  }
}

// 需要保存的api标签样式
.apiTabsStyle.need-save {
  position: relative; // 当前标签相对定位，方便伪元素定位

  // 在元素的右上角插入一个小圆点
  &::after {
    content: '';
    position: absolute;
    top: 4px;
    right: 4px;
    width: 8px;
    height: 8px;
    background-color: var(--en-c-subject-color1);
    border-radius: 50%;
  }
}
</style>
