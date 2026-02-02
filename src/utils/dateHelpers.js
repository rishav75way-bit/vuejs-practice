export const formatDate = (dateStr) => {
    if (!dateStr) return ''

    const date = new Date(dateStr + '-01')
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

export const formatDateRange = (startDate, endDate) => {
    const start = formatDate(startDate)

    if (!endDate || endDate.toLowerCase() === 'present') {
        return `${start} - Present`
    }

    const end = formatDate(endDate)
    return `${start} - ${end}`
}

export const isPresent = (dateStr) => {
    return !dateStr || dateStr.toLowerCase() === 'present'
}
