<script setup>
import ColorPicker from './ColorPicker.vue'

defineProps({
  currentTemplate: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['template-change'])

const templates = [
  {
    id: 'classic',
    name: 'Classic',
    description: 'Traditional single-column'
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'Two-column with sidebar'
  }
]
</script>

<template>
  <div class="flex flex-col gap-6">
    <div class="flex flex-col gap-3">
      <h3 class="text-base font-semibold text-gray-900 m-0">Resume Template</h3>
      <div class="flex flex-col gap-3">
        <button
          v-for="template in templates"
          :key="template.id"
          :class="[
            'flex items-center gap-4 p-4 bg-white border-2 rounded-lg cursor-pointer transition-all text-left',
            currentTemplate === template.id 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-gray-200 hover:border-blue-500 hover:bg-gray-50'
          ]"
          @click="emit('template-change', template.id)"
        >
          <div class="text-3xl">
            {{ template.id === 'classic' ? '📄' : '📋' }}
          </div>
          <div class="flex-1">
            <h4 class="text-[15px] font-semibold text-gray-900 m-0 mb-0.5">{{ template.name }}</h4>
            <p class="text-[13px] text-gray-600 m-0">{{ template.description }}</p>
          </div>
        </button>
      </div>
    </div>

    <div class="h-px bg-gray-200"></div>

    <ColorPicker />
  </div>
</template>
