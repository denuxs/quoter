<script setup>
import { computed } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import { useCotizacionesLocalStorage } from '@/composables/useCotizacionesLocalStorage'
import CotizacionForm from '@/components/cotizaciones/CotizacionForm.vue'

const route = useRoute()
const router = useRouter()
const { getCotizacionById, updateCotizacion } = useCotizacionesLocalStorage()

const cotizacion = computed(() => getCotizacionById(route.params.id))

function handleSubmit(datos) {
  updateCotizacion(route.params.id, datos)
  router.push('/cotizaciones')
}

function handleCancel() {
  router.push('/cotizaciones')
}
</script>

<template>
  <div class="container mx-auto max-w-2xl px-4 py-8">
    <template v-if="cotizacion">
      <div class="mb-6">
        <h1 class="text-2xl font-bold text-gray-900">Editar cotización</h1>
      </div>

      <div class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <CotizacionForm :cotizacion="cotizacion" @submit="handleSubmit" @cancel="handleCancel" />
      </div>
    </template>

    <template v-else>
      <div class="py-16 text-center">
        <h1 class="mb-2 text-xl font-semibold text-gray-900">Cotización no encontrada</h1>
        <p class="mb-6 text-sm text-gray-500">
          La cotización que intentas editar no existe o fue eliminada.
        </p>
        <RouterLink
          to="/cotizaciones"
          class="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Volver al listado
        </RouterLink>
      </div>
    </template>
  </div>
</template>
