const mongoose = require('mongoose'); 
//Conexión a la base dee datos
const DB_URL = (process.env.MONGO_URL || 'mongodb://localhost:27017/teamsDB');

//Función de conexión a la base de datos
const dbConnect = function(){
    const db = mongoose.connection;
    //sistema para la gestión de errores (redirección a consola)
    db.on('error', console.error.bind(console, 'connection error: '));
    //parámetro de conexión
    return mongoose.connect(DB_URL, {useNewUrlParser: true, useUnifiedTopology: true});
};
module.exports = dbConnect;