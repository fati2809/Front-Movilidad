import "./Usuarios.css";

import NavbarAdmin from "../../components/Navbar/NavbarAdmin";

import {
  useEffect,
  useMemo,
  useState
} from "react";

import {
  useNavigate
} from "react-router-dom";

import toast from "react-hot-toast";

import type{
  Usuario
} from "../../interfaces/usuario";

import {
  obtenerUsuarios,
  cambiarEstadoUsuario,
  eliminarUsuario
} from "../../services/usuarioService";



export default function Usuarios(){


  const [usuarios,setUsuarios]=useState<Usuario[]>([]);

  const [loading,setLoading]=useState(true);

  const [search,setSearch]=useState("");

  const navigate=useNavigate();



  useEffect(()=>{

    cargarUsuarios();

  },[]);



  const showSuccess=(message:string)=>{

    toast.success(message,{
      style:{
        background:"#FFFFFF",
        color:"#2A3086",
        border:"2px solid #92C4D7",
        borderRadius:"14px",
        fontFamily:"DM Sans, sans-serif"
      },

      iconTheme:{
        primary:"#E63289",
        secondary:"#FFFFFF"
      }
    });

  };



  const showError=(message:string)=>{

    toast.error(message,{
      style:{
        background:"#FFFFFF",
        color:"#2A3086",
        border:"2px solid #E63289",
        borderRadius:"14px",
        fontFamily:"DM Sans, sans-serif"
      }
    });

  };

  const confirmarEliminacion = () =>
  new Promise<boolean>((resolve) => {
    toast((t) => (
      <div style={{ fontFamily: "DM Sans, sans-serif" }}>
        <p style={{ marginBottom: "12px" }}>
          ¿Está seguro de eliminar este usuario?
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "10px",
          }}
        >

          <button
            onClick={() => {
              toast.dismiss(t.id);
              resolve(false);
            }}
            style={{
              padding: "6px 12px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              background: "#fff",
              color: "#2A3086",
              cursor: "pointer",
            }}
          >
            Cancelar
          </button>

          <button
            onClick={() => {
              toast.dismiss(t.id);
              resolve(true);
            }}
            style={{
              padding: "6px 12px",
              border: "none",
              borderRadius: "8px",
              background: "#E63289",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            Eliminar
          </button>

        </div>
      </div>
    ), {
      duration: Infinity,
      style: {
        background:"#FFFFFF",
        color:"#2A3086",
        border:"2px solid #E63289",
        borderRadius:"14px",
        fontFamily:"DM Sans, sans-serif",
      },
    });
  });


  async function cargarUsuarios(){

    try{

      const data=await obtenerUsuarios();

      setUsuarios(data);


    }catch(error){

      console.error(error);

      showError(
        "Error cargando usuarios"
      );

    }
    finally{

      setLoading(false);

    }

  }




  const filtrados=useMemo(()=>{


    return usuarios.filter((u)=>{


      return(

        u.nombre
        .toLowerCase()
        .includes(search.toLowerCase())


        ||

        u.email
        .toLowerCase()
        .includes(search.toLowerCase())

      );


    });


  },[
    usuarios,
    search
  ]);





  const cambiarEstado=async(id:number)=>{


    try{


      await cambiarEstadoUsuario(id);


      cargarUsuarios();


      showSuccess(
        "Estado actualizado"
      );


    }catch(error){

      console.error(error);

      showError(
        "No se pudo cambiar el estado"
      );

    }


  };

const eliminar = async (id:number) => {

  const confirmar = await confirmarEliminacion();

  if(!confirmar) return;

  try {

    await eliminarUsuario(id);

    setUsuarios(prev =>
      prev.filter(
        u => u.id !== id
      )
    );

    showSuccess(
      "Usuario eliminado correctamente"
    );

  } catch(error){

    console.error(
      "Error eliminando usuario",
      error
    );

    showError(
      "No se pudo eliminar el usuario"
    );

  }

};

return(

<div className="tasks-root">


<NavbarAdmin/>


<div className="tasks-container">



<div className="tasks-header">


<div className="header-text">

<h1>
Usuarios
</h1>

</div>



<div className="header-button">


<button
className="btn-create"

onClick={()=>
navigate("/admin/crear-usuario")
}

>

+ Nuevo usuario

</button>


</div>


</div>





<div className="toolbar">


<div className="search-box">


<svg
xmlns="http://www.w3.org/2000/svg"
height="50"
viewBox="100 -800 980 1000"
width="40"
fill="#E63289"
className="search-icon"
>

<path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/>

</svg>



<input

type="text"

placeholder="Buscar usuario..."

value={search}

onChange={
(e)=>
setSearch(e.target.value)
}

/>


</div>


</div>






<div className="table-card">


{
loading ?

<div className="loading">
Cargando...
</div>


:

filtrados.length===0?


<div className="empty">

<h3>
No existen usuarios
</h3>

<p>
No hay registros.
</p>


</div>



:


<table className="table">


<thead>

<tr>

<th>
Nombre
</th>


<th>
Correo
</th>


<th>
Rol
</th>


<th>
Estado
</th>


<th>
Acciones
</th>


</tr>

</thead>




<tbody>


{
filtrados.map((u)=>(


<tr key={u.id}>


<td>
{u.nombre}
</td>



<td>
{u.email}
</td>



<td>
{u.rol?.nombre ?? "Sin rol"}
</td>



<td>

<label className="switch">

<input
type="checkbox"
checked={u.activo}
onChange={() =>
cambiarEstado(u.id)
}
/>

<span className="slider"></span>

</label>


</td>


<td>


<div className="actions">


{/* EDITAR */}

<button
className="btn-edit"
onClick={() =>
navigate(`/admin/editar-usuario/${u.id}`)
}
>

<svg
xmlns="http://www.w3.org/2000/svg"
height="24"
viewBox="0 -960 960 960"
width="24"
fill="#E63289"
>

<path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Z"/>

</svg>

</button>





{/* CAMBIAR ESTADO */}

<button
 className="btn-view"
 onClick={() =>
    navigate(`/admin/usuario/${u.id}`)
 }
>
<svg
xmlns="http://www.w3.org/2000/svg"
height="24"
viewBox="0 -960 960 960"
width="24"
fill="#2A3086"
>
<path d="M480-320q-75 0-127.5-52.5T300-500q0-75 52.5-127.5T480-680q75 0 127.5 52.5T660-500q0 75-52.5 127.5T480-320Zm0-72q45 0 76.5-31.5T588-500q0-45-31.5-76.5T480-608q-45 0-76.5 31.5T372-500q0 45 31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Z"/>
</svg>

</button>





{/* ELIMINAR */}

<button
className="btn-delete"
onClick={() =>
eliminar(u.id)
}
>


<svg
xmlns="http://www.w3.org/2000/svg"
height="24"
viewBox="0 -960 960 960"
width="24"
fill="#E63289"
>

<path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360Z"/>

</svg>


</button>


</div>


</td>


</tr>


))

}


</tbody>


</table>


}



</div>


</div>


</div>


);


}