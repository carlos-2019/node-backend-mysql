const express = require('express');
const { dbconexion } = require('./database/dbconexion');
const cors = require('cors');

//Crear el servidor de express
const app = express();

// Configurar CORS
app.use(cors());

// Lectura y parseo del body
app.use(express.json());

// CONEXION A LA BD
dbconexion

// RUTAS
app.use('/api/persona', require('./router/persona'));

app.listen(3000, () => {
    console.log('servidor corriendo ' + 3000);
});