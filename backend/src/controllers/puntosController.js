import { PuntosService } from '../services/puntosService.js';

export const getPuntos = async (req, res) => {
  try {
    const clienteId = req.user.cliente_id;
    
    const puntos = await PuntosService.getPuntos(clienteId);
    res.json(puntos);
  } catch (error) {
    console.error('Error al obtener puntos:', error);
    res.status(500).json({ error: 'Error al obtener puntos' });
  }
};

export const getHistorialPuntos = async (req, res) => {
  try {
    const clienteId = req.user.cliente_id;
    const limit = req.query.limit || 50;
    
    const historial = await PuntosService.getHistorialPuntos(clienteId, limit);
    res.json(historial);
  } catch (error) {
    console.error('Error al obtener historial de puntos:', error);
    res.status(500).json({ error: 'Error al obtener historial de puntos' });
  }
};
