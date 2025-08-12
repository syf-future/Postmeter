<script setup lang="ts">
import { ref } from 'vue';

// 存储 apiTabsContainer 的引用
const apiTabsContainer = ref<HTMLElement | null>(null);

const dateList = ["API请求1", "API请求2", "API请求3", "API请求4"];

let scrollInterval: any = null; // 存储滚动的定时器

// 向左滚动函数
const startScrollLeft = () => {
    if (apiTabsContainer.value) {
        // 设置一个定时器来持续滚动
        scrollInterval = setInterval(() => {
            apiTabsContainer.value!.scrollLeft -= 50; // 每次滚动50px
        }, 30); // 每30ms滚动一次
    }
};

// 向右滚动函数
const startScrollRight = () => {
    if (apiTabsContainer.value) {
        // 设置一个定时器来持续滚动
        scrollInterval = setInterval(() => {
            apiTabsContainer.value!.scrollLeft += 50; // 每次滚动10px
        }, 30); // 每30ms滚动一次
    }
};

// 停止滚动
const stopScroll = () => {
    if (scrollInterval) {
        clearInterval(scrollInterval); // 停止定时器
        scrollInterval = null;
    }
};
</script>



<template>
    <div id="workbench-tabs">
        <div class="tabs-first">
            <!-- mousedown 鼠标按下执行  mouseup 鼠标松开执行  mouseleave 鼠标离开执行 -->
            <div class="tab-title" @mousedown="startScrollLeft" @mouseup="stopScroll" @mouseleave="stopScroll">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-icon_on_the_left"></use>
                </svg>
            </div>
        </div>

        <!-- api标签 -->
        <div class="api-tabs-container" ref="apiTabsContainer">
            <div class="apiTabsStyle" v-for="(item, index) in dateList" :key="index">
                <div class="tab-title-api">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-faqiqingqiu"></use>
                    </svg>
                    <span>{{ item }}</span>
                </div>
                <div class="tab-title-close">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-guanbi"></use>
                    </svg>
                </div>
            </div>
        </div>

        <!-- 其他标签 -->
        <div class="tabs-end">
            <div class="tab-title" @mousedown="startScrollRight" @mouseup="stopScroll" @mouseleave="stopScroll">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-icon_on_the_right"></use>
                </svg>
            </div>
            <div class="tab-title">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-tianjia"></use>
                </svg>
            </div>
            <div class="tab-title">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-gengduo"></use>
                </svg>
            </div>
        </div>
    </div>
</template>



<style lang="scss" scoped>
#workbench-tabs {
    display: flex;
    align-items: center;
    height: 40px;
    border-bottom: 1px solid var(--ev-c-border-color1);
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
    color: var(--ev-c-text-color2);
    border: 1px solid var(--ev-c-border-color1);
    height: 100%;
    padding: 0 8px;
    flex-shrink: 0; // 防止标签被压缩

    &:hover {
        cursor: pointer;
        background-color: var(--ev-c-background-color1);
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
</style>
