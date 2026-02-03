import { Pool } from '@neondatabase/serverless';
import dotenv from 'dotenv';

dotenv.config();

interface NeonConfig {
  databaseUrl: string;
  maxConnections?: number;
  idleTimeout?: number;
  connectionTimeout?: number;
}

export class NeonDatabase {
  private static instance: Pool;
  private static config: NeonConfig;

  static configure(config: NeonConfig) {
    this.config = config;
    this.instance = new Pool({
      connectionString: config.databaseUrl,
      max: config.maxConnections,
      idleTimeoutMillis: config.idleTimeout,
      connectionTimeoutMillis: config.connectionTimeout,
    });
  }

  static getInstance() {
    if (!this.instance) {
      if (process.env.DATABASE_URL) {
        this.configure({
            databaseUrl: process.env.DATABASE_URL,
            maxConnections: 20,
            idleTimeout: 60000,
            connectionTimeout: 15000,
        });
      } else {
        throw new Error('Database not configured. Call configure() first or set DATABASE_URL.');
      }
    }
    return this.instance;
  }

  // Método para executar queries com retry
  static async query(sql: string, params: any[] = []) {
    const pool = this.getInstance();
    let retries = 3;
    
    while (retries > 0) {
      try {
        const result = await pool.query(sql, params);
        return result.rows;
      } catch (error) {
        retries--;
        if (retries === 0) throw error;
        
        // Aguardar antes do retry
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
  }

  // Método para transações
  static async transaction(queries: Array<{ sql: string; params?: any[] }>) {
    const pool = this.getInstance();
    const client = await pool.connect();
    
    try {
      await client.query('BEGIN');
      const results = [];
      for (const query of queries) {
        const result = await client.query(query.sql, query.params || []);
        results.push(result.rows);
      }
      await client.query('COMMIT');
      return results;
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }
}
