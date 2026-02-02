import { reactive, computed, watch } from 'vue'
import { createEmptyResume, createDefaultSectionVisibility, createEmptyEducation, createEmptyExperience, createEmptyProject } from '@/utils/types'
import { useLocalStorage } from './useLocalStorage'

const { data: resumeData } = useLocalStorage('resume-data', createEmptyResume())
const { data: sectionVisibility } = useLocalStorage('section-visibility', createDefaultSectionVisibility())
const { data: sectionOrderData } = useLocalStorage('section-order', ['summary', 'experience', 'education', 'skills', 'projects'])

const resume = reactive(resumeData.value)
const visibility = reactive(sectionVisibility.value)
const sectionOrder = reactive({ order: sectionOrderData.value })

watch(resume, (newResume) => {
    resumeData.value = { ...newResume }
}, { deep: true })

watch(visibility, (newVisibility) => {
    sectionVisibility.value = { ...newVisibility }
}, { deep: true })

watch(() => sectionOrder.order, (newOrder) => {
    sectionOrderData.value = [...newOrder]
}, { deep: true })

export const useResume = () => {
    const updatePersonalInfo = (field, value) => {
        resume.personalInfo[field] = value
    }

    const updateSummary = (value) => {
        resume.summary = value
    }

    const addEducation = (education) => {
        resume.education.push(education || createEmptyEducation())
    }

    const updateEducation = (id, updatedEducation) => {
        const index = resume.education.findIndex(e => e.id === id)
        if (index !== -1) {
            resume.education[index] = { ...updatedEducation }
        }
    }

    const deleteEducation = (id) => {
        resume.education = resume.education.filter(e => e.id !== id)
    }

    const addExperience = (experience) => {
        resume.experience.push(experience || createEmptyExperience())
    }

    const updateExperience = (id, updatedExperience) => {
        const index = resume.experience.findIndex(e => e.id === id)
        if (index !== -1) {
            resume.experience[index] = { ...updatedExperience }
        }
    }

    const deleteExperience = (id) => {
        resume.experience = resume.experience.filter(e => e.id !== id)
    }

    const addSkill = (skill) => {
        if (skill && !resume.skills.includes(skill)) {
            resume.skills.push(skill)
        }
    }

    const deleteSkill = (skill) => {
        resume.skills = resume.skills.filter(s => s !== skill)
    }

    const updateSkills = (skills) => {
        resume.skills = [...skills]
    }

    const addProject = (project) => {
        resume.projects.push(project || createEmptyProject())
    }

    const updateProject = (id, updatedProject) => {
        const index = resume.projects.findIndex(p => p.id === id)
        if (index !== -1) {
            resume.projects[index] = { ...updatedProject }
        }
    }

    const deleteProject = (id) => {
        resume.projects = resume.projects.filter(p => p.id !== id)
    }

    const toggleSection = (section) => {
        visibility[section] = !visibility[section]
    }

    const updateSectionVisibility = (section, value) => {
        visibility[section] = value
    }

    const updateSectionOrder = (newOrder) => {
        sectionOrder.order = [...newOrder]
    }

    const hasEducation = computed(() => resume.education.length > 0)
    const hasExperience = computed(() => resume.experience.length > 0)
    const hasSkills = computed(() => resume.skills.length > 0)
    const hasProjects = computed(() => resume.projects.length > 0)

    return {
        resume,
        visibility,
        sectionOrder,
        updatePersonalInfo,
        updateSummary,
        addEducation,
        updateEducation,
        deleteEducation,
        addExperience,
        updateExperience,
        deleteExperience,
        addSkill,
        deleteSkill,
        updateSkills,
        addProject,
        updateProject,
        deleteProject,
        toggleSection,
        updateSectionVisibility,
        updateSectionOrder,
        hasEducation,
        hasExperience,
        hasSkills,
        hasProjects
    }
}
