export const dummyResumeData = {
    personalInfo: {
        name: 'Sarah Johnson',
        email: 'sarah.johnson@email.com',
        phone: '+1 (555) 123-4567',
        location: 'San Francisco, CA',
        linkedin: 'https://linkedin.com/in/sarahjohnson',
        website: 'https://sarahjohnson.dev'
    },
    summary: 'Experienced software engineer with 8+ years of expertise in building user-centric applications using Vue.js and modern web technologies. Passionate about creating scalable solutions and delivering exceptional user experiences. Proven track record of leading cross-functional teams to deliver high-impact projects.',
    education: [
        {
            id: 'edu-1',
            degree: 'Bachelor of Science in Computer Science',
            institution: 'Stanford University',
            location: 'Stanford, CA',
            startDate: '2012-09',
            endDate: '2016-05',
            description: 'GPA: 3.8/4.0. Specialized in Software Engineering and Web Development. Dean\'s List all semesters.'
        },
        {
            id: 'edu-2',
            degree: 'Master of Science in Computer Science',
            institution: 'MIT',
            location: 'Cambridge, MA',
            startDate: '2016-09',
            endDate: '2018-05',
            description: 'Focus on Distributed Systems and Cloud Computing. Thesis: "Optimizing Real-time Data Processing in Microservices Architecture"'
        }
    ],
    experience: [
        {
            id: 'exp-1',
            title: 'Senior Frontend Engineer',
            company: 'TechCorp Inc.',
            location: 'San Francisco, CA',
            startDate: '2021-03',
            endDate: '',
            description: 'Led development of enterprise dashboard using Vue 3 and TypeScript. Improved application performance by 40% through code optimization and lazy loading. Mentored 5 junior developers and established best practices for the frontend team.'
        },
        {
            id: 'exp-2',
            title: 'Frontend Developer',
            company: 'StartupXYZ',
            location: 'Palo Alto, CA',
            startDate: '2018-06',
            endDate: '2021-02',
            description: 'Built responsive web applications from scratch using Vue.js, Vuex, and Tailwind CSS. Collaborated with UX designers to implement pixel-perfect designs. Reduced page load time by 60% through performance optimization techniques.'
        },
        {
            id: 'exp-3',
            title: 'Junior Web Developer',
            company: 'Digital Agency Co.',
            location: 'San Jose, CA',
            startDate: '2016-06',
            endDate: '2018-05',
            description: 'Developed and maintained client websites using HTML, CSS, JavaScript, and Vue.js. Worked closely with design team to ensure brand consistency. Implemented responsive designs for mobile-first approach.'
        }
    ],
    skills: [
        'Vue.js',
        'JavaScript',
        'TypeScript',
        'CSS',
        'Tailwind CSS',
        'HTML',
        'Git',
        'Node.js',
        'REST APIs',
        'GraphQL',
        'Webpack',
        'Vite',
        'Jest',
        'Cypress',
        'Agile/Scrum'
    ],
    projects: [
        {
            id: 'proj-1',
            name: 'Portfolio Website',
            description: 'Built a personal portfolio website using Vue 3 and Tailwind CSS. Features a responsive design and dark mode. Implemented a custom CMS for easy content management.',
            link: 'https://sarahjohnson.dev',
            technologies: ['Vue 3', 'Tailwind CSS', 'Vite', 'Firebase']
        },
        {
            id: 'proj-2',
            name: 'E-Commerce Platform',
            description: 'Developed a full-featured e-commerce platform with product catalog, shopping cart, and checkout functionality. Integrated Stripe for payment processing and implemented real-time inventory management.',
            link: 'https://github.com/sarahjohnson/ecommerce',
            technologies: ['Vue.js', 'Vuex', 'Node.js', 'Express', 'MongoDB', 'Stripe API']
        },
        {
            id: 'proj-3',
            name: 'Task Management App',
            description: 'Created a collaborative task management application with drag-and-drop functionality, real-time updates, and team collaboration features. Supports multiple projects and custom workflows.',
            link: 'https://github.com/sarahjohnson/taskmanager',
            technologies: ['Vue 3', 'Pinia', 'Firebase', 'Vuedraggable', 'Tailwind CSS']
        }
    ]
}

export const loadDummyData = () => {
    localStorage.setItem('resume-data', JSON.stringify(dummyResumeData))
    localStorage.setItem('section-visibility', JSON.stringify({
        summary: true,
        experience: true,
        education: true,
        skills: true,
        projects: true
    }))
    localStorage.setItem('section-order', JSON.stringify(['summary', 'experience', 'education', 'skills', 'projects']))
    localStorage.setItem('resume-template', 'modern')
    localStorage.setItem('resume-theme', JSON.stringify({ accentColor: '#6366f1' }))

    window.location.reload()
}
