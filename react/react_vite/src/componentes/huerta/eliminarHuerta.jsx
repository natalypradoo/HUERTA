import React, { useRef, useState } from "react";
import {Link} from 'react-router-dom'
import * as API from '../../servicios/servicios'

export function EliminarHuerta(){
    const [huertas]=useState([]);
    const inputRef=useRef();
    const darDeBajaHuerta= ()=>{
        const {id_huerta}= id_huerta.current.value;
        console.log('lo que esta ',id_huerta)
        const datos_enviar={
            id_huerta:id_huerta.current.value
        };
        API.EliminarHuerta(datos_enviar);
        // id_huerta.current.value=null,
        alert('se elimino correctamente')

    }

  return (
    <div>
        {huertas.map((huerta) => (
          <li key={huerta.id_huerta}></li>
        ))}
      <input type="number" ref={inputRef} />
      <button onClick={darDeBajaHuerta}>Dar de baja huerta</button>
      <Link to={'/listarHuertas'}><button type="button" className="btn btn-secondary">Volver al Listado</button></Link>

    </div>
  );
} 


