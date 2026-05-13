<script setup>
import { useRouter } from 'vue-router'
import { useProductosLocalStorage } from '@/composables/useProductosLocalStorage'
import ProductoForm from '@/components/productos/ProductoForm.vue'

const router = useRouter()
const { createProducto } = useProductosLocalStorage()

function handleSubmit(datos) {
  createProducto(datos)
  router.push('/productos')
}

function handleCancel() {
  router.push('/productos')
}
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-900">Nuevo producto</h1>
    </div>

    <div class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <ProductoForm @submit="handleSubmit" @cancel="handleCancel" />
    </div>
  </div>
</template>
