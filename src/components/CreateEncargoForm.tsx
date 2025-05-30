'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Encargo } from '@/types/database'

interface CreateEncargoFormProps {
  compradorId: string
  onSuccess: (encargo: Encargo) => void
  onCancel: () => void
}

export default function CreateEncargoForm({ compradorId, onSuccess, onCancel }: CreateEncargoFormProps) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    product_name: '',
    product_url: '',
    quantity: 1,
    description: '',
    estimated_price: '',
    category: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { data, error } = await supabase
        .from('encargos')
        .insert([{
          comprador_id: compradorId,
          ...formData
        }])
        .select()
        .single()

      if (error) throw error

      onSuccess(data)
    } catch (error) {
      console.error('Error creating encargo:', error)
      alert('Error al crear el encargo. Por favor intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'quantity' ? parseInt(value) || 1 : value
    }))
  }

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Crear Nuevo Encargo</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="product_name" className="block text-sm font-medium text-gray-700 mb-1">
            Nombre del Producto *
          </label>
          <input
            type="text"
            id="product_name"
            name="product_name"
            required
            value={formData.product_name}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ej: iPhone 15 Pro Max 256GB"
          />
        </div>

        <div>
          <label htmlFor="product_url" className="block text-sm font-medium text-gray-700 mb-1">
            URL del Producto
          </label>
          <input
            type="url"
            id="product_url"
            name="product_url"
            value={formData.product_url}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="https://amazon.com/..."
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
              Cantidad *
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              required
              min="1"
              value={formData.quantity}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Categoría
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Seleccionar categoría</option>
              <option value="electronica">Electrónica</option>
              <option value="ropa">Ropa y Accesorios</option>
              <option value="hogar">Hogar y Jardín</option>
              <option value="deportes">Deportes</option>
              <option value="belleza">Belleza y Salud</option>
              <option value="libros">Libros</option>
              <option value="juguetes">Juguetes</option>
              <option value="otros">Otros</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="estimated_price" className="block text-sm font-medium text-gray-700 mb-1">
            Precio Estimado
          </label>
          <input
            type="text"
            id="estimated_price"
            name="estimated_price"
            value={formData.estimated_price}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ej: $500 USD, aprox 200.000 ARS"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Descripción Adicional
          </label>
          <textarea
            id="description"
            name="description"
            rows={3}
            value={formData.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Detalles específicos, color, modelo, etc."
          />
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-md"
          >
            {loading ? 'Creando...' : 'Crear Encargo'}
          </button>
        </div>
      </form>
    </div>
  )
}