import { dbLocal } from '../config/database.js';
import bcrypt from 'bcrypt';

export class Admin {
  /**
   * Busca un admin por username
   */
  static async findByUsername(username) {
    const [rows] = await dbLocal.query(
      'SELECT * FROM admins WHERE username = ? AND activo = true',
      [username]
    );
    return rows[0] || null;
  }
  
  /**
   * Busca un admin por email
   */
  static async findByEmail(email) {
    const [rows] = await dbLocal.query(
      'SELECT * FROM admins WHERE email = ? AND activo = true',
      [email]
    );
    return rows[0] || null;
  }
  
  /**
   * Verifica la contraseña
   */
  static async verifyPassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
  
  /**
   * Actualiza el último acceso
   */
  static async updateLastAccess(id) {
    await dbLocal.query(
      'UPDATE admins SET ultimo_acceso = NOW() WHERE id = ?',
      [id]
    );
  }
  
  /**
   * Crea un nuevo admin
   */
  static async create(data) {
    const passwordHash = await bcrypt.hash(data.password, 10);
    
    const [result] = await dbLocal.query(
      `INSERT INTO admins (username, email, password_hash, nombre_completo, rol) 
       VALUES (?, ?, ?, ?, ?)`,
      [data.username, data.email, passwordHash, data.nombre_completo || null, data.rol || 'admin']
    );
    
    return result.insertId;
  }
}
