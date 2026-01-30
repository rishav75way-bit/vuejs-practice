<script setup>
import { ref, watch } from 'vue';
import { X } from 'lucide-vue-next';

const props = defineProps({
  isOpen: Boolean,
  task: {
    type: Object,
    default: () => ({ title: '', description: '', status: 'todo' })
  },
  isEdit: Boolean
});

const emit = defineEmits(['close', 'save']);

const formData = ref({ ...props.task });

watch(() => props.task, (newVal) => {
  formData.value = { ...newVal };
}, { deep: true });

const handleSubmit = () => {
  if (!formData.value.title.trim()) return;
  emit('save', { ...formData.value });
  emit('close');
};
</script>

<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
    <div class="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" @click="$emit('close')"></div>
    
    <div class="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
      <div class="flex items-center justify-between p-6 border-b border-slate-100">
        <h2 class="text-xl font-bold text-slate-800">
          {{ isEdit ? 'Edit Task' : 'Create New Task' }}
        </h2>
        <button @click="$emit('close')" class="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-colors">
          <X :size="20" />
        </button>
      </div>

      <form @submit.prevent="handleSubmit" class="p-6 space-y-4">
        <div>
          <label class="block text-sm font-semibold text-slate-700 mb-1">Title</label>
          <input 
            v-model="formData.title"
            type="text" 
            placeholder="What needs to be done?"
            class="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            required
            autofocus
          />
        </div>

        <div>
          <label class="block text-sm font-semibold text-slate-700 mb-1">Description</label>
          <textarea 
            v-model="formData.description"
            rows="3"
            placeholder="Add some details..."
            class="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none"
          ></textarea>
        </div>

        <div v-if="!isEdit">
          <label class="block text-sm font-semibold text-slate-700 mb-1">Initial Status</label>
          <select 
            v-model="formData.status"
            class="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-white"
          >
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>

        <div class="flex gap-3 pt-2">
          <button 
            type="button"
            @click="$emit('close')"
            class="flex-1 px-4 py-2.5 rounded-lg border border-slate-200 font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
          <button 
            type="submit"
            class="flex-1 px-4 py-2.5 rounded-lg bg-blue-600 font-semibold text-white hover:bg-blue-700 shadow-lg shadow-blue-500/20 transition-all active:scale-95"
          >
            {{ isEdit ? 'Update Task' : 'Create Task' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
