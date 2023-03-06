const express=require('express');
const app=express();
app.use(express.json());

const morgan =require('morgan')
const mysqlConeccion  =require('./database/database');

//CONFIGURACIONES

//puerto
app.set('puerto',3002);

 //middlewares
 app.use(morgan('dev'));
 app.use(function(req,res,next){
   res.setHeader('Access-Control-Allow-Origin','*');
   res.setHeader('Access-Control-Allow-Methods','GET,POST, OPTIONS,PUT, DELETE');
   res.setHeader('Access-Control-Allow-Headers','X-Requested-With,content-type');
   res.setHeader('Access-Control-Allow-Credentials',true);
   next();
 });

 //config del cors
//libreria pára poder usar reac cositas de permiso da acceso al servidor
const cors = require('cors');
app.use(cors());
//CORS
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
    next();
});

 // rutas para mi aplicación
 app.use(require('./router/router'));

 //ARRANCAR SERVIDOR
app.listen(app.get('puerto'),()=>{
   console.log('anda y corre el puerto '+app.get('puerto'));
});