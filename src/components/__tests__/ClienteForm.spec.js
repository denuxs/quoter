import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ClienteForm from '../clientes/ClienteForm.vue'

function montarForm(props = {}) {
  return mount(ClienteForm, { props })
}

describe('ClienteForm', () => {
  it('renderiza todos los campos', () => {
    const wrapper = montarForm()
    expect(wrapper.find('#nombre').exists()).toBe(true)
    expect(wrapper.find('#email').exists()).toBe(true)
    expect(wrapper.find('#telefono').exists()).toBe(true)
    expect(wrapper.find('#estado').exists()).toBe(true)
  })

  it('muestra "Crear cliente" cuando no hay prop cliente', () => {
    const wrapper = montarForm()
    expect(wrapper.find('[type="submit"]').text()).toBe('Crear cliente')
  })

  it('muestra "Guardar cambios" cuando se pasa un cliente para editar', () => {
    const wrapper = montarForm({
      cliente: { id: '1', nombre: 'Ana', email: 'ana@test.com', telefono: '111', estado: 'activo' },
    })
    expect(wrapper.find('[type="submit"]').text()).toBe('Guardar cambios')
  })

  it('pre-rellena los campos con los datos del cliente en edición', () => {
    const wrapper = montarForm({
      cliente: { id: '1', nombre: 'Ana', email: 'ana@test.com', telefono: '5551234567', estado: 'inactivo' },
    })
    expect(wrapper.find('#nombre').element.value).toBe('Ana')
    expect(wrapper.find('#email').element.value).toBe('ana@test.com')
    expect(wrapper.find('#telefono').element.value).toBe('5551234567')
    expect(wrapper.find('#estado').element.value).toBe('inactivo')
  })

  it('muestra errores cuando se envía el formulario vacío', async () => {
    const wrapper = montarForm()
    await wrapper.find('form').trigger('submit')
    expect(wrapper.text()).toContain('El nombre es obligatorio.')
    expect(wrapper.text()).toContain('El email es obligatorio.')
    expect(wrapper.text()).toContain('El teléfono es obligatorio.')
  })

  it('muestra error cuando el email tiene formato inválido', async () => {
    const wrapper = montarForm()
    await wrapper.find('#nombre').setValue('Juan')
    await wrapper.find('#email').setValue('no-es-un-email')
    await wrapper.find('#telefono').setValue('5551234567')
    await wrapper.find('form').trigger('submit')
    expect(wrapper.text()).toContain('Ingresa un email válido.')
  })

  it('emite "submit" con los datos correctos cuando el formulario es válido', async () => {
    const wrapper = montarForm()
    await wrapper.find('#nombre').setValue('Juan')
    await wrapper.find('#email').setValue('juan@test.com')
    await wrapper.find('#telefono').setValue('5551234567')
    await wrapper.find('form').trigger('submit')

    expect(wrapper.emitted('submit')).toBeTruthy()
    expect(wrapper.emitted('submit')[0][0]).toMatchObject({
      nombre: 'Juan',
      email: 'juan@test.com',
      telefono: '5551234567',
      estado: 'activo',
    })
  })

  it('emite "cancel" al hacer clic en Cancelar', async () => {
    const wrapper = montarForm()
    await wrapper.find('button[type="button"]').trigger('click')
    expect(wrapper.emitted('cancel')).toBeTruthy()
  })
})
