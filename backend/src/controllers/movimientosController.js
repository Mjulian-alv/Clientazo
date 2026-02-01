import { MovimientoService } from '../services/movimientoService.js';

export const getCompras = async (req, res) => {
  try {
    const clienteId = req.user.cliente_id;
    const filters = {
      fechaDesde: req.query.fechaDesde,
      fechaHasta: req.query.fechaHasta,
      limit: req.query.limit || 50,
    };
    
    const movimientos = await MovimientoService.getMovimientosByCliente(clienteId, filters);
    
    res.json(movimientos);
  } catch (error) {
    console.error('Error al obtener compras:', error);
    res.status(500).json({ error: 'Error al obtener compras' });
  }
};

export const getCompraById = async (req, res) => {
  try {
    const { id } = req.params;
    const clienteId = req.user.cliente_id;
    
    const movimiento = await MovimientoService.getMovimientoById(id);
    
    if (!movimiento) {
      return res.status(404).json({ error: 'Compra no encontrada' });
    }
    
    // Verificar que el movimiento pertenece al cliente
    if (movimiento.productoConSaldoDelCliente !== clienteId) {
      return res.status(403).json({ error: 'Acceso denegado' });
    }
    
    res.json(movimiento);
  } catch (error) {
    console.error('Error al obtener compra:', error);
    res.status(500).json({ error: 'Error al obtener compra' });
  }
};
