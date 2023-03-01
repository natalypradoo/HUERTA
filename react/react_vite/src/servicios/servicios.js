const API_URL = 'http://localhost:3002'

export async function getHuertas(){
    try{
const response = await fetch(`${API_URL}/huertas`);
const data= await response.json();
return data;
}catch(error){
console.log('Nuestro error',error);
}
};

export async function getUsuarios(){
    try{
const response = await fetch(`${API_URL}/usuarios`);
const data= await response.json();
return data;
}catch(error){
console.log('Nuestro error',error);
}
};


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