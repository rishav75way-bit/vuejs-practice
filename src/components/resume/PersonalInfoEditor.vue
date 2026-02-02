<script setup>
import BaseInput from '@/components/base/BaseInput.vue'

const props = defineProps({
  modelValue: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['update:modelValue'])

const updateField = (field, value) => {
  emit('update:modelValue', {
    ...props.modelValue,
    [field]: value
  })
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <h3 class="text-lg font-semibold text-gray-900 m-0">Personal Information</h3>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <BaseInput
        :model-value="modelValue.name"
        label="Full Name"
        placeholder="John Doe"
        required
        @update:model-value="updateField('name', $event)"
      />
      <BaseInput
        :model-value="modelValue.email"
        label="Email"
        type="email"
        placeholder="john@example.com"
        @update:model-value="updateField('email', $event)"
      />
      <BaseInput
        :model-value="modelValue.phone"
        label="Phone"
        type="tel"
        placeholder="+1 (555) 123-4567"
        @update:model-value="updateField('phone', $event)"
      />
      <BaseInput
        :model-value="modelValue.location"
        label="Location"
        placeholder="San Francisco, CA"
        @update:model-value="updateField('location', $event)"
      />
      <BaseInput
        :model-value="modelValue.linkedin"
        label="LinkedIn"
        placeholder="linkedin.com/in/johndoe"
        @update:model-value="updateField('linkedin', $event)"
      />
      <BaseInput
        :model-value="modelValue.website"
        label="Website"
        type="url"
        placeholder="johndoe.com"
        @update:model-value="updateField('website', $event)"
      />
    </div>
  </div>
</template>
