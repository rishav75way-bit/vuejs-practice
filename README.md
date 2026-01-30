# Pro Kanban | Vue 3 Practice Project

A modern, high-performance Kanban board built with **Vue 3**, **Tailwind CSS 4**, and **Vite**. This project focuses on clean architecture, reusability, and smooth user experience.

## 🚀 Features

-   **Drag & Drop Interface**: Seamlessly move tasks between columns using `vuedraggable`.
-   **Full CRUD Operations**: Create, read, update, and delete tasks with ease.
-   **Persistent State**: Tasks are automatically saved to `localStorage`, so your progress is never lost.
-   **Modern Design**: Built with Tailwind CSS 4, featuring glassmorphism, smooth animations, and a premium aesthetic.
-   **Responsive Layout**: Optimized for all screen sizes.
-   **Reusable Components**: Cleanly separated components for Board, Columns, Cards, and Modals.

## 🛠️ Tech Stack

-   **Framework**: [Vue 3](https://vuejs.org/) (Composition API)
-   **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
-   **Build Tool**: [Vite 7](https://vitejs.dev/)
-   **Icons**: [Lucide Vue Next](https://lucide.dev/)
-   **Drag & Drop**: [vuedraggable](https://github.com/SortableJS/vue.draggable.next)
-   **State Management**: Vue Reactive Store

## 📦 Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/rishav75way-bit/vuejs-practice.git
    cd vuejs-practice
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Start development server:**
    ```bash
    npm run dev
    ```

4.  **Build for production:**
    ```bash
    npm run build
    ```

## 🏗️ Project Structure

```text
src/
├── assets/           # Stylesheets (Tailwind 4 configuration)
├── components/       # Reusable UI components
│   └── kanban/       # Kanban-specific components (Board, Column, Card, Modal)
├── stores/           # Centralized reactive state management
├── App.vue           # Root component
└── main.js           # Entry point
```

