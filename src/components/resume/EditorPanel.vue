<script setup>
import { computed } from 'vue'
import PersonalInfoEditor from './PersonalInfoEditor.vue'
import SummaryEditor from './SummaryEditor.vue'
import EducationEditor from './EducationEditor.vue'
import ExperienceEditor from './ExperienceEditor.vue'
import SkillsEditor from './SkillsEditor.vue'
import ProjectsEditor from './ProjectsEditor.vue'
import SectionToggle from './SectionToggle.vue'
import SectionOrderEditor from './SectionOrderEditor.vue'
import { useResume } from '@/composables/useResume'

const { resume, visibility, sectionOrder, updateSectionVisibility, updateSectionOrder } = useResume()

const sectionComponents = {
  summary: SummaryEditor,
  experience: ExperienceEditor,
  education: EducationEditor,
  skills: SkillsEditor,
  projects: ProjectsEditor
}

const orderedSections = computed(() => {
  return sectionOrder.order.map(key => ({
    key,
    component: sectionComponents[key],
    model: key === 'summary' ? computed({
      get: () => resume.summary,
      set: (val) => resume.summary = val
    }) : computed({
      get: () => resume[key],
      set: (val) => resume[key] = val
    })
  }))
})
</script>

<template>
  <div class="h-full flex flex-col bg-white">
    <div class="px-6 py-6 border-b border-gray-200 bg-gray-50">
      <h2 class="text-2xl font-bold text-gray-900 m-0 mb-1">Resume Editor</h2>
      <p class="text-sm text-gray-600 m-0">Edit your resume details below. Changes are saved automatically.</p>
    </div>

    <div class="flex-1 overflow-y-auto px-6 py-6">
      <div class="mb-6">
        <PersonalInfoEditor v-model="resume.personalInfo" />
      </div>

      <div class="h-px bg-gray-200 my-6"></div>

      <template v-for="(section, index) in orderedSections" :key="section.key">
        <div class="mb-6">
          <component
            :is="section.component"
            v-model="section.model.value"
          />
        </div>
        <div v-if="index < orderedSections.length - 1" class="h-px bg-gray-200 my-6"></div>
      </template>

      <div class="h-px bg-gray-200 my-6"></div>

      <div class="mb-6">
        <SectionToggle v-model="visibility" @update:model-value="updateSectionVisibility" />
      </div>

      <div class="h-px bg-gray-200 my-6"></div>

      <div class="mb-6">
        <SectionOrderEditor v-model="sectionOrder.order" @update:model-value="updateSectionOrder" />
      </div>
    </div>
  </div>
</template>
