<script setup>
import { ref } from 'vue'
import ClassicTemplate from './templates/ClassicTemplate.vue'
import ModernTemplate from './templates/ModernTemplate.vue'
import { useColorTheme } from '@/composables/useColorTheme'

const props = defineProps({
  resumeData: {
    type: Object,
    required: true
  },
  template: {
    type: String,
    default: 'classic'
  },
  sectionVisibility: {
    type: Object,
    required: true
  },
  sectionOrder: {
    type: Array,
    default: () => ['summary', 'experience', 'education', 'skills', 'projects']
  }
})

const { theme } = useColorTheme()
const previewRef = ref(null)

defineExpose({
  previewRef
})
</script>

<template>
  <div class="h-full overflow-y-auto bg-gray-100 p-6">
    <div ref="previewRef" class="max-w-[8.5in] min-h-[11in] mx-auto bg-white shadow-lg">
      <ClassicTemplate
        v-if="template === 'classic'"
        :resume-data="resumeData"
        :section-visibility="sectionVisibility"
        :section-order="sectionOrder"
        :accent-color="theme.accentColor"
      />
      <ModernTemplate
        v-else-if="template === 'modern'"
        :resume-data="resumeData"
        :section-visibility="sectionVisibility"
        :section-order="sectionOrder"
        :accent-color="theme.accentColor"
      />
    </div>
  </div>
</template>
