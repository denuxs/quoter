<script setup>
import { computed } from 'vue'
import { Form, Field, ErrorMessage } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as zod from 'zod'
import { estadosAcabado } from '@/composables/useAcabadosLocalStorage'

const props = defineProps({
  acabado: {
    type: Object,
    default: null,
  },
})

const emit = defineEmits(['submit', 'cancel'])

const initialValues = computed(() => ({
  nombre: props.acabado?.nombre ?? '',
  estado: props.acabado?.estado ?? 'activo',
}))

const validationSchema = toTypedSchema(
  zod.object({
    nombre: zod
      .string({ required_error: 'Requerido' })
      .min(1, { message: 'El nombre es requerido' })
      .max(100, { message: 'Máximo 100 caracteres' }),
    estado: zod.enum(['activo', 'inactivo'], { required_error: 'Requerido' }),
  }),
)

function handleSubmit(values) {
  emit('submit', {
    nombre: values.nombre.trim(),
    estado: values.estado,
  })
}
</script>

<template>
  <Form
    :key="acabado?.id ?? 'nuevo'"
    :validation-schema="validationSchema"
    :initial-values="initialValues"
    class="space-y-4"
    @submit="handleSubmit"
  >
    <div>
      <label class="mb-1 block text-sm font-medium text-gray-700" for="nombre">Nombre</label>
      <Field
        id="nombre"
        name="nombre"
        type="text"
        placeholder="Ej. Mate, Brillante, Satinado"
        class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
      />
      <ErrorMessage name="nombre" class="mt-1 text-xs text-red-600" as="p" />
    </div>

    <div>
      <label class="mb-1 block text-sm font-medium text-gray-700" for="estado">Estado</label>
      <Field
        id="estado"
        name="estado"
        as="select"
        class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
      >
        <option v-for="op in estadosAcabado" :key="op.value" :value="op.value">
          {{ op.label }}
        </option>
      </Field>
      <ErrorMessage name="estado" class="mt-1 text-xs text-red-600" as="p" />
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
        {{ acabado ? 'Guardar cambios' : 'Crear acabado' }}
      </button>
    </div>
  </Form>
</template>
