/** 新建菜单模板 */
<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { requestListStore } from '@renderer/stores/requestList'
const { addFolder, addApi, updateFolder, updateApi, deleteFolder, deleteApi, saveRequestList } =
  requestListStore()
import { apiTablesStore } from '@renderer/stores/apiTablesStores'
const { deleteApiTables, clearUpdateApiTables } = apiTablesStore()
import { EnumMenuCode } from '@renderer/enums/enumMenuCode'
import { FolderRequest, ApiRequest } from '@renderer/interfaces/request'

onMounted(() => {
  // 使用 watch 监听 isOpenDialog 的变化
  watch(
    () => props.isOpenDialog,
    (newValue) => {
      // 检查对话框是否正在被打开
      if (newValue) {
        if (EnumMenuCode.RENAME_FOLDER === props.label) {
          if (props.requestFolder) {
            collectionName.value = props.requestFolder.folderName
          }
        } else if (EnumMenuCode.RENAME_API === props.label) {
          if (props.apiRequest) {
            collectionName.value = props.apiRequest.apiName
          }
        }
      } else {
        // 在对话框关闭时清空输入框，防止下次打开时显示旧数据
        collectionName.value = ''
      }
    }
  )
})

// 定义props 获取父组件传递的值
const props = defineProps<{
  isOpenDialog: boolean
  label: EnumMenuCode
  apiRequest?: ApiRequest // 可选的 API 请求对象
  requestFolder?: FolderRequest // 可选的文件夹请求对象
}>()
// 定义事件
const emit = defineEmits(['update:isOpenDialog'])

// 定义响应式变量来存储名称
const collectionName = ref('')

// 关闭方法
const handleCancel = () => {
  if (EnumMenuCode.SAVE_API === props.label) {
    if (props.apiRequest) {
      deleteApiTables(props.apiRequest.apiId)
    }
  }
  collectionName.value = ''
  emit('update:isOpenDialog', false)
}
// 确认方法
const handleConfirm = () => {
  // 新建文件夹
  if (EnumMenuCode.ADD_FFOLDER === props.label) {
    // 这里可以添加逻辑来处理新建集合的操作
    addFolder(collectionName.value)
  }
  // 修改文件夹名称
  if (EnumMenuCode.RENAME_FOLDER === props.label) {
    if (props.requestFolder) {
      updateFolder(props.requestFolder.folderId, collectionName.value)
    }
  }
  // 新建API
  if (EnumMenuCode.ADD_API === props.label) {
    if (props.requestFolder) {
      addApi(props.requestFolder.folderId, collectionName.value)
    }
  }
  // 修改API名称
  if (EnumMenuCode.RENAME_API === props.label) {
    if (props.requestFolder && props.apiRequest) {
      props.apiRequest.apiName = collectionName.value
      updateApi(props.apiRequest, props.requestFolder.folderId)
    }
  }
  // 删除文件夹
  if (EnumMenuCode.DELETE_FOLDER === props.label) {
    if (props.requestFolder) {
      deleteFolder(props.requestFolder.folderId)
    }
  }
  // 删除API
  if (EnumMenuCode.DELETE_API === props.label) {
    if (props.requestFolder && props.apiRequest) {
      deleteApi(props.requestFolder.folderId, props.apiRequest.apiId)
    }
  }
  // 保存API
  if (EnumMenuCode.SAVE_API === props.label) {
    if (props.apiRequest) {
      updateApi(props.apiRequest)
      clearUpdateApiTables(props.apiRequest)
      deleteApiTables(props.apiRequest.apiId)
      saveRequestList()
    }
  }

  handleCancel()
}
</script>

<!-- 新增集合/api弹窗模板 -->
<template>
  <el-dialog
    :model-value="props.isOpenDialog"
    width="500"
    align-center
    :show-close="false"
    :before-close="handleCancel"
  >
    <template #header>
      <div class="dialog-header">
        <h3>{{ label }}</h3>
      </div>
    </template>

    <div
      class="dialog-body-content"
      v-if="
        label !== EnumMenuCode.DELETE_FOLDER &&
        label !== EnumMenuCode.DELETE_API &&
        label !== EnumMenuCode.SAVE_API
      "
    >
      <span class="label-text">名称<span class="required-star">*</span></span>
      <el-input v-model="collectionName" class="custom-input" />
    </div>

    <template #footer>
      <div class="dialog-footer">
        <div class="custom-button cancel-button" @click="handleCancel">关闭</div>
        <!-- 删除操作时 -->
        <div
          v-if="label === EnumMenuCode.DELETE_FOLDER || label === EnumMenuCode.DELETE_API"
          class="custom-button delete-confirm-button"
          @click="handleConfirm"
        >
          确定
        </div>
        <div
          v-else-if="label === EnumMenuCode.SAVE_API"
          class="custom-button save-button"
          @click="handleConfirm"
        >
          保存
        </div>
        <div
          v-else-if="collectionName.length > 0"
          class="custom-button confirm-button"
          @click="handleConfirm"
        >
          确定
        </div>
        <div v-else class="custom-button no-confirm-button">确定</div>
      </div>
    </template>
  </el-dialog>
</template>

<style lang="scss">
.el-dialog {
  background-color: #363434;
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
      box-shadow: 0 0 0 1px var(--en-c-subject-color1);
      border-color: var(--en-c-subject-color1);
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
    color: var(--en-c-subject-color1);
  }

  .confirm-button {
    color: var(--en-c-subject-color1);
  }
  .save-button {
    color: #c6f104; // 蓝色
    &:hover {
      background-color: #636161;
      cursor: pointer;
    }
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
.delete-confirm-button {
  color: #ff4d4f; // 红色
  &:hover {
    background-color: #636161;
    cursor: pointer;
  }
}
</style>
