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
             let query5=`SELECT * FROM huerta.personas WHERE email='${email}'`;
             mysqlConeccion.query(query5,(err,rows)=>{
                if(rows.length==0){
                  let query=`INSERT INTO huerta.usuarios (username, password) VALUES ('${username}','${hash}');`
                  mysqlConeccion.query(query,(err,rows)=>{
                    //console.log(rows);
                     if(!err){
                        // res.json({
                        //   status: true,
                        //    mensaje:"se insertó correctamente el usuario: '+username"
                        // });
                      //res.send('se insertó correctamente el usuario: '+username);
                     }else{
                        res.json({
                           status: false,
                           mensaje:"Ocurrio un error en el servidor"
                        });
                     };
                  });
                  let query1=`INSERT INTO huerta.personas(nombre, apellido, fecha_nacimiento, email, contacto) VALUES ('${nombre}','${apellido}','${fecha_nacimiento}','${email}','${contacto}')`;
                  mysqlConeccion.query(query1,(err,rows)=>{
                     //console.log(rows);
                     if(!err){
                        // res.json({
                        //    status: true,
                        //    mensaje:"se insertó correctamente el usuario"
                        // });
                        //res.send('Se insertó correctamente el usuario: '+username+' persona: '+nombre);
                     }else{
                        res.json({
                           status: false,
                           mensaje:"Ocurrio un error en el servidor"
                        });
                     }});
                     console.log(username);
                     console.log(email);
                     let query2=`SELECT u.id_usuario FROM huerta.usuarios as u where username='${username}';`;
                     mysqlConeccion.query(query2,(err,rows)=>{
                        //console.log(rowss);
                        const {id_usuario}=rows[0];
                        console.log(rows);
                        console.log(id_usuario);
                        if(!err){
                           let query3=`SELECT p.id_persona FROM huerta.personas as p where email='${email}';`;
                           mysqlConeccion.query(query3,(err,rows)=>{
                           //console.log(rowss);
                              const {id_persona}=rows[0];
                              console.log(rows);
                              console.log(id_persona);
                              if(!err){
                                 let query4=`INSERT INTO huerta.usuario_persona (id_usuario, id_persona) VALUES ('${id_usuario}','${id_persona}');`;
                                 //INSERT INTO `huerta`.`usuario_persona` (`id_usuario`, `id_persona`) VALUES ('35', '37');

                                 mysqlConeccion.query(query4,(err,rows)=>{
                                 //console.log(rows);
                                    if(!err){
                                       res.json({
                                          status: true,
                                          mensaje:"El registro se realizo correctamente"
                                       });
                                    }else{
                                       //console.log(err);
                                       res.json({
                                          status: false,
                                          mensaje:"Ocurrio un error en el servidor"
                                       });
                                       
                                    }
                                 });
                              }else{
                                 //console.log(err);
                                 res.json({
                                    status: false,
                                    mensaje:"Ocurrio un error en el servidor"
                                 });
                              };
                           });
                        }else{
                           //console.log(err);
                           res.json({
                              status: false,
                              mensaje:"Ocurrio un error en el servidor"
                           });
                        }
                     }); 
                }else{
                   res.json({
                      status: false,
                      mensaje:"El email ingresado ya se encuentra registrado"
                   });  
                };
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
      mysqlConeccion.query('select u.id_usuario, u.username, u.password from huerta.usuarios as u where u.username=?;',[username],(err,rows)=>{

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
         res.json({
            status: false,
            mensaje: "Contraseña reestablecida CORRECTAMENTE"
         });
      }else{
         res.json({
            status: false,
            mensaje: "Ocurrio un ERROR en el servidor"
         });
      }
   });
});

/////////////////////////////
/////////USUARIOS///////////
////////////////////////////

//LISTAR USUARIOS
router.get('/usuarios', (req,res)=>{
 //  jwt.verify(req.token,'huerta1Key',(err,valido)=>{
 //     if(err){
 //        res.sendStatus(403);
  //    }else{
         let query= `SELECT T.id_usuario,T.username, p.nombre,p.apellido,p.contacto ,p.email ,T.estado FROM (
            SELECT u.id_usuario,u.username, up.estado ,up.id_persona FROM huerta.usuarios as u 
            inner join huerta.usuario_persona as up  where u.id_usuario=up.id_usuario) AS T  
            JOIN huerta.personas as p on T.id_persona=p.id_persona;`;
         mysqlConeccion.query(query,(err,registros)=>{
         if(!err){
            res.json(registros);
         }else{
            res.json({
               status: false,
               mensaje: "Ocurrio un ERROR en el servidor"
            });
         }
      })
      });
//      };
//   });
//});




//Buscar usuario
router.post('/buscar_usuarios', (req,res)=>{
   let {username,nombre,apellido}=req.body
   console.log(req.body)
      let query= `SELECT T.id_usuario,T.username, p.nombre,p.apellido,p.contacto, p.email, T.estado FROM (
            SELECT u.id_usuario,u.username ,up.id_persona,up.estado FROM huerta.usuarios as u 
            inner join huerta.usuario_persona as up  where u.id_usuario=up.id_usuario and up.estado='A') AS T  
            JOIN huerta.personas as p on T.id_persona=p.id_persona WHERE 1`;
         if(apellido){
            query=query +` AND apellido like '%${apellido}%'`;
         }

         if(nombre){
            query=query +` AND nombre like '%${nombre}%'`;
         }

         if(username){
            query=query +` AND username like '%${username}%'`;
         }
         //console.log(query);
             mysqlConeccion.query(query,(err,registros)=>{
             if(!err){
                //console.log(registros)
                res.json(registros);
             }else{
               console.log(err)
                res.json({
                   status: false,
                   mensaje: "Ocurrio un ERROR en el servidor"
                });
             }
          })
        });

//VER USUARIO
router.get('/usuarios/:id_usuario', (req,res)=>{
   //  jwt.verify(req.token,'huerta1Key',(err,valido)=>{
   //     if(err){
   //        res.sendStatus(403);
    //    }else{
            let id_usuario= req.params.id_usuario;
            let query= `SELECT T.id_usuario,T.username,p.nombre,p.apellido,p.contacto,p.email, DATE_FORMAT(p.fecha_nacimiento, "%Y-%m-%d") fecha_nacimiento FROM (
               SELECT u.id_usuario,u.username, up.estado ,up.id_persona FROM huerta.usuarios as u 
               inner join huerta.usuario_persona as up  where u.id_usuario=up.id_usuario and up.estado='A') AS T  
               JOIN huerta.personas as p on T.id_persona=p.id_persona WHERE T.id_usuario='${id_usuario}';`;
               //console.log(query)
            mysqlConeccion.query(query,(err,registros)=>{
            if(!err){
//console.log(registro)
              res.json(registros);
            }else{
               console.log(err)
              res.json({
                 status: false,
                 mensaje: "Ocurrio un ERROR en el servidor"
              });
            }
        })
        });
  //      };
  //   });
  //});


  

//BAJA USUARIO
router.put('/bajaUsuario/:id_usuario',(req,res)=>{
   let id_usuario= req.params.id_usuario;
   let query= `UPDATE huerta.usuario_persona SET estado='B' WHERE id_usuario='${id_usuario}'`;
   //UPDATE `huerta`.`usuario_persona` SET `estado` = 'A' WHERE (`id_up` = '2');
   mysqlConeccion.query(query,(err,registros)=>{
      if(!err){
         let query= `UPDATE huerta.usuario_huerta SET estado='B' WHERE id_usuario='${id_usuario}'`;
         mysqlConeccion.query(query,(err,registros)=>{
            if(!err){
               res.json({
                  status: true,
                  mensaje: 'La baja fue realizada correctamente'
              });
            }else{
               res.json({
                  status: false,
                  mensaje: "Ocurrio un ERROR en el servidor"
               });
            }   
         })
      }else{
         res.json({
            status: false,
            mensaje: "Ocurrio un ERROR en el servidor"
         });
      }
   });
}
);

//ALTA USUARIO
router.put('/altaUsuario/:id_usuario',(req,res)=>{
   let id_usuario= req.params.id_usuario;
   let query= `UPDATE huerta.usuario_persona SET estado='A' WHERE id_usuario='${id_usuario}'`;
   //UPDATE `huerta`.`usuario_persona` SET `estado` = 'A' WHERE (`id_up` = '2');
   mysqlConeccion.query(query,(err,registros)=>{
      if(!err){
         let query= `UPDATE huerta.usuario_huerta SET estado='A' WHERE id_usuario='${id_usuario}'`;
         mysqlConeccion.query(query,(err,registros)=>{
            if(!err){
               res.json({
                  status: true,
                  mensaje: 'La ALTA fue realizada correctamente'
              });
            }else{
               res.json({
                  status: false,
                  mensaje: "Ocurrio un ERROR en el servidor"
               });
            }   
         })
      }else{
         res.json({
            status: false,
            mensaje: "Ocurrio un ERROR en el servidor"
         });
      }
   });
}
);

// Editar USUARIO, personas y generacion de la relacion en la tabla usuario_persona//CONFIRMAR QUE EL EMAIL NO SE REPITA FALTA
router.put('/usuarios/:id_usuario',(req,res)=>{
   let id_usuario= req.params.id_usuario;
   const {username,nombre,apellido,fecha_nacimiento,email,contacto}=req.body
   console.log(req.body)
   //pregunta si el usuario ya existe
   let query5=`SELECT * FROM huerta.usuarios WHERE username='${username}' AND id_usuario!='${id_usuario}';`;
    mysqlConeccion.query(query5,(err,rows)=>{
       if(!err){
         console.log(rows.length)
          if(rows==0){
            let query6=`SELECT id_persona FROM huerta.usuario_persona Where id_usuario='${id_usuario}'`;
            mysqlConeccion.query(query6,(err,rows)=>{
               const {id_persona}=rows[0];
               console.log(id_persona);
                if(!err){
                  let query5=`SELECT * FROM huerta.personas WHERE email='${email}' AND id_persona!='${id_persona}'`;
                  mysqlConeccion.query(query5,(err,rows)=>{
                    console.log(rows.length)
                          if(rows==0){
                        let query=`UPDATE huerta.usuarios  SET username='${username}' WHERE (id_usuario='${id_usuario}');`
                        //UPDATE `huerta`.`usuarios` SET `username` = 's' WHERE (`id_usuario` = '2');
                        mysqlConeccion.query(query,(err,rows)=>{
                          //console.log(rows);
                           if(!err){
                              console.log('se modifico usuario')
                              let query1=`UPDATE huerta.personas SET nombre='${nombre}', apellido='${apellido}', email='${email}', contacto='${contacto}' WHERE (id_persona= '${id_persona}');`;
                              //UPDATE `huerta`.`personas` SET `nombre` = 'Macridfgna', `apellido` = 'Avandfgcini', `email` = 'madfscrina@gmail.com', `contacto` = 'no' WHERE (`id_persona` = '1');
                              mysqlConeccion.query(query1,(err,rows)=>{
                                 //console.log(rows);
                                 if(!err){
console.log('se modifico personas')
                                    res.json({
                                       status: true,
                                       mensaje:"Se modifico correctamente el usuario"
                                    });
                                    //res.send('Se insertó correctamente el usuario: '+username+' persona: '+nombre);
                                 }else{
                                    console.log('error1')
                                    res.json({
                                       status: false,
                                       mensaje:"Ocurrio un error en el servidor"
                                    });
                                 }});
                           }else{
                              console.log(err)
                              res.json({
                                 status: false,
                                 mensaje:"Ocurrio un error en el servidor"
                              });
                           };
                        });
      


                     }else{

                     }
                  })
                }else{
                   res.json({
                      status: false,
                      mensaje:"El email ingresado ya se encuentra registrado"
                   });  
                };
             });            
          }else{
             res.json({
                status: false,
                mensaje:"El USERNAME Ingresado ya Existe Ingrese Otro"
             });
          }
         }else{
            //console.log(err);
             res.json({
                status: false,
                mensaje:"Ocurrio un error en el servidor"
            });
           
         }
    })

});



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
            res.json(registros);
         }else{
            res.json({
               status: false,
               mensaje: "Ocurrio un ERROR en el servidor"
            });
         }
       })
   });
   //})
 //});
///Muestra los usuarios de una huerta en particular con el id de la huerta
router.get('/huertas_usuarios/:id_huerta',(req,res)=>{
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
               res.json(registros);
            }else{
               res.json({
                  status: false,
                  mensaje: "Ocurrio un ERROR en el servidor"
               });
            }
         });
 //     }
 //   })
 });

 //huerta en particular
 router.get('/huertas/:id_huerta',(req,res)=>{
   // jwt.verify(req.token,'huerta1Key',(err,valido)=>{
   //    if(err){
   //       res.sendStatus(403);
   //    }else{
         let id_huerta= req.params.id_huerta;
         let query= `SELECT * FROM huerta.huerta WHERE (id_huerta='${id_huerta}');`;
         //SELECT * FROM huerta.huerta;
         mysqlConeccion.query(query,(err,registros)=>{
            if(!err){
               res.json(registros);
            }else{
               res.json({
                  status: false,
                  mensaje: "Ocurrio un ERROR en el servidor"
               });
            }
         });
 //     }
 //   })
 });


 //editar hueta
 router.put('/huertas/:id_huerta',(req,res)=>{
   let id_huerta= req.params.id_huerta;
   const {nombre,localidad}=req.body
   let query= `UPDATE huerta.huerta SET nombre='${nombre}', localidad='${localidad}' WHERE id_huerta='${id_huerta}'`;
   //UPDATE `huerta`.`huerta` SET `nombre` = 'Casasx', `localidad` = 'Obeascrá' WHERE (`id_huerta` = '5');
   mysqlConeccion.query(query,(err,registros)=>{
      if(!err){
         res.json({
            status: true,
            mensaje: 'La MODIFICACIÓN se realizó correctamente'
        });
      }else{
         res.json({
            status: false,
            mensaje: "Ocurrio un ERROR en el servidor"
         });
      }
   });
}
);

 //DAR BAJA HUERTA
router.put('/bajaHuerta/:id_huerta',(req,res)=>{
   let id_huerta= req.params.id_huerta;
   let query= `UPDATE huerta.huerta SET estado='B' WHERE id_huerta='${id_huerta}'`;
   mysqlConeccion.query(query,(err,registros)=>{
      if(!err){
         res.json({
            status: true,
            mensaje: 'La BAJA fue realizada correctamente'
        });
      }else{
         res.json({
            status: false,
            mensaje: "Ocurrio un ERROR en el servidor"
         });
      }
   });
}
);
 //DAR ALTA HUERTA
 router.put('/altaHuerta/:id_huerta',(req,res)=>{
   let id_huerta= req.params.id_huerta;
   let query= `UPDATE huerta.huerta SET estado='A' WHERE id_huerta='${id_huerta}'`;
   mysqlConeccion.query(query,(err,registros)=>{
      if(!err){
         res.json({
            status: true,
            mensaje: 'El ALTA fue realizada correctamente'
        });
      }else{
         res.json({
            status: false,
            mensaje: "Ocurrio un ERROR en el servidor"
         });
      }
   });
}
);


//Editar huerta desde la lista de huertas
router.put('/editarmihuerta/:id_huerta',(req,res)=>{
   //   jwt.verify(req.token, 'huerta1Key',(err,valido)=>{
   //      if(err){
   //         res.sendStatus(403);
   //      }else{
      let id_huerta= req.params.id_huerta;
      const {id_usuario,nombre,localidad}=req.body
      let query=`SELECT * FROM huerta.usuario_huerta WHERE id_usuario='${id_usuario}' AND id_huerta='${id_huerta}' AND estado='A';`;
      mysqlConeccion.query(query,(err,registros)=>{
         if(!err){
            if(registros!=0){
               ///ACA PONEMOS LA VARIABLE EN ALTA
               if(nombre!=undefined && nombre!="" && localidad!=undefined && localidad!=""){
                  let query1= `UPDATE huerta.huerta SET nombre='${nombre}',localidad='${localidad}' WHERE id_huerta='${id_huerta}'`;
                  mysqlConeccion.query(query1,(err,registros)=>{
                     if(!err){
                        res.json({
                           status: true,
                           mensaje: "Se modifico correctamente"
                        });
                     }else{
                        res.json({
                           status: false,
                           mensaje: "OCURRIO UN ERROR EN EL SERVIDOR"
                        });
                     }
                  });
                  }else{
                     res.json({
                        status: false,
                        mensaje: "Faltan campos o debe completarlos correctamente"
                     });
                  }             
            }else{
               res.json({
                  status: false,
                  mensaje: "NO ERES COLABORADOR EN ESTA HUERTA"
               });
            }
         }else{
            res.json({
               status: false,
               mensaje: "OCURRIO UN ERROR EN EL SERVIDOR"
            });
         }
      });     
   });
   //   });
   // });



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
         let query= `SELECT T.id_huerta, hh.nombre,hh.localidad,T.Tipos_de_Plantas, T.estado FROM (
         SELECT uh.id_usuario, uh.id_huerta,count(hp.id_huerta) Tipos_de_Plantas, uh.estado FROM huerta.usuario_huerta AS uh 
         LEFT JOIN huerta.huerta_planta AS hp ON uh.id_huerta=hp.id_huerta WHERE (uh.id_usuario='${id_usuario}') GROUP BY id_huerta) AS T 
         INNER JOIN huerta.huerta AS hh WHERE hh.id_huerta=T.id_huerta;`;
         // SELECT T.id_huerta, hh.nombre,hh.localidad,T.Tipos_de_Plantas FROM (
         //    SELECT uh.id_usuario, uh.id_huerta,count(hp.id_huerta) Tipos_de_Plantas FROM huerta.usuario_huerta AS uh 
         //    LEFT JOIN huerta.huerta_planta AS hp ON uh.id_huerta=hp.id_huerta WHERE (uh.id_usuario='1' AND uh.estado='A') GROUP BY id_huerta) AS T 
         //    INNER JOIN huerta.huerta AS hh WHERE hh.id_huerta=T.id_huerta;
         mysqlConeccion.query(query,(err,registros)=>{
            if(!err){
               res.json(registros);
            }else{
               res.json({
                  status: false,
                  mensaje: "Ocurrio un ERROR en el servidor"
               });
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
            let query1 =`SELECT id_huerta FROM huerta.huerta WHERE nombre='${nombre}'; `;
            mysqlConeccion.query(query1, (err,rows)=>{
            const {id_huerta}=rows[0];
               if(!err){
                  let query2 =`INSERT INTO huerta.usuario_huerta ( id_usuario, id_huerta) VALUES ('${id_usuario}','${id_huerta}');`;
                  mysqlConeccion.query(query2, (err,rows)=>{
                     if(!err){                    
                        res.json({
                           status: true,
                           mensaje: "Se AGREGO la huerta correctmente"
                        });                    
                     }else{
                        res.json({
                           status: false,
                           mensaje: "Ocurrio un ERROR en el servidor"
                        });
                     };
                  });
               }else{
                  res.json({
                     status: false,
                     mensaje: "Ocurrio un ERROR en el servidor"
                  });
               };
            });
            }else{
               res.json({
                  status: false,
                  mensaje: "Ocurrio un ERROR en el servidor"
               });
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
                  res.json({
                     status: true,
                     mensaje: "El usuario fue dado de alta correctamente"
                  });
               }else{
                  res.json({
                     status: true,
                     mensaje: "El usuario fue dado de BAJA correctamente"
                  });
               };
            }else{
               res.json({
                  status: false,
                  mensaje: "Ocurrio un ERROR en el servidor"
               });
            }
         });
      }else{
         if(nombre!=undefined && nombre!="" && localidad!=undefined && localidad!=""){
            let query1= `UPDATE huerta.huerta SET nombre='${nombre}',localidad='${localidad}' WHERE id_huerta='${id_huerta}'`;
            mysqlConeccion.query(query1,(err,registros)=>{
               if(!err){
                  res.json({
                     status: true,
                     mensaje: "La modificación de la huerta se realizó correctamente"
                  });
               }else{
                  res.json({
                     status: false,
                     mensaje: "Ocurrio un ERROR en el servidor"
                  });
               }
            });
         }else{
            res.json({
               status: false,
               mensaje: "Faltan completar correctamente"
            });
         }
      };
   });
   //   });
   // });

//MOSTRAR HUERTA CON ID HUERTA (Lista las plantas de una huerta en particular)-- boton para((VER))
router.get('/mihuerta/:id_usuario/:id_huerta',(req,res)=>{
   // jwt.verify(req.token,'huerta1Key',(err,valido)=>{
   //    if(err){
   //       res.sendStatus(403);
   //    }else{
         
         let id_usuario= req.params.id_usuario;
         let id_huerta= req.params.id_huerta;
         let query=`SELECT * FROM huerta.usuario_huerta WHERE id_usuario='${id_usuario}' AND id_huerta='${id_huerta}' AND estado='A';`;
         mysqlConeccion.query(query,(err,registros)=>{
            if(!err){
               //console.log(registros.length)
               if(registros.length!=undefined){
                  let query1= `SELECT p.id_planta,p.nombre,TT.fecha,TT.estado,TT.id_hp FROM(SELECT T.id_hp,T.id_planta,T.cantidad,T.fecha,T.estado FROM 
                     (SELECT hp.id_hp,hp.id_huerta,hp.id_planta,hp.cantidad,hp.fecha,hp.estado 
                     FROM huerta.huerta_planta AS hp where hp.id_huerta='${id_huerta}' ) AS T 
                     LEFT JOIN huerta.comentario_hp AS chp ON T.id_hp=chp.id_hp group by T.id_hp) 
                     TT INNER JOIN huerta.plantas AS p WHERE TT.id_planta=p.id_planta;;`;    
                     //SELECT p.id_planta,p.nombre,TT.Fecha_Plantado,TT.cantidad,TT.Comentarios  FROM(SELECT T.id_planta, chp.id_c_hp,chp.id_hp,T.fecha Fecha_Plantado,T.cantidad,count(chp.id_hp) Comentarios FROM (SELECT hp.id_planta,hp.id_hp,hp.fecha,hp.cantidad FROM huerta.huerta_planta AS hp WHERE hp.id_huerta='1' AND hp.estado='A') T LEFT JOIN huerta.comentario_hp AS chp ON T.id_hp=chp.id_hp WHERE estado='A' GROUP BY id_hp) TT INNER JOIN huerta.plantas AS p WHERE TT.id_planta=p.id_planta AND p.estado='A' ;  
                  mysqlConeccion.query(query1,(err,registros)=>{
                     if(!err){
                        res.json(registros);
                     }else{
                        res.json({
                           status: false,
                           mensaje: "Ocurrio un ERROR en el servidor"
                        });
                     }
                  });      
               }else{
                  res.json({
                     status: false,
                     mensaje: "No eres colaborador de esta huerta"
                  });
               }
            }else{
               res.json({
                  status: false,
                  mensaje: "Faltan completar correctamente"
               });
            }
         });
 //     }
 //   })
 });

//LISTA DE PLANTAS PARA AGREGAR ---boton ((AGREGAR)) OOO ((PLANTAS DISPONIBLES))
router.get('/mihuerta/:id_usuario/:id_huerta/listaPlantas',(req,res)=>{
   //jwt.verify(req.token,'huerta1Key',(err,valido)=>{
    //  if(err){
      //   res.sendStatus(403);
    //  }else{
         let query= `SELECT * FROM huerta.plantas AS p WHERE p.estado='A';`;
         mysqlConeccion.query(query,(err,registros)=>{
            if(!err){
            //console.log(registros.length)
               res.json(registros);
            }else{
               res.json({
                  status: false,
                  mensaje: "Ocurrio un ERROR en el servidor"
               })
            }
         })
      });
  // })
 //});

//AGREGAR PLANTA DE LA LISTA DE LA HUERTA---boton ((AGREGAR))
router.post('/mihuerta/:id_usuario/:id_huerta/listaPlantas/:id_planta',async(req,res)=>{
   //   jwt.verify(req.token, 'huerta1Key',(err,valido)=>{
   //      if(err){
   //         res.sendStatus(403);
   //      }else{
            const {cantidad,fecha}=req.body
            let id_usuario= req.params.id_usuario;
            let id_huerta= req.params.id_huerta;
            let id_planta= req.params.id_planta;
            
            let query=`SELECT * FROM huerta.usuario_huerta WHERE id_usuario='${id_usuario}' AND id_huerta='${id_huerta}' AND estado='A';`;
            mysqlConeccion.query(query,(err,registros)=>{
               if(!err){
                  //console.log(registros.length)
                  if(registros.length!=undefined){
                     if(fecha.length!=0 && fecha!="" && cantidad!=""){
                        let query1= `INSERT INTO huerta.huerta_planta ( id_huerta, id_planta, cantidad, fecha) VALUES ('${id_huerta}','${id_planta}','${cantidad}','${fecha}');`;    
                        //SELECT p.id_planta,p.nombre,TT.Fecha_Plantado,TT.cantidad,TT.Comentarios  FROM(SELECT T.id_planta, chp.id_c_hp,chp.id_hp,T.fecha Fecha_Plantado,T.cantidad,count(chp.id_hp) Comentarios FROM (SELECT hp.id_planta,hp.id_hp,hp.fecha,hp.cantidad FROM huerta.huerta_planta AS hp WHERE hp.id_huerta='1' AND hp.estado='A') T LEFT JOIN huerta.comentario_hp AS chp ON T.id_hp=chp.id_hp WHERE estado='A' GROUP BY id_hp) TT INNER JOIN huerta.plantas AS p WHERE TT.id_planta=p.id_planta AND p.estado='A' ;  
                        mysqlConeccion.query(query1,(err,registros)=>{
                           if(!err){
                              res.json({
                                 status: true,
                                 mensaje: "Se agregó correctamente la planta a la huerta"
                              });
                           }else{
                              res.json({
                                 status: false,
                                 mensaje: "Ocurrio un ERROR en el servidor"
                              });
                           };
                        });
                     };
                     if(fecha==""){
                        let query2= `INSERT INTO huerta.huerta_planta ( id_huerta, id_planta, cantidad, fecha) VALUES ('${id_huerta}','${id_planta}','${cantidad}',NOW());`;    
                     //    //SELECT p.id_planta,p.nombre,TT.Fecha_Plantado,TT.cantidad,TT.Comentarios  FROM(SELECT T.id_planta, chp.id_c_hp,chp.id_hp,T.fecha Fecha_Plantado,T.cantidad,count(chp.id_hp) Comentarios FROM (SELECT hp.id_planta,hp.id_hp,hp.fecha,hp.cantidad FROM huerta.huerta_planta AS hp WHERE hp.id_huerta='1' AND hp.estado='A') T LEFT JOIN huerta.comentario_hp AS chp ON T.id_hp=chp.id_hp WHERE estado='A' GROUP BY id_hp) TT INNER JOIN huerta.plantas AS p WHERE TT.id_planta=p.id_planta AND p.estado='A' ;  
                     //console.log("fehca")
                        mysqlConeccion.query(query2,(err,registros)=>{
                           if(!err){
                              res.json({
                                 status: true,
                                 mensaje: "Se agregó correctamente la planta a la huerta"
                              });
                           }else{
                              res.json({
                                 status: false,
                                 mensaje: "Ocurrio un ERROR en el servidor"
                              });
                           };
                        });
                     }
                  }else{
                     res.json({
                        status: false,
                        mensaje: "No eres colaborador en esta huerta"
                     });
                  };
               }else{
                  res.json({
                     status: false,
                     mensaje: "Ocurrio un ERROR en el servidor"
                  });
               }
            }); 
          });
   //   });
   // });

//COMENTAR SOBRE LAS PLANTAS--- boton ((COMENTAR))
router.post('/mihuerta/:id_usuario/:id_huerta/:id_hp',async(req,res)=>{
//   jwt.verify(req.token, 'huerta1Key',(err,valido)=>{
//      if(err){
//         res.sendStatus(403);
//      }else{
         const {comentario,fecha} = req.body
         let id_usuario= req.params.id_usuario;
         let id_huerta= req.params.id_huerta;
         let id_hp= req.params.id_hp;
         let query=`SELECT * FROM huerta.usuario_huerta WHERE id_usuario='${id_usuario}' AND id_huerta='${id_huerta}' AND estado='A';`;
         mysqlConeccion.query(query,(err,registros)=>{
            if(!err){
               //console.log(registros.length)
               if(registros.length!=undefined){
                  if(comentario!=undefined && fecha!=undefined){
                     if(comentario!="" && fecha!="" ){
                        let query1= `INSERT INTO huerta.comentario_hp ( id_hp, comentario, fecha) VALUES ('${id_hp}','${comentario}','${fecha}');`;    
                        //INSERT INTO `huerta`.`comentario_hp` (`id_hp`, `comentario`, `fecha`) VALUES ('10', 'lindo día', '2023-03-03 13:00:00');
                        mysqlConeccion.query(query1,(err,registros)=>{
                           if(!err){
                              res.json({
                                 status: true,
                                 mensaje: "Se agregó correctamente el comentario"
                              });
                           }else{
                              res.json({
                                 status: false,
                                 mensaje: "Ocurrio un ERROR en el servidor"
                              });
                           };
                        });
                     }                 
                     if(comentario!="" && fecha=="" ){
                        let query2= `INSERT INTO huerta.comentario_hp ( id_hp, comentario, fecha) VALUES ('${id_hp}','${comentario}',NOW());`;    
                        mysqlConeccion.query(query2,(err,registros)=>{
                           if(!err){
                              res.json({
                                 status: true,
                                 mensaje: "Se agregó correctamente el comentario"
                              });                           }else{
                              res.json({
                                 status: false,
                                 mensaje: "Ocurrio un ERROR en el servidor"
                              });
                           };
                        });
                     }else{
                        res.json({
                           status: false,
                           mensaje: "Debe completar el campo comentario"
                        });
                     };
                  }else{
                     res.json({
                        status: false,
                        mensaje: "Los datos se completaron incorrectamente"
                     });
                  };
               }else{
                  res.json({
                     status: false,
                     mensaje: "No eres colaborador en esta huerta"
                  });
               };
            }else{
               res.json({
                  status: false,
                  mensaje: "Ocurrio un ERROR en el servidor"
               });
            }
         }); 
       });
//   });
// });

//BAJA DE LAS PLANTAS DE UNA HUERTA----boton ((BAJA)) o ((ELIMINAR))
router.put('/mihuerta/:id_usuario/:id_huerta/:id_hp',async(req,res)=>{
   //   jwt.verify(req.token, 'huerta1Key',(err,valido)=>{
   //      if(err){
   //         res.sendStatus(403);
   //      }else{
         let id_usuario= req.params.id_usuario;
         let id_huerta= req.params.id_huerta;
         let id_hp= req.params.id_hp;
         const {estado}=req.body
         let query=`SELECT * FROM huerta.usuario_huerta WHERE id_usuario='${id_usuario}' AND id_huerta='${id_huerta}' AND estado='A';`;
         mysqlConeccion.query(query,(err,registros)=>{
            if(!err){
               if(registros!=undefined){
               if(estado!=undefined && estado!=""){
                  let query= `UPDATE huerta.huerta_planta SET estado='${estado}' WHERE ( id_hp='${id_hp}')`;
                  //UPDATE `huerta`.`huerta_planta` SET `estado` = 'B' WHERE (`id_hp` = '10');
                  mysqlConeccion.query(query, (err, registros)=>{
                  if(!err){
                     if(estado!="B"){
                        res.json({
                           status: true,
                           mensaje: "La planta fue dada de ALTA"
                        });

                     }else{
                        res.json({
                           status: true,
                           mensaje: "La planta fue dada de BAJA"
                        });
                     };
                  }else{
                     res.json({
                        status: false,
                        mensaje: "Ocurrio un error en el servidor"
                     });
                  }
                  });
               }else{
                  res.json({
                     status: false,
                     mensaje: "Faltan campos o debe completarlos correctamente"
                  });
               };
            }else{
               res.json({
                  status: false,
                  mensaje: "No eres colaborador en esta huerta"
               });
            }  
            }else{
               res.json({
                  status: false,
                  mensaje: "Ocurrio un error en el servidor"
               });               
            } 
         });
      });
   //   });
   // });


///////////////USUARIOS DE UNA HUERTA////////////////

//Lista de usuarios de una huerta -- boton ((USUARIOS))   
router.get('/mihuerta/:id_usuario/:id_huerta/listaUsuariosHuerta',(req,res)=>{
   //jwt.verify(req.token,'huerta1Key',(err,valido)=>{
    //  if(err){
      //   res.sendStatus(403);
    //  }else{
         let id_usuario= req.params.id_usuario;
         let id_huerta= req.params.id_huerta;
         let query=`SELECT * FROM huerta.usuario_huerta WHERE id_usuario='${id_usuario}' AND id_huerta='${id_huerta}';`;
         mysqlConeccion.query(query,(err,registros)=>{
            if(!err){
               console.log(registros)
               if(registros.length!=undefined){
               //SELECT uh.id_uh,u.username  FROM huerta.usuario_huerta AS uh INNER JOIN huerta.usuarios AS u WHERE uh.id_usuario=u.id_usuario AND uh.estado='A' AND id_huerta='1'
               let query= `SELECT uh.id_uh,u.username  FROM huerta.usuario_huerta AS uh INNER JOIN huerta.usuarios AS u WHERE uh.id_usuario=u.id_usuario AND uh.estado='A' AND id_huerta='${id_huerta}'`;
               mysqlConeccion.query(query,(err,registros)=>{
               if(!err){
                  res.json(registros);
               }else{
                  res.json({
                     status: false,
                     mensaje: "Ocurrio un error en el servidor"
                  });
               }
               })
               }else{
                  res.json({
                     status: false,
                     mensaje: "No eres colaborador en esta huerta"
                  });
               }
            };
         });
      });         
  // })
 //});

 //AGREGAR USUARIO-- boton((AGREGAR COLABORADOR)) //////NO ME TOMA EL BODY
 router.post('/mihuerta/:id_usuario/:id_huerta/listaUsuariosHuerta/agregar',(req,res)=>{
   let id_usuario= req.params.id_usuario;
   let id_huerta= req.params.id_huerta;
   const {username}=req.body
   //console.log(username);
   //console.log(id_usuario);
   //console.log(id_huerta);
 
//  router.post('/mihuerta/:id_usuario/:id_huerta/listaUsuariosHuerta',(req,res)=>{
//    //   jwt.verify(req.token, 'huerta1Key',(err,valido)=>{
//    //      if(err){
//    //         res.sendStatus(403);
//    //      }else{
//             let id_usuario= req.params.id_usuario;
//             let id_huerta= req.params.id_huerta;
//             const {username}=req.body
//             console.log(username);
//             console.log(id_usuario);
//             console.log(id_huerta);
            let query=`SELECT * FROM huerta.usuario_huerta WHERE id_usuario='${id_usuario}' AND id_huerta='${id_huerta}' AND estado='A';`;
            mysqlConeccion.query(query,(err,registros)=>{
                 if(!err){
                    if(registros.length!=undefined){
                          if(username!=undefined && username!=""){
                          let query1=`SELECT id_usuario FROM huerta.usuarios WHERE username='${username}'`;
                          //SELECT id_usuario FROM huerta.usuarios WHERE username='macrina'
                          mysqlConeccion.query(query1,(err,registros)=>{
                             if(registros!=undefined){
                                const {id_usuario}=registros[0];
                                //console.log(id_usuario)
                                 let query2=`INSERT INTO huerta.usuario_huerta (id_usuario, id_huerta) VALUES ('${id_usuario}', '${id_huerta}')`;
                                 //INSERT INTO `huerta`.`usuario_huerta` (`id_usuario`, `id_huerta`) VALUES ('2', '5');
                                 mysqlConeccion.query(query2,(err,registros)=>{
                                    if(!err){
                                       res.json({
                                          status: true,
                                          mensaje: "El colaborador fue agregado correctamente"
                                       });
                                    }else{
                                       res.json({
                                          status: false,
                                          mensaje: "Ocurrio un error en el servidor"
                                       });
                                    };
                                 });
                             }else{
                              res.json({
                                 status: false,
                                 mensaje: "El usuario no existe"
                              });
                             }
                          })
                       }else{
                        res.json({
                           status: false,
                           mensaje: "Los datos se competaron incorrectamente"
                        });
                       };
                    }else{
                     res.json({
                        status: false,
                        mensaje: "No eres colaborador en esta huerta"
                     });
                    };
                 }else{
                  res.json({
                     status: false,
                     mensaje: "Ocurrio un error en el servidor"
                  });
                 }
              }); 
           });
    //   });
    // });

////////////COMENTARIOS DE UNA PLANTA/////////////

router.get('/mihuerta_comentarios/:id_usuario/:id_huerta/:id_hp',(req,res)=>{
   //jwt.verify(req.token,'huerta1Key',(err,valido)=>{
    //  if(err){
      //   res.sendStatus(403);
    //  }else{
         let id_usuario= req.params.id_usuario;
         let id_huerta= req.params.id_huerta;
         let id_planta= req.params.id_planta;
         let query=`SELECT * FROM huerta.usuario_huerta WHERE id_usuario='${id_usuario}' AND id_huerta='${id_huerta}';`;
         mysqlConeccion.query(query,(err,registros)=>{
            if(!err){
               console.log(registros)
               if(registros.length!=undefined){
               //SELECT uh.id_uh,u.username  FROM huerta.usuario_huerta AS uh INNER JOIN huerta.usuarios AS u WHERE uh.id_usuario=u.id_usuario AND uh.estado='A' AND id_huerta='1'
               let query= `SELECT * FROM huerta.comentario_hp WHERE id_hp='10' ORDER BY fecha desc;`;
               mysqlConeccion.query(query,(err,registros)=>{
               if(!err){
                  res.json(registros);
               }else{
                  res.json({
                     status: false,
                     mensaje: "Ocurrio un error en el servidor"
                  });
               }
               })
               }else{
                  res.json({
                     status: false,
                     mensaje: "No eres colaborador en esta huerta"
                  });
               }
            };
         });
      });         
  // })
 //});












///////////////////////////
/////////PLANTAS//////////
/////////////////////////
//Lista de Plantas con cantidad de comentarios
router.get('/plantas',(req,res)=>{
   //jwt.verify(req.token,'huerta1Key',(err,valido)=>{
    //  if(err){
      //   res.sendStatus(403);
    //  }else{
         let query= `SELECT pl.id_planta, pl.nombre, pl.comentario, pl.epoca, pl.luna, pl.forma, count(cp.id_planta) Comentarios,pl.estado FROM huerta.plantas AS pl 
         LEFT JOIN comentario_planta AS cp ON pl.id_planta=cp.id_planta GROUP by id_planta;`;
      mysqlConeccion.query(query,(err,registros)=>{
          if(!err){
            res.json(registros);
          }else{
            res.json({
               status: false,
               mensaje: "Ocurrio un error en el servidor"
            });
          }
       })
      });
  // })
 //});
//ALTA


//BAJA de plantas
 router.put('/bajaPlanta/:id_planta',(req,res)=>{
   let id_planta= req.params.id_planta;
   let query= `UPDATE huerta.plantas SET estado='B' WHERE (id_planta='${id_planta}');`;
   //UPDATE `huerta`.`plantas` SET `estado` = 'B' WHERE (`id_planta` = '2');

   mysqlConeccion.query(query,(err,registros)=>{
      if(!err){
         res.json({
            status: true,
            mensaje: 'La BAJA fue realizada correctamente'
        });
      }else{
         res.json({
            status: false,
            mensaje: "Ocurrio un ERROR en el servidor"
         });
      }
   });
}
);  



//Alta de plantas
router.put('/altaPlanta/:id_planta',(req,res)=>{
   let id_planta= req.params.id_planta;
   let query= `UPDATE huerta.plantas SET estado='A' WHERE (id_planta='${id_planta}');`;
   //UPDATE `huerta`.`plantas` SET `estado` = 'B' WHERE (`id_planta` = '2');
   mysqlConeccion.query(query,(err,registros)=>{
      if(!err){
         res.json({
            status: true,
            mensaje: 'El ALTA fue realizada correctamente'
        });
      }else{
         console.log(err)
         res.json({
            status: false,
            mensaje: "Ocurrio un ERROR en el servidor"
         });
      }
   });
}
);


//AGREGAR PLANTAS A LA LISTA ----((AGREGAR PLANTAS))
router.post('/plantas',async(req,res)=>{
   //   jwt.verify(req.token, 'huerta1Key',(err,valido)=>{
   //      if(err){
   //         res.sendStatus(403);
   //      }else{
            const {id_usuario,nombre,comentario,epoca,luna,forma} = req.body
   
            let query =`INSERT INTO huerta.plantas ( nombre, comentario, epoca, luna, forma, estado) VALUES ('${nombre}','${comentario}','${epoca}','${luna}','${forma}','A');`;
            //INSERT INTO `huerta`.`plantas` (`nombre`, `comentario`, `epoca`, `luna`, `forma`, `estado`) VALUES ('Papas', 'con la papa', 'VERANO', 'Luna Menguante', 'directa', 'A');
            mysqlConeccion.query(query, (err,rows)=>{
               if(!err){
                  let query1 =`SELECT id_planta FROM huerta.plantas ORDER BY id_planta desc limit 1`;
                  mysqlConeccion.query(query1, (err,rows)=>{
                     if(!err){
                        const {id_planta}=rows[0]
                        let query1 =`INSERT INTO huerta.plantas_usuarios (id_planta, id_usuario) VALUES ('${id_planta}', '${id_usuario}');`;
                      //INSERT INTO `huerta`.`plantas_usuarios` (`id_planta`, `id_usuario`) VALUES ('1', '5');
                        mysqlConeccion.query(query1, (err,rows)=>{
                           if(!err){
                              res.json({
                                 status: true,
                                 mensaje:"Se agrego correctamente la planta"
                                });
                           }else{
                              res.json({
                                 status: false,
                                 mensaje:"Ocurrio un error en el servidor"
                              });  
                           }      
                        });
                     }else{
                        res.json({
                           status: false,
                           mensaje:"Ocurrio un error en el servidor"
                        });
                     }
                  })
               }else{
                  res.json({
                     status: false,
                     mensaje:"Ocurrio un error en el servidor"
                    });
               };
            });
          });
   //   });
   // });

//LISTA DE COMENTARIOS DE Plantas--((VER COMENTARIOS))
router.get('/comentarios',(req,res)=>{
   //jwt.verify(req.token,'huerta1Key',(err,valido)=>{
    //  if(err){
      //   res.sendStatus(403);
    //  }else{
         let query= `SELECT cp.id_pc, cp.comentario, pl.nombre nombre FROM huerta.comentario_planta as cp INNER JOIN plantas AS pl ON pl.id_planta=cp.id_planta where cp.estado='A' ;`;
      //SELECT * FROM huerta.comentario_planta WHERE id_planta='1';
         mysqlConeccion.query(query,(err,registros)=>{
          if(!err){
            res.json(registros);
          }else{
             console.log(err);
          }
       })
      });
  // })
 //});   

 //DAR BAJA comentario
router.put('/bajacomentario/:id_cp',(req,res)=>{
   let id_cp= req.params.id_cp;
   let query= `UPDATE comentario_planta SET estado='B' WHERE id_cp='${id_cp}'`;
   mysqlConeccion.query(query,(err,registros)=>{
      if(!err){
         res.json({
            status: true,
            mensaje: 'La baja fue realizada correctamente'
        });
      }else{
         res.json({
            status: false,
            mensaje: "Ocurrio un ERROR en el servidor"
         });
      }
   });
}
);   

//selecciona una planta en particulaar
router.get('/plantas/:id_planta',(req,res)=>{
   //jwt.verify(req.token,'huerta1Key',(err,valido)=>{
    //  if(err){
      //   res.sendStatus(403);
    //  }else{
         let id_planta= req.params.id_planta;
         let query= `SELECT * FROM huerta.plantas WHERE id_planta='${id_planta}';`;
      //SELECT * FROM huerta.comentario_planta WHERE id_planta='1';
         mysqlConeccion.query(query,(err,registros)=>{
          if(!err){
            res.json(registros);
          }else{
             console.log(err);
          }
       })
      });
  // })
 //});   

 //LISTA DE COMENTARIOS DE UNA PLANTA---((VER COMENTARIOS))
router.get('/comentarios/:id_planta',(req,res)=>{
   //jwt.verify(req.token,'huerta1Key',(err,valido)=>{
    //  if(err){
      //   res.sendStatus(403);
    //  }else{
         let id_planta= req.params.id_planta;
         let query= `SELECT * FROM huerta.comentario_planta WHERE id_planta='${id_planta}';`;
      //SELECT * FROM huerta.comentario_planta WHERE id_planta='1';
         mysqlConeccion.query(query,(err,registros)=>{
          if(!err){
            res.json(registros);
          }else{
             console.log(err);
          }
       })
      });
  // })
 //});   

//AGREGAR COMENTARIO A PLANTAS DE LA LISTA ---((COMENTAR))
router.post('/comentarios/:id_planta',async(req,res)=>{
   //   jwt.verify(req.token, 'huerta1Key',(err,valido)=>{
   //      if(err){
   //         res.sendStatus(403);
   //      }else{
            let id_planta= req.params.id_planta;
            const {id_usuario,comentario} = req.body
            let query =`INSERT INTO huerta.comentario_planta ( id_usuario, id_planta, comentario, fecha) VALUES ('${id_usuario}','${id_planta}','${comentario}',NOW());`;
            //INSERT INTO `huerta`.`comentario_planta` (`id_usuario`, `id_planta`, `comentario`, `fecha`) VALUES ('2', '2', 'wep', '');            
            mysqlConeccion.query(query, (err,rows)=>{
               if(!err){
                  res.json({
                     status: true,
                     mensaje:"El comentario se agrego exitosamente"
                  });                 
               }else{
                  res.json({
                     status: false,
                     mensaje:"Ocurrio un error en el servidor"
                  });
               };
            });
          });
   //   });
   // });


//EDITAR PLANTA POR ID///////
router.put('/plantas/:id_planta' , (req, res)=>{
   //asigna a id_curso el valor que recibe por el parametro 
   let id_planta  = req.params.id_planta;
   const { nombre, luna, forma, epoca,comentario } =req.body  
   console.log(req.body)
   let query=`UPDATE plantas SET forma='${forma}', nombre='${nombre}', luna='${luna}', epoca='${epoca}',comentario='${comentario}' where id_planta='${id_planta}'`;
   mysqlConeccion.query(query, (err, registros)=>{
       if(!err){
           res.json({
            status:true,
            mensaje:"Los cambios se realizaron correctamente"
           })
       }else{
           console.log(err);
           res.json({
            status:false,
            mensaje:"no se completaron campos"
         })
       }
   })});
 



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