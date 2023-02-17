const mysql = require('mysql2');


//crear conexión con mi base de datos
const mysqlConeccion= mysql.createConnection({
host:'localhost',
user: 'root',
password: '123',
database: 'huerta'
});

//crear función para ver si me conectó bien
 mysqlConeccion.connect(function(err){
    if(err){
        console.log('mi error es ', err);
        return;
    }else{
        console.log('mi conexión se realizó correctamente')
    }
 });

 module.exports = mysqlConeccion;