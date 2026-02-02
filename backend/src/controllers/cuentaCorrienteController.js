import { MovimientoService } from '../services/movimientoService.js';

export const getSaldo = async (req, res) => {
  try {
    const clienteId = req.user.cliente_id;
    
    const ultimoMovimiento = await MovimientoService.getLastMovimiento(clienteId);
    
    if (!ultimoMovimiento) {
      return res.json({
        saldo: 0,
        ultimaActualizacion: null,
      });
    }
    
    res.json({
      saldo: ultimoMovimiento.SALDO || 0,
      ultimaActualizacion: ultimoMovimiento.FECHAREGISTRO,
    });
  } catch (error) {
    console.error('Error al obtener saldo:', error);
    res.status(500).json({ error: 'Error al obtener saldo' });
  }
};

export const getMovimientos = async (req, res) => {
  try {
    const clienteId = req.user.cliente_id;
    const filters = {
      fechaDesde: req.query.fechaDesde,
      fechaHasta: req.query.fechaHasta,
      tipo: req.query.tipo,
      limit: req.query.limit || 50,
    };
    
    const movimientos = await MovimientoService.getMovimientosByCliente(clienteId, filters);
    
    res.json(movimientos);
  } catch (error) {
    console.error('Error al obtener movimientos:', error);
    res.status(500).json({ error: 'Error al obtener movimientos' });
  }
};
