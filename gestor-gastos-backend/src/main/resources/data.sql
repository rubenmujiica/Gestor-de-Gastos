-- 1. USUARIO DE PRUEBA
INSERT INTO usuarios (id, nombre, apellidos, username, email, password, telefono, patrimonio_total, fecha_creacion)
VALUES (1, 'Rubén', 'Mújica Sánchez', 'rubenmujica', 'rubenmujicasanchez@gmail.com', '1234', '684353654', 5000, NOW())
    ON CONFLICT (id) DO NOTHING;

-- 2. CATEGORÍAS PRINCIPALES
INSERT INTO categorias (id, nombre, descripcion, icono, color, categoria_padre_id)
VALUES (1, 'Alimentación', 'Gastos en comida y supermercado', 'utensils', '#FF5733', NULL)
    ON CONFLICT (id) DO NOTHING;

INSERT INTO categorias (id, nombre, descripcion, icono, color, categoria_padre_id)
VALUES (2, 'Vivienda', 'Gastos del hogar y suministros', 'home', '#3357FF', NULL)
    ON CONFLICT (id) DO NOTHING;

INSERT INTO categorias (id, nombre, descripcion, icono, color, categoria_padre_id)
VALUES (3, 'Ingresos', 'Nóminas y otros ingresos', 'wallet', '#28A745', NULL)
    ON CONFLICT (id) DO NOTHING;

-- 3. SUBCATEGORÍAS (Apuntan al ID del padre)
INSERT INTO categorias (id, nombre, descripcion, icono, color, categoria_padre_id)
VALUES (4, 'Supermercado', 'Compras en Mercadona, Carrefour, etc.', 'shopping-cart', '#FF8C00', 1)
    ON CONFLICT (id) DO NOTHING;

INSERT INTO categorias (id, nombre, descripcion, icono, color, categoria_padre_id)
VALUES (5, 'Restaurantes', 'Comidas fuera y cenas', 'coffee', '#E67E22', 1)
    ON CONFLICT (id) DO NOTHING;

INSERT INTO categorias (id, nombre, descripcion, icono, color, categoria_padre_id)
VALUES (6, 'Alquiler/Hipoteca', 'Pago mensual de la vivienda', 'key', '#2980B9', 2)
    ON CONFLICT (id) DO NOTHING;

-- Sincronizar el contador de IDs de PostgreSQL para evitar conflictos en futuras inserciones
SELECT setval('categorias_id_seq', (SELECT COALESCE(MAX(id), 1) FROM categorias));
SELECT setval('usuarios_id_seq', (SELECT COALESCE(MAX(id), 1) FROM usuarios));

-- 4. PRESUPUESTO MENSUAL ("Pay Yourself First")
INSERT INTO presupuestos_mensuales (id, usuario_id, ingreso_mensual, ahorro_fijo, mes, anio)
VALUES (1, 1, 1500.00, 800.00, 10, 2026)
    ON CONFLICT (id) DO NOTHING;

-- 5. TRANSACCIONES INICIALES
INSERT INTO transacciones (id, descripcion, cantidad, tipo, fecha, es_recurrente, usuario_id, categoria_id)
VALUES (1, 'Nómina Octubre', 1500.00, 'INGRESO', NOW(), true, 1, 3)
    ON CONFLICT (id) DO NOTHING;

INSERT INTO transacciones (id, descripcion, cantidad, tipo, fecha, es_recurrente, usuario_id, categoria_id)
VALUES (2, 'Compra en Mercadona', 85.50, 'GASTO', NOW(), false, 1, 4)
    ON CONFLICT (id) DO NOTHING;