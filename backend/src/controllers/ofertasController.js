import { OfertaService } from '../services/ofertaService.js';

export const getOfertas = async (req, res) => {
  try {
    const filters = {
      etiqueta: req.query.etiqueta || 'CLIENTAZO',
      rubro: req.query.rubro,
      marca: req.query.marca,
      destacada: req.query.destacada === 'true',
      limit: req.query.limit,
    };
    
    const ofertas = await OfertaService.getAll(filters);
    res.json(ofertas);
  } catch (error) {
    console.error('Error al obtener ofertas:', error);
    res.status(500).json({ error: 'Error al obtener ofertas' });
  }
};

export const getOfertaById = async (req, res) => {
  try {
    const { id } = req.params;
    const oferta = await OfertaService.getById(id);
    
    if (!oferta) {
      return res.status(404).json({ error: 'Oferta no encontrada' });
    }
    
    res.json(oferta);
  } catch (error) {
    console.error('Error al obtener oferta:', error);
    res.status(500).json({ error: 'Error al obtener oferta' });
  }
};

export const updateOferta = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    
    const updated = await OfertaService.update(id, data);
    
    if (!updated) {
      return res.status(404).json({ error: 'Oferta no encontrada' });
    }
    
    res.json({ message: 'Oferta actualizada exitosamente' });
  } catch (error) {
    console.error('Error al actualizar oferta:', error);
    res.status(500).json({ error: 'Error al actualizar oferta' });
  }
};

export const deleteOferta = async (req, res) => {
  try {
    const { id } = req.params;
    
    const deleted = await OfertaService.delete(id);
    
    if (!deleted) {
      return res.status(404).json({ error: 'Oferta no encontrada' });
    }
    
    res.json({ message: 'Oferta desactivada exitosamente' });
  } catch (error) {
    console.error('Error al eliminar oferta:', error);
    res.status(500).json({ error: 'Error al eliminar oferta' });
  }
};
