export interface Rol {
    id:number;
    nombre:string;
}


export interface Usuario {

    id:number;

    nombre:string;

    email:string;

    activo:boolean;

    must_change_password:boolean;

    rol_id:number;

    rol?:Rol;
}



export interface UsuarioCreate {

    nombre:string;

    email:string;

    rol_id:number;
}



export interface UsuarioUpdate {

    nombre?:string;

    email?:string;

    rol_id?:number;
}