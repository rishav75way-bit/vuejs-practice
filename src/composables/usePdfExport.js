import { ref } from 'vue'
import domtoimage from 'dom-to-image-more'
import { jsPDF } from 'jspdf'

export const usePdfExport = () => {
    const isExporting = ref(false)
    const error = ref(null)

    const exportToPdf = async (element, filename = 'resume.pdf') => {
        if (!element) {
            error.value = 'No element provided for export'
            return
        }

        isExporting.value = true
        error.value = null

        try {
            const dataUrl = await domtoimage.toPng(element, {
                quality: 1,
                width: element.scrollWidth,
                height: element.scrollHeight,
                cacheBust: true,
                filter: (node) => {
                    return !node.classList || !node.classList.contains('no-export')
                }
            })

            const img = new Image()
            img.src = dataUrl

            await new Promise((resolve, reject) => {
                img.onload = resolve
                img.onerror = reject
            })

            const imgWidth = 210
            const imgHeight = (img.height * imgWidth) / img.width
            const pageHeight = 297

            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4'
            })

            let heightLeft = imgHeight
            let position = 0

            pdf.addImage(dataUrl, 'PNG', 0, position, imgWidth, imgHeight)
            heightLeft -= pageHeight

            while (heightLeft > 0) {
                position = heightLeft - imgHeight
                pdf.addPage()
                pdf.addImage(dataUrl, 'PNG', 0, position, imgWidth, imgHeight)
                heightLeft -= pageHeight
            }

            pdf.save(filename)
            return true
        } catch (err) {
            console.error('Error exporting PDF:', err)
            error.value = 'Failed to export PDF: ' + err.message
            return false
        } finally {
            isExporting.value = false
        }
    }

    return {
        isExporting,
        error,
        exportToPdf
    }
}
