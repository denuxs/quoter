<script setup>
import { useRouter } from 'vue-router'
import { useCotizacionesLocalStorage } from '@/composables/useCotizacionesLocalStorage'
import CotizacionForm from '@/components/cotizaciones/CotizacionForm.vue'

const router = useRouter()
const { createCotizacion } = useCotizacionesLocalStorage()

function handleSubmit(datos) {
  createCotizacion(datos)
  router.push('/cotizaciones')
}

function handleCancel() {
  router.push('/cotizaciones')
}
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-900">Nueva cotización</h1>
    </div>

    <CotizacionForm @submit="handleSubmit" @cancel="handleCancel" />
  </div>
</template>
