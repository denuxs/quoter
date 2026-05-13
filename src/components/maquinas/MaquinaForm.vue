<script setup>
import { reactive, watch } from 'vue'

import { estadosMaquina } from '@/composables/useMaquinasLocalStorage'

const props = defineProps({
  maquina: {
    type: Object,
    default: null,
  },
})

const emit = defineEmits(['submit', 'cancel'])

const form = reactive({
  nombre: props.maquina?.nombre ?? '',
  estado: props.maquina?.estado ?? 'activo',
})

const errores = reactive({
  nombre: '',
  estado: '',
})

watch(
  () => props.maquina,
  (maquina) => {
    if (maquina) {
      form.nombre = maquina.nombre
      form.estado = maquina.estado
    } else {
      form.nombre = ''
      form.estado = 'activo'
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
    errores.nombre = 'El nombre es obligatorio'
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
  <form :key="maquina?.id ?? 'nuevo'" class="space-y-4" @submit.prevent="handleSubmit">
    <div>
      <label class="mb-1 block text-sm font-medium text-gray-700" for="nombre">Nombre</label>
      <input
        id="nombre"
        v-model="form.nombre"
        type="text"
        placeholder="Ej. Troqueladora, Prensa, CNC"
        class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
      />
      <p v-if="errores.nombre" class="mt-1 text-xs text-red-600">{{ errores.nombre }}</p>
    </div>

    <div>
      <label class="mb-1 block text-sm font-medium text-gray-700" for="estado">Estado</label>
      <select
        id="estado"
        v-model="form.estado"
        class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
      >
        <option v-for="op in estadosMaquina" :key="op.value" :value="op.value">
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
        {{ maquina ? 'Guardar cambios' : 'Crear máquina' }}
      </button>
    </div>
  </form>
</template>
