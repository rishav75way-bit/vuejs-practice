<script setup>
import { computed } from 'vue'
import { formatDateRange } from '@/utils/dateHelpers'

const props = defineProps({
  resumeData: {
    type: Object,
    required: true
  },
  sectionVisibility: {
    type: Object,
    required: true
  },
  sectionOrder: {
    type: Array,
    default: () => ['summary', 'experience', 'education', 'skills', 'projects']
  },
  accentColor: {
    type: String,
    default: '#3b82f6'
  }
})

const sectionComponents = computed(() => {
  const sections = {
    summary: {
      key: 'summary',
      title: 'Professional Summary',
      visible: props.sectionVisibility.summary && props.resumeData.summary
    },
    experience: {
      key: 'experience',
      title: 'Work Experience',
      visible: props.sectionVisibility.experience && props.resumeData.experience.length > 0
    },
    education: {
      key: 'education',
      title: 'Education',
      visible: props.sectionVisibility.education && props.resumeData.education.length > 0
    },
    skills: {
      key: 'skills',
      title: 'Skills',
      visible: props.sectionVisibility.skills && props.resumeData.skills.length > 0
    },
    projects: {
      key: 'projects',
      title: 'Projects',
      visible: props.sectionVisibility.projects && props.resumeData.projects.length > 0
    }
  }

  return props.sectionOrder.map(key => sections[key]).filter(section => section.visible)
})
</script>

<template>
  <div class="font-serif text-[#1a1a1a] leading-relaxed p-8 bg-white">
    <header class="text-center mb-6 pb-4 border-b-2" :style="{ borderColor: accentColor }">
      <h1 class="text-4xl font-bold m-0 mb-2 uppercase tracking-wide">{{ resumeData.personalInfo.name || 'Your Name' }}</h1>
      <div class="flex justify-center gap-4 flex-wrap text-sm mb-2">
        <span v-if="resumeData.personalInfo.email">{{ resumeData.personalInfo.email }}</span>
        <span v-if="resumeData.personalInfo.phone" class="before:content-['•'] before:mr-4">{{ resumeData.personalInfo.phone }}</span>
        <span v-if="resumeData.personalInfo.location" class="before:content-['•'] before:mr-4">{{ resumeData.personalInfo.location }}</span>
      </div>
      <div class="flex justify-center gap-4 flex-wrap text-sm">
        <a v-if="resumeData.personalInfo.linkedin" :href="resumeData.personalInfo.linkedin" target="_blank" class="text-[#1a1a1a] no-underline hover:underline">
          {{ resumeData.personalInfo.linkedin }}
        </a>
        <a v-if="resumeData.personalInfo.website" :href="resumeData.personalInfo.website" target="_blank" class="text-[#1a1a1a] no-underline hover:underline">
          {{ resumeData.personalInfo.website }}
        </a>
      </div>
    </header>

    <template v-for="section in sectionComponents" :key="section.key">
      <section v-if="section.key === 'summary'" class="mb-6">
        <h2 class="text-xl font-bold uppercase tracking-wide m-0 mb-3 pb-1 border-b" :style="{ borderColor: accentColor }">{{ section.title }}</h2>
        <p class="text-sm m-0">{{ resumeData.summary }}</p>
      </section>

      <section v-else-if="section.key === 'experience'" class="mb-6">
        <h2 class="text-xl font-bold uppercase tracking-wide m-0 mb-3 pb-1 border-b border-[#1a1a1a]">{{ section.title }}</h2>
        <div v-for="exp in resumeData.experience" :key="exp.id" class="mb-4">
          <div class="flex justify-between items-start gap-4 mb-1">
            <div>
              <h3 class="text-base font-bold m-0">{{ exp.title }}</h3>
              <p class="text-sm italic m-0 mt-0.5">{{ exp.company }}<span v-if="exp.location">, {{ exp.location }}</span></p>
            </div>
            <p v-if="exp.startDate" class="text-[13.6px] text-[#555] m-0 whitespace-nowrap">{{ formatDateRange(exp.startDate, exp.endDate) }}</p>
          </div>
          <p v-if="exp.description" class="text-sm m-0 mt-2">{{ exp.description }}</p>
        </div>
      </section>

      <section v-else-if="section.key === 'education'" class="mb-6">
        <h2 class="text-xl font-bold uppercase tracking-wide m-0 mb-3 pb-1 border-b border-[#1a1a1a]">{{ section.title }}</h2>
        <div v-for="edu in resumeData.education" :key="edu.id" class="mb-4">
          <div class="flex justify-between items-start gap-4 mb-1">
            <div>
              <h3 class="text-base font-bold m-0">{{ edu.degree }}</h3>
              <p class="text-sm italic m-0 mt-0.5">{{ edu.institution }}<span v-if="edu.location">, {{ edu.location }}</span></p>
            </div>
            <p v-if="edu.startDate" class="text-[13.6px] text-[#555] m-0 whitespace-nowrap">{{ formatDateRange(edu.startDate, edu.endDate) }}</p>
          </div>
          <p v-if="edu.description" class="text-sm m-0 mt-2">{{ edu.description }}</p>
        </div>
      </section>

      <section v-else-if="section.key === 'projects'" class="mb-6">
        <h2 class="text-xl font-bold uppercase tracking-wide m-0 mb-3 pb-1 border-b border-[#1a1a1a]">{{ section.title }}</h2>
        <div v-for="project in resumeData.projects" :key="project.id" class="mb-4">
          <h3 class="text-base font-bold m-0">
            {{ project.name }}
            <a v-if="project.link" :href="project.link" target="_blank" class="text-[13.6px] no-underline ml-1">🔗</a>
          </h3>
          <p v-if="project.description" class="text-sm m-0 mt-2">{{ project.description }}</p>
          <p v-if="project.technologies.length > 0" class="text-[13.6px] m-0 mt-1">
            <strong>Technologies:</strong> {{ project.technologies.join(', ') }}
          </p>
        </div>
      </section>

      <section v-else-if="section.key === 'skills'" class="mb-6">
        <h2 class="text-xl font-bold uppercase tracking-wide m-0 mb-3 pb-1 border-b border-[#1a1a1a]">{{ section.title }}</h2>
        <p class="text-sm m-0">{{ resumeData.skills.join(' • ') }}</p>
      </section>
    </template>
  </div>
</template>
