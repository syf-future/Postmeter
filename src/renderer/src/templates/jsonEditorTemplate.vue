<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, watch } from 'vue'
import * as monaco from 'monaco-editor'

// worker 引入
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'

// 配置 Monaco Worker
self.MonacoEnvironment = {
  getWorker(_: any, label: string) {
    switch (label) {
      case 'json':
        return new jsonWorker()
      case 'css':
        return new cssWorker()
      case 'html':
        return new htmlWorker()
      default:
        return new editorWorker()
    }
  }
}

// props 定义
const props = withDefaults(
  defineProps<{
    modelValue: string // 输入的数据
    language?: string // 语言(json,html)
    isFormat?: 'off' | 'on' // 是否格式化
    isLine?: 'off' | 'on' | 'wordWrapColumn' | 'bounded' // 是否换行
    isReadOnly?: boolean // 是否只读
    editorOptions?: monaco.editor.IStandaloneEditorConstructionOptions
  }>(),
  {
    modelValue: '',
    language: 'json',
    isLine: 'off',
    isFormat: 'off',
    isReadOnly: false,
    editorOptions: () => ({})
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'change', value: string): void
}>()

const editorContainer = ref<HTMLDivElement | null>(null)
let editorInstance: monaco.editor.IStandaloneCodeEditor | null = null
let isUpdating = false

onMounted(() => {
  if (!editorContainer.value) return

  // 创建 Monaco 编辑器实例
  editorInstance = monaco.editor.create(editorContainer.value, {
    value: props.modelValue, // 编辑器初始内容（字符串）
    language: props.language, // 代码语言，比如 'json' | 'css' | 'html'
    theme: 'vs-dark', // 编辑器主题，内置有 'vs'（亮色）, 'vs-dark'（暗色）, 'hc-black'（高对比度）
    readOnly: props.isReadOnly, //是否只读，true 时不能修改
    automaticLayout: true, //是否自动布局，容器大小变化时编辑器自动调整
    tabSize: 2, //Tab 键的空格数
    minimap: { enabled: false }, // 是否显示右侧代码缩略图（小地图）
    formatOnType: true, // 输入时自动格式化（仅部分语言支持）
    formatOnPaste: true, // 粘贴时自动格式化（仅部分语言支持）
    wordWrap: props.isLine, // 是否自动换行 on换行。off不换行
    lineNumbersMinChars: 3, // 行号区域最小宽度（默认是 5）
    lineDecorationsWidth:0,
    scrollbar: {
      // vertical: 'hidden', // 垂直滚动条：'auto' | 'visible' | 'hidden'
      // horizontal: 'hidden', // 水平滚动条
      vertical: 'auto', // 垂直滚动条：'auto' | 'visible' | 'hidden'
      horizontal: 'auto', // 水平滚动条
      verticalScrollbarSize: 8, // 垂直滚动条宽度
      horizontalScrollbarSize: 8 // 水平滚动条高度
    },
    ...props.editorOptions // 透传父组件传进来的额外配置，覆盖默认值
  })

  // 强制设置 model 的语言
  if (editorInstance.getModel()) {
    monaco.editor.setModelLanguage(editorInstance.getModel()!, props.language)
  }

  // 内容变化监听
  editorInstance.onDidChangeModelContent(() => {
    if (!isUpdating) {
      const value = editorInstance!.getValue()
      emit('update:modelValue', value)
      emit('change', value)
    }
  })
})

// 监听 modelValue 的变化
watch(
  () => props.modelValue,
  (newValue) => {
    if (editorInstance && editorInstance.getValue() !== newValue) {
      isUpdating = true
      editorInstance.setValue(newValue)
      isUpdating = false
    }
  }
)

// 监听 language 的变化，动态切换语言
watch(
  () => props.language,
  (newLang) => {
    if (editorInstance?.getModel()) {
      monaco.editor.setModelLanguage(editorInstance.getModel()!, newLang)
    }
  }
)
// 监听 isLine 的变化（动态切换换行模式）
watch(
  () => props.isLine,
  (newVal) => {
    if (editorInstance) {
      editorInstance.updateOptions({ wordWrap: newVal })
    }
  }
)

// 监听 isFormat 的变化（动态控制格式化）
watch(
  () => props.isFormat,
  async (newVal) => {
    if (!editorInstance) return

    if (newVal === 'on') {
      // 开启自动格式化选项
      editorInstance.updateOptions({
        formatOnType: true,
        formatOnPaste: true
      })  
      // 立刻全文格式化
      const action = editorInstance.getAction('editor.action.formatDocument')
      if (action) {
        await action.run()
      }
    } else {
      // 关闭自动格式化选项
      editorInstance.updateOptions({
        formatOnType: false,
        formatOnPaste: false
      })
    }
  }
)

// 销毁编辑器实例
onBeforeUnmount(() => {
  if (editorInstance) {
    editorInstance.dispose()
  }
})
</script>

<template>
  <div id="editor-template" ref="editorContainer"></div>
</template>

<style lang="scss" scoped>
#editor-template {
  width: 100%;
  height: 100%;
  overflow: auto;
}
</style>
