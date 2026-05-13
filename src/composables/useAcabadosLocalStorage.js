import { ref, readonly } from 'vue'

const STORAGE_KEY = 'quoter:acabados'

export const estadosAcabado = [
  { value: 'activo', label: 'Activo' },
  { value: 'inactivo', label: 'Inactivo' },
]

const estadosPermitidos = estadosAcabado.map((e) => e.value)

function esAcabadoValido(a) {
  return (
    a &&
    typeof a.id === 'string' &&
    typeof a.nombre === 'string' &&
    estadosPermitidos.includes(a.estado)
  )
}

function cargarDesdeStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.filter(esAcabadoValido)
  } catch {
    return []
  }
}

function guardarEnStorage(acabados) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(acabados))
}

export function useAcabadosLocalStorage() {
  const _acabados = ref(cargarDesdeStorage())

  function createAcabado({ nombre, estado = 'activo' }) {
    const nuevoAcabado = {
      id: crypto.randomUUID(),
      nombre: nombre.trim(),
      estado,
    }
    _acabados.value.push(nuevoAcabado)
    guardarEnStorage(_acabados.value)
    return nuevoAcabado
  }

  function updateAcabado(id, datos) {
    const index = _acabados.value.findIndex((a) => a.id === id)
    if (index === -1) return false
    _acabados.value[index] = { ..._acabados.value[index], ...datos, id }
    guardarEnStorage(_acabados.value)
    return true
  }

  function deleteAcabado(id) {
    const index = _acabados.value.findIndex((a) => a.id === id)
    if (index === -1) return false
    _acabados.value.splice(index, 1)
    guardarEnStorage(_acabados.value)
    return true
  }

  function getAcabadoById(id) {
    return _acabados.value.find((a) => a.id === id) ?? null
  }

  return {
    acabados: readonly(_acabados),
    estadosAcabado,
    createAcabado,
    updateAcabado,
    deleteAcabado,
    getAcabadoById,
  }
}
