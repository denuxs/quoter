import { ref, readonly } from 'vue'

const STORAGE_KEY = 'quoter:clientes'

function esClienteValido(c) {
  return c && typeof c.id === 'string' && typeof c.nombre === 'string' && c.nombre.trim() !== ''
}

function cargarDesdeStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.filter(esClienteValido)
  } catch {
    return []
  }
}

export function useClientesLocalStorageOptions() {
  const clientes = ref(cargarDesdeStorage())

  return {
    clientes: readonly(clientes),
  }
}
