import { ClienteAuth } from '../models/ClienteAuth.js';
import { MovimientoService } from '../services/movimientoService.js';

export const getPerfil = async (req, res) => {
  try {
    const clienteId = req.user.cliente_id;
    
    const auth = await ClienteAuth.findByClienteId(clienteId);
    
    if (!auth) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }
    
    // Obtener info adicional del último movimiento
    const ultimoMov = await MovimientoService.getLastMovimiento(clienteId);
    
    res.json({
      cliente_id: auth.cliente_id,
      email: auth.email,
      telefono: auth.telefono,
      activo: auth.activo,
      created_at: auth.created_at,
      ultimo_acceso: auth.ultimo_acceso,
      // Info adicional de movimientos si existe
      ...(ultimoMov && {
        puntos: ultimoMov.MONTOACUMACTUAL,
        saldo: ultimoMov.SALDO,
      }),
    });
  } catch (error) {
    console.error('Error al obtener perfil:', error);
    res.status(500).json({ error: 'Error al obtener perfil' });
  }
};

export const updatePerfil = async (req, res) => {
  try {
    const clienteId = req.user.cliente_id;
    const { email, telefono, password } = req.body;
    
    const data = {};
    if (email) data.email = email;
    if (telefono) data.telefono = telefono;
    if (password) data.password = password;
    
    const updated = await ClienteAuth.update(clienteId, data);
    
    if (!updated) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }
    
    res.json({ message: 'Perfil actualizado exitosamente' });
  } catch (error) {
    console.error('Error al actualizar perfil:', error);
    res.status(500).json({ error: 'Error al actualizar perfil' });
  }
};

export const getTarjeta = async (req, res) => {
  try {
    const clienteId = req.user.cliente_id;
    
    // Devolver info para generar código de barras/QR
    res.json({
      cliente_id: clienteId,
      codigo_barras: clienteId.toString(),
      tipo: 'CODE128', // o el tipo de código que use el supermercado
    });
  } catch (error) {
    console.error('Error al obtener tarjeta:', error);
    res.status(500).json({ error: 'Error al obtener tarjeta' });
  }
};
