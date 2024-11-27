const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

// Función de login para el admin
const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Validar que el correo sea el del admin
        const admin = await Usuario.findOne({ where: { email: email } });

        if (!admin) {
            return res.status(404).json({ message: 'Administrador no encontrado' });
        }

        // Verificar que la contraseña coincida
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        // Generar el token JWT
        const token = jwt.sign(
            { id: admin.id, email: admin.email, role: 'admin' },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '1h' }
        );

        // Responder con el token
        res.status(200).json({
            message: 'Login exitoso',
            token,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};
const createAdmin = async (req, res) => {
    try {
        // Verificar si el usuario admin ya existe
        const existingAdmin = await Usuario.findOne({ where: { email: 'admin@admin.com' } });

        if (existingAdmin) {
            return res.status(400).json({ message: 'El usuario admin ya existe' });
        }

        // Crear el usuario admin
        const passwordHash = await bcrypt.hash('admin123', 10);  // Hashea la contraseña

        const admin = await Usuario.create({
            username: 'admin',
            email: 'admin@admin.com',
            password: passwordHash,  // Contraseña hasheada
            isAdmin: true,  // Usuario admin
        });

        res.status(201).json({ message: 'Usuario admin creado exitosamente', admin });
    } catch (error) {
        console.error('Error creando el usuario admin:', error);
        res.status(500).json({ error: 'Hubo un error al crear el usuario admin' });
    }
};
module.exports = { login ,createAdmin};
