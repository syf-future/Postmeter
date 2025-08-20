<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import Dropdown from '@renderer/templates/dropdown.vue'

// 下拉选择数据类型
const apiType = ref('JSON')
const onSelect = (item: string) => {
  apiType.value = item
}
const types = ['TEXT', 'JSON', 'XML']

// ===== CodeMirror 集成 =====
import { EditorView, highlightActiveLine } from '@codemirror/view'
import { EditorState } from '@codemirror/state'
import { json } from '@codemirror/lang-json'
import { defaultHighlightStyle, syntaxHighlighting } from '@codemirror/language'
import { history, historyKeymap } from '@codemirror/commands'
import { linter, Diagnostic } from '@codemirror/lint'
import { keymap } from '@codemirror/view'

let view: EditorView | null = null

// JSON 错误检测函数
const jsonLinter = linter(view => {
  const diagnostics: Diagnostic[] = []
  const text = view.state.doc.toString()
  try {
    JSON.parse(text)
  } catch (err: any) {
    if (err instanceof SyntaxError && err.message) {
      // 尝试解析错误位置（仅粗略位置）
      const match = /position (\d+)/.exec(err.message)
      let pos = 0
      if (match) pos = parseInt(match[1])
      diagnostics.push({
        from: pos,
        to: pos + 1,
        severity: 'error',
        message: err.message
      })
    } else {
      diagnostics.push({
        from: 0,
        to: text.length,
        severity: 'error',
        message: err.message || 'JSON 错误'
      })
    }
  }
  return diagnostics
})

onMounted(() => {
  const parent = document.querySelector('.param-json')
  if (parent) {
    const state = EditorState.create({
      // doc: '{\n  "name": "ChatGPT"\n}', // 默认示例
      extensions: [
        history(),
        keymap.of(historyKeymap),
        json(),
        syntaxHighlighting(defaultHighlightStyle),
        highlightActiveLine(),
        // oneDark,
        jsonLinter // ✅ 错误下划线提示
      ]
    })

    view = new EditorView({
      state,
      parent
    })
  }
})

onBeforeUnmount(() => {
  if (view) {
    view.destroy()
    view = null
  }
})
</script>

<template>
  <div id="workbench-body">
    <div class="param-title">
      <div class="param-type">
        <span>数据类型</span>
        <div class="title-type">
          <Dropdown :label="apiType" :types="types" @select="onSelect" />
        </div>
      </div>
      <div class="add-btn"><p>+</p></div>
    </div>

    <!-- JSON 编辑器区域 -->
    <div class="param-json"></div>
  </div>
</template>

<style lang="scss" scoped>
#workbench-body {
  width: 100%;
  height: 100%;
}

.param-title {
  margin: 5px 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(--ev-c-text-color1);
  font-size: 14px;

  .param-type {
    display: flex;

    .title-type {
      margin-left: 5px;
      font-size: 15px;
      color: var(--ev-c-text-color2);
    }
  }
}

.add-btn {
  display: flex;
  width: 30px;
  height: 30px;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  border-radius: 50px;
  color: var(--ev-c-text-color1);
  cursor: pointer;
  &:hover {
    color: var(--ev-c-text-color2);
    background: var(--ev-c-background-color1);
  }
  p {
    margin: 0;
  }
}

.param-json {
  width: calc(100% - 20px);
  height: calc(100% - 90px);
  margin: 5px 10px;
  border: 1px solid var(--ev-c-border-color1);
  overflow: auto;
  font-size: 18px;
}
</style>
