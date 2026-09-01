import "./Form.css";

import NavbarAdmin from "../../components/Navbar/NavbarAdmin";
import Footer from "../../components/Footer/Footer";

import {
  useEffect,
  useState
} from "react";

import {
  useNavigate
} from "react-router-dom";

import toast from "react-hot-toast";

import {
  crearUsuario
} from "../../services/usuarioService";

import axios from "axios";



export default function CrearUsuario(){


const navigate = useNavigate();


const [roles,setRoles]=useState<any[]>([]);


const [form,setForm]=useState({

    nombre:"",
    email:"",
    rol_id:""

});



useEffect(()=>{

    cargarRoles();

},[]);



const cargarRoles=async()=>{

    try{

        const response = await axios.get(
            "https://back-movilidad-stw0.onrender.com/roles/"
        );

        setRoles(response.data);

    }catch(error){

        console.error(error);

    }

};





const guardar=async(e:React.FormEvent)=>{

    e.preventDefault();


    try{


        await crearUsuario({

            nombre:form.nombre,

            email:form.email,

            rol_id:Number(form.rol_id)

        });



        toast.success(
            "Usuario creado y correo enviado",
            {
                style:{
                    background:"#FFFFFF",
                    color:"#2A3086",
                    border:"2px solid #92C4D7",
                    borderRadius:"14px",
                    fontFamily:"DM Sans"
                },
                iconTheme:{
                    primary:"#E63289",
                    secondary:"#FFFFFF"
                }
            }
        );



        navigate("/admin/usuarios");



    }catch(error:any){


        console.error(error);


        toast.error(
            error.response?.data?.detail ||
            "No se pudo crear el usuario",
            {
                style:{
                    background:"#FFFFFF",
                    color:"#2A3086",
                    border:"2px solid #E63289",
                    borderRadius:"14px",
                    fontFamily:"DM Sans"
                }
            }
        );


    }


};





return(

<div className="solicitud-page">


<NavbarAdmin/>


<div className="solicitud-container">


<div className="solicitud-card">



<h1 className="solicitud-title">
Crear Usuario
</h1>



<form
className="solicitud-form"
onSubmit={guardar}
>



<div className="section-title">
Datos del usuario
</div>



<div className="form-grid">


<div className="form-group">

<label>
Nombre completo
</label>


<input

type="text"

value={form.nombre}

onChange={(e)=>
setForm({
...form,
nombre:e.target.value
})
}

required

/>

</div>





<div className="form-group">

<label>
Correo electrónico
</label>


<input

type="email"

value={form.email}

onChange={(e)=>
setForm({
...form,
email:e.target.value
})
}

required

/>

</div>






<div className="form-group">


<label>
Rol
</label>



<select

value={form.rol_id}

onChange={(e)=>
setForm({
...form,
rol_id:e.target.value
})
}

required

>


<option value="">
Seleccione un rol
</option>



{
roles.map((rol)=>(

<option
key={rol.id}
value={rol.id}
>

{rol.nombre}

</option>

))
}



</select>


</div>



</div>





<div className="form-buttons">


<button
type="button"
className="btn-cancel"
onClick={()=>navigate("/admin/usuarios")}
>

Cancelar

</button>




<button
type="submit"
className="btn-create"
>

Crear usuario

</button>



</div>




</form>



</div>


</div>


<Footer/>


</div>


);


}