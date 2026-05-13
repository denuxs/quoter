<script setup>
import { computed } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import { useMaquinasLocalStorage } from '@/composables/useMaquinasLocalStorage'
import MaquinaForm from '@/components/maquinas/MaquinaForm.vue'

const route = useRoute()
const router = useRouter()
const { getMaquinaById, updateMaquina } = useMaquinasLocalStorage()

const maquina = computed(() => getMaquinaById(route.params.id))

function handleSubmit(datos) {
  updateMaquina(route.params.id, datos)
  router.push({ name: 'maquinas' })
}

function handleCancel() {
  router.push({ name: 'maquinas' })
}
</script>

<template>
  <div class="container mx-auto max-w-2xl px-4 py-8">
    <template v-if="maquina">
      <div class="mb-6">
        <h1 class="text-2xl font-bold text-gray-900">Editar máquina</h1>
      </div>

      <div class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <MaquinaForm :maquina="maquina" @submit="handleSubmit" @cancel="handleCancel" />
      </div>
    </template>

    <template v-else>
      <div class="py-16 text-center">
        <h1 class="mb-2 text-xl font-semibold text-gray-900">Máquina no encontrada</h1>
        <p class="mb-6 text-sm text-gray-500">
          La máquina que intentas editar no existe o fue eliminada.
        </p>
        <RouterLink
          :to="{ name: 'maquinas' }"
          class="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Volver al listado
        </RouterLink>
      </div>
    </template>
  </div>
</template>
