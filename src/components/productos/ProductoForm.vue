<script setup>
import { reactive, watch } from 'vue'
import { estadosProducto } from '@/composables/useProductosLocalStorage'

const props = defineProps({
  producto: {
    type: Object,
    default: null,
  },
})

const emit = defineEmits(['submit', 'cancel'])

const form = reactive({
  nombre: '',
  estado: 'enviada',
})

const errores = reactive({
  nombre: '',
  estado: '',
})

const estadosPermitidos = estadosProducto.map((e) => e.value)

watch(
  () => props.producto,
  (producto) => {
    if (producto) {
      form.nombre = producto.nombre
      form.estado = producto.estado
    } else {
      form.nombre = ''
      form.estado = 'enviada'
    }
    errores.nombre = ''
    errores.estado = ''
  },
  { immediate: true },
)

function validar() {
  errores.nombre = ''
  errores.estado = ''
  let valido = true

  if (!form.nombre.trim()) {
    errores.nombre = 'El nombre es obligatorio.'
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
    nombre: form.nombre.trim(),
    estado: form.estado,
  })
}
</script>

<template>
  <form class="space-y-4" @submit.prevent="handleSubmit">
    <div>
      <label class="mb-1 block text-sm font-medium text-gray-700" for="nombre">Nombre</label>
      <input
        id="nombre"
        v-model="form.nombre"
        type="text"
        placeholder="Nombre del producto"
        class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        :class="{ 'border-red-500': errores.nombre }"
      />
      <p v-if="errores.nombre" class="mt-1 text-xs text-red-600">{{ errores.nombre }}</p>
    </div>

    <div>
      <label class="mb-1 block text-sm font-medium text-gray-700" for="estado">Estado</label>
      <select
        id="estado"
        v-model="form.estado"
        class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        :class="{ 'border-red-500': errores.estado }"
      >
        <option v-for="op in estadosProducto" :key="op.value" :value="op.value">
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
        {{ producto ? 'Guardar cambios' : 'Crear producto' }}
      </button>
    </div>
  </form>
</template>
