import { ref, readonly } from 'vue'

const STORAGE_KEY = 'quoter:cotizaciones'

export const estadosCotizacion = [
  { value: 'enviada', label: 'Enviada' },
  { value: 'aprobada', label: 'Aprobada' },
  { value: 'rechazada', label: 'Rechazada' },
]

const estadosPermitidos = estadosCotizacion.map((e) => e.value)

function esCotizacionValida(c) {
  return (
    c &&
    typeof c.id === 'string' &&
    typeof c.clienteId === 'string' &&
    typeof c.productoId === 'string' &&
    estadosPermitidos.includes(c.estado)
  )
}

function cargarDesdeStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.filter(esCotizacionValida)
  } catch {
    return []
  }
}

function guardarEnStorage(cotizaciones) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cotizaciones))
}

export function useCotizacionesLocalStorage() {
  const _cotizaciones = ref(cargarDesdeStorage())

  function createCotizacion({ codigo, fecha, clienteId, productoId, estado = 'enviada' }) {
    const nueva = {
      id: crypto.randomUUID(),
      codigo: codigo ? codigo.trim() : '',
      fecha: fecha ?? '',
      clienteId,
      productoId,
      estado,
    }
    _cotizaciones.value.push(nueva)
    guardarEnStorage(_cotizaciones.value)
    return nueva
  }

  function updateCotizacion(id, datos) {
    const index = _cotizaciones.value.findIndex((c) => c.id === id)
    if (index === -1) return false
    _cotizaciones.value[index] = { ..._cotizaciones.value[index], ...datos, id }
    guardarEnStorage(_cotizaciones.value)
    return true
  }

  function deleteCotizacion(id) {
    const index = _cotizaciones.value.findIndex((c) => c.id === id)
    if (index === -1) return false
    _cotizaciones.value.splice(index, 1)
    guardarEnStorage(_cotizaciones.value)
    return true
  }

  function getCotizacionById(id) {
    return _cotizaciones.value.find((c) => c.id === id) ?? null
  }

  return {
    cotizaciones: readonly(_cotizaciones),
    estadosCotizacion,
    createCotizacion,
    updateCotizacion,
    deleteCotizacion,
    getCotizacionById,
  }
}
