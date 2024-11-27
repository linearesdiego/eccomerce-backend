// routes/pedidos.js
const express = require('express');
const router = express.Router();
const { Pedido, Producto } = require('../models');

// Obtener todos los pedidos
router.get('/', async (req, res) => {
    try {
        const pedidos = await Pedido.findAll({
            include: Producto, // Incluir los productos relacionados
        });
        res.json(pedidos);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener pedidos', error });
    }
});

// Obtener un pedido por ID
router.get('/:id', async (req, res) => {
    try {
        const pedido = await Pedido.findByPk(req.params.id, {
            include: Producto, // Incluir los productos relacionados
        });
        if (pedido) {
            res.json(pedido);
        } else {
            res.status(404).json({ message: 'Pedido no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener pedido', error });
    }
});

// Crear un nuevo pedido
router.post('/', async (req, res) => {
    try {
        const { fecha, total, estado, productos } = req.body; // productos es un array de IDs de productos
        const pedido = await Pedido.create({ fecha, total, estado });

        // Asignar productos al pedido
        if (productos && productos.length > 0) {
            const productosEncontrados = await Producto.findAll({
                where: {
                    id: productos, // Array de IDs de productos
                },
            });
            await pedido.setProductos(productosEncontrados); // Relacionar productos con el pedido
        }

        res.status(201).json(pedido);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear pedido', error });
    }
});

// Actualizar un pedido
router.put('/:id', async (req, res) => {
    try {
        const { fecha, total, estado, productos } = req.body;
        const pedido = await Pedido.findByPk(req.params.id);

        if (pedido) {
            await pedido.update({ fecha, total, estado });

            // Actualizar los productos del pedido
            if (productos && productos.length > 0) {
                const productosEncontrados = await Producto.findAll({
                    where: {
                        id: productos,
                    },
                });
                await pedido.setProductos(productosEncontrados); // Actualizar relación
            }

            res.json(pedido);
        } else {
            res.status(404).json({ message: 'Pedido no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar pedido', error });
    }
});

// Eliminar un pedido
router.delete('/:id', async (req, res) => {
    try {
        const pedido = await Pedido.findByPk(req.params.id);

        if (pedido) {
            await pedido.destroy();
            res.json({ message: 'Pedido eliminado' });
        } else {
            res.status(404).json({ message: 'Pedido no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar pedido', error });
    }
});

module.exports = router;
