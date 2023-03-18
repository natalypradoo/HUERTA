import React, { useEffect,useState } from "react";
//import {Link} from 'react-router-dom';
//import  {} from '../../styles.css/plantilla.css';
//import * as API from '../../servicios/servicios';
export function MisHuertas(){
    //para buscar usuaario
        const [nombre_usuario, setNombreUsuario] =useState('')
        const [id_usuario,setIdUsuario]=useState('')
       
       
    useEffect(()=>{
        const usuarioLogueado = JSON.parse(localStorage.getItem('usuario'))
        console.log(usuarioLogueado.datos[0].id_usuario)
            if(usuarioLogueado){
                setIdUsuario(usuarioLogueado.datos[0].id_usuario);
                setNombreUsuario(usuarioLogueado.datos[0].username);
              
            }
         //   trae_datos(id_huerta)
    },[]);
    // const trae_datos  = async ()=>{
    //     // event.preventDefault();
    //     const datos_huerta = await API.getMisHuertas(id_usuario);
    //    console.log(datos_huerta);
  
    //     setNombre(datos_huerta.nombre);
    //     setLocalidad(datos_huerta.localidad);
  //}







return(
    <>
    <div className='card'>

    
   
 Hola, {nombre_usuario}!!

</div>
    
</>

)    

}