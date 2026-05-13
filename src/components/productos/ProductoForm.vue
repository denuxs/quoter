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
  precios: [],
  especificaciones: [],
})

const errores = reactive({
  nombre: '',
  estado: '',
  precios: [],
  especificaciones: [],
})

const estadosPermitidos = estadosProducto.map((e) => e.value)

function precioVacio() {
  return { desde: 0, hasta: 0, precio: 0 }
}

function agregarPrecio() {
  form.precios.push(precioVacio())
  errores.precios.push({ desde: 0, hasta: 0, precio: 0 })
}

function eliminarPrecio(index) {
  form.precios.splice(index, 1)
  errores.precios.splice(index, 1)
}

function especificacionVacia() {
  return { nombre: '', tipo: '', requerido: false, opciones: [] }
}

function agregarEspecificacion() {
  form.especificaciones.push(especificacionVacia())
  errores.especificaciones.push({ nombre: '', tipo: '', requerido: false, opciones: [] })
}

function eliminarEspecificacion(index) {
  form.especificaciones.splice(index, 1)
  errores.especificaciones.splice(index, 1)
}

watch(
  () => props.producto,
  (producto) => {
    if (producto) {
      form.nombre = producto.nombre
      form.estado = producto.estado
      form.precios = (producto.precios ?? []).map((p) => ({ ...p }))
      form.especificaciones = (producto.especificaciones ?? []).map((e) => ({ ...e }))
    } else {
      form.nombre = ''
      form.estado = 'enviada'
      form.precios = []
      form.especificaciones = []
    }
    errores.nombre = ''
    errores.estado = ''
    errores.precios = form.precios.map(() => ({ desde: 0, hasta: 0, precio: 0 }))
    errores.especificaciones = form.especificaciones.map(() => ({
      nombre: '',
      tipo: '',
      requerido: false,
      opciones: [],
    }))
  },
  { immediate: true },
)

function validar() {
  errores.nombre = ''
  errores.estado = ''
  errores.precios = form.precios.map(() => ({ desde: 0, hasta: 0, precio: 0 }))
  errores.especificaciones = form.especificaciones.map(() => ({
    nombre: '',
    tipo: '',
    requerido: false,
    opciones: [],
  }))
  let valido = true

  if (!form.nombre.trim()) {
    errores.nombre = 'El nombre es obligatorio.'
    valido = false
  }

  if (!estadosPermitidos.includes(form.estado)) {
    errores.estado = 'Selecciona un estado válido.'
    valido = false
  }

  // form.precios.forEach((precio, i) => {
  //   if (!precio.desde.trim()) {
  //     errores.precios[i].desde = 'La desde es obligatoria.'
  //     valido = false
  //   }
  //   const hasta = parseFloat(precio.hasta)
  //   if (precio.hasta === '' || isNaN(hasta) || hasta < 0) {
  //     errores.precios[i].hasta = 'Ingresa un hasta válido.'
  //     valido = false
  //   }
  //   const precio = parseFloat(precio.precio)
  //   if (precio.precio === '' || isNaN(precio) || precio < 0) {
  //     errores.precios[i].precio = 'Ingresa un precio válido.'
  //     valido = false
  //   }
  // })

  // form.especificaciones.forEach((especificacion, i) => {
  //   if (!especificacion.nombre.trim()) {
  //     errores.especificaciones[i].nombre = 'El nombre es obligatorio.'
  //     valido = false
  //   }
  //   if (!especificacion.tipo.trim()) {
  //     errores.especificaciones[i].tipo = 'El tipo es obligatorio.'
  //     valido = false
  //   }
  //   if (!especificacion.requerido) {
  //     errores.especificaciones[i].requerido = 'El requerido es obligatorio.'
  //     valido = false
  //   }
  //   especificacion.opciones.forEach((opcion, j) => {
  //     if (!opcion.trim()) {
  //       errores.especificaciones[i].opciones[j] = 'La opción es obligatoria.'
  //       valido = false
  //     }
  //   })
  // })

  return valido
}

function handleSubmit() {
  if (!validar()) return
  emit('submit', {
    nombre: form.nombre.trim(),
    estado: form.estado,
    precios: form.precios.map((p) => ({
      desde: parseFloat(p.desde),
      hasta: parseFloat(p.hasta),
      precio: parseFloat(p.precio),
    })),
    especificaciones: form.especificaciones.map((e) => ({
      nombre: e.nombre.trim(),
      tipo: e.tipo.trim(),
      requerido: e.requerido,
      opciones: e.opciones.map((o) => o.trim()),
    })),
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

    <!-- Precios dinámicos -->
    <div>
      <div class="mb-2 flex items-center justify-between">
        <label class="text-sm font-medium text-gray-700">Precios</label>
        <button
          type="button"
          class="flex items-center gap-1 rounded-md bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 hover:bg-blue-100"
          @click="agregarPrecio"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-3.5 w-3.5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              clip-rule="evenodd"
            />
          </svg>
          Agregar precio
        </button>
      </div>

      <div
        v-if="form.precios.length === 0"
        class="rounded-md border border-dashed border-gray-300 py-4 text-center text-sm text-gray-400"
      >
        Sin precios registrados
      </div>

      <table v-if="form.precios.length > 0" class="w-full text-sm">
        <thead class="bg-gray-200 text-gray-600">
          <tr>
            <th class="px-4 py-2">Desde</th>
            <th class="px-4 py-2">Hasta</th>
            <th class="px-4 py-2">Precio</th>
            <th class="px-4 py-2"></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(precio, index) in form.precios"
            :key="index"
            class="bg-gray-50 border-b border-gray-200"
          >
            <td class="px-4 py-2 align-top">
              <input
                v-model="precio.desde"
                type="number"
                min="0"
                step="0.01"
                placeholder="Desde"
                class="w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                :class="{ 'border-red-500': errores.precios[index]?.desde }"
              />
              <p v-if="errores.precios[index]?.desde" class="mt-0.5 text-xs text-red-600">
                {{ errores.precios[index].desde }}
              </p>
            </td>
            <td class="px-4 py-2 align-top">
              <input
                v-model="precio.hasta"
                type="number"
                min="0"
                step="0.01"
                placeholder="Hasta"
                class="w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                :class="{ 'border-red-500': errores.precios[index]?.hasta }"
              />
              <p v-if="errores.precios[index]?.hasta" class="mt-0.5 text-xs text-red-600">
                {{ errores.precios[index].hasta }}
              </p>
            </td>
            <td class="px-4 py-2 align-top">
              <input
                v-model="precio.precio"
                type="number"
                min="0"
                step="0.01"
                placeholder="Precio"
                class="w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                :class="{ 'border-red-500': errores.precios[index]?.precio }"
              />
              <p v-if="errores.precios[index]?.precio" class="mt-0.5 text-xs text-red-600">
                {{ errores.precios[index].precio }}
              </p>
            </td>
            <td class="px-2 py-2 align-top">
              <button
                type="button"
                class="rounded-md p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-500"
                title="Eliminar precio"
                @click="eliminarPrecio(index)"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Especificaciones dinámicas -->
    <div>
      <div class="mb-2 flex items-center justify-between">
        <label class="text-sm font-medium text-gray-700">Especificaciones</label>
        <button
          type="button"
          class="flex items-center gap-1 rounded-md bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 hover:bg-blue-100"
          @click="agregarEspecificacion"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-3.5 w-3.5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              clip-rule="evenodd"
            />
          </svg>
          Agregar especificación
        </button>
      </div>

      <div
        v-if="form.especificaciones.length === 0"
        class="rounded-md border border-dashed border-gray-300 py-4 text-center text-sm text-gray-400"
      >
        Sin especificaciones registradas
      </div>

      <table v-if="form.especificaciones.length > 0" class="w-full text-sm">
        <thead class="bg-gray-200 text-gray-600">
          <tr>
            <th class="px-4 py-2">Nombre</th>
            <th class="px-4 py-2">Tipo</th>
            <th class="px-4 py-2">Requerido</th>
            <th class="px-4 py-2">Opciones</th>
            <th class="px-4 py-2"></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(especificacion, index) in form.especificaciones"
            :key="index"
            class="bg-gray-50 border-b border-gray-200"
          >
            <td class="px-4 py-2 align-top">
              <input
                v-model="especificacion.nombre"
                type="text"
                class="w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                :class="{ 'border-red-500': errores.especificaciones[index]?.nombre }"
              />
              <p v-if="errores.especificaciones[index]?.nombre" class="mt-0.5 text-xs text-red-600">
                {{ errores.especificaciones[index].nombre }}
              </p>
            </td>
            <td class="px-4 py-2 align-top">
              <input
                v-model="especificacion.tipo"
                type="text"
                class="w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                :class="{ 'border-red-500': errores.especificaciones[index]?.tipo }"
              />
              <p v-if="errores.especificaciones[index]?.tipo" class="mt-0.5 text-xs text-red-600">
                {{ errores.especificaciones[index].tipo }}
              </p>
            </td>
            <td class="flex justify-center px-4 py-2 align-top">
              <input
                v-model="especificacion.requerido"
                type="radio"
                class="h-4 w-4 rounded-md border border-gray-300 text-blue-600 focus:ring-blue-500"
                :checked="especificacion.requerido"
              />
            </td>
            <td class="px-4 py-2 align-top">
              <input
                v-model="especificacion.opciones"
                type="text"
                class="w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </td>

            <td class="px-4 py-2 align-top">
              <button
                type="button"
                class="self-start rounded-md p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-500 cursor-pointer"
                title="Eliminar especificación"
                @click="eliminarEspecificacion(index)"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
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
