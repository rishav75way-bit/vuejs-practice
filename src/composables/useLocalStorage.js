import { ref, watch } from 'vue'

export const useLocalStorage = (key, defaultValue) => {
    const data = ref(defaultValue)

    const load = () => {
        try {
            const stored = localStorage.getItem(key)
            if (stored) {
                data.value = JSON.parse(stored)
            }
        } catch (error) {
            console.error(`Error loading from localStorage (${key}):`, error)
        }
    }

    const save = () => {
        try {
            localStorage.setItem(key, JSON.stringify(data.value))
        } catch (error) {
            console.error(`Error saving to localStorage (${key}):`, error)
        }
    }

    const clear = () => {
        try {
            localStorage.removeItem(key)
            data.value = defaultValue
        } catch (error) {
            console.error(`Error clearing localStorage (${key}):`, error)
        }
    }

    watch(data, save, { deep: true })

    load()

    return {
        data,
        save,
        load,
        clear
    }
}
