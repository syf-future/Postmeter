<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, watch } from 'vue'
import * as monaco from 'monaco-editor'
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'
// import xmlWorker from 'monaco-editor/esm/vs/language/xml/xml.worker?worker';
// 配置 Monaco Worker，支持更多语言
self.MonacoEnvironment = {
  getWorker(_: any, label: string) {
    if (label === 'json') {
      return new jsonWorker()
    }
    if (label === 'css') {
      return new cssWorker()
    }
    if (label === 'html') {
      return new htmlWorker()
    }
    if (label === 'xml') {
      //   return new xmlWorker();
      return new editorWorker()
    }
    // `editorWorker` 负责处理默认的 `text` 语言和其它基础的编辑器功能。
    return new editorWorker()
  }
}

// 使用 withDefaults 定义 props，提供更强的类型支持和默认值
const props = withDefaults(
  defineProps<{
    modelValue: string
    language?: string
    editorOptions?: monaco.editor.IStandaloneEditorConstructionOptions
  }>(),
  {
    modelValue: '',
    language: 'json',
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

  editorInstance = monaco.editor.create(editorContainer.value, {
    value: props.modelValue,
    language: props.language, // 文本类型(json,css,html)
    theme: 'vs-dark', // 编辑器样式(vscode样式)
    readOnly: false, // 是否只读
    automaticLayout: true,
    tabSize: 2,
    minimap: {
      enabled: false
    },
    formatOnType: true,
    formatOnPaste: true,
    // 合并用户传入的额外配置
    ...props.editorOptions
  })

  // 监听内容变化，并触发 update:modelValue
  editorInstance.onDidChangeModelContent(() => {
    if (!isUpdating) {
      const value = editorInstance!.getValue()
      emit('update:modelValue', value)
      emit('change', value)
    }
  })
})

// 使用 watch 监听 props.modelValue 的变化
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

// 监听 readOnly 属性的变化，动态更新编辑器状态
// watch(
//   () => props.readOnly,
//   (newVal) => {
//     if (editorInstance) {
//       editorInstance.updateOptions({ readOnly: newVal });
//     }
//   },
// );

// 组件卸载前销毁编辑器实例
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
}
</style>
