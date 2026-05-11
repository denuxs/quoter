<script setup>
defineProps({
  clientes: {
    type: Array,
    required: true,
  },
})

const emit = defineEmits(['edit', 'delete', 'toggle-status'])
</script>

<template>
  <div>
    <div v-if="clientes.length === 0" class="py-12 text-center text-sm text-gray-500">
      No hay clientes registrados. Crea el primero usando el botón de arriba.
    </div>

    <table v-else class="w-full text-sm text-left">
      <thead class="bg-gray-50 text-xs uppercase text-gray-600 border-b border-gray-200">
        <tr>
          <th class="px-4 py-3">Nombre</th>
          <th class="px-4 py-3">Email</th>
          <th class="px-4 py-3">Teléfono</th>
          <th class="px-4 py-3">Estado</th>
          <th class="px-4 py-3 text-right">Acciones</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-100">
        <tr v-for="cliente in clientes" :key="cliente.id" class="hover:bg-gray-50">
          <td class="px-4 py-3 font-medium text-gray-900">{{ cliente.nombre }}</td>
          <td class="px-4 py-3 text-gray-600">{{ cliente.email }}</td>
          <td class="px-4 py-3 text-gray-600">{{ cliente.telefono }}</td>
          <td class="px-4 py-3">
            <button
              class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium border transition-colors"
              :class="
                cliente.estado === 'activo'
                  ? 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100'
                  : 'bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-200'
              "
              @click="emit('toggle-status', cliente.id)"
            >
              {{ cliente.estado === 'activo' ? 'Activo' : 'Inactivo' }}
            </button>
          </td>
          <td class="px-4 py-3 text-right space-x-2">
            <button
              class="text-blue-600 hover:text-blue-800 font-medium"
              @click="emit('edit', cliente)"
            >
              Editar
            </button>
            <button
              class="text-red-600 hover:text-red-800 font-medium"
              @click="emit('delete', cliente.id)"
            >
              Eliminar
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
