<script setup>
import { computed } from 'vue';
import draggable from 'vuedraggable';
import KanbanCard from './KanbanCard.vue';
import { Plus } from 'lucide-vue-next';
import { kanbanStore } from '@/stores/kanban';

const props = defineProps({
  column: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['addTask', 'editTask', 'deleteTask']);

const columnTasks = computed({
  get: () => kanbanStore.tasks.filter(t => t.status === props.column.id),
  set: (val) => {
    val.forEach(task => {
      if (task.status !== props.column.id) {
        kanbanStore.moveTask(task.id, props.column.id);
      }
    });
  }
});

const onDragChange = (evt) => {
  if (evt.added) {
    kanbanStore.moveTask(evt.added.element.id, props.column.id);
  }
};
</script>

<template>
  <div class="flex flex-col w-80 min-h-[500px] rounded-2xl bg-slate-50/50 p-4 border border-slate-100">
    <div class="flex items-center justify-between mb-4 px-2">
      <div class="flex items-center gap-2">
        <h2 class="font-bold text-slate-700 tracking-tight">{{ column.title }}</h2>
        <span class="bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full text-xs font-medium">
          {{ columnTasks.length }}
        </span>
      </div>
      <button 
        @click="$emit('addTask', column.id)"
        class="p-1.5 hover:bg-white rounded-lg text-slate-400 hover:text-blue-600 transition-all shadow-sm hover:shadow"
      >
        <Plus :size="18" />
      </button>
    </div>

    <draggable
      v-model="columnTasks"
      group="tasks"
      item-key="id"
      class="flex-1 space-y-3 min-h-[150px]"
      ghost-class="opacity-50"
      drag-class="rotate-2"
      @change="onDragChange"
    >
      <template #item="{ element }">
        <KanbanCard 
          :task="element" 
          @edit="$emit('editTask', $event)"
          @delete="$emit('deleteTask', $event)"
        />
      </template>
      <template #header v-if="columnTasks.length === 0">
        <div class="flex flex-col items-center justify-center py-10 px-4 border-2 border-dashed border-slate-200 rounded-xl text-slate-400">
          <p class="text-xs font-medium border-slate-200">No tasks here</p>
        </div>
      </template>
    </draggable>
  </div>
</template>
