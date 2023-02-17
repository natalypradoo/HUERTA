const express=require('express');
const router=express();
// libreria de encriptación passwords
const bcrypt=require('bcrypt');
//libreria para generación de token
const jwt=require('jsonwebtoken');

//archivo de conexión con MyQSL
const mysqlConeccion  =require('../database/database');

//ruta raiz para mi aplicación
router.get('/',(req,res)=>{
    res.send('Pantalla Inicio de nuestra aplicación');
 });


//INICIO ENDPOINTS

// REGISTRO
router.post('/registro',async(req,res)=>{
    const {username, password, email, apellido_nombre}=req.body
    let hash = bcrypt.hashSync(password,10);
    let query=`INSERT INTO huerta.usuarios (username, password) VALUES ('${username}','${hash}');
    INSERT INTO huerta.personas(nombre,apellido,fecha_nacimiento, email, contacto) VALUES ('${nombre}','${apellido}','${fecha_nacimiento}','${email}','${contacto}'`;
    mysqlConeccion.query(query,(err,registros)=>{
       if(!err){
        res.send('se insertó correctamente: '+username);
       }else{
          res.send('ocurrió un error en el servidor');
       }
    });
 });

 //LOGIN DE USUARIOS
 router.post('/login', (req,res)=>{
    const {username,password} = req.body
    if(username!=undefined && password!=undefined){
        mysqlConeccion.query('SELECT concat_ws(" ", p.nombre, p.apellido) Nombre, p.email, p.contacto from huerta.personas p inner join huerta.usuarios where usuarios.estado="A" and username=?;',[username],(err,rows)=>{
        if(!err){
         //cuenta cantidad de registros que devuelve base de datos
            if(rows.length!=0){
               console.log(rows);
               //pregunto si password y comparo con lo encriptado si es true/false (si pertenece o no)
               const bcryptPassword = bcrypt.compareSync(password, rows[0].password);
            if(bcryptPassword){
               jwt.sign({rows},'siliconKey',(err,token)=>{
                  res.json({
                     exito:true,
                     datos: rows,
                     token: token
                  });
               })
             }else{
               console.log(rows);
               res.json({
                  exito: false,
                  mensaje: "contraseña incorrecta"
               });
             }
            }else{
               res.json({
                  exito: false,
                  mensaje: "El usuario no existe"
               });
            }
        }else{
         res.json({
         exito: false,
         mensaje: "Ocurrió un erorr"
      });
        }
     });
   }else{
      res.send('Faltan completar parámetros');
   }
 });

 // RESETEAR CONTRASEÑA
 router.put('/resetpassword/:id',(req,res)=>{
   let id= req.params.id;
   const {password}=req.body
   let hash =bcrypt.hashSync(password,10);
   let query= `UPDATE usuarios SET password='${hash}' WHERE id='${id}'`;
   mysqlConeccion.query(query,(err,registros)=>{
      if(!err){
       res.send('se cambió la constaseña');
      }else{
         res.send('ocurrió un error en el servidor');
      }
   });
 });

// LISTAR USUARIOS
router.get('/usuarios', verificarToken, (req,res)=>{
    jwt.verify(req.token,'siliconKey',(err,valido)=>{
       if(err){
          res.sendStatus(403);
       }else{
          let query= `SELECT u.username, concat_ws(" ", p.nombre,p.apellido) Nombre FROM huerta.usuarios as u 
          inner join huerta.usuario_persona as up
          inner join huerta.personas as p
          where (u.id_usuario=up.id_usuario and up.id_persona=p.id_persona);`;
       mysqlConeccion.query(query,(err,registros)=>{
           if(!err){
            console.log(registros.lenght)
              res.json(registros);
           }else{
              console.log(err);
           }
        })
       }
    })
  });

 //ruta de prueba de generación de TOKEN
 function verificarToken(req,res,next){
 const BearerHeader= req.headers ['authorization']
 if(typeof BearerHeader!=='undefined'){
    const bearerToken= BearerHeader.split(" ")[1]
    req.token= bearerToken;
    next();
 }else{
  res.sendStatus(403);
 }
 } 

 
// lista huertas 
router.get('/huertas', (req,res)=>{
    let query= 'select * from huerta';
     mysqlConeccion.query(query, (err,rows)=>{
        if(!err){
           res.json(rows);
           console.log(rows);
        }else{
           console.log(err)
        }
     });
    }
 );

 // lista plantas
 router.get('/plantas', (req,res)=>{
    let query= 'select * from plantas';
     mysqlConeccion.query(query, (err,rows)=>{
        if(!err){
           res.json(rows);
           console.log(rows);
        }else{
           console.log(err)
        }
     });
    }
 );











 module.exports=router;