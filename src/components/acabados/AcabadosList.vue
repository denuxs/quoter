<script setup>
import { RouterLink } from 'vue-router'

defineProps({
  acabados: {
    type: Array,
    required: true,
  },
})

const emit = defineEmits(['delete'])

const badgeClasses = {
  activo: 'bg-green-50 text-green-700 border-green-200',
  inactivo: 'bg-gray-100 text-gray-600 border-gray-200',
}

const estadoLabels = {
  activo: 'Activo',
  inactivo: 'Inactivo',
}
</script>

<template>
  <div>
    <div v-if="acabados.length === 0" class="py-12 text-center text-sm text-gray-500">
      No hay acabados registrados. Crea el primero para comenzar.
    </div>

    <table v-else class="w-full text-left text-sm">
      <thead class="border-b border-gray-200 bg-gray-50 text-xs uppercase text-gray-600">
        <tr>
          <th class="px-4 py-3">Nombre</th>
          <th class="px-4 py-3">Estado</th>
          <th class="px-4 py-3 text-right">Acciones</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-100">
        <tr v-for="acabado in acabados" :key="acabado.id" class="hover:bg-gray-50">
          <td class="px-4 py-3 font-medium text-gray-900">{{ acabado.nombre }}</td>
          <td class="px-4 py-3">
            <span
              class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium"
              :class="badgeClasses[acabado.estado] ?? 'bg-gray-100 text-gray-600 border-gray-200'"
            >
              {{ estadoLabels[acabado.estado] ?? acabado.estado }}
            </span>
          </td>
          <td class="space-x-2 px-4 py-3 text-right">
            <RouterLink
              :to="{ name: 'acabado-edit', params: { id: acabado.id } }"
              class="font-medium text-blue-600 hover:text-blue-800"
            >
              Editar
            </RouterLink>
            <button
              class="font-medium text-red-600 hover:text-red-800"
              @click="emit('delete', acabado.id)"
            >
              Eliminar
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
