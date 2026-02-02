<script setup>
import { onMounted, onUnmounted } from 'vue'

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['close'])

const handleEscape = (event) => {
  if (event.key === 'Escape' && props.show) {
    emit('close')
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleEscape)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscape)
})

const handleBackdropClick = () => {
  emit('close')
}
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-200"
      leave-active-class="transition-opacity duration-200"
      enter-from-class="opacity-0"
      leave-to-class="opacity-0"
    >
      <div v-if="show" class="fixed inset-0 z-[1000] flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-black/50" @click="handleBackdropClick"></div>
        <div class="relative bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl transition-transform duration-200"
             :class="show ? 'scale-100' : 'scale-95'">
          <div class="flex items-center justify-between px-5 py-5 border-b border-gray-200">
            <h3 class="text-lg font-semibold text-gray-900 m-0">{{ title }}</h3>
            <button 
              class="bg-transparent border-none cursor-pointer text-gray-600 p-1 flex items-center justify-center rounded transition-all hover:bg-gray-100 hover:text-gray-900"
              @click="emit('close')"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          <div class="px-5 py-5 overflow-y-auto flex-1">
            <slot />
          </div>
          <div v-if="$slots.footer" class="px-5 py-4 border-t border-gray-200 bg-gray-50 flex gap-3 justify-end">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
