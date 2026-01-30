<script setup>
import { Pencil, Trash2 } from 'lucide-vue-next';

defineProps({
  task: {
    type: Object,
    required: true
  }
});

defineEmits(['edit', 'delete']);
</script>

<template>
  <div 
    class="group bg-white p-4 rounded-xl shadow-sm border border-slate-200 hover:shadow-md hover:border-blue-300 transition-all cursor-grab active:cursor-grabbing mb-3"
  >
    <div class="flex justify-between items-start mb-2">
      <h3 class="font-semibold text-slate-800 leading-tight">{{ task.title }}</h3>
      <div class="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button 
          @click="$emit('edit', task)"
          class="p-1 hover:bg-slate-100 rounded text-slate-500 hover:text-blue-600 transition-colors"
        >
          <Pencil :size="14" />
        </button>
        <button 
          @click="$emit('delete', task.id)"
          class="p-1 hover:bg-slate-100 rounded text-slate-500 hover:text-red-600 transition-colors"
        >
          <Trash2 :size="14" />
        </button>
      </div>
    </div>
    <p v-if="task.description" class="text-sm text-slate-500 line-clamp-2">
      {{ task.description }}
    </p>
  </div>
</template>
