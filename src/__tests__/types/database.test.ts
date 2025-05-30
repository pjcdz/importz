import { EncargoStatus, UserRole, Encargo, Profile, Cotizacion, AutoPedido } from '@/types/database'

describe('Database Types - Sprint 0', () => {
  it('defines the three user roles from Sprint 0', () => {
    const validRoles: UserRole[] = ['comprador', 'vendedora', 'admin']
    expect(validRoles).toHaveLength(3)
    expect(validRoles).toContain('comprador')
    expect(validRoles).toContain('vendedora')
    expect(validRoles).toContain('admin')
  })

  it('defines all encargo statuses from Sprint 0 schema', () => {
    const validStatuses: EncargoStatus[] = [
      'pendiente_cotizacion',
      'cotizacion_recibida',
      'esperando_pago_deposito',
      'deposito_pagado',
      'en_proceso_compra_usa',
      'en_camino_argentina',
      'listo_para_entrega_final',
      'esperando_pago_final',
      'completado',
      'cancelado_comprador',
      'cancelado_vendedor',
      'cancelado_admin'
    ]
    
    // Verificamos algunos estados clave del Sprint 0
    expect(validStatuses).toContain('pendiente_cotizacion')
    expect(validStatuses).toContain('cotizacion_recibida')
    expect(validStatuses).toContain('completado')
    expect(validStatuses).toHaveLength(12)
  })

  it('validates Profile structure matches Sprint 0 schema', () => {
    const mockProfile: Profile = {
      id: '03e19010-4b48-430e-9368-3813317dbde7',
      email: 'cardozopabloj@gmail.com',
      full_name: 'Pablo Cardozo',
      avatar_url: null,
      role: 'comprador',
      created_at: '2025-05-29T23:04:00Z',
      updated_at: '2025-05-29T23:04:00Z'
    }

    // Verificar que tiene todos los campos requeridos del Sprint 0
    expect(typeof mockProfile.id).toBe('string')
    expect(typeof mockProfile.email).toBe('string')
    expect(['comprador', 'vendedora', 'admin']).toContain(mockProfile.role)
    expect(typeof mockProfile.created_at).toBe('string')
    expect(typeof mockProfile.updated_at).toBe('string')
    
    // Verificar campos opcionales
    expect(mockProfile.full_name).toBeDefined()
    expect(mockProfile.avatar_url).toBeDefined()
  })

  it('validates Encargo structure matches Sprint 0 schema', () => {
    const mockEncargo: Encargo = {
      id: 'encargo-123',
      comprador_id: '03e19010-4b48-430e-9368-3813317dbde7',
      product_name: 'iPhone 15 Pro',
      product_url: 'https://www.apple.com/iphone-15-pro/',
      quantity: 1,
      description: 'Color Natural Titanium, 256GB',
      estimated_price: '1200',
      image_url: null,
      category: null,
      status: 'pendiente_cotizacion',
      created_at: '2025-05-29T23:04:00Z',
      updated_at: '2025-05-29T23:04:00Z'
    }

    // Verificar campos requeridos
    expect(typeof mockEncargo.id).toBe('string')
    expect(typeof mockEncargo.comprador_id).toBe('string')
    expect(typeof mockEncargo.product_name).toBe('string')
    expect(typeof mockEncargo.quantity).toBe('number')
    expect(mockEncargo.quantity).toBeGreaterThan(0)
    
    // Verificar estado válido
    const validStatuses: EncargoStatus[] = [
      'pendiente_cotizacion', 'cotizacion_recibida', 'esperando_pago_deposito',
      'deposito_pagado', 'en_proceso_compra_usa', 'en_camino_argentina',
      'listo_para_entrega_final', 'esperando_pago_final', 'completado',
      'cancelado_comprador', 'cancelado_vendedor', 'cancelado_admin'
    ]
    expect(validStatuses).toContain(mockEncargo.status)
  })

  it('validates Cotizacion structure matches Sprint 0 schema', () => {
    const mockCotizacion: Cotizacion = {
      id: 'cotizacion-123',
      encargo_id: 'encargo-123',
      vendedora_id: 'vendedora-id',
      precio_producto_usd: 1200,
      comision_importacion: 300,
      precio_total_ars: 1500000,
      deposito_requerido_ars: 750000,
      tiempo_estimado_dias: 21,
      comentarios: 'Tiempo estimado incluye envío internacional',
      status: 'pendiente',
      created_at: '2025-05-29T23:04:00Z',
      updated_at: '2025-05-29T23:04:00Z'
    }

    // Verificar campos numéricos
    expect(typeof mockCotizacion.precio_producto_usd).toBe('number')
    expect(typeof mockCotizacion.comision_importacion).toBe('number')
    expect(typeof mockCotizacion.precio_total_ars).toBe('number')
    expect(typeof mockCotizacion.deposito_requerido_ars).toBe('number')
    expect(typeof mockCotizacion.tiempo_estimado_dias).toBe('number')
    
    // Verificar estado válido
    const validStatuses = ['pendiente', 'aceptada', 'rechazada', 'expirada']
    expect(validStatuses).toContain(mockCotizacion.status)
  })

  it('validates AutoPedido structure matches Sprint 0 schema', () => {
    const mockAutoPedido: AutoPedido = {
      id: 'autopedido-123',
      vendedora_id: 'vendedora-id',
      product_name: 'iPhone 15 Pro - En Stock',
      product_url: 'https://www.apple.com/iphone-15-pro/',
      quantity: 2,
      precio_producto_usd: 1200,
      precio_venta_ars: 1600000,
      description: 'Disponible para entrega inmediata',
      image_url: null,
      category: 'Electronics',
      status: 'disponible',
      created_at: '2025-05-29T23:04:00Z',
      updated_at: '2025-05-29T23:04:00Z'
    }

    // Verificar campos requeridos
    expect(typeof mockAutoPedido.id).toBe('string')
    expect(typeof mockAutoPedido.vendedora_id).toBe('string')
    expect(typeof mockAutoPedido.product_name).toBe('string')
    expect(typeof mockAutoPedido.quantity).toBe('number')
    expect(typeof mockAutoPedido.precio_producto_usd).toBe('number')
    expect(typeof mockAutoPedido.precio_venta_ars).toBe('number')
    
    // Verificar estado válido
    const validStatuses = ['disponible', 'reservado', 'vendido', 'cancelado']
    expect(validStatuses).toContain(mockAutoPedido.status)
  })
})