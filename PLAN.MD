Okay, this is a fantastic approach: functionality first, then aesthetics. Next.js 14, Tailwind CSS (v4 when stable, or current v3 with an upgrade path in mind), and Supabase are an excellent stack. Controlling Supabase from VS Code with GitHub Copilot is also a smart productivity move.

Here's a sprint-based development plan focusing on functionality, assuming you're working solo or in a small team. Each sprint is roughly 1-2 weeks, but adjust based on your velocity.

Guiding Principles for This Plan:

Functionality Over Form: Absolutely no custom styling beyond default browser/Tailwind reset initially. Focus on data flow, state management, API calls, and business logic.

Supabase First: Define your database schema and RLS (Row Level Security) policies early. Use Supabase Studio and VS Code (with Supabase CLI and Copilot for SQL/migrations) extensively.

API Routes/Server Actions: Leverage Next.js API routes or Server Actions for all backend logic interacting with Supabase.

Incremental Testing: Basic unit/integration tests for critical logic as you go (e.g., using Jest/React Testing Library). End-to-end testing can be rudimentary at first (manual clicking through flows).

Component-Based: Even without styles, think in components for reusability.

State Management: Start with React's built-in state (useState, useContext, useReducer). Consider Zustand or Jotai if global state becomes complex, but avoid over-engineering early.

Tailwind v4 Note: Since v4 is aiming for a "zero-runtime, compile-time CSS" engine, the initial "no styles" phase aligns well. When you do add styles, it will be efficient. For now, you'll just have unstyled HTML elements.

Pre-Sprint 0: Setup & Foundation ✅ COMPLETADO

Estado Actual: El proyecto ya está completamente configurado y funcionando. A continuación se detalla lo que se logró vs lo que se había planificado originalmente.

✅ **Tareas Completadas:**

**Project Initialization:**
- ✅ Next.js 14 project creado con TypeScript, Tailwind CSS y ESLint
- ✅ Supabase JS library instalada (@supabase/supabase-js v2.49.8)
- ✅ Supabase CLI configurado como dependencia local
- ✅ Jest configurado para testing con coverage
- ✅ Scripts npm configurados para desarrollo completo

**Supabase Project Setup:**
- ✅ Proyecto en Supabase configurado
- ✅ Variables de entorno configuradas (.env.local)
- ✅ Supabase client helper implementado (/src/lib/supabase.ts)
- ✅ Admin client configurado para operaciones server-side

**Supabase Local Development Setup:**
- ✅ `supabase init` ejecutado y configurado
- ✅ Configuración completa en config.toml
- ✅ Scripts npm para gestión de Supabase (start, stop, reset, push, pull)
- ✅ Generación automática de tipos TypeScript

**Database Schema Implementation (Mejor de lo Planificado):**
- ✅ **profiles table** - Implementada con estructura completa:
  - Campos: id (string), email (string), full_name (string | null), avatar_url (string | null), role (UserRole), created_at, updated_at
  - Enum user_role: 'comprador', 'vendedora', 'admin'
  - RLS policies configuradas
  
- ✅ **encargos table** - Implementada y mejorada:
  - Campos: id (string), comprador_id (string), product_name (string), product_url (string | null), quantity (number), description (string | null), estimated_price (string | null), image_url (string | null), category (string | null), status (EncargoStatus), created_at, updated_at
  - Enum encargo_status con 12 estados del flujo completo: 'pendiente_cotizacion', 'cotizacion_recibida', 'esperando_pago_deposito', 'deposito_pagado', 'en_proceso_compra_usa', 'en_camino_argentina', 'listo_para_entrega_final', 'esperando_pago_final', 'completado', 'cancelado_comprador', 'cancelado_vendedor', 'cancelado_admin'
  - RLS policies para compradores y vendedoras
  - Índices optimizados
  - Relación: comprador (Profile)
  
- ✅ **cotizaciones table** - Implementada:
  - Campos: id (string), encargo_id (string), vendedora_id (string), precio_producto_usd (number), comision_importacion (number), precio_total_ars (number), deposito_requerido_ars (number), tiempo_estimado_dias (number), comentarios (string | null), status, created_at, updated_at
  - Enum cotizacion_status: 'pendiente', 'aceptada', 'rechazada', 'expirada'
  - RLS policies configuradas
  - Relaciones: encargo (Encargo), vendedora (Profile)
  
- ✅ **auto_pedidos table** - Implementada:
  - Campos: id (string), vendedora_id (string), product_name (string), product_url (string | null), quantity (number), precio_producto_usd (number), precio_venta_ars (number), description (string | null), image_url (string | null), category (string | null), status, created_at, updated_at
  - Enum auto_pedido_status: 'disponible', 'reservado', 'vendido', 'cancelado'
  - RLS policies configuradas
  - Relación: vendedora (Profile)

**Mejoras Adicionales Implementadas:**
- ✅ **Triggers automáticos** para updated_at en todas las tablas
- ✅ **Row Level Security (RLS)** habilitado en todas las tablas
- ✅ **Políticas de seguridad** granulares por rol de usuario
- ✅ **Índices de base de datos** para optimización de consultas
- ✅ **Migrations versionadas** con estructura profesional
- ✅ **Testing setup** con Jest, Testing Library y coverage reports
- ✅ **TypeScript configuration** optimizada

**Estructura de Componentes Básica:**
- ✅ Componentes de autenticación (Auth.tsx)
- ✅ Formularios para crear encargos (CreateEncargoForm.tsx)
- ✅ Lista de encargos (EncargoList.tsx)
- ✅ Tests unitarios implementados

**Testing Framework Completo Implementado:**
- ✅ **Jest configurado** con coverage reports y watch mode
- ✅ **React Testing Library** para tests de componentes
- ✅ **User Event testing** para interacciones de usuario
- ✅ **Tests unitarios existentes**:
  - `Auth.test.tsx` - Testing del componente de autenticación
  - `supabase.test.ts` - Testing de la configuración de Supabase
  - `database.test.ts` - Testing de tipos de base de datos
- ✅ **Scripts de testing configurados**:
  - `npm test` - Ejecutar tests
  - `npm run test:watch` - Modo watch para desarrollo
  - `npm run test:coverage` - Reportes de cobertura completos
- ✅ **Coverage reports generados** en formato HTML y LCOV
- ✅ **Jest setup personalizado** (jest.setup.js) con configuración optimizada
- ✅ **Testing environment configurado** para jsdom

**Lo que Excedió las Expectativas Originales:**
- El schema de base de datos está más completo y robusto de lo planificado
- Se implementaron múltiples enums para estados bien definidos
- RLS policies están configuradas desde el inicio (seguridad by-design)
- Testing framework completamente configurado
- Estructura de migrations profesional con versionado
- Componentes básicos ya implementados y testeados

**Estado Actual del Proyecto:**
El proyecto está en excelente estado para comenzar Sprint 1. La fundación técnica está sólida y va más allá de lo que se había planificado inicialmente. El siguiente paso es implementar la autenticación de usuarios y los primeros flujos de creación de encargos.

Sprint 1: User Authentication & Comprador's First Encargo Creation

Goal: Implement Flow 1 (Onboarding & Encargo Creation) focusing purely on functionality.

Tasks:

Google Authentication (app/auth routes, components):

Login button component (components/Auth/LoginButton.tsx).

Logic to call supabase.auth.signInWithOAuth({ provider: 'google' }).

Auth callback route (app/auth/callback/route.ts) to handle session creation.

Logout button component and logic.

Context or hook to manage user session state (contexts/AuthContext.tsx or hooks/useUser.ts).

Logic to create a profile entry in Supabase DB upon first successful Google login (using a Supabase function or triggered from callback).

Comprador Dashboard (app/(comprador)/dashboard/page.tsx):

Protected route (redirects to login if no session).

Display "¡Hola, [User's Name]!" (fetched from profiles).

Placeholder for "Mis Pedidos Recientes" (will be empty state).

Button/Link to "Crear Encargo".

Crear Encargo Form (app/(comprador)/crear-encargo/page.tsx & components/Encargos/CrearEncargoForm.tsx):

Build the unstyled form with all fields from Flow 1, Step 4 (S1.3).

Client-side validation (e.g., using react-hook-form for simplicity without UI).

On submit:

API route (app/api/encargos/route.ts) or Server Action (app/(comprador)/crear-encargo/actions.ts) to handle form data.

This backend logic inserts a new row into the encargos Supabase table, associating it with the logged-in comprador_id.

Implement RLS: Compradores can only insert encargos with their own comprador_id.

Encargo Confirmation Page (app/(comprador)/encargo/[id]/confirmacion/page.tsx):

Display success message and summary of the created Encargo (fetch data from Supabase by ID).

Links to "Mis Pedidos" and "Crear Otro Encargo".

Mis Pedidos List (Comprador View - app/(comprador)/mis-pedidos/page.tsx):

Fetch and display a list of encargos belonging to the logged-in Comprador from Supabase.

Initially, just show Product Name, ID, Status, Creation Date.

Status for new Encargo should be "pendiente_cotizacion".

Implement RLS: Compradores can only view their own encargos.

Basic Navigation Components (components/Layout/Header.tsx, components/Layout/Sidebar.tsx):

Unstyled header with logo placeholder and Auth buttons/user info.

Unstyled sidebar with links for Comprador role.

Role Switcher logic (updates role in profiles table via an API call/Server Action). Initially, just display the current role.

Testing Focus:

Can a new user sign up with Google?

Is a profile created in Supabase?

Can a logged-in Comprador access their dashboard?

Can a Comprador submit the "Crear Encargo" form successfully?

Is the encargo saved to Supabase with correct data and comprador_id?

Can the Comprador see their new encargo in "Mis Pedidos"?

Sprint 2: Vendedora Role, Accepting Encargos, Basic Quotation Logic (No Payment)

Goal: Implement the Vendedora side of finding and "claiming" an Encargo, and the initial unstyled quotation form.

Tasks:

Role Switching Functionality:

Implement the UI for the Role Switcher (e.g., in Header dropdown).

API route/Server Action to update the role field in the user's profiles record in Supabase.

Dashboard/Navigation should dynamically change based on the selected role (Comprador vs. Vendedora views).

Vendedora Dashboard (app/(vendedora)/dashboard/page.tsx):

Protected route, accessible if profile.role === 'vendedora'.

Placeholder for stats.

Link/Section "Encargos Disponibles para Cotizar".

Encargos Disponibles List (app/(vendedora)/encargos-disponibles/page.tsx):

Fetch and display all encargos with status === 'pendiente_cotizacion'.

Implement RLS: Vendedoras can see all 'pendiente_cotizacion' encargos.

For each encargo, show basic details (Product Name, Comprador Name (or "Usuario X"), Date).

Button: "Ver y Cotizar".

Encargo Detail & Cotizar Form (app/(vendedora)/encargo/[id]/cotizar/page.tsx & components/Cotizaciones/CotizarForm.tsx):

Fetch full details of the selected encargo by its ID.

Display Encargo details (read-only).

Build the unstyled "Tu Cotización" form from Flow 2, Step 2 (S2.2).

Fields for costs, Vendedora commission.

Calculated fields (Subtotal, Platform Commission placeholder, Total).

Payment Option Selection (radio buttons: "Depósito de Seguridad", "Friends & Family").

Notes for Cliente.

On submit:

API route/Server Action to save the quotation.

Database: Create a cotizaciones table:

id (UUID, PK)

encargo_id (UUID, FK to encargos)

vendedora_id (UUID, FK to profiles)

costo_producto_usd (NUMERIC)

impuestos_usa_usd (NUMERIC)

flete_internacional_usd (NUMERIC)

comision_vendedora_usd_o_percent_val (NUMERIC)

comision_vendedora_is_percent (BOOLEAN)

comision_plataforma_usd (NUMERIC) // Calculated

envio_local_ars (NUMERIC, nullable)

total_estimado_cliente_usd (NUMERIC) // Or store in primary currency

payment_option_selected (ENUM/TEXT: 'deposito_seguridad', 'friends_family')

monto_deposito_inicial_usd (NUMERIC, calculated if 'deposito_seguridad')

monto_pago_final_usd (NUMERIC, calculated)

notas_vendedora (TEXT, nullable)

status (ENUM/TEXT: 'enviada', 'aceptada_comprador', 'rechazada_comprador')

created_at, updated_at

Insert new cotizacion linked to encargo and vendedora.

Update encargos.status to 'cotizacion_recibida'.

RLS: Vendedoras can insert cotizaciones with their own vendedora_id.

Mis Encargos Gestionados (Vendedora View - app/(vendedora)/mis-encargos/page.tsx):

Fetch and display encargos for which this Vendedora has submitted a cotizacion OR encargos that have been assigned to this Vendedora (future step).

Show status of the cotizacion (e.g., "Cotización Enviada").

Comprador View of Received Quotation:

Update app/(comprador)/mis-pedidos/page.tsx: If an encargo has status === 'cotizacion_recibida', show a "Revisar Cotización" button.

New page app/(comprador)/encargo/[id]/revisar-cotizacion/page.tsx:

Fetch the encargo details and the associated cotizacion (or multiple cotizaciones if many Vendedoras quote).

Display all details from the cotizacion (read-only).

Buttons: "Aceptar Cotización", "Rechazar Cotización".

Accept/Reject Quotation Logic:

API route/Server Action:

If Comprador accepts: Update cotizaciones.status to 'aceptada_comprador'. Update encargos.status to 'esperando_pago_deposito' (if 'deposito_seguridad' was chosen) or directly to an "Admin to purchase" state if 'friends_family'.

If Comprador rejects: Update cotizaciones.status to 'rechazada_comprador'. Potentially revert encargos.status to 'pendiente_cotizacion' if no other accepted quotes, or allow other quotes to be reviewed.

RLS: Comprador can only update cotizaciones related to their encargos.

Testing Focus:

Can a Vendedora see open encargos?

Can a Vendedora submit a cotizacion? Is it saved correctly in DB?

Does the encargo status update?

Can the Comprador see the received cotizacion?

Can the Comprador accept/reject the cotizacion? Do statuses update correctly?

Sprint 3: MVP Manual Payment Confirmation Flow & Admin Basics

Goal: Implement the manual payment steps involving the Admin, as outlined in Flow 2, and the basic Admin panel for this.

Tasks:

Admin Role & Basic Panel (app/(admin)/panel/page.tsx):

Protect this route so only users with profile.role === 'admin' can access.

Basic navigation for Admin (e.g., "Confirmar Pagos", "Ver Todos los Encargos").

Payment Instructions Pages (Comprador View):

Create page app/(comprador)/encargo/[id]/pago-deposito/page.tsx.

If encargo.status === 'esperando_pago_deposito', display instructions for manual payment to Admin (as in S2.6). Static text for now.

Admin Payment Confirmation UI (app/(admin)/confirmar-pagos/page.tsx):

Fetch encargos that are in a state requiring Admin payment confirmation (e.g., 'esperando_pago_deposito', or a new status like 'pago_notificado_admin').

For each, display Comprador, Vendedora, Encargo product, Amount expected.

Button: "Confirmar Pago Recibido".

Admin Payment Confirmation Logic:

API route/Server Action for Admin to confirm payment.

Requires Admin role check.

Updates encargos.status (e.g., to 'deposito_pagado' or 'en_proceso_compra_usa').

(No actual money transfer in-app yet).

Notifications (Basic - DB flags or simple display):

When Admin confirms payment, update statuses so Comprador and Vendedora see the change in their respective "Mis Pedidos" / "Mis Encargos Gestionados" lists.

(Actual email/in-app push notifications are a later enhancement).

Vendedora Auto-Pedido (Stock Building) - Initial Forms & Logic (No Payment Confirmation Yet):

app/(vendedora)/crear-auto-pedido/page.tsx & components/AutoPedidos/CrearAutoPedidoForm.tsx:

Build the unstyled form from Flow 3, Step 2 (S3.2).

On submit, save to a new auto_pedidos table in Supabase:

id (UUID, PK)

vendedora_id (UUID, FK to profiles)

items (JSONB, array of {product_name, url, quantity, cost_unit_usd})

total_estimado_usd (NUMERIC)

notas_admin (TEXT, nullable)

status (ENUM/TEXT: 'pendiente_pago_vendedora', 'pago_confirmado_admin', 'en_proceso_compra_usa', etc.)

created_at, updated_at

RLS: Vendedoras can only insert their own auto_pedidos.

app/(vendedora)/mis-auto-pedidos/page.tsx: List Vendedora's auto_pedidos and their statuses.

Payment Instructions for Auto-Pedido (Vendedora View):

Create page app/(vendedora)/auto-pedido/[id]/pago/page.tsx.

If auto_pedido.status === 'pendiente_pago_vendedora', display instructions for manual payment to Admin (as in S3.3).

Testing Focus:

Can Comprador see payment instructions after accepting a quote?

Can Admin see orders awaiting payment confirmation?

Can Admin confirm a payment? Does the encargo status update for Comprador and Vendedora?

Can Vendedora create an auto-pedido? Is it saved to DB?

Can Vendedora see payment instructions for their auto-pedido?

Sprint 4: Completing Auto-Pedido Payment Flow, Basic Order Tracking Visibility

Goal: Allow Admin to confirm payment for Auto-Pedidos, and start showing more granular status updates visible to all relevant parties.

Tasks:

Admin Confirms Auto-Pedido Payment:

Extend Admin's "Confirmar Pagos" UI (app/(admin)/confirmar-pagos/page.tsx) to include auto_pedidos with status 'pendiente_pago_vendedora'.

API route/Server Action for Admin to confirm auto_pedido payment. Updates auto_pedidos.status to 'pago_confirmado_admin'.

More Granular Statuses for encargos and auto_pedidos:

Define and implement backend logic (Admin-only actions initially) to move orders through subsequent statuses:

'en_proceso_compra_usa'

'en_camino_argentina' (Admin inputs tracking number - add tracking_internacional field to tables)

'en_aduana'

'recibido_argentina_admin'

'listo_para_entrega_vendedora' (for encargos, if Admin hands to Vendedora)

'listo_para_entrega_final' (for encargos direct from Admin, or after Vendedora has it)

'entregado_a_vendedora' (for auto_pedidos)

Display Tracking/Status Updates:

Enhance "Mis Pedidos" (Comprador), "Mis Encargos Gestionados" (Vendedora), and "Mis Auto-Pedidos" (Vendedora) pages to show the current detailed status.

If a tracking number exists, display it.

Admin needs a UI to input these status changes and tracking numbers for each order. Start with a simple "Update Status" button on an Admin order detail view.

Final Payment Logic (Encargos - Opción Depósito):

When encargo.status becomes 'listo_para_entrega_final', if payment_option_selected === 'deposito_seguridad', change status to 'esperando_pago_final'.

Comprador view (app/(comprador)/encargo/[id]/pago-final/page.tsx): Display "Pago Final Pendiente" with amount and manual payment instructions to Admin.

Admin confirmation flow for this final payment (similar to deposit confirmation).

Upon Admin confirmation of final payment, encargo.status becomes 'pago_final_confirmado_listo_para_despacho'.

Order Completion (Comprador):

When encargo.status implies physical delivery is imminent/done (e.g., 'listo_para_despacho', 'entregado_por_vendedora'), Comprador's "Mis Pedidos" detail view gets a "Confirmar Recepción del Producto" button.

API route/Server Action for Comprador to confirm. Updates encargos.status to 'completado'.

Vendedora Receives Auto-Pedido Stock:

Admin changes auto_pedidos.status to 'entregado_a_vendedora' (or similar) once Jessy receives her stock.

Jessy's "Mis Auto-Pedidos" view shows this. Button "Confirmar Recepción de Stock".

API route/Server Action for Jessy to confirm. Updates auto_pedidos.status to 'stock_recibido_confirmado'. (Later, she can list these items for sale).

Testing Focus:

Can Admin confirm payment for auto_pedidos?

Can Admin update order statuses through the lifecycle?

Do Compradores and Vendedoras see these status updates?

Does the "final payment" flow trigger correctly for encargos with deposits?

Can a Comprador mark an encargo as "completado"?

Can a Vendedora mark an auto-pedido as "stock recibido"?

Sprint 5: Cancellation Flows (Basic) & Listing Stock for Sale

Goal: Implement basic cancellation request logic and allow Vendedoras to list items from their confirmed auto_pedidos.

Tasks:

Cancellation Logic (Comprador Initiated - Pre-Purchase by Admin):

Comprador's order detail page: "Cancelar Solicitud" button (if encargo.status is still early, e.g., 'pendiente_cotizacion', 'cotizacion_recibida').

API route/Server Action: Updates encargos.status to 'cancelado_comprador'.

Notify Vendedora (if a cotizacion was accepted).

Admin sees this in their global order view. (No complex dispute resolution yet).

Cancellation Logic (Vendedora Initiated - Pre-Purchase by Admin):

Vendedora's encargo detail page: "Cancelar Gestión de Encargo" button (if status is early).

API route/Server Action: Updates encargos.status to 'cancelado_vendedor', disassociates Vendedora from the encargo (or marks cotizacion as cancelled). Potentially reverts encargo status to 'pendiente_cotizacion' for other Vendedoras.

Notify Comprador.

Vendedora Lists Stock Item for Sale:

New table stock_items:

id (UUID, PK)

vendedora_id (UUID, FK to profiles)

source_auto_pedido_id (UUID, FK to auto_pedidos, nullable if stock added manually)

product_name (TEXT)

description (TEXT)

price_ars (NUMERIC) // Vendedora sets this price

quantity_available (INTEGER)

image_url (TEXT, can be copied from auto_pedido.items)

category (TEXT)

status (ENUM/TEXT: 'disponible', 'vendido', 'pausado')

created_at, updated_at

On auto_pedido detail page (if status is 'stock_recibido_confirmado'), Jessy sees items from her Auto-Pedido. Button "Poner a la Venta".

app/(vendedora)/stock/nuevo/page.tsx form to list an item: pre-fill from auto_pedido item, Jessy adds price, final description.

API route/Server Action to create a stock_items record.

RLS: Vendedoras can only create/manage their own stock_items.

Comprador Browses Stock (app/(comprador)/explorar-stock/page.tsx):

Fetch and display all stock_items with status === 'disponible'.

Show product name, price, Vendedora name, image.

Button "Ver Detalles / Comprar".

Stock Item Detail Page (app/(comprador)/stock/[id]/page.tsx):

Full details of the stock_item.

Button "Comprar Ahora" (placeholder functionality for now, as payment for this is not yet detailed).

Testing Focus:

Can Comprador/Vendedora cancel an encargo in early stages?

Can Vendedora see items from a received auto-pedido?

Can Vendedora list an item from this stock for sale? Is it saved to stock_items?

Can Comprador see available stock_items?

Beyond Sprint 5: Refinements, Further Flows, and Preparing for UI

Sprint 6+: Buying Stock Items: Implement the checkout and payment (manual initially) for items Compradores select from Vendedora's stock.

Sprint 7+: Dispute Resolution V1: Admin tools to manage more complex cancellations/disputes.

Sprint 8+: Notifications V1: Basic in-app notification system (e.g., a "Notifications" page, bell icon lights up).

Sprint 9+: User Profiles & Trust Scores (Basic): Display Vendedora/Comprador profiles. Basic logic for trust score increment (e.g., +1 per completed order).

Sprint 10+: Scalability & Security Review: Review RLS policies, database indexing for performance, API security.

Then, start UI/UX design and Tailwind implementation phase by phase.

This plan provides a solid, phased approach to building the core functionality without getting bogged down in UI details too early. Copilot will be a great assistant for boilerplate code, SQL queries, and even suggesting logic within your API routes/Server Actions. Remember to supabase stop when not working to save resources, and commit your supabase/migrations regularly. Good luck!