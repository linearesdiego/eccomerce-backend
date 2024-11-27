module.exports = (sequelize, DataTypes) => {
    const Categoria = sequelize.define('Categoria', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true, 
        autoIncrement: true, 
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    }, {
      tableName: 'Categoria', 
      timestamps: true, 
    });
    Categoria.associate = (models) => {
      Categoria.hasMany(models.Producto, {
        foreignKey: 'CategoriaId', 
        as: 'Producto', 
      });
    };
    return Categoria;
  };
  