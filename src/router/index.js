import { createRouter, createWebHistory } from 'vue-router'
import ResumeBuilder from '@/views/ResumeBuilder.vue'
import KanbanBoard from '@/views/KanbanBoard.vue'

const routes = [
    {
        path: '/',
        name: 'ResumeBuilder',
        component: ResumeBuilder
    },
    {
        path: '/kanban',
        name: 'Kanban',
        component: KanbanBoard
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
