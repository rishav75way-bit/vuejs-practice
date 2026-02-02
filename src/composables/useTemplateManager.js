import { ref, watch } from 'vue'
import { useLocalStorage } from './useLocalStorage'

const { data: currentTemplate } = useLocalStorage('resume-template', 'classic')
const template = ref(currentTemplate.value)

watch(template, (newTemplate) => {
    currentTemplate.value = newTemplate
})

export const useTemplateManager = () => {
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

    const setTemplate = (templateId) => {
        template.value = templateId
    }

    const getTemplateInfo = (templateId) => {
        return templates.find(t => t.id === templateId)
    }

    return {
        template,
        templates,
        setTemplate,
        getTemplateInfo
    }
}
