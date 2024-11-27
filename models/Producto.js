module.exports = (sequelize, DataTypes) => {
    const Producto = sequelize.define('Producto', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      descripcion: {
        type: DataTypes.STRING,
      },
      precio: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      image:{
        type: DataTypes.STRING,
        allowNull: false,
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      CategoriaId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Categoria', 
          key: 'id',           
        },
      },
    }, {
      tableName: 'Producto', // Nombre de la tabla en la base de datos
      timestamps: true,       // Si quieres los campos createdAt y updatedAt
    });
  
    // Relación con Categoria (un Producto pertenece a una Categoria)
    Producto.associate = (models) => {
      Producto.belongsTo(models.Categoria, {
        foreignKey: 'CategoriaId', // Campo que se relaciona con la clave primaria de Categoria
        as: 'Categoria',           // Alias para la relación
      });
    };
  
    return Producto;
  };
  