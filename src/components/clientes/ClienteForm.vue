<script setup>
import { reactive, watch } from 'vue'

const props = defineProps({
  cliente: {
    type: Object,
    default: null,
  },
})

const emit = defineEmits(['submit', 'cancel'])

const estadoOpciones = [
  { value: 'activo', label: 'Activo' },
  { value: 'inactivo', label: 'Inactivo' },
]

const monedas = [
  { value: 'MXN', label: 'MXN' },
  { value: 'USD', label: 'USD' },
  { value: 'EUR', label: 'EUR' },
]

const certificaciones = [
  { value: 'ISO 9001:2015', label: 'ISO 9001:2015' },
  { value: 'ISO 14001:2015', label: 'ISO 14001:2015' },
  { value: 'ISO 22000:2015', label: 'ISO 22000:2015' },
  { value: 'ISO 27001:2015', label: 'ISO 27001:2015' },
  { value: 'ISO 31000:2015', label: 'ISO 31000:2015' },
  { value: 'ISO 37001:2015', label: 'ISO 37001:2015' },
  { value: 'ISO 45001:2015', label: 'ISO 45001:2015' },
  { value: 'ISO 50001:2015', label: 'ISO 50001:2015' },
  { value: 'ISO 55001:2015', label: 'ISO 55001:2015' },
]

const form = reactive({
  nombre: '',
  email: '',
  telefono: '',
  estado: 'activo',
  moneda: 'MXN',
  certificacion: '',
})

const errores = reactive({
  nombre: '',
  email: '',
  telefono: '',
  moneda: '',
  certificacion: '',
})

watch(
  () => props.cliente,
  (cliente) => {
    if (cliente) {
      form.nombre = cliente.nombre
      form.email = cliente.email
      form.telefono = cliente.telefono
      form.estado = cliente.estado
      form.moneda = cliente.moneda
      form.certificacion = cliente.certificacion
    } else {
      form.nombre = ''
      form.email = ''
      form.telefono = ''
      form.estado = 'activo'
      form.moneda = 'MXN'
      form.certificacion = ''
    }
    errores.nombre = ''
    errores.email = ''
    errores.telefono = ''
    errores.moneda = ''
    errores.certificacion = ''
  },
  { immediate: true },
)

function validar() {
  let valido = true

  errores.nombre = ''
  errores.email = ''
  errores.telefono = ''
  errores.moneda = ''
  errores.certificacion = ''

  if (!form.nombre.trim()) {
    errores.nombre = 'El nombre es obligatorio.'
    valido = false
  }

  if (!form.email.trim()) {
    errores.email = 'El email es obligatorio.'
    valido = false
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
    errores.email = 'Ingresa un email válido.'
    valido = false
  }

  if (!form.telefono.trim()) {
    errores.telefono = 'El teléfono es obligatorio.'
    valido = false
  }

  if (!form.moneda) {
    errores.moneda = 'Selecciona una moneda.'
    valido = false
  }

  if (!form.certificacion) {
    errores.certificacion = 'Selecciona una certificación.'
    valido = false
  }

  return valido
}

function handleSubmit() {
  if (!validar()) return
  emit('submit', {
    nombre: form.nombre.trim(),
    email: form.email.trim(),
    telefono: form.telefono.trim(),
    estado: form.estado,
    moneda: form.moneda,
    certificacion: form.certificacion,
  })
}
</script>

<template>
  <form class="space-y-4" @submit.prevent="handleSubmit">
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1" for="nombre">Nombre</label>
      <input
        id="nombre"
        v-model="form.nombre"
        type="text"
        placeholder="Nombre del cliente"
        class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        :class="{ 'border-red-500': errores.nombre }"
      />
      <p v-if="errores.nombre" class="mt-1 text-xs text-red-600">{{ errores.nombre }}</p>
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1" for="email">Email</label>
      <input
        id="email"
        v-model="form.email"
        type="email"
        placeholder="correo@ejemplo.com"
        class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        :class="{ 'border-red-500': errores.email }"
      />
      <p v-if="errores.email" class="mt-1 text-xs text-red-600">{{ errores.email }}</p>
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1" for="telefono">Teléfono</label>
      <input
        id="telefono"
        v-model="form.telefono"
        type="tel"
        placeholder="5551234567"
        class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        :class="{ 'border-red-500': errores.telefono }"
      />
      <p v-if="errores.telefono" class="mt-1 text-xs text-red-600">{{ errores.telefono }}</p>
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1" for="estado">Estado</label>
      <select
        id="estado"
        v-model="form.estado"
        class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
      >
        <option v-for="op in estadoOpciones" :key="op.value" :value="op.value">
          {{ op.label }}
        </option>
      </select>
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1" for="moneda">Moneda</label>
      <select
        id="moneda"
        v-model="form.moneda"
        class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
      >
        <option v-for="op in monedas" :key="op.value" :value="op.value">
          {{ op.label }}
        </option>
      </select>
      <p v-if="errores.moneda" class="mt-1 text-xs text-red-600">{{ errores.moneda }}</p>
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1" for="certificacion"
        >Certificación</label
      >
      <select
        id="certificacion"
        v-model="form.certificacion"
        class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
      >
        <option v-for="op in certificaciones" :key="op.value" :value="op.value">
          {{ op.label }}
        </option>
      </select>
      <p v-if="errores.certificacion" class="mt-1 text-xs text-red-600">
        {{ errores.certificacion }}
      </p>
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
        {{ cliente ? 'Guardar cambios' : 'Crear cliente' }}
      </button>
    </div>
  </form>
</template>
