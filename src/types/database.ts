export type UserRole = 'comprador' | 'vendedora' | 'admin'

export type EncargoStatus = 
  | 'pendiente_cotizacion'
  | 'cotizacion_recibida'
  | 'esperando_pago_deposito'
  | 'deposito_pagado'
  | 'en_proceso_compra_usa'
  | 'en_camino_argentina'
  | 'listo_para_entrega_final'
  | 'esperando_pago_final'
  | 'completado'
  | 'cancelado_comprador'
  | 'cancelado_vendedor'
  | 'cancelado_admin'

export interface Profile {
  id: string
  email: string
  full_name: string | null
  avatar_url: string | null
  role: UserRole
  created_at: string
  updated_at: string
}

export interface Encargo {
  id: string
  comprador_id: string
  product_name: string
  product_url: string | null
  quantity: number
  description: string | null
  estimated_price: string | null
  image_url: string | null
  category: string | null
  status: EncargoStatus
  created_at: string
  updated_at: string
  // Relations
  comprador?: Profile
}

export interface Cotizacion {
  id: string
  encargo_id: string
  vendedora_id: string
  precio_producto_usd: number
  comision_importacion: number
  precio_total_ars: number
  deposito_requerido_ars: number
  tiempo_estimado_dias: number
  comentarios: string | null
  status: 'pendiente' | 'aceptada' | 'rechazada' | 'expirada'
  created_at: string
  updated_at: string
  // Relations
  encargo?: Encargo
  vendedora?: Profile
}

export interface AutoPedido {
  id: string
  vendedora_id: string
  product_name: string
  product_url: string | null
  quantity: number
  precio_producto_usd: number
  precio_venta_ars: number
  description: string | null
  image_url: string | null
  category: string | null
  status: 'disponible' | 'reservado' | 'vendido' | 'cancelado'
  created_at: string
  updated_at: string
  // Relations
  vendedora?: Profile
}