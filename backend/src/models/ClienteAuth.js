import { dbLocal } from '../config/database.js';
import bcrypt from 'bcrypt';

export class ClienteAuth {
  /**
   * Crea un nuevo cliente auth
   */
  static async create(data) {
    const passwordHash = await bcrypt.hash(data.password, 10);
    
    const [result] = await dbLocal.query(
      `INSERT INTO clientes_auth (cliente_id, email, telefono, password_hash) 
       VALUES (?, ?, ?, ?)`,
      [data.cliente_id, data.email, data.telefono || null, passwordHash]
    );
    
    return result.insertId;
  }
  
  /**
   * Busca un cliente por email
   */
  static async findByEmail(email) {
    const [rows] = await dbLocal.query(
      'SELECT * FROM clientes_auth WHERE email = ? AND activo = true',
      [email]
    );
    return rows[0] || null;
  }
  
  /**
   * Busca un cliente por ID
   */
  static async findByClienteId(clienteId) {
    const [rows] = await dbLocal.query(
      'SELECT * FROM clientes_auth WHERE cliente_id = ? AND activo = true',
      [clienteId]
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
   * Actualiza el refresh token
   */
  static async updateRefreshToken(clienteId, refreshToken) {
    await dbLocal.query(
      'UPDATE clientes_auth SET token_refresh = ?, ultimo_acceso = NOW() WHERE cliente_id = ?',
      [refreshToken, clienteId]
    );
  }
  
  /**
   * Actualiza la información del cliente
   */
  static async update(clienteId, data) {
    const fields = [];
    const values = [];
    
    if (data.email) {
      fields.push('email = ?');
      values.push(data.email);
    }
    
    if (data.telefono) {
      fields.push('telefono = ?');
      values.push(data.telefono);
    }
    
    if (data.password) {
      fields.push('password_hash = ?');
      values.push(await bcrypt.hash(data.password, 10));
    }
    
    if (fields.length === 0) return false;
    
    values.push(clienteId);
    
    const [result] = await dbLocal.query(
      `UPDATE clientes_auth SET ${fields.join(', ')}, updated_at = NOW() WHERE cliente_id = ?`,
      values
    );
    
    return result.affectedRows > 0;
  }
}
