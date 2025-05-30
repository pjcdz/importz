'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Encargo, Profile } from '@/types/database'

interface EncargoListProps {
  userRole: 'comprador' | 'vendedora' | 'admin'
  userId: string
}

const statusColors = {
  'pendiente_cotizacion': 'bg-yellow-100 text-yellow-800',
  'cotizacion_recibida': 'bg-blue-100 text-blue-800',
  'esperando_pago_deposito': 'bg-orange-100 text-orange-800',
  'deposito_pagado': 'bg-green-100 text-green-800',
  'en_proceso_compra_usa': 'bg-purple-100 text-purple-800',
  'en_camino_argentina': 'bg-indigo-100 text-indigo-800',
  'listo_para_entrega_final': 'bg-emerald-100 text-emerald-800',
  'esperando_pago_final': 'bg-amber-100 text-amber-800',
  'completado': 'bg-green-200 text-green-900',
  'cancelado_comprador': 'bg-red-100 text-red-800',
  'cancelado_vendedor': 'bg-red-100 text-red-800',
  'cancelado_admin': 'bg-red-100 text-red-800'
}

const statusLabels = {
  'pendiente_cotizacion': 'Pendiente Cotización',
  'cotizacion_recibida': 'Cotización Recibida',
  'esperando_pago_deposito': 'Esperando Depósito',
  'deposito_pagado': 'Depósito Pagado',
  'en_proceso_compra_usa': 'Comprando en USA',
  'en_camino_argentina': 'En Camino',
  'listo_para_entrega_final': 'Listo para Entrega',
  'esperando_pago_final': 'Esperando Pago Final',
  'completado': 'Completado',
  'cancelado_comprador': 'Cancelado por Comprador',
  'cancelado_vendedor': 'Cancelado por Vendedora',
  'cancelado_admin': 'Cancelado por Admin'
}

export default function EncargoList({ userRole, userId }: EncargoListProps) {
  const [encargos, setEncargos] = useState<Encargo[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchEncargos()
  }, [userRole, userId])

  const fetchEncargos = async () => {
    try {
      let query = supabase
        .from('encargos')
        .select(`
          *,
          comprador:profiles!encargos_comprador_id_fkey(*)
        `)
        .order('created_at', { ascending: false })

      // Filter based on user role
      if (userRole === 'comprador') {
        query = query.eq('comprador_id', userId)
      }
      // vendedoras and admins can see all encargos

      const { data, error } = await query

      if (error) throw error
      setEncargos(data || [])
    } catch (error) {
      console.error('Error fetching encargos:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-AR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  if (loading) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="text-center text-gray-500">Cargando encargos...</div>
      </div>
    )
  }

  if (encargos.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="text-center text-gray-500">
          {userRole === 'comprador' 
            ? 'No tienes encargos aún. ¡Crea tu primer encargo!'
            : 'No hay encargos disponibles en este momento.'
          }
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">
          {userRole === 'comprador' ? 'Mis Encargos' : 'Encargos Disponibles'}
        </h3>
      </div>

      <div className="divide-y divide-gray-200">
        {encargos.map((encargo) => (
          <div key={encargo.id} className="p-6 hover:bg-gray-50">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="text-lg font-medium text-gray-900 mb-2">
                  {encargo.product_name}
                </h4>
                
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                  <div>
                    <span className="font-medium">Cantidad:</span> {encargo.quantity}
                  </div>
                  <div>
                    <span className="font-medium">Categoría:</span> {encargo.category || 'No especificada'}
                  </div>
                  {encargo.estimated_price && (
                    <div>
                      <span className="font-medium">Precio estimado:</span> {encargo.estimated_price}
                    </div>
                  )}
                  <div>
                    <span className="font-medium">Creado:</span> {formatDate(encargo.created_at)}
                  </div>
                </div>

                {encargo.description && (
                  <p className="text-sm text-gray-600 mb-3">{encargo.description}</p>
                )}

                {encargo.product_url && (
                  <a
                    href={encargo.product_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:text-blue-800 underline"
                  >
                    Ver producto →
                  </a>
                )}

                {userRole !== 'comprador' && encargo.comprador && (
                  <div className="mt-3 text-sm text-gray-600">
                    <span className="font-medium">Comprador:</span> {encargo.comprador.full_name || encargo.comprador.email}
                  </div>
                )}
              </div>

              <div className="ml-4 flex flex-col items-end space-y-2">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[encargo.status]}`}>
                  {statusLabels[encargo.status]}
                </span>

                {userRole === 'vendedora' && encargo.status === 'pendiente_cotizacion' && (
                  <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                    Crear Cotización
                  </button>
                )}

                {userRole === 'comprador' && encargo.status === 'cotizacion_recibida' && (
                  <button className="text-sm text-green-600 hover:text-green-800 font-medium">
                    Ver Cotización
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}