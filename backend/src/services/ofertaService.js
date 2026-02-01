import { dbLocal } from '../config/database.js';

export class OfertaService {
  /**
   * Obtiene todas las ofertas activas
   */
  static async getAll(filters = {}) {
    let query = 'SELECT * FROM ofertas WHERE activa = true';
    const params = [];
    
    if (filters.etiqueta) {
      query += ' AND etiqueta = ?';
      params.push(filters.etiqueta);
    }
    
    if (filters.rubro) {
      query += ' AND cod_rubro = ?';
      params.push(filters.rubro);
    }
    
    if (filters.marca) {
      query += ' AND marca LIKE ?';
      params.push(`%${filters.marca}%`);
    }
    
    if (filters.destacada) {
      query += ' AND destacada = true';
    }
    
    // Filtrar por fechas vigentes
    query += ' AND (fecha_inicio IS NULL OR fecha_inicio <= CURDATE())';
    query += ' AND (fecha_fin IS NULL OR fecha_fin >= CURDATE())';
    
    query += ' ORDER BY destacada DESC, created_at DESC';
    
    if (filters.limit) {
      query += ' LIMIT ?';
      params.push(parseInt(filters.limit));
    }
    
    const [rows] = await dbLocal.query(query, params);
    return rows;
  }
  
  /**
   * Obtiene una oferta por ID
   */
  static async getById(id) {
    const [rows] = await dbLocal.query('SELECT * FROM ofertas WHERE id = ?', [id]);
    return rows[0];
  }
  
  /**
   * Crea o actualiza ofertas en masa (para importación)
   */
  static async bulkUpsert(ofertas) {
    const connection = await dbLocal.getConnection();
    
    try {
      await connection.beginTransaction();
      
      let insertados = 0;
      let actualizados = 0;
      
      for (const oferta of ofertas) {
        const [existing] = await connection.query(
          'SELECT id FROM ofertas WHERE codigo = ?',
          [oferta.codigo]
        );
        
        if (existing.length > 0) {
          // Actualizar
          await connection.query(
            `UPDATE ofertas SET 
              detalle = ?, cod_rubro = ?, rubro = ?, cod_subrubro = ?,
              subrubro = ?, marca = ?, precio_regular = ?, precio_oferta = ?,
              fecha_inicio = ?, fecha_fin = ?, imagen_url = ?, codigo_barra = ?,
              pesable = ?, es_light = ?, sin_tacc = ?, sin_azucar = ?,
              etiqueta = ?, unidad_minima = ?, incremento = ?, iva = ?,
              proveedor_codigo = ?, proveedor_nombre = ?, updated_at = NOW()
            WHERE codigo = ?`,
            [
              oferta.detalle, oferta.cod_rubro, oferta.rubro, oferta.cod_subrubro,
              oferta.subrubro, oferta.marca, oferta.precio_regular, oferta.precio_oferta,
              oferta.fecha_inicio, oferta.fecha_fin, oferta.imagen_url, oferta.codigo_barra,
              oferta.pesable, oferta.es_light, oferta.sin_tacc, oferta.sin_azucar,
              oferta.etiqueta, oferta.unidad_minima, oferta.incremento, oferta.iva,
              oferta.proveedor_codigo, oferta.proveedor_nombre, oferta.codigo
            ]
          );
          actualizados++;
        } else {
          // Insertar
          await connection.query(
            `INSERT INTO ofertas (
              codigo, detalle, cod_rubro, rubro, cod_subrubro, subrubro, marca,
              precio_regular, precio_oferta, fecha_inicio, fecha_fin, imagen_url,
              codigo_barra, pesable, es_light, sin_tacc, sin_azucar, etiqueta,
              unidad_minima, incremento, iva, proveedor_codigo, proveedor_nombre
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
              oferta.codigo, oferta.detalle, oferta.cod_rubro, oferta.rubro,
              oferta.cod_subrubro, oferta.subrubro, oferta.marca, oferta.precio_regular,
              oferta.precio_oferta, oferta.fecha_inicio, oferta.fecha_fin,
              oferta.imagen_url, oferta.codigo_barra, oferta.pesable, oferta.es_light,
              oferta.sin_tacc, oferta.sin_azucar, oferta.etiqueta, oferta.unidad_minima,
              oferta.incremento, oferta.iva, oferta.proveedor_codigo, oferta.proveedor_nombre
            ]
          );
          insertados++;
        }
      }
      
      await connection.commit();
      
      return { insertados, actualizados };
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }
  
  /**
   * Actualiza una oferta
   */
  static async update(id, data) {
    const fields = [];
    const values = [];
    
    const allowedFields = ['detalle', 'precio_oferta', 'activa', 'destacada', 'fecha_inicio', 'fecha_fin'];
    
    for (const field of allowedFields) {
      if (data[field] !== undefined) {
        fields.push(`${field} = ?`);
        values.push(data[field]);
      }
    }
    
    if (fields.length === 0) {
      throw new Error('No hay campos para actualizar');
    }
    
    values.push(id);
    
    const query = `UPDATE ofertas SET ${fields.join(', ')}, updated_at = NOW() WHERE id = ?`;
    const [result] = await dbLocal.query(query, values);
    
    return result.affectedRows > 0;
  }
  
  /**
   * Elimina (desactiva) una oferta
   */
  static async delete(id) {
    const [result] = await dbLocal.query('UPDATE ofertas SET activa = false WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
}
