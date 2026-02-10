<script setup>
import { ref } from 'vue'
import BaseButton from '@/components/base/BaseButton.vue'
import BaseInput from '@/components/base/BaseInput.vue'

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['update:modelValue'])

const newSkill = ref('')

const addSkill = () => {
  const skill = newSkill.value.trim()
  if (skill && !props.modelValue.includes(skill)) {
    emit('update:modelValue', [...props.modelValue, skill])
    newSkill.value = ''
  }
}

const removeSkill = (skill) => {
  emit('update:modelValue', props.modelValue.filter(s => s !== skill))
}

const handleKeyPress = (event) => {
  if (event.key === 'Enter') {
    event.preventDefault()
    addSkill()
  }
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <h3 class="text-lg font-semibold text-gray-900 m-0">Skills</h3>
    
    <div class="flex gap-3 items-end">
      <BaseInput
        v-model="newSkill"
        placeholder="Type a skill and press Enter or click Add"
        @keypress="handleKeyPress"
      />
      <BaseButton size="small" @click="addSkill">
        Add
      </BaseButton>
    </div>

    <div v-if="modelValue.length === 0" class="p-8 text-center text-gray-600 bg-gray-50 border border-dashed border-gray-300 rounded-lg">
      No skills added yet. Add your skills above.
    </div>

    <div v-else class="flex flex-wrap gap-2">
      <div
        v-for="skill in modelValue"
        :key="skill"
        class="inline-flex items-center gap-2 px-3 py-2 bg-blue-50 text-blue-800 border border-blue-200 rounded-md text-sm"
      >
        <span>{{ skill }}</span>
        <button 
          class="flex items-center justify-center bg-transparent border-none cursor-pointer text-blue-800 p-0 transition-colors hover:text-blue-900"
          @click="removeSkill(skill)"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>
