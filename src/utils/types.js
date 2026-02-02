export const createEmptyPersonalInfo = () => ({
    name: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    website: ''
})

export const createEmptyEducation = () => ({
    id: crypto.randomUUID(),
    degree: '',
    institution: '',
    location: '',
    startDate: '',
    endDate: '',
    description: ''
})

export const createEmptyExperience = () => ({
    id: crypto.randomUUID(),
    title: '',
    company: '',
    location: '',
    startDate: '',
    endDate: '',
    description: ''
})

export const createEmptyProject = () => ({
    id: crypto.randomUUID(),
    name: '',
    description: '',
    technologies: [],
    link: ''
})

export const createEmptyResume = () => ({
    personalInfo: createEmptyPersonalInfo(),
    summary: '',
    education: [],
    experience: [],
    skills: [],
    projects: []
})

export const createDefaultSectionVisibility = () => ({
    summary: true,
    education: true,
    experience: true,
    skills: true,
    projects: true
})
