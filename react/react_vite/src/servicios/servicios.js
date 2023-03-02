const API_URL = 'http://localhost:3002'

//API LOGIN//
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

//API HUERTAS//

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
        body:JSON.stringify(datos)
    };
    fetch(`${API_URL}/huertas`, requestOptions)
}

//Dar baja Huerta
export function EliminarHuerta(datos){
    const requestOptions={
        method:'PUT',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(datos)
    };
    fetch(`${API_URL}/huertas`, requestOptions)
}

//API USUARIOS//

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




