import { ref } from 'vue'
import { defineStore } from 'pinia'

const STORAGE_KEY = 'quoter:clientes'

function cargarDesdeStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function guardarEnStorage(clientes) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(clientes))
}

export const useClientesStore = defineStore('clientes', () => {
  const clientes = ref(cargarDesdeStorage())

  function createCliente({ nombre, email, telefono, estado = 'activo' }) {
    const nuevoCliente = {
      id: crypto.randomUUID(),
      nombre,
      email,
      telefono,
      estado,
    }
    clientes.value.push(nuevoCliente)
    guardarEnStorage(clientes.value)
    return nuevoCliente
  }

  function updateCliente(id, datos) {
    const index = clientes.value.findIndex((c) => c.id === id)
    if (index === -1) return false
    clientes.value[index] = { ...clientes.value[index], ...datos, id }
    guardarEnStorage(clientes.value)
    return true
  }

  function deleteCliente(id) {
    const index = clientes.value.findIndex((c) => c.id === id)
    if (index === -1) return false
    clientes.value.splice(index, 1)
    guardarEnStorage(clientes.value)
    return true
  }

  function toggleEstado(id) {
    const cliente = clientes.value.find((c) => c.id === id)
    if (!cliente) return false
    cliente.estado = cliente.estado === 'activo' ? 'inactivo' : 'activo'
    guardarEnStorage(clientes.value)
    return true
  }

  return { clientes, createCliente, updateCliente, deleteCliente, toggleEstado }
})
