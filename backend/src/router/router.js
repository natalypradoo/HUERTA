const express=require('express');
const router=express();
// libreria de encriptación passwords
const bcrypt=require('bcrypt');
//libreria para generación de token
const jwt=require('jsonwebtoken');

//archivo de conexión con MyQSL
const mysqlConeccion=require('../database/database');

//ruta raiz para mi aplicación
router.get('/',(req,res)=>{
    res.send('Pantalla Inicio de nuestra aplicación');
 });


//INICIO ENDPOINTS

////////////////////////////////////////
/////////REGISTROS Y LOGIN/////////////
///////////////////////////////////////

// REGISTRO USUARIO, personas y generacion de la relacion en la tabla usuario_persona//CONFIRMAR QUE EL EMAIL NO SE REPITA FALTA
router.post('/registro',async(req,res)=>{
   const {username, password,nombre,apellido,fecha_nacimiento,email,contacto}=req.body
   let hash = bcrypt.hashSync(password,10);
   //pregunta si el usuario ya existe
   let query5=`SELECT * FROM huerta.usuarios WHERE username='${username}';`;
   mysqlConeccion.query(query5,(err,rows)=>{
      if(!err){
         if(rows.length==0){
            let query=`INSERT INTO huerta.usuarios (username, password) VALUES ('${username}','${hash}');`
            mysqlConeccion.query(query,(err,rows)=>{
              //console.log(rows);
               if(!err){
                //res.send('se insertó correctamente el usuario: '+username);
               }else{
                  console.log(err);
                  res.send('ocurrió un error en el servidor');
               }
            });
            let query1=`INSERT INTO huerta.personas(nombre, apellido, fecha_nacimiento, email, contacto) VALUES ('${nombre}','${apellido}','${fecha_nacimiento}','${email}','${contacto}')`;
            mysqlConeccion.query(query1,(err,rows)=>{
               //console.log(rows);
               if(!err){
                  res.send('Se insertó correctamente el usuario: '+username+' persona: '+nombre);
               }else{
                  console.log(err);
                  res.send('ocurrió un error en el servidor');
               }});
               let query2=`SELECT u.id_usuario FROM huerta.usuarios as u where username='${username}';`;
               mysqlConeccion.query(query2,(err,rows)=>{
                  //console.log(rowss);
                  const {id_usuario}=rows[0];
                  //console.log(id_usuario);
                  if(!err){
                     let query3=`SELECT p.id_persona FROM huerta.personas as p where email='${email}';`;
                     mysqlConeccion.query(query3,(err,rows)=>{
                     //console.log(rowss);
                        const {id_persona}=rows[0];
                        //console.log(id_usuario);
                        if(!err){
                        //res.send('Tomo el id_upersona: ' +id_persona);
                           let query4=`INSERT INTO huerta.usuario_persona(id_usuario, id_persona) VALUES ('${id_usuario}','${id_persona}');`;
                           mysqlConeccion.query(query4,(err,rows)=>{
                           //console.log(rows);
                              if(!err){
                                 //res.send('Se insertó correctamente la relación: '+id_usuario+id_persona);
                              }else{
                                 console.log(err);
                                 res.send('ocurrió un error en el servidor quiery4');
                              }
                           });
                        }else{
                           console.log(err);
                           res.send('ocurrió un error en el servidor quiery3');
                        };
                     });
                  }else{
                     console.log(err);
                     res.send('ocurrió un error en el servidor quiery2');
                  }
               });   
            



            
         }else{
            res.json({
               status: false,
               mensaje:"El USERNAME Ingresado ya Existe Ingrese Otro"
              });
         }
         //res.send('se insertó correctamente el usuario: '+username);
        }else{
           //console.log(err);
           res.json({
            status: false,
            mensaje:"Ocurrio un error en el servidor"
           });
           
        }
   })

});


   
   

//LOGIN DE USUARIOS
router.post('/login',(req,res)=>{
    const {username,password} = req.body
    if(username!=undefined && password!=undefined){
      mysqlConeccion.query('select u.username, u.password from huerta.usuarios as u where u.username=?;',[username],(err,rows)=>{

      //mysqlConeccion.query('SELECT concat_ws(" ", p.nombre, p.apellido) Nombre, p.email, p.contacto from huerta.personas p inner join huerta.usuarios where usuarios.estado="A" and username=?;',[username],(err,rows)=>{
        if(!err){
         //cuenta cantidad de registros que devuelve base de datos
            if(rows.length!=0){
               //console.log(rows);
               //pregunto si password y comparo con lo encriptado si es true/false (si pertenece o no)
               const bcryptPassword = bcrypt.compareSync(password, rows[0].password);
            if(bcryptPassword){
               jwt.sign({rows},'huerta1Key',(err,token)=>{
                  res.json({
                     status:true,
                     datos: rows,
                     token: token
                  });
               })
             }else{
               //console.log(rows);
               res.json({
                  status: false,
                  mensaje: "La Contraseña Ingresada es Incorrecta"
               });
             }
            }else{
               res.json({
                  status: false,
                  mensaje: "El Usuario NO Existe"
               });
            }
        }else{
         res.json({
         status: false,
         mensaje: "ERROR en el servidor"
      });
        }
     });
   }else{
      res.json({
         status: false,
         mensaje: "Falta Completar Datos"
     });
   }
});

// RESETEAR CONTRASEÑA
router.put('/resetpassword/:id',(req,res)=>{
   let id= req.params.id;
   const {password}=req.body
   let hash =bcrypt.hashSync(password,10);
   let query= `UPDATE huerta.usuarios SET password='${hash}' WHERE id_usuario='${id}'`;
   mysqlConeccion.query(query,(err,registros)=>{
      if(!err){
       res.send('se cambió la constaseña');
      }else{
         res.send('ocurrió un error en el servidor');
      }
   });
});

/////////////////////////////
/////////USURIOS/////////////
////////////////////////////

//LISTAR USUARIOS
router.get('/usuarios', verificarToken, (req,res)=>{
 //  jwt.verify(req.token,'huerta1Key',(err,valido)=>{
 //     if(err){
 //        res.sendStatus(403);
  //    }else{
         let query= `SELECT u.username, concat_ws(" ", p.nombre,p.apellido) Nombre, up.estado FROM huerta.usuarios as u 
         inner join huerta.usuario_persona as up
         inner join huerta.personas as p
         where (u.id_usuario=up.id_usuario and up.id_persona=p.id_persona and up.estado='A');`;
      mysqlConeccion.query(query,(err,registros)=>{
         if(!err){
            console.log(registros.length)
            res.json(registros);
         }else{
            console.log(err);
         }
      })
      });
//      };
//   });
//});

/////////////////////////////
/////////HUERTA/////////////
////////////////////////////

///LISTAR Huertas con cantidad de usuarios por huerta
router.get('/huertas',(req,res)=>{
  // jwt.verify(req.token,'huerta1Key',(err,valido)=>{
    //  if(err){
    //     res.sendStatus(403);
     // }else{ INNER JOIN huerta.usuario_huerta as uh where h.id_huerta=uh.id_huerta group by uh.id_huerta;
         let query= `SELECT * FROM huerta.huerta `;
      mysqlConeccion.query(query,(err,registros)=>{
         if(!err){
            console.log(registros.lenght)
            res.json(registros);
         }else{
            console.log(err);
         }
       })
   });
   //})
 //});
///Muestra los usuarios de una huerta en particular con el id de la huerta
router.get('/huertas/:id_huerta',(req,res)=>{
   // jwt.verify(req.token,'huerta1Key',(err,valido)=>{
   //    if(err){
   //       res.sendStatus(403);
   //    }else{
         let id_huerta= req.params.id_huerta;
         let query= `SELECT u.username FROM (SELECT uh.id_usuario, h.nombre Nombre FROM huerta.huerta as h 
         INNER JOIN huerta.usuario_huerta as uh WHERE h.id_huerta=uh.id_huerta and h.id_huerta='${id_huerta}') AS T 
         INNER JOIN huerta.usuarios AS u WHERE (T.id_usuario=u.id_usuario);`;
         mysqlConeccion.query(query,(err,registros)=>{
            if(!err){
               res.send(registros);
            }else{
               res.send('ocurrió un error en el servidor');
            }
         });
 //     }
 //   })
 });




///////////////////////////////
/////////MI HUERTA/////////////
//////////////////////////////

///Muestra las huertas de un USUARIO EN PARTICULAR
router.get('/mihuerta/:id_usuario',(req,res)=>{
   // jwt.verify(req.token,'huerta1Key',(err,valido)=>{
   //    if(err){
   //       res.sendStatus(403);
   //    }else{
         let id_usuario= req.params.id_usuario;
         let query= `SELECT T.id_huerta, hh.nombre,hh.localidad,T.Tipos_de_Plantas FROM (
         SELECT uh.id_usuario, uh.id_huerta,count(hp.id_huerta) Tipos_de_Plantas FROM huerta.usuario_huerta AS uh 
         LEFT JOIN huerta.huerta_planta AS hp ON uh.id_huerta=hp.id_huerta WHERE (uh.id_usuario='${id_usuario}' AND uh.estado='A') GROUP BY id_huerta) AS T 
         INNER JOIN huerta.huerta AS hh WHERE hh.id_huerta=T.id_huerta;`;
         // SELECT T.id_huerta, hh.nombre,hh.localidad,T.Tipos_de_Plantas FROM (
         //    SELECT uh.id_usuario, uh.id_huerta,count(hp.id_huerta) Tipos_de_Plantas FROM huerta.usuario_huerta AS uh 
         //    LEFT JOIN huerta.huerta_planta AS hp ON uh.id_huerta=hp.id_huerta WHERE (uh.id_usuario='1' AND uh.estado='A') GROUP BY id_huerta) AS T 
         //    INNER JOIN huerta.huerta AS hh WHERE hh.id_huerta=T.id_huerta;
         mysqlConeccion.query(query,(err,registros)=>{
            if(!err){
               res.send(registros);
            }else{
               res.send('Ocurrió un error en el servidor');
            }
         });
 //     }
 //   })
 });

//AGREGAR HUERTA ---boton ((AGREGAR))
router.post('/mihuerta/:id_usuario',async(req,res)=>{
//   jwt.verify(req.token, 'huerta1Key',(err,valido)=>{
//      if(err){
//         res.sendStatus(403);
//      }else{
         const {nombre,localidad} = req.body
         let id_usuario= req.params.id_usuario;
         let query =`INSERT INTO huerta.huerta ( nombre, localidad) VALUES ('${nombre}','${localidad}');`;
         //INSERT INTO `huerta`.`huerta` (`nombre`, `localidad`) VALUES ('Pato', 'Oberá');
         mysqlConeccion.query(query, (err,rows)=>{
            if(!err){
               res.send('Se inserto correctamente la huerta: '+nombre+' ubicada en: '+localidad);
            }else{
               console.log(err);
               res.send('El error es: '+ err);
            };
         });
         let query1 =`SELECT id_huerta FROM huerta.huerta WHERE nombre='${nombre}'; `;
         mysqlConeccion.query(query1, (err,rows)=>{
            const {id_huerta}=rows[0];
            if(!err){
               let query2 =`INSERT INTO huerta.usuario_huerta ( id_usuario, id_huerta) VALUES ('${id_usuario}','${id_huerta}');`;
               mysqlConeccion.query(query2, (err,rows)=>{
                  if(!err){
                     //res.send('Se inserto correctamente la relacion entre la huerta: '+id_huerta+' y el usuario: '+id_usuario);
                  }else{
                     console.log(err);
                     res.send('El error es: '+ err);
                  };
               });
            }else{
               console.log(err);
               res.send('El error es: '+ err);
            };
         }); 
       });
//   });
// });



//Cambiar NOMBRE/LOCALIDAD DE LA HUERTA O ESTADO DEL USUARIO EN LA HUERTA ---boton((MODIFICAR))---boton((ELIMINAR)
router.put('/mihuerta/:id_usuario/:id_huerta',(req,res)=>{
//   jwt.verify(req.token, 'huerta1Key',(err,valido)=>{
//      if(err){
//         res.sendStatus(403);
//      }else{
   let id_huerta= req.params.id_huerta;
   let id_usuario= req.params.id_usuario;
   const {nombre,localidad,estado}=req.body
   if(estado!=undefined){
      //Cambia la relacion, es decir, da de baja al usuario de la huerta
      let query= `UPDATE huerta.usuario_huerta SET estado='${estado}' WHERE ( id_usuario='${id_usuario}' and id_huerta= '${id_huerta}')`;
      mysqlConeccion.query(query, (err, registros)=>{
         if(!err){
            if(estado!="B"){
               res.send('El Usuario:'+id_usuario+ ' cambio de bajo a ALTO en la Huerta'+id_huerta);
            }else{
               res.send('El Usuario:'+id_usuario+ ' cambio de alto a BAJO en la Huerta'+id_huerta);
            };
         }else{
            console.log(err)
         }
     });
   }else{
      if(nombre!=undefined && nombre!="" && localidad!=undefined && localidad!=""){
      let query1= `UPDATE huerta.huerta SET nombre='${nombre}',localidad='${localidad}' WHERE id_huerta='${id_huerta}'`;
      mysqlConeccion.query(query1,(err,registros)=>{
         if(!err){
          res.send('Se cambió el Nombre de la Huerta a:'+nombre+' y la localidad a '+localidad);
         }else{
            res.send('ocurrió un error en el servidor');
         }
      });
      }else{
         res.send('Faltan campos o debe completarlos correctamente')
      }
   };
});

//DAR BAJA HUERTA
router.put('/eliminarmihuerta/:id_huerta',(req,res)=>{
   let id_huerta= req.params.id_huerta;
   let query= `UPDATE huerta SET estado='B' WHERE id_huerta='${id_huerta}'`;
   mysqlConeccion.query(query,(err,registros)=>{
      if(!err){
       res.send('se eliminó la huerta exitosamente');
      }else{
         res.send('ocurrió un error en el servidor');
      }
   });
}
);


///////////////////////////
/////////PLANTAS//////////
/////////////////////////
//Lista de Plantas con cantidad de comentarios
router.get('/plantas',(req,res)=>{
   //jwt.verify(req.token,'huerta1Key',(err,valido)=>{
    //  if(err){
      //   res.sendStatus(403);
    //  }else{
         let query= `SELECT pl.id_planta, pl.nombre, pl.comentario, pl.epoca, pl.luna, pl.forma, count(cp.id_planta) Comentarios FROM huerta.plantas AS pl 
         LEFT JOIN comentario_planta AS cp ON pl.id_planta=cp.id_planta GROUP BY cp.id_planta;`;
      mysqlConeccion.query(query,(err,registros)=>{
          if(!err){
           console.log(registros.length)
             res.json(registros);
          }else{
             console.log(err);
          }
       })
      });
  // })
 //});
//AGREGAR PLANTAS A LA LISTA 
router.post('/plantas',async(req,res)=>{
   //   jwt.verify(req.token, 'huerta1Key',(err,valido)=>{
   //      if(err){
   //         res.sendStatus(403);
   //      }else{
            const {nombre,comentario,epoca,luna,forma} = req.body
            let query =`INSERT INTO huerta.plantas ( nombre, comentario, epoca, luna, forma, estado) VALUES ('${nombre}','${comentario}','${epoca}','${luna}','${forma}','A');`;
//INSERT INTO `huerta`.`plantas` (`nombre`, `comentario`, `epoca`, `luna`, `forma`, `estado`) VALUES ('Papas', 'con la papa', 'VERANO', 'Luna Menguante', 'directa', 'A');
            mysqlConeccion.query(query, (err,rows)=>{
               if(!err){
                  res.json({
                     status: true,
                     mensaje:"Se agrego correctamente la planta"
                    });
               }else{
                  res.json({
                     status: false,
                     mensaje:"No hubo exito"
                    });
               };
            });
          });
   //   });
   // });
//INSERT INTO `huerta`.`plantas` (`nombre`, `comentario`, `epoca`, `luna`, `forma`, `estado`) VALUES ('Papas', 'con la papa', 'VERANO', 'Luna Menguante', 'directa', 'A');


 //AGREGAR PLANTAS A LA LISTA 
router.post('/plantas',async(req,res)=>{
   //   jwt.verify(req.token, 'huerta1Key',(err,valido)=>{
   //      if(err){
   //         res.sendStatus(403);
   //      }else{
            const {nombre,comentario,epoca,luna,forma} = req.body
            let query =`INSERT INTO huerta.plantas ( nombre, comentario, epoca, luna, forma, estado) VALUES ('${nombre}','${comentario}','${epoca}','${luna}','${forma}','A');`;
//INSERT INTO `huerta`.`plantas` (`nombre`, `comentario`, `epoca`, `luna`, `forma`, `estado`) VALUES ('Papas', 'con la papa', 'VERANO', 'Luna Menguante', 'directa', 'A');
            mysqlConeccion.query(query, (err,rows)=>{
               if(!err){
                  res.json({
                     status: true,
                     mensaje:"Se agrego correctamente la planta"
                    });
               }else{
                  res.json({
                     status: false,
                     mensaje:"No hubo exito"
                    });
               };
            });
          });
   //   });
   // });

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
 };




 module.exports=router;