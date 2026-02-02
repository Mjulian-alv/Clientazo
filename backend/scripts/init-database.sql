-- Tabla de autenticación de clientes
CREATE TABLE IF NOT EXISTS clientes_auth (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    cliente_id BIGINT NOT NULL UNIQUE COMMENT 'FK a la BD remota',
    email VARCHAR(255),
    telefono VARCHAR(20),
    password_hash VARCHAR(255) NOT NULL,
    token_refresh TEXT,
    ultimo_acceso DATETIME,
    activo BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_cliente_id (cliente_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla de ofertas (importadas del TXT)
CREATE TABLE IF NOT EXISTS ofertas (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    codigo INT NOT NULL UNIQUE COMMENT 'COD_ART_W',
    detalle VARCHAR(200) NOT NULL COMMENT 'DETALLE_W',
    cod_rubro INT COMMENT 'COD_RUB_W',
    rubro VARCHAR(50) COMMENT 'RUBRO_W',
    cod_subrubro INT COMMENT 'COD_SUB_W',
    subrubro VARCHAR(50) COMMENT 'SUBRUBRO_W',
    marca VARCHAR(50) COMMENT 'MARK_W',
    precio_regular DECIMAL(10,2) COMMENT 'PRE_REG_W',
    precio_oferta DECIMAL(10,2) COMMENT 'PRE_CLI_W',
    fecha_inicio DATE COMMENT 'FEC_DES_W',
    fecha_fin DATE COMMENT 'FEC_HAS_W',
    imagen_url VARCHAR(500) COMMENT 'IMG_W',
    codigo_barra VARCHAR(20) COMMENT 'COD_BARRA_W',
    pesable TINYINT DEFAULT 0 COMMENT 'PESABLE',
    es_light TINYINT DEFAULT 0 COMMENT 'LIGHT1_W',
    sin_tacc TINYINT DEFAULT 0 COMMENT 'SINTACC_W',
    sin_azucar TINYINT DEFAULT 0 COMMENT 'SINAZUC_W',
    etiqueta VARCHAR(14) COMMENT 'ETIQ_W (CLIENTAZO, etc)',
    unidad_minima DECIMAL(10,3) COMMENT 'MINUN_W',
    incremento DECIMAL(10,3) COMMENT 'INCREMEN_W',
    iva DECIMAL(5,2) COMMENT 'IVA',
    proveedor_codigo INT COMMENT 'CODPROV_W',
    proveedor_nombre VARCHAR(100) COMMENT 'NOMPROV_W',
    activa BOOLEAN DEFAULT true,
    destacada BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_activa (activa),
    INDEX idx_fechas (fecha_inicio, fecha_fin),
    INDEX idx_etiqueta (etiqueta),
    INDEX idx_rubro (cod_rubro),
    INDEX idx_codigo (codigo)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla de administradores
CREATE TABLE IF NOT EXISTS admins (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    nombre_completo VARCHAR(255),
    rol VARCHAR(50) DEFAULT 'admin',
    activo BOOLEAN DEFAULT true,
    ultimo_acceso DATETIME,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla de logs de importación
CREATE TABLE IF NOT EXISTS ofertas_importacion_log (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    archivo_nombre VARCHAR(255),
    registros_procesados INT,
    registros_exitosos INT,
    registros_fallidos INT,
    errores TEXT,
    admin_id BIGINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (admin_id) REFERENCES admins(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insertar admin por defecto (password: admin123)
INSERT INTO admins (username, email, password_hash, nombre_completo, rol) 
VALUES ('admin', 'admin@clientazo.com', '$2b$10$rKvVXZ3pT9kF5J8L6nG5GeYYhQ7ZJd3yF7fJ8xN5zL8K5nG5GeYYh', 'Administrador Principal', 'superadmin')
ON DUPLICATE KEY UPDATE username=username;
