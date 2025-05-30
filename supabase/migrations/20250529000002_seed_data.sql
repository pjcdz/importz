-- Insert seed data for testing
-- This will be useful during development

-- Insert a test admin user profile (you'll need to update the UUID after creating a user via Supabase Auth)
-- INSERT INTO profiles (id, email, full_name, role) VALUES 
--   ('00000000-0000-0000-0000-000000000000', 'admin@importz.com', 'Admin User', 'admin');

-- Insert test categories for products
-- You can uncomment and modify these as needed

-- Sample encargo statuses for reference:
-- 'pendiente_cotizacion' - Initial state when comprador creates request
-- 'cotizacion_recibida' - Vendedora has provided a quote
-- 'esperando_pago_deposito' - Quote accepted, waiting for deposit
-- 'deposito_pagado' - Deposit received, purchase can begin
-- 'en_proceso_compra_usa' - Vendedora is purchasing in USA
-- 'en_camino_argentina' - Product shipped to Argentina
-- 'listo_para_entrega_final' - Ready for final delivery
-- 'esperando_pago_final' - Waiting for final payment
-- 'completado' - Order complete
-- 'cancelado_*' - Various cancellation reasons