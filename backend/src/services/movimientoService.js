import { dbRemote } from '../config/database.js';

export class MovimientoService {
  /**
   * Obtiene el último movimiento de un cliente
   */
  static async getLastMovimiento(clienteId) {
    try {
      const [rows] = await dbRemote.query(
        `SELECT * FROM movimientos 
         WHERE productoConSaldoDelCliente = ? 
         ORDER BY FECHAREGISTRO DESC, HORAREGISTRO DESC 
         LIMIT 1`,
        [clienteId]
      );
      return rows[0] || null;
    } catch (error) {
      console.error('Error al obtener último movimiento:', error);
      return null;
    }
  }
  
  /**
   * Obtiene todos los movimientos de un cliente
   */
  static async getMovimientosByCliente(clienteId, filters = {}) {
    try {
      let query = 'SELECT * FROM movimientos WHERE productoConSaldoDelCliente = ?';
      const params = [clienteId];
      
      if (filters.fechaDesde) {
        query += ' AND FECHAREGISTRO >= ?';
        params.push(filters.fechaDesde);
      }
      
      if (filters.fechaHasta) {
        query += ' AND FECHAREGISTRO <= ?';
        params.push(filters.fechaHasta);
      }
      
      if (filters.tipo) {
        query += ' AND TIPOMOVIMIENTO = ?';
        params.push(filters.tipo);
      }
      
      query += ' ORDER BY FECHAREGISTRO DESC, HORAREGISTRO DESC';
      
      if (filters.limit) {
        query += ' LIMIT ?';
        params.push(parseInt(filters.limit));
      }
      
      const [rows] = await dbRemote.query(query, params);
      return rows;
    } catch (error) {
      console.error('Error al obtener movimientos:', error);
      return [];
    }
  }
  
  /**
   * Obtiene el detalle de un movimiento específico
   */
  static async getMovimientoById(id) {
    try {
      const [rows] = await dbRemote.query('SELECT * FROM movimientos WHERE ID = ?', [id]);
      return rows[0] || null;
    } catch (error) {
      console.error('Error al obtener movimiento:', error);
      return null;
    }
  }
  
  /**
   * Verifica si un cliente existe en la BD remota
   */
  static async clienteExists(clienteId) {
    try {
      const [rows] = await dbRemote.query(
        'SELECT COUNT(*) as count FROM movimientos WHERE productoConSaldoDelCliente = ? LIMIT 1',
        [clienteId]
      );
      return rows[0].count > 0;
    } catch (error) {
      console.error('Error al verificar cliente:', error);
      return false;
    }
  }
}
