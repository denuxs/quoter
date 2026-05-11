<script setup>
import { RouterLink } from 'vue-router'
import { useProductosLocalStorage } from '@/composables/useProductosLocalStorage'
import ProductosList from '@/components/productos/ProductosList.vue'

const { productos, deleteProducto } = useProductosLocalStorage()

function handleDelete(id) {
  if (window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
    deleteProducto(id)
  }
}
</script>

<template>
  <div class="container mx-auto max-w-5xl px-4 py-8">
    <div class="mb-6 flex items-center justify-between">
      <h1 class="text-2xl font-bold text-gray-900">Productos</h1>
      <RouterLink
        to="/productos/nuevo"
        class="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        + Nuevo producto
      </RouterLink>
    </div>

    <div class="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
      <ProductosList :productos="productos" @delete="handleDelete" />
    </div>
  </div>
</template>
