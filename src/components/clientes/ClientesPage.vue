<script setup>
import { ref } from 'vue'
import { useClientesStore } from '@/stores/clientes'
import ClienteForm from './ClienteForm.vue'
import ClientesTable from './ClientesTable.vue'

const store = useClientesStore()

const mostrarFormulario = ref(false)
const clienteEnEdicion = ref(null)

function abrirCrear() {
  clienteEnEdicion.value = null
  mostrarFormulario.value = true
}

function abrirEditar(cliente) {
  clienteEnEdicion.value = cliente
  mostrarFormulario.value = true
}

function cerrarFormulario() {
  mostrarFormulario.value = false
  clienteEnEdicion.value = null
}

function handleSubmit(datos) {
  if (clienteEnEdicion.value) {
    store.updateCliente(clienteEnEdicion.value.id, datos)
  } else {
    store.createCliente(datos)
  }
  cerrarFormulario()
}

function handleDelete(id) {
  if (window.confirm('¿Estás seguro de que deseas eliminar este cliente?')) {
    store.deleteCliente(id)
  }
}

function handleToggleStatus(id) {
  store.toggleEstado(id)
}
</script>

<template>
  <div class="container mx-auto max-w-5xl px-4 py-8">
    <div class="mb-6 flex items-center justify-between">
      <h1 class="text-2xl font-bold text-gray-900">Clientes</h1>
      <button
        class="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        @click="abrirCrear"
      >
        + Nuevo cliente
      </button>
    </div>

    <div v-if="mostrarFormulario" class="mb-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <h2 class="mb-4 text-lg font-semibold text-gray-800">
        {{ clienteEnEdicion ? 'Editar cliente' : 'Nuevo cliente' }}
      </h2>
      <ClienteForm
        :cliente="clienteEnEdicion"
        @submit="handleSubmit"
        @cancel="cerrarFormulario"
      />
    </div>

    <div class="rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden">
      <ClientesTable
        :clientes="store.clientes"
        @edit="abrirEditar"
        @delete="handleDelete"
        @toggle-status="handleToggleStatus"
      />
    </div>
  </div>
</template>
