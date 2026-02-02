<script setup>
const props = defineProps({
  modelValue: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['update:modelValue'])

const sections = [
  { key: 'summary', label: 'Professional Summary' },
  { key: 'education', label: 'Education' },
  { key: 'experience', label: 'Work Experience' },
  { key: 'skills', label: 'Skills' },
  { key: 'projects', label: 'Projects' }
]

const toggleSection = (key) => {
  emit('update:modelValue', {
    ...props.modelValue,
    [key]: !props.modelValue[key]
  })
}
</script>

<template>
  <div class="flex flex-col gap-3">
    <h3 class="text-base font-semibold text-gray-900 m-0">Section Visibility</h3>
    <div class="flex flex-col gap-2">
      <label
        v-for="section in sections"
        :key="section.key"
        class="flex items-center gap-2 cursor-pointer p-2 rounded-md transition-colors hover:bg-gray-50"
      >
        <input
          type="checkbox"
          :checked="modelValue[section.key]"
          class="w-4 h-4 cursor-pointer"
          @change="toggleSection(section.key)"
        />
        <span class="text-sm text-gray-700">{{ section.label }}</span>
      </label>
    </div>
  </div>
</template>
