<script setup lang="ts">
const dateList = ["API请求1", "API请求2", "API请求3", "API请求4"];
</script>
<!-- 工作台标签页 -->
<template>
    <div id="workbench-tabs">
        <div class="tabs-first">
            <div class="tab-title">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-icon_on_the_left"></use>
                </svg>
            </div>
        </div>
        <!-- api标签 -->
        <div class="api-tabs-container">
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
            <div class="tab-title">
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
    width: 100%;
    height: 40px;
    border-bottom: 1px solid var(--ev-c-border-color1);
}

.tabs-first {
    height: 100%;
    width: 40px;
    font-size: 24px;
    display: flex;
    align-items: center;
    flex-shrink: 0;
}

.tabs-end {
    flex-shrink: 0;
    border-left: 1px solid var(--ev-c-border-color1);
    height: 100%;
    width: 120px;
    font-weight: bold;
    font-size: 24px;
    display: flex;
    align-items: center;
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

// API标签样式
.api-tabs-container {
    flex-grow: 1;
    display: flex;
    height: 100%;
    /* 添加这一行，启用水平滚动条来处理溢出内容 */
    overflow-x: auto;
    /* overflow-y: hidden; 或直接使用 overflow: hidden; 保持整洁 */
    overflow-y: hidden;
}

.apiTabsStyle {
    display: flex;
    align-items: center;
    font-size: 14px;
    color: var(--ev-c-text-color2);
    border: 1px solid var(--ev-c-border-color1);
    /* 强制文本不换行 */
    white-space: nowrap;
    /* 添加这一行，阻止标签页在空间不足时收缩 */
    flex-shrink: 0;

    &:hover {
        cursor: pointer;
        background-color: var(--ev-c-background-color1);
    }

    .tab-title-api {
        height: 100%;
        display: flex;
        align-items: center;

        .icon {
            margin-left: 5px;
        }

        span {
            margin-left: 5px;
        }
    }

    .tab-title-close {
        margin-left: 10px;
        margin-right: 5px;
        border-radius: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 20px;
        height: 20px;

        .icon {
            width: 0px;
            height: 0px;
        }
    }
}

/* 当鼠标悬停在 .apiTabsStyle 上时，显示 .tab-title-close */
.apiTabsStyle:hover .tab-title-close {
    &:hover {
        cursor: pointer;
        background-color: var(--ev-c-background-color3);
    }

    .icon {
        width: 16px;
        height: 16px;
    }

}
</style>