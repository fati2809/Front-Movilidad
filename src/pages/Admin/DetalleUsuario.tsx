import "./Form.css";

import NavbarAdmin from "../../components/Navbar/NavbarAdmin";
import Footer from "../../components/Footer/Footer";

import {useParams} from "react-router-dom";
import {useEffect,useState} from "react";

import {
 obtenerUsuario
} from "../../services/usuarioService";


export default function DetalleUsuario(){

const {id}=useParams();

const [usuario,setUsuario]=useState<any>(null);


useEffect(()=>{

 if(id){
    obtenerUsuario(Number(id))
    .then(setUsuario)
    .catch(console.error);
 }

},[id]);



return(

<div className="solicitud-page">

<NavbarAdmin/>


<div className="solicitud-container">

<div className="solicitud-card">


<h1 className="solicitud-title">
Datos del Usuario
</h1>


<div className="section-title">
Información general
</div>


<div className="form-grid">


<div className="form-group">

<label>Nombre</label>

<input
value={usuario?.nombre || ""}
readOnly
/>

</div>



<div className="form-group">

<label>Correo</label>

<input
value={usuario?.email || ""}
readOnly
/>

</div>



<div className="form-group">

<label>Rol</label>

<input
value={usuario?.rol?.nombre || ""}
readOnly
/>

</div>



<div className="form-group">

<label>Estado</label>

<input
value={
usuario?.activo
?"Activo"
:"Inactivo"
}
readOnly
/>

</div>



<div className="form-group">

<label>Cambio de contraseña</label>

<input
value={
usuario?.must_change_password
?"Pendiente"
:"Realizado"
}
readOnly
/>

</div>


</div>


</div>

</div>


<Footer/>

</div>

)

}