<script setup>
import { computed } from 'vue'
import Draggable from 'vuedraggable'

const props = defineProps({
  modelValue: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['update:modelValue'])

const sectionNames = {
  summary: 'Professional Summary',
  experience: 'Work Experience',
  education: 'Education',
  skills: 'Skills',
  projects: 'Projects'
}

const localOrder = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})
</script>

<template>
  <div class="flex flex-col gap-3">
    <h3 class="text-base font-semibold text-gray-900 m-0">Section Order</h3>
    <p class="text-xs text-gray-600 m-0">Drag to reorder sections in your resume</p>
    
    <Draggable
      v-model="localOrder"
      item-key="id"
      class="flex flex-col gap-2"
      handle=".drag-handle"
    >
      <template #item="{ element }">
        <div class="flex items-center gap-3 p-3 bg-gray-50 border border-gray-200 rounded-md cursor-move hover:bg-gray-100 transition-colors">
          <div class="drag-handle flex items-center justify-center text-gray-400 cursor-grab active:cursor-grabbing">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </div>
          <span class="text-sm text-gray-700 flex-1">{{ sectionNames[element] }}</span>
        </div>
      </template>
    </Draggable>
  </div>
</template>
