<script setup>
defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  options: {
    type: Array,
    required: true,
    default: () => []
  },
  label: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: 'Select an option'
  }
})

const emit = defineEmits(['update:modelValue'])

const handleChange = (event) => {
  emit('update:modelValue', event.target.value)
}
</script>

<template>
  <div class="flex flex-col gap-2">
    <label v-if="label" class="text-sm font-medium text-gray-700">
      {{ label }}
    </label>
    <select
      :value="modelValue"
      class="px-3.5 py-2.5 border border-gray-300 rounded-md text-sm bg-white cursor-pointer transition-all outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
      @change="handleChange"
    >
      <option value="" disabled>{{ placeholder }}</option>
      <option
        v-for="option in options"
        :key="option.value || option"
        :value="option.value || option"
      >
        {{ option.label || option }}
      </option>
    </select>
  </div>
</template>
