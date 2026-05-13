<script setup>
import { useRouter } from 'vue-router'
import { useAcabadosLocalStorage } from '@/composables/useAcabadosLocalStorage'
import AcabadoForm from '@/components/acabados/AcabadoForm.vue'

const router = useRouter()
const { createAcabado } = useAcabadosLocalStorage()

function handleSubmit(datos) {
  createAcabado(datos)
  router.push({ name: 'acabados' })
}

function handleCancel() {
  router.push({ name: 'acabados' })
}
</script>

<template>
  <div class="container mx-auto max-w-2xl px-4 py-8">
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-900">Nuevo acabado</h1>
    </div>

    <div class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <AcabadoForm @submit="handleSubmit" @cancel="handleCancel" />
    </div>
  </div>
</template>
