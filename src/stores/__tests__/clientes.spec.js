import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useClientesStore } from '../clientes'

const STORAGE_KEY = 'quoter:clientes'

function clearStorage() {
  localStorage.removeItem(STORAGE_KEY)
}

describe('useClientesStore', () => {
  beforeEach(() => {
    clearStorage()
    setActivePinia(createPinia())
  })

  it('inicia con lista vacía cuando localStorage está vacío', () => {
    const store = useClientesStore()
    expect(store.clientes).toHaveLength(0)
  })

  it('carga clientes desde localStorage al inicializar', () => {
    const existente = [
      { id: '1', nombre: 'Ana', email: 'ana@test.com', telefono: '111', estado: 'activo' },
    ]
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existente))
    setActivePinia(createPinia())
    const store = useClientesStore()
    expect(store.clientes).toHaveLength(1)
    expect(store.clientes[0].nombre).toBe('Ana')
  })

  it('crea un cliente y lo persiste en localStorage', () => {
    const store = useClientesStore()
    const cliente = store.createCliente({
      nombre: 'Juan',
      email: 'juan@test.com',
      telefono: '5551234567',
    })

    expect(cliente.id).toBeTruthy()
    expect(store.clientes).toHaveLength(1)

    const guardado = JSON.parse(localStorage.getItem(STORAGE_KEY))
    expect(guardado).toHaveLength(1)
    expect(guardado[0].nombre).toBe('Juan')
  })

  it('crea cliente con estado activo por defecto', () => {
    const store = useClientesStore()
    store.createCliente({ nombre: 'X', email: 'x@x.com', telefono: '000' })
    expect(store.clientes[0].estado).toBe('activo')
  })

  it('actualiza un cliente y persiste el cambio', () => {
    const store = useClientesStore()
    const cliente = store.createCliente({ nombre: 'Maria', email: 'maria@test.com', telefono: '222' })
    store.updateCliente(cliente.id, { nombre: 'María Actualizada' })

    expect(store.clientes[0].nombre).toBe('María Actualizada')

    const guardado = JSON.parse(localStorage.getItem(STORAGE_KEY))
    expect(guardado[0].nombre).toBe('María Actualizada')
  })

  it('updateCliente no modifica el id', () => {
    const store = useClientesStore()
    const cliente = store.createCliente({ nombre: 'Pedro', email: 'p@p.com', telefono: '333' })
    store.updateCliente(cliente.id, { id: 'otro-id', nombre: 'Pedro 2' })
    expect(store.clientes[0].id).toBe(cliente.id)
  })

  it('updateCliente devuelve false si el id no existe', () => {
    const store = useClientesStore()
    const resultado = store.updateCliente('no-existe', { nombre: 'X' })
    expect(resultado).toBe(false)
  })

  it('elimina un cliente y persiste el cambio', () => {
    const store = useClientesStore()
    const c1 = store.createCliente({ nombre: 'A', email: 'a@a.com', telefono: '1' })
    store.createCliente({ nombre: 'B', email: 'b@b.com', telefono: '2' })

    store.deleteCliente(c1.id)
    expect(store.clientes).toHaveLength(1)
    expect(store.clientes[0].nombre).toBe('B')

    const guardado = JSON.parse(localStorage.getItem(STORAGE_KEY))
    expect(guardado).toHaveLength(1)
  })

  it('deleteCliente devuelve false si el id no existe', () => {
    const store = useClientesStore()
    const resultado = store.deleteCliente('no-existe')
    expect(resultado).toBe(false)
  })

  it('toggleEstado cambia activo a inactivo', () => {
    const store = useClientesStore()
    const cliente = store.createCliente({ nombre: 'C', email: 'c@c.com', telefono: '3', estado: 'activo' })
    store.toggleEstado(cliente.id)
    expect(store.clientes[0].estado).toBe('inactivo')
  })

  it('toggleEstado cambia inactivo a activo', () => {
    const store = useClientesStore()
    const cliente = store.createCliente({ nombre: 'D', email: 'd@d.com', telefono: '4', estado: 'inactivo' })
    store.toggleEstado(cliente.id)
    expect(store.clientes[0].estado).toBe('activo')
  })

  it('toggleEstado persiste el cambio en localStorage', () => {
    const store = useClientesStore()
    const cliente = store.createCliente({ nombre: 'E', email: 'e@e.com', telefono: '5' })
    store.toggleEstado(cliente.id)
    const guardado = JSON.parse(localStorage.getItem(STORAGE_KEY))
    expect(guardado[0].estado).toBe('inactivo')
  })

  it('toggleEstado devuelve false si el id no existe', () => {
    const store = useClientesStore()
    const resultado = store.toggleEstado('no-existe')
    expect(resultado).toBe(false)
  })
})
