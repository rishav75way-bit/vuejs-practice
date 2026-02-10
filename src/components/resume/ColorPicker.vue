<script setup>
import { useColorTheme } from '@/composables/useColorTheme'

const { theme, predefinedColors, setAccentColor } = useColorTheme()
</script>

<template>
  <div class="flex flex-col gap-3">
    <h3 class="text-base font-semibold text-gray-900 m-0">Accent Color</h3>
    <p class="text-xs text-gray-600 m-0">Choose a color for headers and accents</p>
    
    <div class="grid grid-cols-3 gap-2">
      <button
        v-for="color in predefinedColors"
        :key="color.value"
        :class="[
          'h-10 rounded-md border-2 transition-all cursor-pointer hover:scale-105',
          theme.accentColor === color.value ? 'border-gray-900 ring-2 ring-gray-300' : 'border-gray-200'
        ]"
        :style="{ backgroundColor: color.value }"
        :title="color.name"
        @click="setAccentColor(color.value)"
      >
        <span v-if="theme.accentColor === color.value" class="text-white text-xl">✓</span>
      </button>
    </div>

    <div class="flex items-center gap-2 mt-2">
      <label class="text-sm text-gray-700">Custom:</label>
      <input
        type="color"
        :value="theme.accentColor"
        class="h-10 w-20 rounded border border-gray-300 cursor-pointer"
        @input="setAccentColor($event.target.value)"
      />
      <span class="text-xs text-gray-600">{{ theme.accentColor }}</span>
    </div>
  </div>
</template>
