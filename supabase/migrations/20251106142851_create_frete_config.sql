/*
  # Criar tabelas de configuração de frete

  1. New Tables
    - `frete_config`
      - `id` (uuid, primary key)
      - `valor_por_km` (numeric, valor por quilômetro)
      - `margem_minima` (numeric, margem fixa em R$)
      - `ativo` (boolean, se a configuração está ativa)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `frete_config` table
    - Add policy for public read access (configuration is public)
*/

CREATE TABLE IF NOT EXISTS frete_config (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  valor_por_km numeric NOT NULL DEFAULT 2.5,
  margem_minima numeric NOT NULL DEFAULT 10,
  ativo boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE frete_config ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Qualquer um pode ler configuração de frete"
  ON frete_config
  FOR SELECT
  TO public
  USING (true);

-- Inserir configuração padrão
INSERT INTO frete_config (valor_por_km, margem_minima, ativo)
  VALUES (2.5, 10, true)
  ON CONFLICT DO NOTHING;
