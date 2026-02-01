import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

async function initDatabase() {
  console.log('🔧 Iniciando base de datos...');
  
  try {
    // Conectar sin especificar la base de datos
    const connection = await mysql.createConnection({
      host: process.env.DB_LOCAL_HOST || 'localhost',
      port: process.env.DB_LOCAL_PORT || 3306,
      user: process.env.DB_LOCAL_USER,
      password: process.env.DB_LOCAL_PASSWORD,
    });
    
    // Crear base de datos si no existe
    const dbName = process.env.DB_LOCAL_DATABASE || 'clientazo_db';
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${dbName}`);
    console.log(`✅ Base de datos '${dbName}' creada/verificada`);
    
    // Usar la base de datos
    await connection.query(`USE ${dbName}`);
    
    // Leer y ejecutar el script SQL
    const sqlPath = path.join(__dirname, 'init-database.sql');
    const sql = await fs.readFile(sqlPath, 'utf-8');
    
    // Ejecutar cada statement
    const statements = sql
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0);
    
    for (const statement of statements) {
      await connection.query(statement);
    }
    
    console.log('✅ Tablas creadas exitosamente');
    console.log('✅ Usuario admin por defecto creado');
    console.log('   Username: admin');
    console.log('   Password: admin123');
    
    await connection.end();
    console.log('✅ Inicialización completada');
  } catch (error) {
    console.error('❌ Error al inicializar base de datos:', error.message);
    process.exit(1);
  }
}

initDatabase();
