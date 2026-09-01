import { useState } from "react";
import "./password.css";
import toast from "react-hot-toast";

const API_URL = "https://back-movilidad-stw0.onrender.com";


type Props = {
  open:boolean;
  token:string;
  onSuccess:()=>void;
};


export default function Password({
  open,
  token,
  onSuccess
}:Props){


const [password,setPassword]=useState("");
const [confirm,setConfirm]=useState("");

const [loading,setLoading]=useState(false);
const [error,setError]=useState("");



const validarPassword=(password:string)=>{

const errores=[];


if(password.length < 8)
 errores.push("mínimo 8 caracteres");


if(!/[A-Z]/.test(password))
 errores.push("una mayúscula");


if(!/[a-z]/.test(password))
 errores.push("una minúscula");


if(!/[0-9]/.test(password))
 errores.push("un número");


if(!/[!@#$%^&*]/.test(password))
 errores.push("un carácter especial");


return errores;

};




const cambiarPassword=async()=>{


setError("");

const errores=
validarPassword(password);


if(errores.length){

setError(
"Necesita: "+errores.join(", ")
);

return;

}



if(password!==confirm){

setError(
"Las contraseñas no coinciden"
);

return;

}



try{


setLoading(true);


const response=
await fetch(
`${API_URL}/users/change-password`,
{
method:"PATCH",
headers:{
"Content-Type":"application/json",
Authorization:`Bearer ${token}`
},
body:JSON.stringify({
password
})
});


const data=
await response.json();



if(!response.ok){

setError(
data.detail ||
"No se pudo cambiar la contraseña"
);

return;

}



localStorage.setItem(
"must_change_password",
"false"
);



toast.success(
"Contraseña actualizada correctamente"
);



onSuccess();



}catch{

toast.error(
"Error conectando al servidor"
);


}finally{

setLoading(false);

}


};



if(!open)
return null;



return(

<div className="password-overlay">

<div className="password-modal">


<h2>
🔒 Cambiar contraseña
</h2>


<p>
Por seguridad actualiza tu contraseña antes de continuar.
</p>



<label>
Nueva contraseña
</label>

<input
type="password"
value={password}
onChange={
e=>setPassword(e.target.value)
}
/>



<label>
Confirmar contraseña
</label>

<input
type="password"
value={confirm}
onChange={
e=>setConfirm(e.target.value)
}
/>



{
error &&
<p className="password-error">
{error}
</p>
}



<button
onClick={cambiarPassword}
disabled={loading}
>

{
loading
?
"Actualizando..."
:
"Actualizar contraseña"
}

</button>



</div>

</div>

)

}