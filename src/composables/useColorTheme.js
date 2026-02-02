import { reactive, watch } from 'vue'
import { useLocalStorage } from './useLocalStorage'

const { data: themeData } = useLocalStorage('resume-theme', {
    accentColor: '#3b82f6'
})

const theme = reactive(themeData.value)

watch(theme, (newTheme) => {
    themeData.value = { ...newTheme }
}, { deep: true })

export const useColorTheme = () => {
    const predefinedColors = [
        { name: 'Blue', value: '#3b82f6' },
        { name: 'Indigo', value: '#6366f1' },
        { name: 'Purple', value: '#a855f7' },
        { name: 'Pink', value: '#ec4899' },
        { name: 'Red', value: '#ef4444' },
        { name: 'Orange', value: '#f97316' },
        { name: 'Green', value: '#10b981' },
        { name: 'Teal', value: '#14b8a6' },
        { name: 'Cyan', value: '#06b6d4' }
    ]

    const setAccentColor = (color) => {
        theme.accentColor = color
    }

    return {
        theme,
        predefinedColors,
        setAccentColor
    }
}
