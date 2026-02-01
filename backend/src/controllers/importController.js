import fs from 'fs/promises';
import { TxtParserService } from '../services/txtParserService.js';
import { OfertaService } from '../services/ofertaService.js';
import { dbLocal } from '../config/database.js';

export const importTxtFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No se proporcionó archivo' });
    }
    
    const filePath = req.file.path;
    const adminId = req.user.admin_id;
    
    // Parsear archivo
    const { ofertas, errors } = await TxtParserService.parseFile(filePath);
    
    // Importar a la BD
    const { insertados, actualizados } = await OfertaService.bulkUpsert(ofertas);
    
    // Registrar en log
    await dbLocal.query(
      `INSERT INTO ofertas_importacion_log 
       (archivo_nombre, registros_procesados, registros_exitosos, registros_fallidos, errores, admin_id)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        req.file.originalname,
        ofertas.length + errors.length,
        ofertas.length,
        errors.length,
        errors.length > 0 ? JSON.stringify(errors) : null,
        adminId
      ]
    );
    
    // Eliminar archivo temporal
    await fs.unlink(filePath);
    
    res.json({
      message: 'Importación exitosa',
      insertados,
      actualizados,
      total: ofertas.length,
      errores: errors.length,
      detalleErrores: errors.length > 0 ? errors : undefined,
    });
  } catch (error) {
    console.error('Error en importación:', error);
    
    // Intentar eliminar archivo si existe
    if (req.file) {
      try {
        await fs.unlink(req.file.path);
      } catch (e) {
        // Ignorar error de eliminación
      }
    }
    
    res.status(500).json({ error: 'Error al importar archivo: ' + error.message });
  }
};

export const getImportLog = async (req, res) => {
  try {
    const [logs] = await dbLocal.query(
      `SELECT l.*, a.username as admin_username 
       FROM ofertas_importacion_log l
       LEFT JOIN admins a ON l.admin_id = a.id
       ORDER BY l.created_at DESC
       LIMIT 50`
    );
    
    res.json(logs);
  } catch (error) {
    console.error('Error al obtener log:', error);
    res.status(500).json({ error: 'Error al obtener log de importaciones' });
  }
};
