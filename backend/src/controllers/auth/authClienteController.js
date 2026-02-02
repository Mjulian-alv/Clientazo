import { ClienteAuth } from '../../models/ClienteAuth.js';
import { MovimientoService } from '../../services/movimientoService.js';
import { generateToken, generateRefreshToken, verifyToken } from '../../utils/jwtUtils.js';

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Buscar cliente
    const cliente = await ClienteAuth.findByEmail(email);
    if (!cliente) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }
    
    // Verificar contraseña
    const isValid = await ClienteAuth.verifyPassword(password, cliente.password_hash);
    if (!isValid) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }
    
    // Generar tokens
    const token = generateToken({ 
      cliente_id: cliente.cliente_id, 
      email: cliente.email,
      isAdmin: false 
    });
    const refreshToken = generateRefreshToken({ cliente_id: cliente.cliente_id });
    
    // Guardar refresh token
    await ClienteAuth.updateRefreshToken(cliente.cliente_id, refreshToken);
    
    res.json({
      token,
      refreshToken,
      cliente: {
        id: cliente.cliente_id,
        email: cliente.email,
        telefono: cliente.telefono,
      }
    });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
};

export const register = async (req, res) => {
  try {
    const { cliente_id, email, telefono, password } = req.body;
    
    // Verificar que el cliente existe en la BD remota
    const exists = await MovimientoService.clienteExists(cliente_id);
    if (!exists) {
      return res.status(400).json({ 
        error: 'El número de cliente no existe en el sistema' 
      });
    }
    
    // Verificar que no esté ya registrado
    const existingAuth = await ClienteAuth.findByClienteId(cliente_id);
    if (existingAuth) {
      return res.status(400).json({ 
        error: 'Este cliente ya está registrado' 
      });
    }
    
    // Verificar email único
    const existingEmail = await ClienteAuth.findByEmail(email);
    if (existingEmail) {
      return res.status(400).json({ 
        error: 'El email ya está en uso' 
      });
    }
    
    // Crear cliente
    const id = await ClienteAuth.create({
      cliente_id,
      email,
      telefono,
      password,
    });
    
    // Generar tokens
    const token = generateToken({ 
      cliente_id, 
      email,
      isAdmin: false 
    });
    const refreshToken = generateRefreshToken({ cliente_id });
    
    await ClienteAuth.updateRefreshToken(cliente_id, refreshToken);
    
    res.status(201).json({
      message: 'Cliente registrado exitosamente',
      token,
      refreshToken,
      cliente: {
        id: cliente_id,
        email,
        telefono,
      }
    });
  } catch (error) {
    console.error('Error en registro:', error);
    res.status(500).json({ error: 'Error al registrar cliente' });
  }
};

export const refresh = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    
    if (!refreshToken) {
      return res.status(400).json({ error: 'Refresh token requerido' });
    }
    
    // Verificar token
    const decoded = verifyToken(refreshToken);
    
    // Buscar cliente
    const cliente = await ClienteAuth.findByClienteId(decoded.cliente_id);
    if (!cliente || cliente.token_refresh !== refreshToken) {
      return res.status(401).json({ error: 'Refresh token inválido' });
    }
    
    // Generar nuevo access token
    const token = generateToken({ 
      cliente_id: cliente.cliente_id, 
      email: cliente.email,
      isAdmin: false 
    });
    
    res.json({ token });
  } catch (error) {
    console.error('Error en refresh:', error);
    res.status(401).json({ error: 'Refresh token inválido o expirado' });
  }
};
