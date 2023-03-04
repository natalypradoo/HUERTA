import React, { useRef, useState } from "react";
import {Link} from 'react-router-dom'
import * as API from '../../servicios/servicios'

export function EliminarHuerta(){
const darDeBajaHuerta = async(id_huerta)=>{
  const huerta = await API.Bajahuerta(id_huerta)
  // const user = await API.bajaUsuario(id)
  if(huerta.status){
      
      setmensajeError(huerta.mensaje)
      setTimeout(()=>{
          setmensajeError('')
          window.location.reload(true)

      }, 3000)
  }else{
      setmensajeError(user.mensaje)
      setTimeout(()=>{
          setmensajeError('')
      }, 4000)
  }
}


  return (
    <div>
        {huerta.map((huerta) => (
          <li key={huerta.id_huerta}></li>
        ))}
      <input type="number" ref={id_huerta} />
      <button onClick={darDeBajaHuerta}>Dar de baja huerta</button>
      <Link to={'/listarHuertas'}><button type="button" className="btn btn-secondary">Volver al Listado</button></Link>

    </div>
  );
} 


