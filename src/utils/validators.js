export const isValidEmail = (email) => {
    if (!email) return true
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
}

export const isValidUrl = (url) => {
    if (!url) return true
    try {
        new URL(url)
        return true
    } catch {
        return false
    }
}

export const isValidPhone = (phone) => {
    if (!phone) return true
    const phoneRegex = /^[\d\s\-\+\(\)]+$/
    return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10
}

export const isRequired = (value) => {
    return value && value.trim().length > 0
}
