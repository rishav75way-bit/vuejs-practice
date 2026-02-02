<script setup>
defineProps({
  title: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <div class="bg-white border border-gray-200 rounded-lg overflow-hidden">
    <div v-if="title || $slots.header" class="px-5 py-4 border-b border-gray-200 bg-gray-50">
      <slot name="header">
        <h3 class="text-base font-semibold text-gray-900 m-0">{{ title }}</h3>
      </slot>
    </div>
    <div class="p-5">
      <slot />
    </div>
    <div v-if="$slots.footer" class="px-5 py-4 border-t border-gray-200 bg-gray-50">
      <slot name="footer" />
    </div>
  </div>
</template>
