import mysql from 'mysql2/promise';
import { config } from './env.js';

// Pool para BD Remota (SOLO LECTURA)
export const dbRemote = mysql.createPool({
  host: config.dbRemote.host,
  port: config.dbRemote.port,
  user: config.dbRemote.user,
  password: config.dbRemote.password,
  database: config.dbRemote.database,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});

// Pool para BD Local (LECTURA/ESCRITURA)
export const dbLocal = mysql.createPool({
  host: config.dbLocal.host,
  port: config.dbLocal.port,
  user: config.dbLocal.user,
  password: config.dbLocal.password,
  database: config.dbLocal.database,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});

// Verificar conexiones
export async function testConnections() {
  try {
    // Test local DB
    await dbLocal.query('SELECT 1');
    console.log('✅ Conexión a BD Local exitosa');
    
    // Test remote DB (solo si está configurada con valores reales)
    const isRemoteConfigured = config.dbRemote.host && 
                               config.dbRemote.user && 
                               !config.dbRemote.host.startsWith('xxx');
    
    if (isRemoteConfigured) {
      await dbRemote.query('SELECT 1');
      console.log('✅ Conexión a BD Remota exitosa');
    } else {
      console.log('⚠️  BD Remota no configurada (usando valores de ejemplo)');
    }
  } catch (error) {
    console.error('❌ Error en conexión a BD:', error.message);
    throw error;
  }
}
