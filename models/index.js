const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const Categoria = require('./Categoria.js')(sequelize, Sequelize.DataTypes);
const Producto = require('./Producto.js')(sequelize, Sequelize.DataTypes);
const Pedido = require('./Pedido.js')(sequelize, Sequelize.DataTypes);
const PedidoProducto = require('./PedidoProducto.js')(sequelize, Sequelize.DataTypes);
const Usuario = require('./Usuario');
Categoria.hasMany(Producto, { foreignKey: 'CategoriaId', as: 'Productos' });
Producto.belongsTo(Categoria, { foreignKey: 'CategoriaId', as: 'Categoria' });

Pedido.belongsToMany(Producto, {
    through: PedidoProducto,
    foreignKey: 'PedidoId',
    as: 'Producto',
});
Producto.belongsToMany(Pedido, {
    through: PedidoProducto,
    foreignKey: 'ProductoId',
    as: 'Pedidos',
});



module.exports = { sequelize, Categoria, Producto, Pedido, PedidoProducto,Usuario };