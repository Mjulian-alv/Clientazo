import { MovimientoService } from './movimientoService.js';

export class PuntosService {
  /**
   * Obtiene los puntos actuales de un cliente
   */
  static async getPuntos(clienteId) {
    const ultimoMovimiento = await MovimientoService.getLastMovimiento(clienteId);
    
    if (!ultimoMovimiento) {
      return {
        puntos: 0,
        ultimaActualizacion: null,
      };
    }
    
    return {
      puntos: ultimoMovimiento.MONTOACUMACTUAL || 0,
      puntosAnteriores: ultimoMovimiento.MONTOACUMANTERIOR || 0,
      ultimaActualizacion: ultimoMovimiento.FECHAREGISTRO,
    };
  }
  
  /**
   * Obtiene el historial de acumulación de puntos
   */
  static async getHistorialPuntos(clienteId, limit = 50) {
    const movimientos = await MovimientoService.getMovimientosByCliente(clienteId, { limit });
    
    return movimientos.map(m => ({
      fecha: m.FECHAREGISTRO,
      hora: m.HORAREGISTRO,
      puntosAcumulados: m.MONTOACUMACTUAL,
      puntosPrevios: m.MONTOACUMANTERIOR,
      diferencia: (m.MONTOACUMACTUAL || 0) - (m.MONTOACUMANTERIOR || 0),
      montoCompra: m.MONTOTOTAL,
      tipo: m.TIPOMOVIMIENTO,
    }));
  }
}
