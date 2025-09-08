<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter() // 获取router实例

// 定义鼠标悬停的图标索引
const hoverIndex = ref<number | null>(null)
// 定义鼠标点击的图标索引
const clickIndex = ref<number | null>(null)
// 图标数据，包含默认和悬停时的 icon 名称
const firstIcons = [
  {
    id: 1,
    normal: '#icon-gongzuotai1',
    hover: '#icon-gongzuotai1-copy',
    title: '工作台',
    router: '/workbench'
  },
  {
    id: 2,
    normal: '#icon-jurassic_process',
    hover: '#icon-jurassic_process-copy',
    title: '工作流',
    router: '/workflow'
  },
  {
    id: 3,
    normal: '#icon-huanjingbianliang',
    hover: '#icon-huanjingbianliang-copy',
    title: '环境变量',
    router: '/envBench'
  },
  {
    id: 4,
    normal: '#icon-gongzuotai',
    hover: '#icon-gongzuotai-copy',
    title: '工具箱',
    router: '/workbox'
  }
]

const lastIcons = [
  { id: 5, normal: '#icon-github', hover: '#icon-github-copy', title: 'github' },
  { id: 6, normal: '#icon-shezhi', hover: '#icon-shezhi-copy', title: '设置' }
]

const onClick = (iconInfo: any) => {
  clickIndex.value = iconInfo.id
  router.push(iconInfo.router) // 路由跳转到对应的页面
}
onMounted(() => {
  // 设置默认信息
  clickIndex.value = firstIcons[0].id // 设置默认点击第一个图标
  router.push(firstIcons[0].router) // 路由跳转第一个图标页面
})
</script>
<template>
  <div id="left-view">
    <!-- 上半部图标 -->
    <div class="icon-first" style="width: 100%; flex-grow: 1">
      <div
        class="left-icon"
        v-for="(item, idx) in firstIcons"
        :key="idx"
        @mouseenter="hoverIndex = item.id"
        @mouseleave="hoverIndex = null"
        @click="onClick(item)"
        :class="{ active: clickIndex === item.id }"
      >
        <el-tooltip
          effect="light"
          :content="item.title"
          placement="right"
          popper-class="is-customized"
        >
          <svg class="icon" aria-hidden="true">
            <use v-if="clickIndex === item.id" :xlink:href="item.hover"></use>
            <use v-else :xlink:href="hoverIndex === item.id ? item.hover : item.normal"></use>
          </svg>
        </el-tooltip>
      </div>
    </div>
    <!-- 下半部图标 -->
    <div class="icon-last" style="width: 100%">
      <div
        class="left-icon"
        v-for="(item, idx) in lastIcons"
        :key="idx"
        @mouseenter="hoverIndex = item.id"
        @mouseleave="hoverIndex = null"
      >
        <el-tooltip
          effect="light"
          :content="item.title"
          placement="right"
          popper-class="is-customized"
        >
          <svg class="icon" aria-hidden="true">
            <use :xlink:href="hoverIndex === item.id ? item.hover : item.normal"></use>
          </svg>
        </el-tooltip>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
#left-view {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  min-width: 50px;
  background-color: var(--ev-c-background-color1);
}

.left-icon {
  width: 100%;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-left: 2px solid transparent; // 左侧边框透明
  border-right: 2px solid transparent; // 右侧边框透明

  .icon {
    width: 25px;
    height: 25px;
  }

  &:hover {
    cursor: pointer;
  }
}

.left-icon.active {
  border-left: 2px solid #46ff40; // 选中时右侧高亮
}
</style>
