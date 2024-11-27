module.exports = (sequelize, DataTypes) => {
  const PedidoProducto = sequelize.define('PedidoProducto', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    tableName: 'pedidoProducto', // Nombre de la tabla en la base de datos
    timestamps: true, // Para crear los campos createdAt y updatedAt
  });

  // Definición de las relaciones (muchos a muchos)
  PedidoProducto.associate = (models) => {
    // Relación con Pedido (un Pedido puede tener varios productos)
    PedidoProducto.belongsTo(models.Pedido, {
      foreignKey: 'pedidoId', // El campo que referencia la clave primaria de Pedido
      as: 'pedido', // Alias para la relación
    });

    // Relación con Producto (un Producto puede estar en muchos Pedidos)
    PedidoProducto.belongsTo(models.Producto, {
      foreignKey: 'productoId', // El campo que referencia la clave primaria de Producto
      as: 'producto', // Alias para la relación
    });
  };

  return PedidoProducto;
};
