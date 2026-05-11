import { createRouter, createWebHistory } from 'vue-router'
import QuoterView from '../views/QuoterView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'quoter',
      component: QuoterView,
    },
    {
      path: '/clientes',
      name: 'clientes',
      component: () => import('../views/ClientesView.vue'),
    },
    {
      path: '/productos',
      name: 'productos',
      component: () => import('../views/ProductosListView.vue'),
    },
    {
      path: '/productos/nuevo',
      name: 'producto-create',
      component: () => import('../views/ProductoCreateView.vue'),
    },
    {
      path: '/productos/:id/editar',
      name: 'producto-edit',
      component: () => import('../views/ProductoEditView.vue'),
    },
    {
      path: '/cotizaciones',
      name: 'cotizaciones',
      component: () => import('../views/CotizacionesListView.vue'),
    },
    {
      path: '/cotizaciones/nueva',
      name: 'cotizacion-create',
      component: () => import('../views/CotizacionCreateView.vue'),
    },
    {
      path: '/cotizaciones/:id/editar',
      name: 'cotizacion-edit',
      component: () => import('../views/CotizacionEditView.vue'),
    },
  ],
})

export default router
