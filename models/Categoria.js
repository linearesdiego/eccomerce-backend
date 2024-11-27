module.exports = (sequelize, DataTypes) => {
    const Categoria = sequelize.define('Categoria', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true, // Especifica que este campo es la clave primaria
        autoIncrement: true, // Hace que el campo se incremente automáticamente
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    }, {
      tableName: 'categoria', 
      timestamps: true, 
    });
    Categoria.associate = (models) => {
      Categoria.hasMany(models.Producto, {
        foreignKey: 'CategoriaId', // La clave foránea en Producto
        as: 'productos', // El alias que se usará para acceder a los productos de una categoría
      });
    };
    return Categoria;
  };
  