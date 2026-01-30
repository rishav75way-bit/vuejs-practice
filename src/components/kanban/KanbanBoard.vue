<script setup>
import { ref } from 'vue';
import { kanbanStore } from '@/stores/kanban';
import KanbanColumn from './KanbanColumn.vue';
import TaskModal from './TaskModal.vue';
import { Layout, Plus } from 'lucide-vue-next';

const isModalOpen = ref(false);
const isEditMode = ref(false);
const currentTask = ref({ title: '', description: '', status: 'todo' });

const openAddTask = (status = 'todo') => {
  isEditMode.value = false;
  currentTask.value = { title: '', description: '', status };
  isModalOpen.value = true;
};

const openEditTask = (task) => {
  isEditMode.value = true;
  currentTask.value = { ...task };
  isModalOpen.value = true;
};

const handleSaveTask = (taskData) => {
  if (isEditMode.value) {
    kanbanStore.updateTask(taskData.id, taskData);
  } else {
    kanbanStore.addTask(taskData);
  }
};

const handleDeleteTask = (id) => {
  if (confirm('Are you sure you want to delete this task?')) {
    kanbanStore.deleteTask(id);
  }
};
</script>

<template>
  <div class="max-w-[1400px] mx-auto px-6 py-10">
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
      <div class="flex items-center gap-3">
        <div class="p-3 bg-blue-600 rounded-2xl shadow-lg shadow-blue-500/30">
          <Layout class="text-white" :size="28" />
        </div>
        <div>
          <h1 class="text-3xl font-extrabold text-slate-900 tracking-tight">Project Board</h1>
          <p class="text-slate-500 font-medium">Manage your team's tasks and workflow</p>
        </div>
      </div>
      
      <button 
        @click="openAddTask()"
        class="flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 active:scale-95"
      >
        <Plus :size="20" />
        <span>New Task</span>
      </button>
    </div>

    <div class="flex overflow-x-auto pb-6 gap-6 scrollbar-hide">
      <KanbanColumn 
        v-for="col in kanbanStore.columns" 
        :key="col.id" 
        :column="col"
        @addTask="openAddTask"
        @editTask="openEditTask"
        @deleteTask="handleDeleteTask"
      />
    </div>

    <TaskModal 
      :isOpen="isModalOpen"
      :task="currentTask"
      :isEdit="isEditMode"
      @close="isModalOpen = false"
      @save="handleSaveTask"
    />
  </div>
</template>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
