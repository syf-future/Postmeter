<script setup lang="ts">
import LeftView from '@renderer/views/leftView/index.vue';
import MiddleView from '@renderer/views/middleView/index.vue';
import RightView from '@renderer/views/rightView/index.vue';
</script>

<template>
    <div id="main-view">
        <left-view></left-view>
        <middle-view></middle-view>
        <right-view></right-view>
    </div>
</template>

<style lang="scss" scoped>
#main-view {
    display: flex;
    width: 100vw;
    height: 100vh;
}
</style>