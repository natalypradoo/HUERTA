import { useState } from "react";
import * as API from '../../servicios/servicios'
import "./login.css";

export function LoginForm() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')


  const handleSubmit =async (event) => {
    event.preventDefault();
    const username = await API.Login({username,password})
    console.log(usuario);
    if(user){
      window.localStorage.setItem('usuario',JSON.stringify(user));
      setUsuario(usuario)
      setUsername('')
      setPassword('')
      window.location.reload(true)
    }
  };

  return (
          <>
          <link rel="canonical" href="https://getbootstrap.com/docs/5.3/examples/sign-in/"/>
         <link href="C:\Users\Nataly\huerta\react\react_vite\src\componentes\styles.css\bootstrap.min.css" rel="stylesheet"/>
        <link href="C:\Users\Nataly\react\silicon_react_vite\src\styles.css\registrostyle.css" rel="stylesheet"/>
        <div class="container" name="login">
            <div class="row justify-content-center">
            <div class="col-md-5">
             <div class="card">
               <h2 class="card-title text-center">Registro</h2>
                <div class="card-body py-md-4">
                 <form onSubmit={handleSubmit}>
                    <div class="form-group">
                       <input type="text" class="form-control" required="required" id="username" value={username}  name="username" placeholder="Nombre de Usuario" onChange={(event)=>setUsername(event.target.value)}></input>
                  </div>
                  <div class="form-group">
                    <input type="password" class="form-control" required="required" id="password" value={password} name="password" placeholder="Password" onChange={(event)=>setPassword(event.target.value)}></input>
                  </div>     
                  <button class="w-100 btn btn-lg btn-danger" type="submit">Ingresar
                <a href="C:\Users\Nataly\huerta\react\react_vite\src\App.jsx"/>
                </button>
                 </form>
               </div>
            </div>
          </div>
          </div>
          </div>
          
    </>)};