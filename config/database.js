const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_DATABASE, // Nombre de la base de datos
  process.env.DB_USER,     // Usuario
  process.env.DB_PASSWORD, // Contraseña
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306, // Puerto (por defecto: 3306)
    dialect: 'mysql',                  // Tipo de base de datos
    logging: false,                    // Desactiva logs de consultas SQL
  }
);

module.exports = sequelize;

