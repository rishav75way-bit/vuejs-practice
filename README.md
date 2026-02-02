# Vue 3 Practice Project | Resume Builder & Kanban Board

A modern web application featuring a **Professional Resume Builder** with PDF export capabilities and a bonus **Kanban Board** for task management. Built with **Vue 3**, **Tailwind CSS 4**, and **Vite**.

## 🎯 Main Feature: Resume Builder

A comprehensive resume builder with real-time preview, multiple templates, and professional export options.

### ✨ Key Features

- **Real-time Preview**: See changes instantly as you type
- **Multiple Templates**: Classic and Modern professional layouts
- **PDF Export**: Download your resume as a high-quality PDF
- **JSON Import/Export**: Save and load your resume data
- **Color Customization**: 9 preset colors + custom color picker
- **Drag & Drop Sections**: Reorder resume sections to your preference
- **Section Visibility**: Show/hide sections as needed
- **Sample Data**: One-click load professional dummy data for testing
- **Persistent Storage**: Auto-save to localStorage

### 📝 Resume Sections

- Personal Information (Name, Email, Phone, Location, LinkedIn, Website)
- Professional Summary
- Work Experience (with company, role, dates, descriptions)
- Education (degrees, institutions, dates, descriptions)
- Skills (technical and soft skills)
- Projects (with descriptions, links, and technologies)

### 🎨 Templates

1. **Classic Template**: Traditional single-column layout
2. **Modern Template**: Two-column layout with sidebar

### 🎨 Customization

- **Accent Colors**: Choose from 9 preset colors or use custom color picker
- **Section Order**: Drag and drop to reorder sections
- **Section Visibility**: Toggle sections on/off

## 🎲 Bonus Feature: Kanban Board

A simple task management board with drag-and-drop functionality.

### Features

- Drag & drop tasks between columns
- Create, edit, and delete tasks
- Persistent storage with localStorage
- Clean, modern UI

## 🛠️ Tech Stack

- **Framework**: [Vue 3](https://vuejs.org/) (Composition API)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Build Tool**: [Vite 7](https://vitejs.dev/)
- **Icons**: [Lucide Vue Next](https://lucide.dev/)
- **Drag & Drop**: [vuedraggable](https://github.com/SortableJS/vue.draggable.next)
- **PDF Generation**: [jsPDF](https://github.com/parallax/jsPDF) + [dom-to-image-more](https://github.com/1904labs/dom-to-image-more)
- **State Management**: Vue Composables with Reactive API

## 📦 Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/rishav75way-bit/vuejs-practice.git
   cd vuejs-practice
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

## 🏗️ Project Structure

```text
src/
├── assets/              # Stylesheets (Tailwind 4 configuration)
├── components/
│   ├── base/           # Reusable base components (Button, Card, Input)
│   ├── resume/         # Resume builder components
│   │   ├── templates/  # Resume templates (Classic, Modern)
│   │   ├── EditorPanel.vue
│   │   ├── ResumePreview.vue
│   │   ├── PersonalInfoEditor.vue
│   │   ├── SummaryEditor.vue
│   │   ├── ExperienceEditor.vue
│   │   ├── EducationEditor.vue
│   │   ├── SkillsEditor.vue
│   │   ├── ProjectsEditor.vue
│   │   ├── SectionOrderEditor.vue
│   │   ├── TemplateSelector.vue
│   │   └── ColorPicker.vue
│   └── kanban/         # Kanban board components
├── composables/        # Vue composables for state management
│   ├── useResume.js
│   ├── useTemplateManager.js
│   ├── useColorTheme.js
│   ├── usePdfExport.js
│   ├── useImportExport.js
│   └── useLocalStorage.js
├── stores/             # Kanban state management
├── utils/              # Utility functions and types
├── views/              # Page components
│   └── ResumeBuilder.vue
├── App.vue             # Root component
└── main.js             # Entry point
```

## 🚀 Usage

### Resume Builder

1. Navigate to the Resume Builder (default route)
2. Fill in your information in the editor panel
3. Choose a template (Classic or Modern)
4. Customize the accent color
5. Reorder sections by dragging them
6. Click "Load Sample Data" to see a complete example
7. Export as PDF or JSON

### Kanban Board

1. Navigate to `/kanban`
2. Create tasks using the "Add Task" button
3. Drag tasks between columns (To Do, In Progress, Done)
4. Click on tasks to edit or delete them

## 🎨 Design Features

- **Modern UI**: Clean, professional design with Tailwind CSS 4
- **Responsive**: Works on all screen sizes
- **Smooth Animations**: Polished transitions and micro-interactions
- **Accessibility**: Semantic HTML and keyboard navigation support
- **Performance**: Optimized with Vite and lazy loading


## 👨‍💻 Author

**Rishav**
- GitHub: [@rishav75way-bit](https://github.com/rishav75way-bit)
