<script setup>
import { RouterLink } from 'vue-router'
import { useAcabadosLocalStorage } from '@/composables/useAcabadosLocalStorage'
import AcabadosList from '@/components/acabados/AcabadosList.vue'

const { acabados, deleteAcabado } = useAcabadosLocalStorage()

function handleDelete(id) {
  if (window.confirm('¿Estás seguro de que deseas eliminar este acabado?')) {
    deleteAcabado(id)
  }
}
</script>

<template>
  <div class="container mx-auto max-w-5xl px-4 py-8">
    <div class="mb-6 flex items-center justify-between">
      <h1 class="text-2xl font-bold text-gray-900">Acabados</h1>
      <RouterLink
        :to="{ name: 'acabado-create' }"
        class="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        + Nuevo acabado
      </RouterLink>
    </div>

    <div class="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
      <AcabadosList :acabados="acabados" @delete="handleDelete" />
    </div>
  </div>
</template>
