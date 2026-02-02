<script setup>
import BaseTextarea from '@/components/base/BaseTextarea.vue'

defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <div class="flex flex-col gap-4">
    <h3 class="text-lg font-semibold text-gray-900 m-0">Professional Summary</h3>
    <BaseTextarea
      :model-value="modelValue"
      placeholder="Write a brief professional summary highlighting your key skills and experience..."
      :rows="5"
      @update:model-value="emit('update:modelValue', $event)"
    />
  </div>
</template>
