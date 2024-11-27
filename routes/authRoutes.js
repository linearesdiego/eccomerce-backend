const express = require('express');
const { login, createAdmin } = require('../controllers/authController');

const router = express.Router();

// Ruta de login
router.post('/login', login);
router.post('/createAdmin', createAdmin);

module.exports = router;
