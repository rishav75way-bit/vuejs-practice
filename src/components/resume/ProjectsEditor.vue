<script setup>
import { ref } from 'vue'
import BaseButton from '@/components/base/BaseButton.vue'
import BaseInput from '@/components/base/BaseInput.vue'
import BaseTextarea from '@/components/base/BaseTextarea.vue'
import BaseModal from '@/components/base/BaseModal.vue'
import { createEmptyProject } from '@/utils/types'

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['update:modelValue'])

const showModal = ref(false)
const editingItem = ref(null)
const formData = ref(createEmptyProject())
const techInput = ref('')

const openAddModal = () => {
  formData.value = createEmptyProject()
  editingItem.value = null
  showModal.value = true
}

const openEditModal = (item) => {
  formData.value = { ...item, technologies: [...item.technologies] }
  editingItem.value = item.id
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  formData.value = createEmptyProject()
  editingItem.value = null
  techInput.value = ''
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
  if (confirm('Are you sure you want to delete this project?')) {
    emit('update:modelValue', props.modelValue.filter(item => item.id !== id))
  }
}

const updateFormField = (field, value) => {
  formData.value[field] = value
}

const addTechnology = () => {
  const tech = techInput.value.trim()
  if (tech && !formData.value.technologies.includes(tech)) {
    formData.value.technologies.push(tech)
    techInput.value = ''
  }
}

const removeTechnology = (tech) => {
  formData.value.technologies = formData.value.technologies.filter(t => t !== tech)
}

const handleTechKeyPress = (event) => {
  if (event.key === 'Enter') {
    event.preventDefault()
    addTechnology()
  }
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex items-center justify-between">
      <h3 class="text-lg font-semibold text-gray-900 m-0">Projects</h3>
      <BaseButton size="small" @click="openAddModal">
        + Add Project
      </BaseButton>
    </div>

    <div v-if="modelValue.length === 0" class="p-8 text-center text-gray-600 bg-gray-50 border border-dashed border-gray-300 rounded-lg">
      No projects yet. Click "Add Project" to get started.
    </div>

    <div v-else class="flex flex-col gap-3">
      <div
        v-for="item in modelValue"
        :key="item.id"
        class="flex items-start justify-between gap-4 p-4 bg-gray-50 border border-gray-200 rounded-lg"
      >
        <div class="flex-1">
          <h4 class="text-[15px] font-semibold text-gray-900 m-0 mb-1">{{ item.name || 'Untitled' }}</h4>
          <p v-if="item.technologies.length > 0" class="text-[13px] text-gray-600 m-0">
            {{ item.technologies.join(', ') }}
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

    <BaseModal :show="showModal" :title="editingItem ? 'Edit Project' : 'Add Project'" @close="closeModal">
      <div class="flex flex-col gap-4">
        <BaseInput
          :model-value="formData.name"
          label="Project Name"
          placeholder="E-commerce Platform"
          required
          @update:model-value="updateFormField('name', $event)"
        />
        <BaseTextarea
          :model-value="formData.description"
          label="Description"
          placeholder="Describe the project, your role, and key achievements..."
          :rows="4"
          @update:model-value="updateFormField('description', $event)"
        />
        <BaseInput
          :model-value="formData.link"
          label="Project Link"
          type="url"
          placeholder="https://github.com/username/project"
          @update:model-value="updateFormField('link', $event)"
        />
        
        <div class="flex flex-col gap-2">
          <label class="text-sm font-medium text-gray-700">Technologies</label>
          <div class="flex gap-2">
            <input
              v-model="techInput"
              type="text"
              placeholder="Add a technology"
              class="flex-1 px-3.5 py-2.5 border border-gray-300 rounded-md text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              @keypress="handleTechKeyPress"
            />
            <BaseButton size="small" @click="addTechnology">
              Add
            </BaseButton>
          </div>
          <div v-if="formData.technologies.length > 0" class="flex flex-wrap gap-2">
            <div
              v-for="tech in formData.technologies"
              :key="tech"
              class="inline-flex items-center gap-2 px-2.5 py-1.5 bg-blue-50 text-blue-800 border border-blue-200 rounded-md text-[13px]"
            >
              <span>{{ tech }}</span>
              <button 
                class="flex items-center justify-center bg-transparent border-none cursor-pointer text-blue-800 p-0 transition-colors hover:text-blue-900"
                @click="removeTechnology(tech)"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      <template #footer>
        <BaseButton variant="secondary" @click="closeModal">Cancel</BaseButton>
        <BaseButton @click="saveItem">Save</BaseButton>
      </template>
    </BaseModal>
  </div>
</template>
