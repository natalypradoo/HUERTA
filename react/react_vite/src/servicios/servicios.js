const API_URL = 'http://localhost:3002'

///API LOGIN///
export async function Login(datos){
    const requestOptions={
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(datos)
    };
    try{
    const response = await fetch(`${API_URL}/login`, requestOptions)
    const data = await response.json();
    console.log(data)
    return data;
    } catch(e){

        alert('No se puede conectar con el servidor')
    }
}

/// API REGISTRO///
export async function Registro(datos){
    const requestOptions={
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(datos)
    };
    try{
    const response = await fetch(`${API_URL}/registro`, requestOptions)
    const data = await response.json();
    console.log(data)
    return data;
    } catch(e){
        console.log(e);
        // console.log('no funciona')
    }
}


///API USUARIOS///

//Listar Usuarios
export async function getUsuarios(){
    try{
const response = await fetch(`${API_URL}/usuarios`);
const data= await response.json();
return data;
}catch(error){
console.log('Nuestro error',error);
}
};


//buscarUsuarios
export async function BuscarUsuarios(filtros){
    const requestOptions={
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(filtros)
    };
    const response = await fetch(`${API_URL}/buscar_usuarios`, requestOptions);
    const data= await response.json()
    return data;
}

//BAja usuarios
export async function BajaUsuarios(id_usuarios){
    const requestOptions={
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        }
    };
    try{
        const response = await fetch(`${API_URL}/bajaUsuario/${id_usuarios}`, requestOptions)
        const data = await response.json();
        console.log(data)
        return data;
    } catch(e){

        alert('No se puede conectar con el servidor')
    }
}
//ALTA usuarios
export async function AltaUsuarios(id_usuarios){
    const requestOptions={
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        }
    };
    try{
        const response = await fetch(`${API_URL}/altaUsuario/${id_usuarios}`, requestOptions)
        const data = await response.json();
        console.log(data)
        return data;
    } catch(e){

        alert('No se puede conectar con el servidor')
    }
}
//editar
export async function getUsuariosbyId(id_usuarios){
    try{
const response = await fetch(`${API_URL}/usuarios/${id_usuarios}`);
const data= await response.json();
console.log(data)
return data[0];
}catch(error){
console.log('Nuestro error',error);
}
};

export function UpdateUsuario(id_usuario, datos){
    const requestOptions={
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(datos)
    };
    fetch(`${API_URL}/usuarios/${id_usuario}`, requestOptions)

}



//API HUERTAS///

// Listar Huertas
export async function getHuertas(){
    try{
const response = await fetch(`${API_URL}/huertas`);
const data= await response.json();
return data;
}catch(error){
console.log('Nuestro error',error);
}
};

//Crear Huerta nueva
export function SaveHuerta(datos){
    const requestOptions={
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(datos)
    };
    fetch(`${API_URL}/huertas`, requestOptions)
}

//Dar baja Huerta
export async function BajaHuerta(id_huerta){
    const requestOptions={
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',

        }
    };
    try{
        const response = await fetch(`${API_URL}/bajaHuerta/${id_huerta}`, requestOptions)
        const data = await response.json();
        console.log(data)
        return data;
    } catch(e){

        alert('No se puede conectar con el servidor')
    }
}

//Dar ALTA Huerta
export async function AltaHuerta(id_huerta){
    const requestOptions={
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',

        }
    };
    try{
        const response = await fetch(`${API_URL}/altaHuerta/${id_huerta}`, requestOptions)
        const data = await response.json();
        console.log(data)
        return data;
    } catch(e){

        alert('No se puede conectar con el servidor')
    }
}

//Editar info de HUERTA
//editar
export async function getHuertabyId(id_huerta){
    try{
const response = await fetch(`${API_URL}/huertas/${id_huerta}`);
const data= await response.json();
console.log(data)
return data[0];
}catch(error){
console.log('Nuestro error',error);
}
};

export function UpdateHuerta(id_huerta, datos){
    const requestOptions={
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(datos)
    };
    fetch(`${API_URL}/huertas/${id_huerta}`, requestOptions)

}


///API PLANTAS///

//Listar Plantas
export async function getPlantas(){
    const requestOptions = {
        headers: {
          'Content-Type': 'application/json'
        },
      };
    try{
        const response = await fetch(`${API_URL}/plantas`, requestOptions);
        const data = await response.json();
        return data;
    }catch(error){
        console.log('Nuestro error', error);
    }
};

//Editar info de Plantas
//editar
export async function getPlantasbyId(id_planta){
    try{
const response = await fetch(`${API_URL}/plantas/${id_planta}`);
const data= await response.json();
console.log(data)
return data[0];
}catch(error){
console.log('Nuestro error',error);
}
};

export function UpdatePlantas(id_planta, datos){
    const requestOptions={
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(datos)
    };
    fetch(`${API_URL}/plantas/${id_planta}`, requestOptions)

}

//Crear Nuev Planta
export function SavePlanta(datos){
    const requestOptions={
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(datos)
    };
    fetch(`${API_URL}/plantas`, requestOptions)
    
}

//Listar Comentarios
export async function getComentario(){
    const requestOptions = {
        headers: {
          'Content-Type': 'application/json'
        },
      };
    try{
        const response = await fetch(`${API_URL}/comentarios`, requestOptions);
        const data = await response.json();
        return data;
    }catch(error){
        console.log('Nuestro error', error);
    }
};

//Crear Nuevo Comentario
export function SaveComentario(id_planta,datos_comentario){
    const requestOptions={
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(datos_comentario)
    };
    fetch(`${API_URL}/comentarios/${id_planta}`, requestOptions)
    
}



//Dar baja comentario
export async function BajaComentario(id_pc){
    const requestOptions={
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',

        }
    };
    try{
        const response = await fetch(`${API_URL}/bajacomentario/${id_pc}`, requestOptions)
        const data = await response.json();
        console.log(data)
        return data;
    } catch(e){

        alert('No se puede conectar con el servidor')
    }
}

//Baja Plantas
export async function BajaPlantas(id_planta){
    const requestOptions={
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        }
    };
    try{
        const response = await fetch(`${API_URL}/bajaPlanta/${id_planta}`, requestOptions)
        const data = await response.json();
        console.log(data)
        return data;
    } catch(e){

        alert('No se puede conectar con el servidor')
    }
}

//Alta Plantas
export async function AltaPlantas(id_planta){
    const requestOptions={
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        }
    };
    try{
        const response = await fetch(`${API_URL}/altaPlanta/${id_planta}`, requestOptions)
        const data = await response.json();
        console.log(data)
        return data;
    } catch(e){

        alert('No se puede conectar con el servidor')
    }
}


//API MI HUERTA

//Listado de HUERTAS DE UN USUARIOS
export async function getMisHuertas(id_usuario){

    try{
const response = await fetch(`${API_URL}/mihuerta/${id_usuario}`);
const data= await response.json();
//console.log(data)
return data;
}catch(error){
console.log('Nuestro error',error);
}
};
//Baja Usuario de una HUERTA
export async function BajaMisHuertas(id_uh){
    const requestOptions={
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        }
    };
    try{
        const response = await fetch(`${API_URL}/mihuerta_huerta_baja/${id_uh}`, requestOptions)
        const data = await response.json();
        console.log(data)
        return data;
    } catch(e){

        alert('No se puede conectar con el servidor')
    }
}
//Alta Usuario de una HUERTA
export async function AltaMisHuertas(id_uh){
    const requestOptions={
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        }
    };
    try{
        const response = await fetch(`${API_URL}/mihuerta_huerta_alta/${id_uh}`, requestOptions)
        const data = await response.json();
        console.log(data)
        return data;
    } catch(e){

        alert('No se puede conectar con el servidor')
    }
}

//Listar Usuarios a AGREGAR
export async function getListaMisUsuariosAgregar(id_huerta){
    try{
const response = await fetch(`${API_URL}/mihuerta_agregarUsuario/${id_huerta}`);
const data= await response.json();
return data;
}catch(error){
console.log('Nuestro error',error);
}
};

//Agregar USUARIO en una HUERTA
export async function AgregarUsuariosHuerta(id_huerta,id_usuario){
    //console.log(datos)
    const requestOptions={
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        //body: JSON.stringify(datos)
        
    };
    try{
        
    const response = await fetch(`${API_URL}/mihuerta_agregarUsuario/${id_huerta}/${id_usuario}`, requestOptions)
    const data = await response.json();
    //console.log(data)
    return data;
    } catch(e){
        console.log(e);
        // console.log('no funciona')
    }
}


//Lista las PLANTAS de una HUERTA
export async function getMisPlantas(id_usuario,id_huerta){

    try{
const response = await fetch(`${API_URL}/mihuerta/${id_usuario}/${id_huerta}`);
const data= await response.json();
//console.log(data)
return data;
}catch(error){
console.log('Nuestro error',error);
}
};
//Baja PLANTAS de una HUERTA
export async function BajaMisPlantas(id_hp){
    const requestOptions={
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        }
    };
    try{
        const response = await fetch(`${API_URL}/mihuerta_plantas_baja/${id_hp}`, requestOptions)
        const data = await response.json();
        //console.log(data)
        return data;
    } catch(e){

        alert('No se puede conectar con el servidor')
    }
}
//Alta PLANTAS de una HUERTA
export async function AltaMisPlantas(id_hp){
    const requestOptions={
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        }
    };
    try{
        const response = await fetch(`${API_URL}/mihuerta_plantas_alta/${id_hp}`, requestOptions)
        const data = await response.json();
        console.log(data)
        return data;
    } catch(e){

        alert('No se puede conectar con el servidor')
    }
}
//Agregar PLANTAS en una HUERTA
export async function AgregarPlantasHuerta(id_huerta,id_planta,datos){
    const requestOptions={
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(datos)
    };
    try{
    const response = await fetch(`${API_URL}/mihuerta_agregarPlanta/${id_huerta}/${id_planta}`, requestOptions)
    const data = await response.json();
    console.log(data)
    return data;
    } catch(e){
        console.log(e);
        // console.log('no funciona')
    }
}




//Lista los USUARIOS de una HUERTA
export async function getMisUsuarios(id_usuario,id_huerta){

    try{
const response = await fetch(`${API_URL}/mihuerta/${id_usuario}/${id_huerta}/listaUsuariosHuerta`);
const data= await response.json();
console.log(data)
return data;
}catch(error){
console.log('Nuestro error',error);
}
};
//Baja Usuario de una HUERTA
export async function BajaMisUsuarios(id_uh){
    const requestOptions={
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        }
    };
    try{
        const response = await fetch(`${API_URL}/mihuerta_usuario_baja/${id_uh}`, requestOptions)
        const data = await response.json();
        console.log(data)
        return data;
    } catch(e){

        alert('No se puede conectar con el servidor')
    }
}
//Alta Usuario de una HUERTA
export async function AltaMisUsuarios(id_uh){
    const requestOptions={
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        }
    };
    try{
        const response = await fetch(`${API_URL}/mihuerta_usuario_alta/${id_uh}`, requestOptions)
        const data = await response.json();
        console.log(data)
        return data;
    } catch(e){

        alert('No se puede conectar con el servidor')
    }
}



//Lista COMENTARIOS de una PLANTA

export async function getMisComentarios(id_usuario,id_huerta,id_hp){

    try{
const response = await fetch(`${API_URL}/mihuerta_comentarios/${id_usuario}/${id_huerta}/${id_hp}`);
const data= await response.json();
console.log(data)
return data;
}catch(error){
console.log('Nuestro error',error);
}
};
//Baja Comentarios en mis plantas
export async function BajaMisComentarios(id_c_hp){
    const requestOptions={
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        }
    };
    try{
        const response = await fetch(`${API_URL}/mihuerta_comentarios_baja/${id_c_hp}`, requestOptions)
        const data = await response.json();
        console.log(data)
        return data;
    } catch(e){

        alert('No se puede conectar con el servidor')
    }
}
//Alta Comentarios en mis plantas
export async function AltaMisComentarios(id_c_hp){
    const requestOptions={
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        }
    };
    try{
        const response = await fetch(`${API_URL}/mihuerta_comentarios_alta/${id_c_hp}`, requestOptions)
        const data = await response.json();
        console.log(data)
        return data;
    } catch(e){

        alert('No se puede conectar con el servidor')
    }
}