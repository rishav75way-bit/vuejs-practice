import { reactive, watch } from 'vue';

const STORAGE_KEY = 'kanban-tasks';

const loadTasks = () => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
        try {
            return JSON.parse(saved);
        } catch (e) {
            console.error('Failed to load tasks', e);
            return [];
        }
    }
    return [
        { id: '1', title: 'Research Vue 3', description: 'Explore composition API benefits', status: 'todo' },
        { id: '2', title: 'Setup Tailwind', description: 'Configure tailwind 4 with Vite', status: 'in-progress' },
        { id: '3', title: 'Build Kanban', description: 'Implement drag and drop functionality', status: 'todo' },
    ];
};

export const kanbanStore = reactive({
    tasks: loadTasks(),
    columns: [
        { id: 'todo', title: 'To Do', color: 'bg-slate-100' },
        { id: 'in-progress', title: 'In Progress', color: 'bg-blue-50' },
        { id: 'done', title: 'Done', color: 'bg-emerald-50' },
    ],

    addTask(task) {
        this.tasks.push({
            id: Date.now().toString(),
            ...task,
        });
    },

    updateTask(id, updates) {
        const index = this.tasks.findIndex(t => t.id === id);
        if (index !== -1) {
            this.tasks[index] = { ...this.tasks[index], ...updates };
        }
    },

    deleteTask(id) {
        this.tasks = this.tasks.filter(t => t.id !== id);
    },

    moveTask(taskId, newStatus) {
        const task = this.tasks.find(t => t.id === taskId);
        if (task) {
            task.status = newStatus;
        }
    }
});

watch(
    () => kanbanStore.tasks,
    (newTasks) => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newTasks));
    },
    { deep: true }
);
