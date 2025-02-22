<script setup lang="ts">
import type { OptionsItem } from './interfaces'

const props = defineProps<{
  value: string
  options: OptionsItem[]
}>()
const emit = defineEmits(['update:value', 'enter'])
const themeStore = useThemeStore()

const active = computed({
  get() {
    return props.value
  },
  set(val: string) {
    emit('update:value', val)
  },
})

const itemStyle = computed(() => {
  return (item: { path: string }) => {
    return {
      background:
        item?.path === active.value
          ? themeStore.settings.primaryColor
          : '',
      color: item.path === active.value ? '#fff' : '',
      fontSize: item.path === active.value ? '16px' : '14px',
    }
  }
})

/** 鼠标移入 */
async function handleMouse(item: OptionsItem) {
  active.value = item.path
}

/** 回车操作 */
function handleTo() {
  emit('enter')
}
</script>

<template>
  <div class="result">
    <el-scrollbar class="menu-scroll" height="400px">
      <template v-for="item in options" :key="item.path">
        <div
          class="result-item"
          :style="itemStyle(item)"
          @click="handleTo"
          @mouseenter="handleMouse(item)"
        >
          <span class="dot" />
          <span class="result-item-title">{{ item.meta?.title }}</span>
          <el-icon>
            <i-mdi-radiobox-marked v-if="item?.path === active" />
            <i-mdi-radiobox-blank v-else />
          </el-icon>
        </div>
      </template>
    </el-scrollbar>
  </div>
</template>

<style scoped>
  .result {
    padding-bottom: 12px;
  }
  .result-item {
    display: flex;
    align-items: center;
    height: 25px;
    margin-top: 8px;
    padding: 14px;
    border-radius: 4px;
    cursor: pointer;
    border: 0.1px solid #ccc;
    transition: all 0.3s;
  }

  .result-item-title {
    display: flex;
    flex: 1;
    margin-left: 5px;
  }
</style>
