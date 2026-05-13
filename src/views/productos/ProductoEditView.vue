<script setup>
import { computed } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import { useProductosLocalStorage } from '@/composables/useProductosLocalStorage'
import ProductoForm from '@/components/productos/ProductoForm.vue'

const route = useRoute()
const router = useRouter()
const { getProductoById, updateProducto } = useProductosLocalStorage()

const producto = computed(() => getProductoById(route.params.id))

function handleSubmit(datos) {
  updateProducto(route.params.id, datos)
  router.push('/productos')
}

function handleCancel() {
  router.push('/productos')
}
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <template v-if="producto">
      <div class="mb-6">
        <h1 class="text-2xl font-bold text-gray-900">Editar producto</h1>
      </div>

      <div class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <ProductoForm :producto="producto" @submit="handleSubmit" @cancel="handleCancel" />
      </div>
    </template>

    <template v-else>
      <div class="py-16 text-center">
        <h1 class="mb-2 text-xl font-semibold text-gray-900">Producto no encontrado</h1>
        <p class="mb-6 text-sm text-gray-500">
          El producto que intentas editar no existe o fue eliminado.
        </p>
        <RouterLink
          to="/productos"
          class="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Volver al listado
        </RouterLink>
      </div>
    </template>
  </div>
</template>
