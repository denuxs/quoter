<script setup>
import { RouterLink } from 'vue-router'

defineProps({
  productos: {
    type: Array,
    required: true,
  },
})

const emit = defineEmits(['delete'])

const badgeClasses = {
  enviada: 'bg-blue-50 text-blue-700 border-blue-200',
  aprobada: 'bg-green-50 text-green-700 border-green-200',
  rechazada: 'bg-red-50 text-red-700 border-red-200',
}

const estadoLabels = {
  enviada: 'Enviada',
  aprobada: 'Aprobada',
  rechazada: 'Rechazada',
}
</script>

<template>
  <div>
    <div v-if="productos.length === 0" class="py-12 text-center text-sm text-gray-500">
      No hay productos registrados. Crea el primero para comenzar.
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
        <tr v-for="producto in productos" :key="producto.id" class="hover:bg-gray-50">
          <td class="px-4 py-3 font-medium text-gray-900">{{ producto.nombre }}</td>
          <td class="px-4 py-3">
            <span
              class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium"
              :class="badgeClasses[producto.estado] ?? 'bg-gray-100 text-gray-600 border-gray-200'"
            >
              {{ estadoLabels[producto.estado] ?? producto.estado }}
            </span>
          </td>
          <td class="space-x-2 px-4 py-3 text-right">
            <RouterLink
              :to="`/productos/${producto.id}/editar`"
              class="font-medium text-blue-600 hover:text-blue-800"
            >
              Editar
            </RouterLink>
            <button
              class="font-medium text-red-600 hover:text-red-800"
              @click="emit('delete', producto.id)"
            >
              Eliminar
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
