import { Pool } from '@neondatabase/serverless';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function main() {
  try {
    console.log('🔄 Iniciando migração de dados...');

    // 1. Criar tabelas
    console.log('📦 Criando tabelas...');
    
    await pool.query(`
      CREATE TABLE IF NOT EXISTS products (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT,
        price NUMERIC NOT NULL,
        image TEXT,
        category TEXT,
        brand TEXT,
        puffs TEXT,
        "inStock" BOOLEAN DEFAULT true,
        flavors TEXT[]
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS bairros (
        id SERIAL PRIMARY KEY,
        nome TEXT NOT NULL UNIQUE,
        "distanciaKm" NUMERIC NOT NULL,
        zona TEXT,
        "tempoEntregaMin" INTEGER,
        "valorBase" NUMERIC NOT NULL
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        customer JSONB NOT NULL,
        items JSONB NOT NULL,
        total NUMERIC NOT NULL,
        frete NUMERIC NOT NULL,
        "paymentMethod" TEXT NOT NULL,
        status TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 2. Ler dados JSON
    console.log('📂 Lendo arquivos JSON...');
    const productsPath = path.join(__dirname, '../server/data/products.json');
    const bairrosPath = path.join(__dirname, '../server/data/bairros.json');

    const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));
    const bairros = JSON.parse(fs.readFileSync(bairrosPath, 'utf8'));

    // 3. Inserir Produtos
    console.log(`�� Inserindo ${products.length} produtos...`);
    for (const p of products) {
      await pool.query(`
        INSERT INTO products (id, name, description, price, image, category, brand, puffs, "inStock", flavors)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        ON CONFLICT (id) DO UPDATE SET
          name = EXCLUDED.name,
          description = EXCLUDED.description,
          price = EXCLUDED.price,
          image = EXCLUDED.image,
          category = EXCLUDED.category,
          brand = EXCLUDED.brand,
          puffs = EXCLUDED.puffs,
          "inStock" = EXCLUDED."inStock",
          flavors = EXCLUDED.flavors;
      `, [
        p.id, p.name, p.description, p.price, p.image, p.category, p.brand, p.puffs, p.inStock, p.flavors
      ]);
    }

    // 4. Inserir Bairros
    console.log(`🚀 Inserindo ${bairros.length} bairros...`);
    for (const b of bairros) {
      await pool.query(`
        INSERT INTO bairros (nome, "distanciaKm", zona, "tempoEntregaMin", "valorBase")
        VALUES ($1, $2, $3, $4, $5)
        ON CONFLICT (nome) DO UPDATE SET
          "distanciaKm" = EXCLUDED."distanciaKm",
          zona = EXCLUDED.zona,
          "tempoEntregaMin" = EXCLUDED."tempoEntregaMin",
          "valorBase" = EXCLUDED."valorBase";
      `, [
        b.nome, b.distanciaKm, b.zona, b.tempoEntregaMin, b.valorBase
      ]);
    }

    console.log('✅ Migração concluída com sucesso!');
  } catch (error) {
    console.error('❌ Erro na migração:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

main();
