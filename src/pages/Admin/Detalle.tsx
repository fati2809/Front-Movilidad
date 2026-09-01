import "./Detalle.css";
import NavbarAdmin from "../../components/Navbar/NavbarAdmin";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

interface Infraccion{
  id:number;
  folio:string;
  fecha:string;
  conductor_nombre:string;
  placas:string;
  patrulla:string;
  observaciones:string;
 empleado:string;
  marca:string;
  modelo:string;
  motivo:string;
}

export default function Detalle(){
  const [infracciones,setInfracciones]=useState<Infraccion[]>([]);
  const [loading,setLoading]=useState(true);
  const [search,setSearch]=useState("");
  const navigate=useNavigate();

    useEffect(()=>{
    obtenerInfracciones();
    },[]);


    const showSuccess = (message: string) => {
  toast.success(message, {
    style: {
      background: "#FFFFFF",
      color: "#2A3086",
      border: "2px solid #92C4D7",
      borderRadius: "14px",
      fontFamily: "DM Sans, sans-serif",
    },
    iconTheme: {
      primary: "#E63289",
      secondary: "#FFFFFF",
    },
  });
};

const showError = (message: string) => {
  toast.error(message, {
    style: {
      background: "#FFFFFF",
      color: "#2A3086",
      border: "2px solid #E63289",
      borderRadius: "14px",
      fontFamily: "DM Sans, sans-serif",
    },
  });
};

const confirmarEliminacion = () =>
  new Promise<boolean>((resolve) => {
    toast((t) => (
      <div style={{ fontFamily: "DM Sans, sans-serif" }}>
        <p style={{ marginBottom: "12px" }}>
          ¿Está seguro de eliminar esta infracción?
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
        background: "#FFFFFF",
        color: "#2A3086",
        border: "2px solid #E63289",
        borderRadius: "14px",
        fontFamily: "DM Sans, sans-serif",
      },
    });
  });

  
  async function obtenerInfracciones(){
    try{
      const response=await axios.get("https://back-movilidad-stw0.onrender.com/boletas");
      setInfracciones(response.data);
    }catch(error){
      console.error(error);
    }finally{
      setLoading(false);
    }
  }
    const filtradas=useMemo(()=>{
    return infracciones.filter((i)=>{
      return(
        i.folio.toLowerCase().includes(search.toLowerCase())
        ||
        i.conductor_nombre
        .toLowerCase()
        .includes(search.toLowerCase())
        ||
        i.placas
        .toLowerCase()
        .includes(search.toLowerCase())
      );
    });
  },[
    infracciones,
    search
  ]);
  const descargarPDF = async (id:number) => {
  try {
    const boleta = infracciones.find((item) => item.id === id);
    const nombreArchivo = boleta?.folio ? `${boleta.folio}.pdf` : `boleta_${id}.pdf`;

    const response = await axios.get(
      `https://back-movilidad-stw0.onrender.com/boletas/${id}/pdf`,
      {
        responseType: "blob"
      }
    );

    const contentType = String(response.headers["content-type"] || "");
    if (contentType.includes("application/json")) {
      const text = await response.data.text();
      throw new Error(text || "El servidor no devolvió un PDF válido");
    }

    const url = window.URL.createObjectURL(
      new Blob([response.data], { type: "application/pdf" })
    );

    const link = document.createElement("a");

    link.href = url;
    link.download = nombreArchivo;

    document.body.appendChild(link);

    link.click();

    link.remove();

    window.URL.revokeObjectURL(url);

  } catch(error){
    console.error("Error descargando PDF", error);
    showError("No se pudo descargar el PDF");
  }
};

const eliminarInfraccion = async (id: number) => {

  const confirmar = await confirmarEliminacion();

  if (!confirmar) return;

  try {

    await axios.delete(
      `https://back-movilidad-stw0.onrender.com/boletas/${id}`
    );

    setInfracciones(prev =>
      prev.filter(i => i.id !== id)
    );

    showSuccess("Infracción eliminada correctamente");

  } catch (error) {

    console.error("Error eliminando infracción", error);

    showError("No se pudo eliminar la infracción");
  }

};

    return(
    <div className="tasks-root">
      <NavbarAdmin/>
      <div className="tasks-container">
        <div className="tasks-header">
          <div className="header-text">
            <h1>
              Lista de infracciones
            </h1>
            
          </div>
          <div className="header-button">
            <button
              className="btn-create"
              onClick={()=>
                navigate("/admin/realizar-infraccion")
              }
            >
              + Nueva infracción

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
      placeholder="Buscar..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />

    
  </div>
</div>
        <div className="table-card">
            {
loading ?(
<div className="loading">
Cargando...
</div>
):
filtradas.length===0 ?(
<div className="empty">
<h3>No existen infracciones</h3>
<p>No hay registros.</p>
</div>
):
(
    <table className="table">
<thead>
<tr>
<th>Folio</th>
<th>Fecha</th>
<th>Conductor</th>
<th>Placas</th>
<th>Oficial</th>
<th>Acciones</th>
</tr>
</thead>
<tbody>
  {filtradas.map((i) => (
    <tr key={i.id}>
      <td>{i.folio}</td>
      <td>{i.fecha}</td>
      <td>{i.conductor_nombre}</td>
      <td>{i.placas}</td>
      <td>{i.empleado}</td>
      <td>
  <div className="actions">

    {/* VER */}
    <button
      className="btn-view"
      onClick={() =>
        navigate(`/admin/detalle/${i.id}`)
      }
    >

      <svg 
        xmlns="http://www.w3.org/2000/svg"
        height="24"
        viewBox="0 -960 960 960"
        width="24"
        fill="#2A3086"
      >
        <path d="M480-320q-75 0-127.5-52.5T300-500q0-75 52.5-127.5T480-680q75 0 127.5 52.5T660-500q0 75-52.5 127.5T480-320Zm0-72q45 0 76.5-31.5T588-500q0-45-31.5-76.5T480-608q-45 0-76.5 31.5T372-500q0 45 31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-72q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-272Z"/>
      </svg>

    </button>


    {/* EDITAR */}
    <button
      className="btn-edit"
      onClick={() =>
        navigate(`/admin/editar-infraccion/${i.id}`)
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


    {/* DESCARGAR */}
    <button
      className="btn-download"
      onClick={() =>
        descargarPDF(i.id)
      }
    >

      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24"
        viewBox="0 -960 960 960"
        width="24"
        fill="#E63289"
      >
        <path d="M480-320 280-520l56-58 104 104v-326h80v326l104-104 56 58-200 200ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z"/>
      </svg>

    </button>


    {/* ELIMINAR */}
    <button
      className="btn-delete"
      onClick={() =>
        eliminarInfraccion(i.id)
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
  ))}
</tbody>
</table>
)}
</div>
</div>
</div>
);}