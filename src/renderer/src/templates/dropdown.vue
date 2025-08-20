<script setup lang="ts">
import { ref, computed } from 'vue'
import { Option } from '@renderer/interfaces/option'

const props = defineProps<{
  label?: string
  options?: Option[]
}>()

const emit = defineEmits<{
  (e: 'select', item: Option): void
}>()

const visible = ref(false)
const selected = ref<Option | null>(null)

const toggle = () => {
  visible.value = !visible.value
}

const selectItem = (item: Option) => {
  selected.value = item
  emit('select', item)
  visible.value = false
}

// 根据 props.label 找到默认高亮的选项
const activeOption = computed(() => {
  if (selected.value) return selected.value
  if (props.label && props.options) {
    return props.options.find((opt) => opt.label === props.label) || null
  }
  return null
})

// 根据 label 值返回 class
const getColorClass = (label?: string) => {
  switch (label?.toUpperCase()) {
    case 'GET':
      return 'text-get'
    case 'POST':
      return 'text-post'
    case 'PUT':
      return 'text-put'
    case 'DELETE':
      return 'text-delete'
    default:
      return ''
  }
}
</script>

<template>
  <div class="dropdown">
    <div
      class="dropdown-trigger"
      :class="getColorClass(selected?.label || props.label)"
      @click="toggle"
    >
      <p>
        {{ selected?.label || props.label || '请选择' }}
      </p>
      <span class="arrow">▼</span>
    </div>
    <ul v-if="visible" class="dropdown-menu">
      <li
        v-for="item in props.options"
        :key="item.value"
        @click="selectItem(item)"
        :class="[{ active: activeOption?.value === item.value }, getColorClass(item.label)]"
      >
        {{ item.label }}
      </li>
    </ul>
  </div>
</template>

<style lang="scss">
.dropdown {
  width: 100%;
  height: 100%;
  position: relative;
  display: inline-block;
  p {
    font-weight: bold; // 加粗
  }
}
.dropdown-trigger {
  cursor: pointer;
  width: 100%;
  height: 100%;
  padding: 0px 6px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  user-select: none;
  user-select: none;
  cursor: pointer;

  &:hover {
    background-color: var(--ev-c-background-color3);
  }
}
.dropdown-menu {
  width: 100%;
  position: absolute;
  cursor: pointer;
  border: 1px solid var(--ev-c-border-color1);
  background-color: var(--ev-c-background-color2);
  border-radius: 4px;
  padding: 0px 0px;
  z-index: 999;
}
.dropdown-menu li {
  padding: 4px 8px;
  border-bottom: 1px solid var(--ev-c-border-color1);
}
// 去掉最后一个 li 的下边框
.dropdown-menu li:last-child {
  border-bottom: none;
  border-bottom: 1px solid var(--ev-c-border-color1);
}
// 去掉最后一个 li 的下边框
.dropdown-menu li:last-child {
  border-bottom: none;
}
.dropdown-menu li:hover,
.dropdown-menu li.active {
  background-color: var(--ev-c-background-color3);
}
.arrow {
  margin-left: 8px;
  color: var(--ev-c-text-color1);
}

/* 根据 label 设置颜色 */
.text-get {
  color: green;
}
.text-post {
  color: goldenrod;
}
.text-put {
  color: goldenrod;
}
.text-delete {
  color: red;
}
</style>
