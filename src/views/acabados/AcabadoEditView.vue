<script setup>
import { computed } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import { useAcabadosLocalStorage } from '@/composables/useAcabadosLocalStorage'
import AcabadoForm from '@/components/acabados/AcabadoForm.vue'

const route = useRoute()
const router = useRouter()
const { getAcabadoById, updateAcabado } = useAcabadosLocalStorage()

const acabado = computed(() => getAcabadoById(route.params.id))

function handleSubmit(datos) {
  updateAcabado(route.params.id, datos)
  router.push({ name: 'acabados' })
}

function handleCancel() {
  router.push({ name: 'acabados' })
}
</script>

<template>
  <div class="container mx-auto max-w-2xl px-4 py-8">
    <template v-if="acabado">
      <div class="mb-6">
        <h1 class="text-2xl font-bold text-gray-900">Editar acabado</h1>
      </div>

      <div class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <AcabadoForm :acabado="acabado" @submit="handleSubmit" @cancel="handleCancel" />
      </div>
    </template>

    <template v-else>
      <div class="py-16 text-center">
        <h1 class="mb-2 text-xl font-semibold text-gray-900">Acabado no encontrado</h1>
        <p class="mb-6 text-sm text-gray-500">
          El acabado que intentas editar no existe o fue eliminado.
        </p>
        <RouterLink
          :to="{ name: 'acabados' }"
          class="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Volver al listado
        </RouterLink>
      </div>
    </template>
  </div>
</template>
