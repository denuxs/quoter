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

<style scoped>
</style>

<style scoped>
/* header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
} */
</style>
