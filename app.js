const express = require('express');
const sequelize = require('./config/database');
const categoriaRoutes = require('./routes/categoriaRoutes');
const productoRoutes = require('./routes/productoRoutes');
const pedidoRoutes = require('./routes/pedidoRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();

const app = express();
app.use(express.json()); // Middleware para parsear JSON

// Rutas
app.use('/api/categorias', categoriaRoutes);
app.use('/api/productos', productoRoutes);
app.use('/api/pedidos', pedidoRoutes);
app.use('/api/usuario', usuarioRoutes);
app.use('/auth', authRoutes);

// Manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Ocurrió un error en el servidor' });
});

// Sincronizar la base de datos y arrancar el servidor
const PORT = process.env.DB_PORT || 3000;

// Sincronizar la tabla Categoria primero y luego el resto
sequelize.sync({ alter: true })
    .then(async () => {
        // Sincroniza la tabla Categoria primero
        await require('./models').Categoria.sync({ force: true });
        console.log('Tabla Categoria creada o sincronizada.');

        // Luego sincroniza las demás tablas
        await require('./models').Producto.sync({ force: true });
        console.log('Tabla Producto creada o sincronizada.');

        await require('./models').Pedido.sync({ force: true });
        console.log('Tabla Pedido creada o sincronizada.');

        await require('./models').PedidoProducto.sync({ force: true });
        console.log('Tabla PedidoProducto creada o sincronizada.');

        // Arrancar el servidor después de la sincronización
        app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
    })
    .catch(error => {
        console.error('Error al sincronizar las tablas:', error);
    });
