const { response, request } = require('express');
const { dbconexion } = require('../database/dbconexion');

const getPersona = async (req, res = response) => {

    //SOLO SE MUESTRAN LOS QUE TENGAN ESTADO 1 'ACTIVO'
    const sql = 'SELECT * FROM persona WHERE estado = 1';
    await dbconexion.query(sql, (err, rows) => {
        if (err) throw err;
        if (rows.length > 0) {
            res.status(200).json({
                ok: true,
                persona: rows,
                totalRegistros: rows.length
            });
        } else {
            res.status(404).json({
                ok: false,
                mensaje: 'No hay data'
            })
        }
    });

}

const createPersona = async (req = request, res = response) => {

    const id = req.body.id_persona;
    const dataPersona = ({
        ...req.body
    });

    // INSERTAR PERSONA
    const sql = 'INSERT INTO persona set ?';
    const sqlBuscar = 'SELECT * FROM persona WHERE id_persona = ?';
    await dbconexion.query(sqlBuscar, [id], (err, rows) => {
        if (err) throw err;
        if (rows.length > 0) {
            res.status(200).json({
                ok: false,
                mensaje: 'Ya existe esa persona'
            })
        } else {
            dbconexion.query(sql, [dataPersona], () => {
                res.status(201).json({
                    ok: true,
                    mensaje: 'Registro creado'
                });
            });
        }
    });
}

const editarPersona = async (req = request, res = response) => {

    const personaID = req.params.id;

    const dataPersona = {
        ...req.body
    }
    //MODIFICAR PERSONA
    const sqlEditar = 'UPDATE persona SET ? WHERE id_persona = ?';
    const sqlBuscar = 'SELECT * FROM persona WHERE id_persona = ?';

    await dbconexion.query(sqlBuscar, [personaID], (err, rows) => {
        if (err) throw err;
        if (rows.length > 0) {
            dbconexion.query(sqlEditar, [dataPersona, personaID], () => {
                res.status(200).json({
                    ok: true,
                    mensaje: 'Usuario Modificado'
                });
            });
        } else {
            res.status(200).json({
                ok: false,
                mensaje: 'No existe esa persona'
            })
        }
    });
}

const eliminarPersona = async (req = request, res = response) => {

    const personaID = req.params.id;
    //ELIMINAR PERSONA ELIMINADO LOGICO 1 = ACTIVO, 0 = INACTIVO
    const sql = 'UPDATE persona SET estado = 0 WHERE id_persona = ?';
    const sqlBuscar = 'SELECT * FROM persona WHERE id_persona = ?';
    await dbconexion.query(sqlBuscar, [personaID], (err, rows) => {
        if (err) throw err;
        if (rows.length > 0) {
            dbconexion.query(sql, [personaID], () => {
                res.status(200).json({
                    ok: true,
                    mensaje: 'Persona Eliminado'
                });
            });
        } else {
            res.status(200).json({
                ok: false,
                mensaje: 'No existe esa persona'
            });
        }
    });
}
module.exports = {
    getPersona,
    createPersona,
    editarPersona,
    eliminarPersona
}