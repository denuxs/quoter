<script setup>
import { RouterLink } from 'vue-router'

const props = defineProps({
  cotizaciones: {
    type: Array,
    required: true,
  },
  clientes: {
    type: Array,
    required: true,
  },
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

function nombreCliente(clienteId) {
  return props.clientes.find((c) => c.id === clienteId)?.nombre ?? 'Cliente no encontrado'
}

function nombreProducto(productoId) {
  return props.productos.find((p) => p.id === productoId)?.nombre ?? 'Producto no encontrado'
}
</script>

<template>
  <div>
    <div v-if="cotizaciones.length === 0" class="py-12 text-center text-sm text-gray-500">
      No hay cotizaciones registradas. Crea la primera para comenzar.
    </div>

    <table v-else class="w-full text-left text-sm">
      <thead class="border-b border-gray-200 bg-gray-50 text-xs uppercase text-gray-600">
        <tr>
          <th class="px-4 py-3">Código</th>
          <th class="px-4 py-3">Fecha</th>
          <th class="px-4 py-3">Cliente</th>
          <th class="px-4 py-3">Producto</th>
          <th class="px-4 py-3">Estado</th>
          <th class="px-4 py-3 text-right">Acciones</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-100">
        <tr v-for="cotizacion in cotizaciones" :key="cotizacion.id" class="hover:bg-gray-50">
          <td class="px-4 py-3 font-medium text-gray-900">
            {{ cotizacion.codigo || '—' }}
          </td>
          <td class="px-4 py-3 text-gray-600">{{ cotizacion.fecha || '—' }}</td>
          <td class="px-4 py-3 text-gray-700">{{ nombreCliente(cotizacion.clienteId) }}</td>
          <td class="px-4 py-3 text-gray-700">{{ nombreProducto(cotizacion.productoId) }}</td>
          <td class="px-4 py-3">
            <span
              class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium"
              :class="badgeClasses[cotizacion.estado] ?? 'bg-gray-100 text-gray-600 border-gray-200'"
            >
              {{ estadoLabels[cotizacion.estado] ?? cotizacion.estado }}
            </span>
          </td>
          <td class="space-x-2 px-4 py-3 text-right">
            <RouterLink
              :to="`/cotizaciones/${cotizacion.id}/editar`"
              class="font-medium text-blue-600 hover:text-blue-800"
            >
              Editar
            </RouterLink>
            <button
              class="font-medium text-red-600 hover:text-red-800"
              @click="emit('delete', cotizacion.id)"
            >
              Eliminar
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
