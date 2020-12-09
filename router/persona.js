/*
    Ruta = '/api/ganadoVacuno'
*/
const { Router } = require('express');
const { getPersona, editarPersona, createPersona, eliminarPersona } = require('../controller/persona');

const router = Router();

router.get('/', getPersona);
router.post('/', createPersona);
router.put('/:id', editarPersona);
router.delete('/:id', eliminarPersona);

module.exports = router;