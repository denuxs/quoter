<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header class="border-b border-gray-200 bg-white shadow-sm">
    <nav class="container mx-auto flex max-w-5xl items-center gap-6 px-4 py-3">
      <RouterLink
        to="/"
        class="text-sm font-medium text-gray-600 hover:text-blue-600"
        active-class="text-blue-600"
        exact-active-class="text-blue-600 font-semibold"
      >
        Cotizador
      </RouterLink>
      <RouterLink
        to="/clientes"
        class="text-sm font-medium text-gray-600 hover:text-blue-600"
        active-class="text-blue-600 font-semibold"
      >
        Clientes
      </RouterLink>
      <RouterLink
        to="/productos"
        class="text-sm font-medium text-gray-600 hover:text-blue-600"
        active-class="text-blue-600 font-semibold"
      >
        Productos
      </RouterLink>
      <RouterLink
        to="/acabados"
        class="text-sm font-medium text-gray-600 hover:text-blue-600"
        active-class="text-blue-600 font-semibold"
      >
        Acabados
      </RouterLink>
      <RouterLink
        to="/maquinas"
        class="text-sm font-medium text-gray-600 hover:text-blue-600"
        active-class="text-blue-600 font-semibold"
      >
        Maquinas
      </RouterLink>
      <RouterLink
        to="/cotizaciones"
        class="text-sm font-medium text-gray-600 hover:text-blue-600"
        active-class="text-blue-600 font-semibold"
      >
        Cotizaciones
      </RouterLink>
    </nav>
  </header>

  <RouterView />
</template>

<style scoped></style>
