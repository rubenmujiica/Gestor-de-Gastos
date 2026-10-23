import { useEffect, useState } from 'react'

interface Categoria {
  id?: number
  nombre: string
  descripcion: string
  icono: string
  color: string
}

function App() {
  const [categorias, setCategorias] = useState<Categoria[]>([])
  const [cargando, setCargando] = useState<boolean>(true)

  // Estados del formulario rápido
  const [nombre, setNombre] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [color, setColor] = useState('#10b981')

  const cargarCategorias = () => {
    fetch('http://localhost:8080/api/categorias')
      .then((res) => res.json())
      .then((datos) => {
        setCategorias(datos)
        setCargando(false)
      })
      .catch((err) => {
        console.error('Error al conectar con la API:', err)
        setCargando(false)
      })
  }

  useEffect(() => {
    cargarCategorias()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!nombre.trim()) return

    const nuevaCategoria: Categoria = {
      nombre,
      descripcion,
      icono: 'tag',
      color,
    }

    fetch('http://localhost:8080/api/categorias', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevaCategoria),
    })
      .then((res) => res.json())
      .then(() => {
        setNombre('')
        setDescripcion('')
        setColor('#10b981')
        cargarCategorias()
      })
      .catch((err) => console.error('Error al crear la categoría:', err))
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans">
      
      {/* Barra de Navegación Principal */}
      <nav className="bg-slate-800 border-b border-slate-700 px-6 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center font-bold text-slate-950">
              $
            </div>
            <span className="font-bold text-lg text-white tracking-wide">GastosApp</span>
          </div>
          
          <div className="flex items-center space-x-6 text-sm">
            <a href="#dashboard" className="text-emerald-400 font-medium">Inicio</a>
            <a href="#categorias" className="text-slate-400 hover:text-slate-200 transition-colors">Categorías</a>
            <a href="#transacciones" className="text-slate-400 hover:text-slate-200 transition-colors">Transacciones</a>
          </div>
        </div>
      </nav>

      {/* Contenido Principal (Index) */}
      <main className="max-w-6xl mx-auto p-6 space-y-8">
        
        {/* Cabecera de Bienvenida */}
        <div>
          <h1 className="text-2xl font-bold text-white">Panel Principal</h1>
          <p className="text-slate-400 text-sm mt-1">
            Resumen global de tu sistema financiero personal.
          </p>
        </div>

        {/* 1. Tarjetas KPI (Métricas Principales) */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-slate-800 border border-slate-700/80 rounded-xl p-5 shadow-sm">
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Balance Total</span>
            <p className="text-2xl font-bold text-emerald-400 mt-2">0,00 €</p>
          </div>

          <div className="bg-slate-800 border border-slate-700/80 rounded-xl p-5 shadow-sm">
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Ingresos Mes</span>
            <p className="text-2xl font-bold text-white mt-2">0,00 €</p>
          </div>

          <div className="bg-slate-800 border border-slate-700/80 rounded-xl p-5 shadow-sm">
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Gastos Mes</span>
            <p className="text-2xl font-bold text-rose-400 mt-2">0,00 €</p>
          </div>

          <div className="bg-slate-800 border border-slate-700/80 rounded-xl p-5 shadow-sm">
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Categorías</span>
            <p className="text-2xl font-bold text-indigo-400 mt-2">{categorias.length}</p>
          </div>
        </div>

        {/* 2. Sección del Formulario y Listado */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Formulario Rápido (Crear Categoría) */}
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-sm h-fit">
            <h2 className="text-base font-semibold text-white mb-4">Nueva Categoría</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Nombre</label>
                <input
                  type="text"
                  placeholder="Ej. Ocio, Transporte..."
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Descripción</label>
                <input
                  type="text"
                  placeholder="Ej. Salidas, cine, viajes"
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Color Identificativo</label>
                <input
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="w-full h-10 bg-slate-900 border border-slate-700 rounded-lg p-1 cursor-pointer"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-2 rounded-lg text-sm transition-colors cursor-pointer"
              >
                Guardar Categoría
              </button>
            </form>
          </div>

          {/* Grid de Categorías Registradas */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-base font-semibold text-white">Categorías Activas</h2>

            {cargando ? (
              <div className="flex items-center space-x-3 text-slate-400 p-4">
                <div className="w-4 h-4 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                <span>Cargando datos desde la API...</span>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {categorias.map((cat) => (
                  <div
                    key={cat.id}
                    className="bg-slate-800 border border-slate-700/60 rounded-xl p-4 hover:border-slate-500 transition-all shadow-sm flex flex-col justify-between"
                    style={{ borderLeftColor: cat.color || '#10b981', borderLeftWidth: '5px' }}
                  >
                    <div>
                      <h3 className="font-semibold text-slate-100 text-base">{cat.nombre}</h3>
                      <p className="text-slate-400 text-xs mt-1 leading-relaxed">{cat.descripcion || 'Sin descripción'}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </main>
    </div>
  )
}

export default App