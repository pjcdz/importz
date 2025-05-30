# Importz - Plataforma de Encargos Globales

Una plataforma que conecta compradores argentinos con vendedoras en USA para importaciones seguras y eficientes.

## Stack Tecnológico

- **Frontend**: Next.js 14 con TypeScript
- **Styling**: Tailwind CSS v3 (con upgrade path a v4)
- **Backend**: Supabase (Base de datos PostgreSQL + Auth + Storage)
- **Deployment**: Vercel (recomendado para Next.js)

## Pre-Sprint 0: Setup & Foundation ✅

### Configuración Inicial Completada

- ✅ Proyecto Next.js 14 con TypeScript y Tailwind CSS
- ✅ Supabase JS library instalada
- ✅ Supabase CLI configurado
- ✅ Schema inicial de base de datos diseñado
- ✅ Tipos TypeScript definidos
- ✅ Sistema de autenticación con Google OAuth
- ✅ Row Level Security (RLS) habilitado
- ✅ Estructura básica de componentes
- ✅ Testing setup básico con Jest y Testing Library

## Configuración del Proyecto

### 1. Variables de Entorno

Crea un archivo `.env.local` basado en `.env.local.example`:

```bash
cp .env.local.example .env.local
```

Completa las variables con tus credenciales de Supabase:

```env
NEXT_PUBLIC_SUPABASE_URL=tu-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key
SUPABASE_SERVICE_ROLE_KEY=tu-service-role-key
```

### 2. Configuración de Supabase

#### Opción A: Desarrollo Local (Recomendado)

```bash
# Iniciar Supabase local
npm run supabase:start

# Aplicar migraciones
npm run supabase:reset

# Ver estado
npm run supabase:status
```

#### Opción B: Supabase Cloud

1. Crea un proyecto en [supabase.com](https://supabase.com)
2. Conecta el proyecto local:
```bash
supabase login
supabase link --project-ref tu-project-ref
```
3. Aplica las migraciones:
```bash
npm run supabase:push
```

### 3. Configurar Google OAuth

En tu proyecto de Supabase:

1. Ve a Authentication > Providers > Google
2. Habilita Google provider
3. Agrega las URLs de callback:
   - Local: `http://localhost:3000/auth/callback`
   - Producción: `https://tu-dominio.com/auth/callback`

### 4. Ejecutar el Proyecto

```bash
npm run dev
```

Visita [http://localhost:3000](http://localhost:3000)

## Estructura del Proyecto

```
src/
├── app/                    # App Router de Next.js 14
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx           # Página home
│   └── auth/
│       └── callback/      # OAuth callback handler
├── components/            # Componentes React
│   └── Auth.tsx          # Sistema de autenticación
├── lib/                  # Utilidades y configuración
│   └── supabase.ts       # Cliente de Supabase
└── types/                # Definiciones TypeScript
    └── database.ts       # Tipos de la base de datos

supabase/
├── config.toml           # Configuración local de Supabase
└── migrations/           # Migraciones de base de datos
    ├── 20250529000001_initial_schema.sql
    └── 20250529000002_seed_data.sql
```

## Schema de Base de Datos

### Tablas Principales

- **profiles**: Perfiles de usuarios (compradores, vendedoras, admin)
- **encargos**: Solicitudes de compra de compradores
- **cotizaciones**: Ofertas de vendedoras para encargos
- **auto_pedidos**: Productos en stock de vendedoras

### Roles de Usuario

- **comprador**: Puede crear encargos y aceptar cotizaciones
- **vendedora**: Puede ver encargos, crear cotizaciones y auto_pedidos
- **admin**: Acceso completo al sistema

### Estados de Encargo

1. `pendiente_cotizacion` - Estado inicial
2. `cotizacion_recibida` - Vendedora ha cotizado
3. `esperando_pago_deposito` - Cotización aceptada
4. `deposito_pagado` - Depósito recibido
5. `en_proceso_compra_usa` - Comprando en USA
6. `en_camino_argentina` - En tránsito
7. `listo_para_entrega_final` - Listo para entrega
8. `esperando_pago_final` - Esperando pago final
9. `completado` - Proceso completo
10. `cancelado_*` - Varios tipos de cancelación

## Scripts Disponibles

### Desarrollo
- `npm run dev` - Servidor de desarrollo
- `npm run build` - Build de producción
- `npm run start` - Servidor de producción
- `npm run lint` - Linter de código

### Testing
- `npm test` - Ejecutar tests
- `npm run test:watch` - Tests en modo watch
- `npm run test:coverage` - Tests con coverage report

### Supabase
- `npm run supabase:start` - Iniciar Supabase local
- `npm run supabase:stop` - Detener Supabase local
- `npm run supabase:reset` - Resetear DB y aplicar migraciones
- `npm run supabase:status` - Ver estado de servicios
- `npm run supabase:diff` - Ver diferencias en schema
- `npm run supabase:push` - Subir cambios a Supabase Cloud
- `npm run supabase:pull` - Bajar cambios de Supabase Cloud
- `npm run supabase:generate-types` - Generar tipos TypeScript

## Próximos Pasos - Sprint Plan

## Contribuir

Este proyecto sigue el principio de "Funcionalidad Primero, Estética Después". Enfócate en:

1. 🎯 **Funcionalidad**: Lógica de negocio y flujos de datos
2. 🔐 **Seguridad**: RLS policies y validación
3. 📱 **UX**: Experiencia de usuario sin estilos complejos
4. 🎨 **UI**: Estilos visuales al final

## Licencia

MIT
