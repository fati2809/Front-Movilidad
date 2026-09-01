import axios from "axios";

import type {
    Usuario,
    UsuarioCreate,
    UsuarioUpdate
} from "../interfaces/usuario";


const API = "https://back-movilidad-stw0.onrender.com/users";


export const obtenerUsuarios = async()=>{

    const response = await axios.get<Usuario[]>(
        `${API}/`
    );

    return response.data;

}


export const obtenerUsuario = async(
    id:number
)=>{

    const response = await axios.get<Usuario>(
        `${API}/${id}`
    );

    return response.data;

}


export const crearUsuario = async(
    datos:UsuarioCreate
)=>{

    const response = await axios.post<Usuario>(
        `${API}/`,
        datos
    );

    return response.data;

}


export const actualizarUsuario = async(
    id:number,
    datos:UsuarioUpdate
)=>{

    const response = await axios.put<Usuario>(
        `${API}/${id}`,
        datos
    );

    return response.data;

}


export const cambiarEstadoUsuario = async(
    id:number
)=>{

    const response = await axios.patch<Usuario>(
        `${API}/${id}/estado`
    );

    return response.data;

}


export const eliminarUsuario = async(
    id:number
)=>{

    await axios.delete(
        `${API}/${id}`
    );

}