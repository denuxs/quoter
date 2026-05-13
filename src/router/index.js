import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/clientes',
      name: 'clientes',
      component: () => import('../views/clientes/ClientesView.vue'),
    },
    {
      path: '/productos',
      name: 'productos',
      component: () => import('../views/productos/ProductosListView.vue'),
    },
    {
      path: '/productos/nuevo',
      name: 'producto-create',
      component: () => import('../views/productos/ProductoCreateView.vue'),
    },
    {
      path: '/productos/:id/editar',
      name: 'producto-edit',
      component: () => import('../views/productos/ProductoEditView.vue'),
    },
    {
      path: '/cotizaciones',
      name: 'cotizaciones',
      component: () => import('../views/cotizaciones/CotizacionesListView.vue'),
    },
    {
      path: '/cotizaciones/nueva',
      name: 'cotizacion-create',
      component: () => import('../views/cotizaciones/CotizacionCreateView.vue'),
    },
    {
      path: '/cotizaciones/:id/editar',
      name: 'cotizacion-edit',
      component: () => import('../views/cotizaciones/CotizacionEditView.vue'),
    },
    {
      path: '/acabados',
      name: 'acabados',
      component: () => import('../views/acabados/AcabadosListView.vue'),
    },
    {
      path: '/acabados/nuevo',
      name: 'acabado-create',
      component: () => import('../views/acabados/AcabadoCreateView.vue'),
    },
    {
      path: '/acabados/:id/editar',
      name: 'acabado-edit',
      component: () => import('../views/acabados/AcabadoEditView.vue'),
    },
    {
      path: '/maquinas',
      name: 'maquinas',
      component: () => import('../views/maquinas/MaquinasListView.vue'),
    },
    {
      path: '/maquinas/nuevo',
      name: 'maquina-create',
      component: () => import('../views/maquinas/MaquinaCreateView.vue'),
    },
    {
      path: '/maquinas/:id/editar',
      name: 'maquina-edit',
      component: () => import('../views/maquinas/MaquinaEditView.vue'),
    },
  ],
})

export default router
