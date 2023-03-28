import { useState } from "react";
import { Link } from 'react-router-dom'
import * as API from '../../servicios/servicios'
import icono from '../styles.css/icono.png'
import "./login.css";

export function LoginForm() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [mensajeError,setmensajeError]=useState('');

  const form =async (event) => {
    event.preventDefault();
    const user = await API.Login({username,password})
   // console.log(usuario);
    if(user.status){
      window.localStorage.setItem('usuario',JSON.stringify(user));
      setUsername('')
      setPassword('')
      window.location.reload(true)
    }else{
      setmensajeError(user.mensaje)
      setTimeout(()=>{
        setmensajeError('')
      },4000)
    }
  };

  return (
    <>
    <link rel="canonical" href="https://getbootstrap.com/docs/5.3/examples/sign-in/"/>
   <link href="C:\Users\Nataly\huerta\react\react_vite\src\componentes\styles.css\bootstrap.min.css" rel="stylesheet"/>
  <link href="C:\Users\Nataly\react\silicon_react_vite\src\styles.css\registrostyle.css" rel="stylesheet"/>
{/* <body className="login">  */}
  <div className="container" >
      <div className="row justify-content-center">
      <div className="col-md-4">
       <div className="card bg-secundary">

        <div className="card-title text-center">
        <h2>Mi Huerta</h2>
        <img src={icono} width="80" height="80" />
        
        </div>
          <div className="card-body py-md-4">
           <form onSubmit={form}>
           {
              mensajeError?
              <div className="alert alert-danger" role="alert">
                {mensajeError}
              </div>:''
            }

              <div className="form-group">
                 <input type="text" className="form-control" required="required" id="username" value={username}  name="username" placeholder="Nombre de Usuario" onChange={(event)=>setUsername(event.target.value)}></input>
            </div>
            <div className="form-group">
              <input type="password" className="form-control" required="required" id="password" value={password} name="password" placeholder="Password" onChange={(event)=>setPassword(event.target.value)}></input>
            </div>     
            <button className="w-100 btn btn-lg btn-success" type="submit">Ingresar</button>
            <Link to={'/registro'}><button type="button" className="btn btn-link">¿No tiene un usuario? Registrate acá </button></Link>
            </form>
         </div>
{/* <Link to={'/registro'}>
          <button type="button">
            <span>
              Registrarse
            </span>
          </button> </Link>  */}
      </div>
    </div>
    </div>
    
    <div className="card-footer text-muted">

      </div>
    </div>
     {/* </body>  */}
     </>
     )};