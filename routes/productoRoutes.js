const express = require('express');
const router = express.Router();
const { Producto } = require('../models');

// Obtener todos los productos
router.get('/', async (req, res) => {
    try {
        const productos = await Producto.findAll();
        res.json(productos);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener productos', error });
    }
});

// Obtener un producto por ID
router.get('/:id', async (req, res) => {
    try {
        const producto = await Producto.findByPk(req.params.id);
        if (producto) {
            res.json(producto);
        } else {
            res.status(404).json({ message: 'Producto no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener producto', error });
    }
});

// Crear un nuevo producto
router.post('/', async (req, res) => {
    try {
        const { nombre, descripcion, precio, stock, CategoriaId } = req.body;
        const producto = await Producto.create({ nombre, descripcion, precio, stock, CategoriaId , image: 'https://via.placeholder.com/150' });
        res.status(201).json(producto);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear producto', error });
    }
});

// Actualizar un producto
router.put('/:id', async (req, res) => {
    try {
        const { nombre, descripcion, precio, stock, CategoriaId } = req.body;
        const producto = await Producto.findByPk(req.params.id);

        if (producto) {
            await producto.update({ nombre, descripcion, precio, stock, CategoriaId });
            res.json(producto);
        } else {
            res.status(404).json({ message: 'Producto no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar producto', error });
    }
});

// Eliminar un producto
router.delete('/:id', async (req, res) => {
    try {
        const producto = await Producto.findByPk(req.params.id);

        if (producto) {
            await producto.destroy();
            res.json({ message: 'Producto eliminado' });
        } else {
            res.status(404).json({ message: 'Producto no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar producto', error });
    }
});

module.exports = router;