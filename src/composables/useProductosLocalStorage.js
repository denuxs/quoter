import { ref, readonly } from 'vue'

const STORAGE_KEY = 'quoter:productos'

export const estadosProducto = [
  { value: 'enviada', label: 'Enviada' },
  { value: 'aprobada', label: 'Aprobada' },
  { value: 'rechazada', label: 'Rechazada' },
]

function cargarDesdeStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed
  } catch {
    return []
  }
}

function guardarEnStorage(productos) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(productos))
}

export function useProductosLocalStorage() {
  const _productos = ref(cargarDesdeStorage())

  function createProducto({ nombre, estado = 'enviada', precios = [], especificaciones = [] }) {
    const nuevoProducto = {
      id: crypto.randomUUID(),
      nombre: nombre.trim(),
      estado,
      precios,
      especificaciones,
    }
    _productos.value.push(nuevoProducto)
    guardarEnStorage(_productos.value)
    return nuevoProducto
  }

  function updateProducto(id, datos) {
    const index = _productos.value.findIndex((p) => p.id === id)
    if (index === -1) return false
    _productos.value[index] = { ..._productos.value[index], ...datos, id }
    guardarEnStorage(_productos.value)
    return true
  }

  function deleteProducto(id) {
    const index = _productos.value.findIndex((p) => p.id === id)
    if (index === -1) return false
    _productos.value.splice(index, 1)
    guardarEnStorage(_productos.value)
    return true
  }

  function getProductoById(id) {
    return _productos.value.find((p) => p.id === id) ?? null
  }

  return {
    productos: readonly(_productos),
    estadosProducto,
    createProducto,
    updateProducto,
    deleteProducto,
    getProductoById,
  }
}
