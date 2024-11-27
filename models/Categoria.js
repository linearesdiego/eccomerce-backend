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
  
    return Categoria;
  };
  