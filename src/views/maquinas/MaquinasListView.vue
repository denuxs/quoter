<script setup>
import { RouterLink } from 'vue-router'
import { useMaquinasLocalStorage } from '@/composables/useMaquinasLocalStorage'
import MaquinasList from '@/components/maquinas/MaquinasList.vue'

const { maquinas, deleteMaquina } = useMaquinasLocalStorage()

function handleDelete(id) {
  if (window.confirm('¿Estás seguro de que deseas eliminar esta máquina?')) {
    deleteMaquina(id)
  }
}
</script>

<template>
  <div class="container mx-auto max-w-5xl px-4 py-8">
    <div class="mb-6 flex items-center justify-between">
      <h1 class="text-2xl font-bold text-gray-900">Máquinas</h1>
      <RouterLink
        :to="{ name: 'maquina-create' }"
        class="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        + Nueva máquina
      </RouterLink>
    </div>

    <div class="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
      <MaquinasList :maquinas="maquinas" @delete="handleDelete" />
    </div>
  </div>
</template>
