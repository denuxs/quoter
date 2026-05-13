<script setup>
import { useRouter } from 'vue-router'
import { useMaquinasLocalStorage } from '@/composables/useMaquinasLocalStorage'
import MaquinaForm from '@/components/maquinas/MaquinaForm.vue'

const router = useRouter()
const { createMaquina } = useMaquinasLocalStorage()

function handleSubmit(datos) {
  createMaquina(datos)
  router.push({ name: 'maquinas' })
}

function handleCancel() {
  router.push({ name: 'maquinas' })
}
</script>

<template>
  <div class="container mx-auto max-w-2xl px-4 py-8">
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-900">Nueva máquina</h1>
    </div>

    <div class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <MaquinaForm @submit="handleSubmit" @cancel="handleCancel" />
    </div>
  </div>
</template>
