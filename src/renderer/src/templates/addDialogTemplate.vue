<script setup lang="ts">
import { ref } from 'vue';
import { requestListStore } from '@renderer/stores/requestList';
const { addRequestList } = requestListStore();

// 定义props 获取父组件传递的值
const props = defineProps<{
    isOpenDialog: boolean;
    title: string;
}>();
// 定义事件
const emit = defineEmits(['update:isOpenDialog']);

// 定义响应式变量来存储名称
const collectionName = ref('');

// 关闭方法
const handleCancel = () => {
    collectionName.value = '';
    emit('update:isOpenDialog', false);
};
// 确认方法
const handleConfirm = () => {
    // 判断title类型
    if (props.title === '新建集合') {
        // 这里可以添加逻辑来处理新建集合的操作
        addRequestList(collectionName.value);
    } else {
        // 新建api
        console.log('其他操作:', collectionName.value);
    }    
    handleCancel();
};
</script>

<!-- 新增集合/api弹窗模板 -->
<template>
    <el-dialog :model-value="props.isOpenDialog" width="500" align-center :show-close="false"
        :before-close="handleCancel">
        <template #header>
            <div class="dialog-header">
                <h3>{{ title }}</h3>
            </div>
        </template>

        <div class="dialog-body-content">
            <span class="label-text">名称<span class="required-star">*</span></span>
            <el-input v-model="collectionName" class="custom-input" />
        </div>

        <template #footer>
            <div class="dialog-footer">
                <div class="custom-button cancel-button" @click="handleCancel">取消</div>
                <div v-if="collectionName.length > 0" class="custom-button confirm-button" @click="handleConfirm">完成
                </div>
                <div v-else class="custom-button no-confirm-button">完成</div>
            </div>
        </template>
    </el-dialog>
</template>

<style lang="scss">
.el-dialog {
    background-color: #363434;
    height: 200px;
    width: 480px;
}

.dialog-header {
    text-align: center;
    color: #edeaea;
    letter-spacing: 1px;
}

// 输入框样式
.dialog-body-content {
    display: flex;
    flex-direction: column;
    gap: 8px;

    .label-text {
        color: #ccc;
        font-size: 14px;
    }

    .required-star {
        color: #ff4d4f;
        margin-left: 4px;
    }
}

// 自定义输入框样式
.custom-input {
    height: 40px;
    width: 100%;

    .el-input__wrapper {
        background-color: #1c1b1b;
        border: 1px solid #5e5c5c;
        box-shadow: none;
        font-size: 16px;
        // 输入框聚焦
        &.is-focus {
            box-shadow: 0 0 0 1px #67c23a;
            border-color: #67c23a;
        }
        // 输入框内容颜色
        .el-input__inner {
            color: #fff;
        }
    }
}

// 自定义按钮样式
.dialog-footer {
    display: flex;
    justify-content: flex-end;
    /* 将按钮对齐到右边 */
    gap: 10px;

    /* 在按钮之间添加一些间距 */
    .custom-button {
        padding: 10px;
        padding-top: 5px;
        padding-bottom: 5px;
        font-size: 16px;
        border-radius: 10px;
        text-align: center;
    }

    .cancel-button {
        color: #67c23a;
    }

    .confirm-button {
        color: #67c23a;
    }

    .no-confirm-button {
        color: #ccc;
    }

    .cancel-button:hover,
    .confirm-button:hover {
        background-color: #636161;
        cursor: pointer;
    }
}
</style>