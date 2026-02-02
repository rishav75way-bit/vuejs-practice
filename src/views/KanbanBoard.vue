<script setup>
import KanbanBoard from '@/components/kanban/KanbanBoard.vue'
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
    <div class="container mx-auto px-4 py-8">
      <div class="mb-6">
        <router-link 
          to="/" 
          class="inline-flex items-center text-indigo-600 hover:text-indigo-800 transition-colors"
        >
          ← Back to Resume Builder
        </router-link>
      </div>
      <KanbanBoard />
    </div>
  </div>
</template>
