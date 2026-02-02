<script setup>
import { ref } from 'vue'
import EditorPanel from '@/components/resume/EditorPanel.vue'
import ResumePreview from '@/components/resume/ResumePreview.vue'
import TemplateSelector from '@/components/resume/TemplateSelector.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import { useResume } from '@/composables/useResume'
import { useTemplateManager } from '@/composables/useTemplateManager'
import { usePdfExport } from '@/composables/usePdfExport'
import { useImportExport } from '@/composables/useImportExport'

const { resume, visibility, sectionOrder } = useResume()
const { template, setTemplate } = useTemplateManager()
const { isExporting, exportToPdf } = usePdfExport()
const { exportToJSON, importFromJSON } = useImportExport()

const previewComponent = ref(null)
const fileInput = ref(null)
const isImporting = ref(false)
const importError = ref('')
const importSuccess = ref(false)

const handleExport = async () => {
  if (previewComponent.value?.previewRef) {
    await exportToPdf(previewComponent.value.previewRef, `${resume.personalInfo.name || 'resume'}.pdf`)
  }
}

const handleExportJSON = () => {
  exportToJSON()
}

const handleImportClick = () => {
  fileInput.value?.click()
}

const handleFileChange = async (event) => {
  const file = event.target.files[0]
  if (!file) return

  isImporting.value = true
  importError.value = ''
  importSuccess.value = false

  try {
    await importFromJSON(file)
    importSuccess.value = true
    setTimeout(() => {
      importSuccess.value = false
    }, 3000)
  } catch (error) {
    importError.value = error.message
    setTimeout(() => {
      importError.value = ''
    }, 5000)
  } finally {
    isImporting.value = false
    if (fileInput.value) {
      fileInput.value.value = ''
    }
  }
}
</script>

<template>
  <div class="h-screen flex flex-col bg-gray-50">
    <header class="bg-white border-b border-gray-200 shadow-sm z-10">
      <div class="max-w-full px-6 py-4 flex items-center justify-between">
        <h1 class="text-2xl font-bold text-gray-900 m-0">Resume Builder</h1>
        <div class="flex gap-3 items-center">
          <input
            ref="fileInput"
            type="file"
            accept=".json"
            class="hidden"
            @change="handleFileChange"
          />
          
          <BaseButton
            variant="secondary"
            :loading="isImporting"
            @click="handleImportClick"
          >
            {{ isImporting ? 'Importing...' : 'Import JSON' }}
          </BaseButton>
          
          <BaseButton
            variant="secondary"
            @click="handleExportJSON"
          >
            Export JSON
          </BaseButton>
          
          <BaseButton
            :loading="isExporting"
            @click="handleExport"
          >
            {{ isExporting ? 'Exporting...' : 'Export PDF' }}
          </BaseButton>
        </div>
      </div>
      
      <div v-if="importSuccess" class="px-6 py-2 bg-green-50 border-t border-green-200">
        <p class="text-sm text-green-800 m-0">✓ Resume data imported successfully!</p>
      </div>
      
      <div v-if="importError" class="px-6 py-2 bg-red-50 border-t border-red-200">
        <p class="text-sm text-red-800 m-0">✗ {{ importError }}</p>
      </div>
    </header>

    <div class="flex-1 grid grid-cols-[240px_1fr_1fr] overflow-hidden">
      <aside class="bg-white border-r border-gray-200 overflow-y-auto">
        <div class="p-6">
          <TemplateSelector
            :current-template="template"
            @template-change="setTemplate"
          />
        </div>
      </aside>

      <div class="border-r border-gray-200 overflow-hidden">
        <EditorPanel />
      </div>

      <div class="overflow-hidden">
        <ResumePreview
          ref="previewComponent"
          :resume-data="resume"
          :template="template"
          :section-visibility="visibility"
          :section-order="sectionOrder.order"
        />
      </div>
    </div>
  </div>
</template>
