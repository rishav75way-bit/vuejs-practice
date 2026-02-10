import { useResume } from './useResume'
import { useTemplateManager } from './useTemplateManager'
import { useColorTheme } from './useColorTheme'

export const useImportExport = () => {
    const { resume, visibility, sectionOrder } = useResume()
    const { template } = useTemplateManager()
    const { theme } = useColorTheme()

    const exportToJSON = () => {
        const data = {
            resume: resume,
            visibility: visibility,
            sectionOrder: sectionOrder.order,
            template: template.value,
            theme: theme.value,
            exportedAt: new Date().toISOString(),
            version: '1.0'
        }

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = `resume-${resume.personalInfo.name || 'data'}-${Date.now()}.json`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(url)

        return true
    }

    const importFromJSON = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()

            reader.onload = (e) => {
                try {
                    const data = JSON.parse(e.target.result)

                    if (!data.resume || !data.visibility) {
                        reject(new Error('Invalid resume data format'))
                        return
                    }

                    Object.assign(resume, data.resume)
                    Object.assign(visibility, data.visibility)

                    if (data.sectionOrder) {
                        sectionOrder.order = [...data.sectionOrder]
                    }

                    if (data.template) {
                        template.value = data.template
                    }

                    if (data.theme) {
                        theme.value = { ...data.theme }
                    }

                    localStorage.setItem('resume-data', JSON.stringify(data.resume))
                    localStorage.setItem('section-visibility', JSON.stringify(data.visibility))
                    if (data.sectionOrder) {
                        localStorage.setItem('section-order', JSON.stringify(data.sectionOrder))
                    }
                    if (data.template) {
                        localStorage.setItem('resume-template', data.template)
                    }
                    if (data.theme) {
                        localStorage.setItem('resume-theme', JSON.stringify(data.theme))
                    }

                    resolve(data)
                } catch (error) {
                    reject(new Error('Failed to parse JSON file: ' + error.message))
                }
            }

            reader.onerror = () => {
                reject(new Error('Failed to read file'))
            }

            reader.readAsText(file)
        })
    }

    return {
        exportToJSON,
        importFromJSON
    }
}
