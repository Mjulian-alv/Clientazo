import fs from 'fs/promises';
import { parseDateFromDDMMYYYY, parseDecimal } from '../utils/formatters.js';

/**
 * Parser para archivo items_web.TXT
 * Formato: 31 campos separados por punto y coma (;)
 * Encoding: UTF-8
 */
export class TxtParserService {
  /**
   * Parsea el archivo TXT y devuelve un array de ofertas
   */
  static async parseFile(filePath) {
    try {
      const content = await fs.readFile(filePath, 'utf-8');
      const lines = content.split('\n').filter(line => line.trim());
      
      const ofertas = [];
      const errors = [];
      
      for (let i = 0; i < lines.length; i++) {
        try {
          const oferta = this.parseLine(lines[i], i + 1);
          
          // Solo agregar si está habilitado
          if (oferta.habilitado === 'S') {
            ofertas.push(oferta);
          }
        } catch (error) {
          errors.push({ line: i + 1, error: error.message });
        }
      }
      
      return { ofertas, errors };
    } catch (error) {
      throw new Error(`Error al leer archivo: ${error.message}`);
    }
  }
  
  /**
   * Parsea una línea del archivo
   */
  static parseLine(line, lineNumber) {
    const fields = line.split(';');
    
    if (fields.length < 31) {
      throw new Error(`Línea ${lineNumber}: Se esperaban 31 campos, se encontraron ${fields.length}`);
    }
    
    try {
      return {
        codigo: parseInt(fields[0]) || 0,                    // COD_ART_W
        detalle: fields[1]?.trim() || '',                    // DETALLE_W
        cod_rubro: parseInt(fields[2]) || null,              // COD_RUB_W
        rubro: fields[3]?.trim() || null,                    // RUBRO_W
        cod_subrubro: parseInt(fields[4]) || null,           // COD_SUB_W
        subrubro: fields[5]?.trim() || null,                 // SUBRUBRO_W
        marca: fields[6]?.trim() || null,                    // MARK_W
        precio_regular: parseDecimal(fields[7]),             // PRE_REG_W
        precio_oferta: parseDecimal(fields[8]),              // PRE_CLI_W
        fecha_inicio: parseDateFromDDMMYYYY(fields[9]),      // FEC_DES_W
        fecha_fin: parseDateFromDDMMYYYY(fields[10]),        // FEC_HAS_W
        imagen_url: fields[11]?.trim() || null,              // IMG_W
        codigo_barra: fields[12]?.trim() || null,            // COD_BARRA_W
        pesable: parseInt(fields[13]) || 0,                  // PESABLE
        es_light: parseInt(fields[14]) || 0,                 // LIGHT1_W
        sin_tacc: parseInt(fields[15]) || 0,                 // SINTACC_W
        sin_azucar: parseInt(fields[16]) || 0,               // SINAZUC_W
        etiqueta: fields[17]?.trim() || null,                // ETIQ_W
        unidad_minima: parseDecimal(fields[18]),             // MINUN_W
        incremento: parseDecimal(fields[19]),                // INCREMEN_W
        iva: parseDecimal(fields[20]),                       // IVA
        proveedor_codigo: parseInt(fields[21]) || null,      // CODPROV_W
        proveedor_nombre: fields[22]?.trim() || null,        // NOMPROV_W
        habilitado: fields[23]?.trim() || 'N',               // HABILITADO
        // Campos 24-30 reservados para futuras extensiones
      };
    } catch (error) {
      throw new Error(`Error al parsear línea ${lineNumber}: ${error.message}`);
    }
  }
}
