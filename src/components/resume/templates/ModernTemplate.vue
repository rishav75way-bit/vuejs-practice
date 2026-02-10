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

const sidebarGradient = computed(() => {
  return `linear-gradient(135deg, ${props.accentColor} 0%, ${adjustColor(props.accentColor, -20)} 100%)`
})

const adjustColor = (color, percent) => {
  const num = parseInt(color.replace('#', ''), 16)
  const amt = Math.round(2.55 * percent)
  const R = (num >> 16) + amt
  const G = (num >> 8 & 0x00FF) + amt
  const B = (num & 0x0000FF) + amt
  return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
    (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
    (B < 255 ? B < 1 ? 0 : B : 255))
    .toString(16).slice(1)
}

const mainSections = computed(() => {
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
    projects: {
      key: 'projects',
      title: 'Projects',
      visible: props.sectionVisibility.projects && props.resumeData.projects.length > 0
    }
  }

  return props.sectionOrder
    .filter(key => ['summary', 'experience', 'projects'].includes(key))
    .map(key => sections[key])
    .filter(section => section.visible)
})
</script>

<template>
  <div class="font-sans text-gray-800 leading-relaxed grid grid-cols-[280px_1fr] bg-white min-h-full">
    <div class="text-white px-6 py-8" :style="{ background: sidebarGradient }">
      <div class="mb-8">
        <h1 class="text-3xl font-bold m-0 mb-4 leading-tight">{{ resumeData.personalInfo.name || 'Your Name' }}</h1>
        <div class="flex flex-col gap-2">
          <p v-if="resumeData.personalInfo.email" class="text-[13.6px] m-0 break-words">
            📧 {{ resumeData.personalInfo.email }}
          </p>
          <p v-if="resumeData.personalInfo.phone" class="text-[13.6px] m-0 break-words">
            📱 {{ resumeData.personalInfo.phone }}
          </p>
          <p v-if="resumeData.personalInfo.location" class="text-[13.6px] m-0 break-words">
            📍 {{ resumeData.personalInfo.location }}
          </p>
          <p v-if="resumeData.personalInfo.linkedin" class="text-[13.6px] m-0 break-words">
            🔗 <a :href="resumeData.personalInfo.linkedin" target="_blank" class="text-white no-underline hover:underline">LinkedIn</a>
          </p>
          <p v-if="resumeData.personalInfo.website" class="text-[13.6px] m-0 break-words">
            🌐 <a :href="resumeData.personalInfo.website" target="_blank" class="text-white no-underline hover:underline">Website</a>
          </p>
        </div>
      </div>

      <div v-if="sectionVisibility.skills && resumeData.skills.length > 0" class="mb-8">
        <h2 class="text-lg font-bold m-0 mb-3 uppercase tracking-wide border-b-2 border-white/30 pb-1">Skills</h2>
        <div class="flex flex-wrap gap-2">
          <span
            v-for="skill in resumeData.skills"
            :key="skill"
            class="bg-white/20 px-3 py-1.5 rounded-md text-[13px] font-medium"
          >
            {{ skill }}
          </span>
        </div>
      </div>

      <div v-if="sectionVisibility.education && resumeData.education.length > 0" class="mb-8">
        <h2 class="text-lg font-bold m-0 mb-3 uppercase tracking-wide border-b-2 border-white/30 pb-1">Education</h2>
        <div
          v-for="edu in resumeData.education"
          :key="edu.id"
          class="mb-4"
        >
          <h3 class="text-[15px] font-semibold m-0 mb-1">{{ edu.degree }}</h3>
          <p class="text-[13px] m-0 mb-0.5 opacity-90">{{ edu.institution }}</p>
          <p v-if="edu.startDate" class="text-xs m-0 opacity-80">{{ formatDateRange(edu.startDate, edu.endDate) }}</p>
        </div>
      </div>
    </div>

    <div class="px-8 py-8">
      <template v-for="section in mainSections" :key="section.key">
        <section v-if="section.key === 'summary'" class="mb-8">
          <div class="mb-4">
            <h2 class="text-[22px] font-bold m-0 mb-2" :style="{ color: accentColor }">{{ section.title }}</h2>
            <div class="w-[60px] h-[3px]" :style="{ background: sidebarGradient }"></div>
          </div>
          <p class="text-[15px] m-0 text-gray-700">{{ resumeData.summary }}</p>
        </section>

        <section v-else-if="section.key === 'experience'" class="mb-8">
          <div class="mb-4">
            <h2 class="text-[22px] font-bold m-0 mb-2" :style="{ color: accentColor }">{{ section.title }}</h2>
            <div class="w-[60px] h-[3px]" :style="{ background: sidebarGradient }"></div>
          </div>
          <div v-for="exp in resumeData.experience" :key="exp.id" class="mb-5">
            <div class="flex justify-between items-start gap-4 mb-2">
              <div>
                <h3 class="text-[17px] font-bold m-0 text-gray-900">{{ exp.title }}</h3>
                <p class="text-[15px] m-0 mt-1 text-gray-600">{{ exp.company }}<span v-if="exp.location">, {{ exp.location }}</span></p>
              </div>
              <p v-if="exp.startDate" class="text-sm text-gray-400 m-0 whitespace-nowrap">{{ formatDateRange(exp.startDate, exp.endDate) }}</p>
            </div>
            <p v-if="exp.description" class="text-[15px] m-0 text-gray-700">{{ exp.description }}</p>
          </div>
        </section>

        <section v-else-if="section.key === 'projects'" class="mb-8">
          <div class="mb-4">
            <h2 class="text-[22px] font-bold m-0 mb-2" :style="{ color: accentColor }">{{ section.title }}</h2>
            <div class="w-[60px] h-[3px]" :style="{ background: sidebarGradient }"></div>
          </div>
          <div v-for="project in resumeData.projects" :key="project.id" class="mb-5">
            <h3 class="text-[17px] font-bold m-0 text-gray-900">
              {{ project.name }}
              <a v-if="project.link" :href="project.link" target="_blank" class="text-sm no-underline ml-1">🔗</a>
            </h3>
            <p v-if="project.description" class="text-[15px] m-0 mt-2 text-gray-700">{{ project.description }}</p>
            <p v-if="project.technologies.length > 0" class="text-sm m-0 mt-2 text-gray-600">
              <strong>Technologies:</strong> {{ project.technologies.join(', ') }}
            </p>
          </div>
        </section>
      </template>
    </div>
  </div>
</template>
