const express = require('express');
const { authMiddleware } = require('../middlewares/authMiddleware'); // Middleware para proteger las rutas
const { obtenerUsuario, actualizarUsuario } = require('../controllers/usuarioController');

const router = express.Router();

// Ruta protegida para obtener la información del usuario (admin)
router.get('/me', authMiddleware, obtenerUsuario);

// Ruta protegida para actualizar la información del usuario (admin)
router.put('/me', authMiddleware, actualizarUsuario);

module.exports = router;
