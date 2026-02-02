import { Admin } from '../../models/Admin.js';
import { generateToken } from '../../utils/jwtUtils.js';

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Buscar admin por username o email
    let admin = await Admin.findByUsername(username);
    if (!admin) {
      admin = await Admin.findByEmail(username);
    }
    
    if (!admin) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }
    
    // Verificar contraseña
    const isValid = await Admin.verifyPassword(password, admin.password_hash);
    if (!isValid) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }
    
    // Actualizar último acceso
    await Admin.updateLastAccess(admin.id);
    
    // Generar token
    const token = generateToken({ 
      admin_id: admin.id,
      username: admin.username,
      email: admin.email,
      rol: admin.rol,
      isAdmin: true 
    });
    
    res.json({
      token,
      admin: {
        id: admin.id,
        username: admin.username,
        email: admin.email,
        nombre_completo: admin.nombre_completo,
        rol: admin.rol,
      }
    });
  } catch (error) {
    console.error('Error en login admin:', error);
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
};
