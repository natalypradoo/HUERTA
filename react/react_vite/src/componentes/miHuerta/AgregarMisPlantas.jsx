import { useEffect } from 'react'
import { useState } from 'react'
import {Link, useParams} from 'react-router-dom'
import * as API from '../../servicios/servicios'

export function AgregarMisPlantas(){
    const [cantidad, setCantidad] = useState('');
    const [fecha, setFecha] = useState('');
    const {id_huerta}= useParams();
    const {id_planta}= useParams();
    const [mensajeError,setmensajeError]=useState('');
    const [mensajeSuccess, setmensajeSuccess] = useState('')
    
    const agregar_planta  = async()=>{

        const user = await API.AgregarPlantasHuerta(id_huerta,id_planta,{cantidad, fecha})
        if(user.status){
            setmensajeSuccess(user.mensaje)
            setTimeout(()=>{
                setmensajeSuccess('');
            }, 4000)
                 
                 // window.location.reload(true)
            }else{
            setmensajeError(user.mensaje)
            setmensajeError(user)
            setTimeout(()=>{
                setmensajeError('');
            }, 4000)
                 
        }
    }
        





return(
<>
<div className="card">
    <div className="card-header">
        Registro de Plantación:
    </div>
        <div className="card-body">
        <div className="form-group">
        {
                    mensajeSuccess?
                    <div className="alert alert-success" role="alert">
                    {mensajeSuccess}
                    </div>:''
                }
                {
                    mensajeError?
                        <div className="alert alert-danger" role="alert">
                        {mensajeError}
                     </div>:''
                }

          <div className="row">
            <div className="col-3">
            <label for="">Numero de plantas</label>
          <input type="number" min='0' 
          value={cantidad} 
          onChange={(event)=>setCantidad(event.target.value)} 
          name="" id="" className="form-control" placeholder="0" aria-describedby="helpId"/>
          {/* <small id="helpId" className="text-muted">&nbsp;</small> */}
            </div>
            <div className="col-4">
            <label for="">Fecha</label>
          <input 
          type="date"
          value={fecha} 
          onChange={(event)=>setFecha(event.target.value)} 
          name="" id="" className="form-control" placeholder="" aria-describedby="helpId"/>
            </div>
          </div>
        </div>
        <div className="form-group">
            <button  onClick={agregar_planta} type="button" className="btn btn-primary">Guardar</button>
            <small id="helpId" className="text-muted">&nbsp;</small>
            <Link to={`/mihuerta_listaPlantas/${id_huerta}`}><button type="button" className="btn btn-secondary">Volver al Listado</button></Link> 
        </div>
        </div>
    <div className="card-footer text-muted">
        Mi Huerta - Silicon Misiones
    </div>
</div>
</>
)
}