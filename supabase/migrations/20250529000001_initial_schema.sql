-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enum types
CREATE TYPE user_role AS ENUM ('comprador', 'vendedora', 'admin');
CREATE TYPE encargo_status AS ENUM (
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
);
CREATE TYPE cotizacion_status AS ENUM ('pendiente', 'aceptada', 'rechazada', 'expirada');
CREATE TYPE auto_pedido_status AS ENUM ('disponible', 'reservado', 'vendido', 'cancelado');

-- Create profiles table
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  role user_role DEFAULT 'comprador',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create encargos table (Requests from Compradores)
CREATE TABLE encargos (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  comprador_id UUID REFERENCES profiles(id) NOT NULL,
  product_name TEXT NOT NULL,
  product_url TEXT,
  quantity INTEGER NOT NULL DEFAULT 1,
  description TEXT,
  estimated_price TEXT,
  image_url TEXT,
  category TEXT,
  status encargo_status DEFAULT 'pendiente_cotizacion',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create cotizaciones table (Offers from Vendedoras)
CREATE TABLE cotizaciones (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  encargo_id UUID REFERENCES encargos(id) NOT NULL,
  vendedora_id UUID REFERENCES profiles(id) NOT NULL,
  precio_producto_usd DECIMAL(10,2) NOT NULL,
  comision_importacion DECIMAL(10,2) NOT NULL,
  precio_total_ars DECIMAL(12,2) NOT NULL,
  deposito_requerido_ars DECIMAL(12,2) NOT NULL,
  tiempo_estimado_dias INTEGER NOT NULL,
  comentarios TEXT,
  status cotizacion_status DEFAULT 'pendiente',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create auto_pedidos table (Vendedora stock orders)
CREATE TABLE auto_pedidos (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  vendedora_id UUID REFERENCES profiles(id) NOT NULL,
  product_name TEXT NOT NULL,
  product_url TEXT,
  quantity INTEGER NOT NULL DEFAULT 1,
  precio_producto_usd DECIMAL(10,2) NOT NULL,
  precio_venta_ars DECIMAL(12,2) NOT NULL,
  description TEXT,
  image_url TEXT,
  category TEXT,
  status auto_pedido_status DEFAULT 'disponible',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_encargos_updated_at BEFORE UPDATE ON encargos
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_cotizaciones_updated_at BEFORE UPDATE ON cotizaciones
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_auto_pedidos_updated_at BEFORE UPDATE ON auto_pedidos
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE encargos ENABLE ROW LEVEL SECURITY;
ALTER TABLE cotizaciones ENABLE ROW LEVEL SECURITY;
ALTER TABLE auto_pedidos ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- RLS Policies for encargos
CREATE POLICY "Compradores can view own encargos" ON encargos
  FOR SELECT USING (auth.uid() = comprador_id);

CREATE POLICY "Vendedoras can view all encargos" ON encargos
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role IN ('vendedora', 'admin')
    )
  );

CREATE POLICY "Compradores can insert own encargos" ON encargos
  FOR INSERT WITH CHECK (auth.uid() = comprador_id);

CREATE POLICY "Compradores can update own encargos" ON encargos
  FOR UPDATE USING (auth.uid() = comprador_id);

-- RLS Policies for cotizaciones
CREATE POLICY "Vendedoras can insert cotizaciones" ON cotizaciones
  FOR INSERT WITH CHECK (
    auth.uid() = vendedora_id AND
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role IN ('vendedora', 'admin')
    )
  );

CREATE POLICY "Users can view cotizaciones for their encargos" ON cotizaciones
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM encargos 
      WHERE encargos.id = cotizaciones.encargo_id 
      AND encargos.comprador_id = auth.uid()
    ) OR
    auth.uid() = vendedora_id
  );

CREATE POLICY "Vendedoras can update own cotizaciones" ON cotizaciones
  FOR UPDATE USING (auth.uid() = vendedora_id);

-- RLS Policies for auto_pedidos
CREATE POLICY "Everyone can view available auto_pedidos" ON auto_pedidos
  FOR SELECT USING (status = 'disponible' OR auth.uid() = vendedora_id);

CREATE POLICY "Vendedoras can insert auto_pedidos" ON auto_pedidos
  FOR INSERT WITH CHECK (
    auth.uid() = vendedora_id AND
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role IN ('vendedora', 'admin')
    )
  );

CREATE POLICY "Vendedoras can update own auto_pedidos" ON auto_pedidos
  FOR UPDATE USING (auth.uid() = vendedora_id);

-- Create indexes for better performance
CREATE INDEX idx_encargos_comprador_id ON encargos(comprador_id);
CREATE INDEX idx_encargos_status ON encargos(status);
CREATE INDEX idx_cotizaciones_encargo_id ON cotizaciones(encargo_id);
CREATE INDEX idx_cotizaciones_vendedora_id ON cotizaciones(vendedora_id);
CREATE INDEX idx_auto_pedidos_vendedora_id ON auto_pedidos(vendedora_id);
CREATE INDEX idx_auto_pedidos_status ON auto_pedidos(status);