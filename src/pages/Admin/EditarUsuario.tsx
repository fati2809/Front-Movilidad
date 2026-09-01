import "./Form.css";

import NavbarAdmin from "../../components/Navbar/NavbarAdmin";
import Footer from "../../components/Footer/Footer";

import {
  useEffect,
  useState
} from "react";

import {
  useNavigate,
  useParams
} from "react-router-dom";

import toast from "react-hot-toast";

import {
  obtenerUsuario,
  actualizarUsuario
} from "../../services/usuarioService";

import type {
  Usuario
} from "../../interfaces/usuario";


export default function EditarUsuario(){

const {id}=useParams();

const navigate=useNavigate();

const [usuario,setUsuario]=useState<Usuario | null>(null);



useEffect(()=>{

 cargarUsuario();

},[]);



const cargarUsuario=async()=>{

 try{

  const data=await obtenerUsuario(
    Number(id)
  );

  setUsuario(data);


 }catch(error){

  console.error(error);

 }

};




const guardar=async()=>{


try{


await actualizarUsuario(
 Number(id),
 {
  nombre:usuario?.nombre,
  email:usuario?.email,
  rol_id:usuario?.rol_id
 }
);


toast.success(
"Usuario actualizado"
);


navigate(
"/admin/usuarios"
);


}catch(error){

console.error(error);


toast.error(
"No se pudo actualizar"
);


}


};




return(

<div className="solicitud-page">

<NavbarAdmin/>


<div className="solicitud-container">


<div className="solicitud-card">


<h1 className="solicitud-title">
Editar Usuario
</h1>



<form className="solicitud-form">



<div className="section-title">
Datos del usuario
</div>



<div className="form-grid">



<div className="form-group">

<label>
Nombre
</label>


<input
type="text"
value={
usuario?.nombre || ""
}
onChange={
e=>
setUsuario({
...usuario!,
nombre:e.target.value
})
}
/>


</div>





<div className="form-group">

<label>
Correo
</label>


<input
type="email"
value={
usuario?.email || ""
}
onChange={
e=>
setUsuario({
...usuario!,
email:e.target.value
})
}
/>


</div>





<div className="form-group">

<label>
Rol
</label>


<select

value={
usuario?.rol_id || ""
}

onChange={
e=>
setUsuario({
...usuario!,
rol_id:Number(
e.target.value
)
})
}

>


<option value="">
Seleccione
</option>


<option value="1">
Administrador
</option>


<option value="2">
Agente
</option>


</select>


</div>



</div>




<div className="section-title">
Estado
</div>



<div className="form-grid">


<div className="form-group">

<label>
Estado actual
</label>


<input

type="text"

value={
usuario?.activo
?
"Activo"
:
"Inactivo"
}

readOnly

/>


</div>


</div>





<div
style={{
display:"flex",
justifyContent:"flex-end",
gap:"15px",
marginTop:"30px"
}}
>


<button

type="button"

className="btn-cancel"

onClick={()=>
navigate("/admin/usuarios")
}

>

Cancelar

</button>



<button

type="button"

className="btn-create"

onClick={guardar}

>

Guardar cambios

</button>



</div>




</form>


</div>


</div>


<Footer/>


</div>


);

}