// routes/categorias.js
const express = require('express');
const router = express.Router();
const { Categoria } = require('../models');

// Obtener todas las categorías
router.get('/', async (req, res) => {
    try {
        const categorias = await Categoria.findAll();
        res.json(categorias);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener categorías', error });
    }
});

// Obtener una categoría por ID
router.get('/:id', async (req, res) => {
    try {
        const categoria = await Categoria.findByPk(req.params.id);
        if (categoria) {
            res.json(categoria);
        } else {
            res.status(404).json({ message: 'Categoría no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener categoría', error });
    }
});

// Crear una nueva categoría
router.post('/', async (req, res) => {
    try {
        const { nombre } = req.body;
        const categoria = await Categoria.create({ nombre });
        res.status(201).json(categoria);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear categoría', error });
    }
});

// Actualizar una categoría
router.put('/:id', async (req, res) => {
    try {
        const { nombre } = req.body;
        const categoria = await Categoria.findByPk(req.params.id);

        if (categoria) {
            await categoria.update({ nombre });
            res.json(categoria);
        } else {
            res.status(404).json({ message: 'Categoría no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar categoría', error });
    }
});

// Eliminar una categoría
router.delete('/:id', async (req, res) => {
    try {
        const categoria = await Categoria.findByPk(req.params.id);

        if (categoria) {
            await categoria.destroy();
            res.json({ message: 'Categoría eliminada' });
        } else {
            res.status(404).json({ message: 'Categoría no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar categoría', error });
    }
});

module.exports = router;
