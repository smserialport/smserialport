<template>
  <div
    flex="~ col"
    gap-2
  >
    <div
      v-for="item in props.list"
      :key="item.text"
      flex
      items-center
      gap-1
    >
      <div
        h-6
        w-6
        :class="item.done ? 'i-material-symbols-check-box-rounded bg-green-6' : 'i-material-symbols-check-box-outline-blank bg-gray-4'"
      />

      <div>{{ item.text }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
type TodoItem = { text: string, done: boolean }

const props = defineProps<{
  list: TodoItem[]
}>()
</script>
