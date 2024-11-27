const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');

// Obtener detalles del usuario administrador
const obtenerUsuario = async (req, res) => {
    try {
        const admin = await Usuario.findOne({ where: { email: 'admin@example.com' } });

        if (!admin) {
            return res.status(404).json({ message: 'Administrador no encontrado' });
        }

        // Excluir el campo de la contraseña al retornar la información
        res.status(200).json({
            nombre: admin.nombre,
            email: admin.email,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los detalles del usuario' });
    }
};

// Actualizar los detalles del usuario administrador
const actualizarUsuario = async (req, res) => {
    const { nombre, password } = req.body;

    try {
        const admin = await Usuario.Usuario.findOne({ where: { email: 'admin@example.com' } });

        if (!admin) {
            return res.status(404).json({ message: 'Administrador no encontrado' });
        }

        // Actualizar el nombre
        if (nombre) {
            admin.nombre = nombre;
        }

        // Si se proporciona una nueva contraseña, la encriptamos
        if (password) {
            admin.password = bcrypt.hashSync(password, 10);
        }

        await admin.save();

        res.status(200).json({ message: 'Usuario actualizado exitosamente', admin });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar los detalles del usuario' });
    }
};

module.exports = { obtenerUsuario, actualizarUsuario };
