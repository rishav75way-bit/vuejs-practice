<script setup>
import { ref } from 'vue'
import BaseButton from '@/components/base/BaseButton.vue'
import BaseInput from '@/components/base/BaseInput.vue'
import BaseTextarea from '@/components/base/BaseTextarea.vue'
import BaseModal from '@/components/base/BaseModal.vue'
import { createEmptyEducation } from '@/utils/types'
import { formatDateRange } from '@/utils/dateHelpers'

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['update:modelValue'])

const showModal = ref(false)
const editingItem = ref(null)
const formData = ref(createEmptyEducation())

const openAddModal = () => {
  formData.value = createEmptyEducation()
  editingItem.value = null
  showModal.value = true
}

const openEditModal = (item) => {
  formData.value = { ...item }
  editingItem.value = item.id
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  formData.value = createEmptyEducation()
  editingItem.value = null
}

const saveItem = () => {
  if (editingItem.value) {
    const updated = props.modelValue.map(item =>
      item.id === editingItem.value ? { ...formData.value } : item
    )
    emit('update:modelValue', updated)
  } else {
    emit('update:modelValue', [...props.modelValue, { ...formData.value }])
  }
  closeModal()
}

const deleteItem = (id) => {
  if (confirm('Are you sure you want to delete this education entry?')) {
    emit('update:modelValue', props.modelValue.filter(item => item.id !== id))
  }
}

const updateFormField = (field, value) => {
  formData.value[field] = value
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex items-center justify-between">
      <h3 class="text-lg font-semibold text-gray-900 m-0">Education</h3>
      <BaseButton size="small" @click="openAddModal">
        + Add Education
      </BaseButton>
    </div>

    <div v-if="modelValue.length === 0" class="p-8 text-center text-gray-600 bg-gray-50 border border-dashed border-gray-300 rounded-lg">
      No education entries yet. Click "Add Education" to get started.
    </div>

    <div v-else class="flex flex-col gap-3">
      <div
        v-for="item in modelValue"
        :key="item.id"
        class="flex items-start justify-between gap-4 p-4 bg-gray-50 border border-gray-200 rounded-lg"
      >
        <div class="flex-1">
          <h4 class="text-[15px] font-semibold text-gray-900 m-0 mb-1">{{ item.degree || 'Untitled' }}</h4>
          <p class="text-sm text-gray-600 m-0 mb-1">{{ item.institution }}</p>
          <p v-if="item.startDate" class="text-[13px] text-gray-400 m-0">
            {{ formatDateRange(item.startDate, item.endDate) }}
          </p>
        </div>
        <div class="flex gap-2">
          <BaseButton variant="ghost" size="small" @click="openEditModal(item)">
            Edit
          </BaseButton>
          <BaseButton variant="ghost" size="small" @click="deleteItem(item.id)">
            Delete
          </BaseButton>
        </div>
      </div>
    </div>

    <BaseModal :show="showModal" :title="editingItem ? 'Edit Education' : 'Add Education'" @close="closeModal">
      <div class="flex flex-col gap-4">
        <BaseInput
          :model-value="formData.degree"
          label="Degree"
          placeholder="Bachelor of Science in Computer Science"
          required
          @update:model-value="updateFormField('degree', $event)"
        />
        <BaseInput
          :model-value="formData.institution"
          label="Institution"
          placeholder="University of California, Berkeley"
          required
          @update:model-value="updateFormField('institution', $event)"
        />
        <BaseInput
          :model-value="formData.location"
          label="Location"
          placeholder="Berkeley, CA"
          @update:model-value="updateFormField('location', $event)"
        />
        <div class="grid grid-cols-2 gap-4">
          <BaseInput
            :model-value="formData.startDate"
            label="Start Date"
            type="month"
            @update:model-value="updateFormField('startDate', $event)"
          />
          <BaseInput
            :model-value="formData.endDate"
            label="End Date"
            type="month"
            placeholder="Leave empty for current"
            @update:model-value="updateFormField('endDate', $event)"
          />
        </div>
        <BaseTextarea
          :model-value="formData.description"
          label="Description"
          placeholder="GPA, honors, relevant coursework, etc."
          :rows="3"
          @update:model-value="updateFormField('description', $event)"
        />
      </div>
      <template #footer>
        <BaseButton variant="secondary" @click="closeModal">Cancel</BaseButton>
        <BaseButton @click="saveItem">Save</BaseButton>
      </template>
    </BaseModal>
  </div>
</template>
