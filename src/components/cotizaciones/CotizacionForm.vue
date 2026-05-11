<script setup>
import { reactive, watch } from 'vue'
import { estadosCotizacion } from '@/composables/useCotizacionesLocalStorage'
import { useClientesLocalStorageOptions } from '@/composables/useClientesLocalStorageOptions'
import { useProductosLocalStorage } from '@/composables/useProductosLocalStorage'

const props = defineProps({
  cotizacion: {
    type: Object,
    default: null,
  },
})

const emit = defineEmits(['submit', 'cancel'])

const { clientes } = useClientesLocalStorageOptions()
const { productos } = useProductosLocalStorage()

const estadosPermitidos = estadosCotizacion.map((e) => e.value)

const hoy = new Date().toISOString().slice(0, 10)

const form = reactive({
  codigo: '',
  fecha: hoy,
  clienteId: '',
  productoId: '',
  estado: 'enviada',
})

const errores = reactive({
  clienteId: '',
  productoId: '',
  estado: '',
})

watch(
  () => props.cotizacion,
  (cotizacion) => {
    if (cotizacion) {
      form.codigo = cotizacion.codigo ?? ''
      form.fecha = cotizacion.fecha ?? hoy
      form.clienteId = cotizacion.clienteId ?? ''
      form.productoId = cotizacion.productoId ?? ''
      form.estado = cotizacion.estado ?? 'enviada'
    } else {
      form.codigo = ''
      form.fecha = hoy
      form.clienteId = ''
      form.productoId = ''
      form.estado = 'enviada'
    }
    errores.clienteId = ''
    errores.productoId = ''
    errores.estado = ''
  },
  { immediate: true },
)

function validar() {
  errores.clienteId = ''
  errores.productoId = ''
  errores.estado = ''
  let valido = true

  if (!form.clienteId) {
    errores.clienteId = 'Selecciona un cliente.'
    valido = false
  }

  if (!form.productoId) {
    errores.productoId = 'Selecciona un producto.'
    valido = false
  }

  if (!estadosPermitidos.includes(form.estado)) {
    errores.estado = 'Selecciona un estado válido.'
    valido = false
  }

  return valido
}

function handleSubmit() {
  if (!validar()) return
  emit('submit', {
    codigo: form.codigo.trim(),
    fecha: form.fecha,
    clienteId: form.clienteId,
    productoId: form.productoId,
    estado: form.estado,
  })
}
</script>

<template>
  <form class="space-y-4" @submit.prevent="handleSubmit">
    <div>
      <label class="mb-1 block text-sm font-medium text-gray-700" for="codigo">Código</label>
      <input
        id="codigo"
        v-model="form.codigo"
        type="text"
        placeholder="Ej. COT-001"
        class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
      />
    </div>

    <div>
      <label class="mb-1 block text-sm font-medium text-gray-700" for="fecha">Fecha</label>
      <input
        id="fecha"
        v-model="form.fecha"
        type="date"
        class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
      />
    </div>

    <div>
      <label class="mb-1 block text-sm font-medium text-gray-700" for="clienteId">
        Cliente <span class="text-red-500">*</span>
      </label>
      <select
        id="clienteId"
        v-model="form.clienteId"
        class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        :class="{ 'border-red-500': errores.clienteId }"
      >
        <option value="">Selecciona un cliente</option>
        <option v-for="cliente in clientes" :key="cliente.id" :value="cliente.id">
          {{ cliente.nombre }}
        </option>
      </select>
      <p v-if="errores.clienteId" class="mt-1 text-xs text-red-600">{{ errores.clienteId }}</p>
      <p v-if="clientes.length === 0" class="mt-1 text-xs text-gray-500">
        No hay clientes disponibles. Agrega clientes primero.
      </p>
    </div>

    <div>
      <label class="mb-1 block text-sm font-medium text-gray-700" for="productoId">
        Producto <span class="text-red-500">*</span>
      </label>
      <select
        id="productoId"
        v-model="form.productoId"
        class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        :class="{ 'border-red-500': errores.productoId }"
      >
        <option value="">Selecciona un producto</option>
        <option v-for="producto in productos" :key="producto.id" :value="producto.id">
          {{ producto.nombre }}
        </option>
      </select>
      <p v-if="errores.productoId" class="mt-1 text-xs text-red-600">{{ errores.productoId }}</p>
      <p v-if="productos.length === 0" class="mt-1 text-xs text-gray-500">
        No hay productos disponibles. Agrega productos primero.
      </p>
    </div>

    <div>
      <label class="mb-1 block text-sm font-medium text-gray-700" for="estado">Estado</label>
      <select
        id="estado"
        v-model="form.estado"
        class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        :class="{ 'border-red-500': errores.estado }"
      >
        <option v-for="op in estadosCotizacion" :key="op.value" :value="op.value">
          {{ op.label }}
        </option>
      </select>
      <p v-if="errores.estado" class="mt-1 text-xs text-red-600">{{ errores.estado }}</p>
    </div>

    <div class="flex justify-end gap-2 pt-2">
      <button
        type="button"
        class="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        @click="emit('cancel')"
      >
        Cancelar
      </button>
      <button
        type="submit"
        class="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {{ cotizacion ? 'Guardar cambios' : 'Crear cotización' }}
      </button>
    </div>
  </form>
</template>
