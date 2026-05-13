<script setup>
import { RouterLink } from 'vue-router'
import { useCotizacionesLocalStorage } from '@/composables/useCotizacionesLocalStorage'
import { useClientesLocalStorageOptions } from '@/composables/useClientesLocalStorageOptions'
import { useProductosLocalStorage } from '@/composables/useProductosLocalStorage'
import CotizacionesList from '@/components/cotizaciones/CotizacionesList.vue'

const { cotizaciones, deleteCotizacion } = useCotizacionesLocalStorage()
const { clientes } = useClientesLocalStorageOptions()
const { productos } = useProductosLocalStorage()

function handleDelete(id) {
  if (window.confirm('¿Estás seguro de que deseas eliminar esta cotización?')) {
    deleteCotizacion(id)
  }
}
</script>

<template>
  <div class="container mx-auto max-w-5xl px-4 py-8">
    <div class="mb-6 flex items-center justify-between">
      <h1 class="text-2xl font-bold text-gray-900">Cotizaciones</h1>
      <RouterLink
        to="/cotizaciones/nueva"
        class="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        + Nueva cotización
      </RouterLink>
    </div>

    <div class="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
      <CotizacionesList
        :cotizaciones="cotizaciones"
        :clientes="clientes"
        :productos="productos"
        @delete="handleDelete"
      />
    </div>
  </div>
</template>
