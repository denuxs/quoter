import { ref, readonly } from 'vue'

const STORAGE_KEY = 'quoter:maquinas'

export const estadosMaquina = [
  { value: 'activo', label: 'Activo' },
  { value: 'inactivo', label: 'Inactivo' },
]

const estadosPermitidos = estadosMaquina.map((e) => e.value)

function esMaquinaValida(m) {
  return (
    m &&
    typeof m.id === 'string' &&
    typeof m.nombre === 'string' &&
    estadosPermitidos.includes(m.estado)
  )
}

function cargarDesdeStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.filter(esMaquinaValida)
  } catch {
    return []
  }
}

function guardarEnStorage(maquinas) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(maquinas))
}

export function useMaquinasLocalStorage() {
  const _maquinas = ref(cargarDesdeStorage())

  function createMaquina({ nombre, estado = 'activo' }) {
    const nuevaMaquina = {
      id: crypto.randomUUID(),
      nombre: nombre.trim(),
      estado,
    }
    _maquinas.value.push(nuevaMaquina)
    guardarEnStorage(_maquinas.value)
    return nuevaMaquina
  }

  function updateMaquina(id, datos) {
    const index = _maquinas.value.findIndex((m) => m.id === id)
    if (index === -1) return false
    _maquinas.value[index] = { ..._maquinas.value[index], ...datos, id }
    guardarEnStorage(_maquinas.value)
    return true
  }

  function deleteMaquina(id) {
    const index = _maquinas.value.findIndex((m) => m.id === id)
    if (index === -1) return false
    _maquinas.value.splice(index, 1)
    guardarEnStorage(_maquinas.value)
    return true
  }

  function getMaquinaById(id) {
    return _maquinas.value.find((m) => m.id === id) ?? null
  }

  return {
    maquinas: readonly(_maquinas),
    estadosMaquina,
    createMaquina,
    updateMaquina,
    deleteMaquina,
    getMaquinaById,
  }
}
