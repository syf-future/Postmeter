<script setup lang="ts">

</script>

<template>
    <div id="envBench">
        <!-- 标题栏 -->
        <div class="title-bar">
            <h5>环境变量</h5>
        </div>
        <!-- 内容栏 -->
        <div >

        </div>
    </div>
</template>

<style lang="scss" scoped>
#envBench {
    width: 100%;
    height: 100%;
}

.title-bar {
    display: flex;
    align-items: center;
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
</style>