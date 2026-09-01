import "./Form.css";
import NavbarAdmin from "../../components/Navbar/NavbarAdmin";
import Footer from "../../components/Footer/Footer";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Detalleid(){
const {id}=useParams();
const [boleta, setBoleta] = useState<any>(null);

useEffect(() => {
    axios
      .get(`https://back-movilidad-stw0.onrender.com/boletas/${id}`)
      .then((res) => setBoleta(res.data))
      .catch(console.error);
  }, [id]);

return (
<div className="solicitud-page">
<NavbarAdmin />

<div className="solicitud-container">
<div className="solicitud-card">
<h1 className="solicitud-title">
Boleta de Infracción
</h1>

<form className="solicitud-form">

{/* =====================
DATOS GENERALES
===================== */}
<div className="section-title">
Lugar y Fecha
</div>

<div className="form-grid">
<div className="form-group">
<label>Lugar</label>
<input type="text" value={boleta?.lugar || ""} readOnly/>
</div>

<div className="form-group">
<label>Fecha</label>
<input type="date" value={boleta?.fecha || ""} readOnly disabled/>
</div>

<div className="form-group">
<label>Hora</label>
<input type="time" value={boleta?.hora || ""} readOnly disabled/>
</div></div>

{/* =====================
CONDUCTOR
===================== */}
<div className="section-title">Conductor</div>

<div className="form-grid">
<div className="form-group">
<label>Nombre</label>
<input type="text" value={boleta?.conductor_nombre || ""} readOnly/>
</div>

<div className="form-group">
<label>Teléfono</label>
<input type="text"  value={boleta?.conductor_telefono || ""} readOnly/>
</div>

<div className="form-group">
<label>Correo</label>
<input type="email" value={boleta?.conductor_correo || ""} readOnly/>
</div>
</div>

<div className="section-title">
Dirección del Conductor
</div>

<div className="form-grid">
<div className="form-group">
<label>Calle</label>
<input type="text" value={boleta?.conductor_calle || ""} readOnly/>
</div>

<div className="form-group">
<label>Número Exterior</label>
<input type="text" value={boleta?.conductor_numero|| ""} readOnly/>
</div>

<div className="form-group">
<label>Número Interior</label>
<input type="text" value={boleta?.conductor_numero_interior || ""} readOnly/>
</div>

<div className="form-group">
<label>Colonia</label>
<input type="text" value={boleta?.conductor_colonia || ""} readOnly/>
</div>

<div className="form-group">
<label>Código Postal</label>
<input type="text" value={boleta?.conductor_cp || ""} readOnly/>
</div>

<div className="form-group">
<label>Municipio</label>
<input type="text" value={boleta?.conductor_municipio || ""} readOnly/>
</div>

<div className="form-group">
<label>Estado</label>
<input type="text" value={boleta?.conductor_estado || ""} readOnly/>

</div>
</div>


{/* =====================
PROPIETARIO
===================== */}

<div className="section-title">
Propietario
</div>

<div className="form-grid">
<div className="form-group">
<label>Nombre</label>
<input type="text" value={boleta?.propietario_nombre || ""} readOnly/>
</div>
</div>

<div className="section-title">
Dirección del Propietario
</div>

<div className="form-grid">
<div className="form-group">
<label>Calle</label>
<input type="text" value={boleta?.propietario_calle || ""} readOnly/>
</div>

<div className="form-group">
<label>Número Exterior</label>
<input type="text" value={boleta?.propietario_numero || ""} readOnly/>
</div>

<div className="form-group">
<label>Número Interior</label>
<input type="text" value={boleta?.propietario_numero_interior || ""} readOnly/>
</div>

<div className="form-group">
<label>Colonia</label>
<input type="text" value={boleta?.propietario_colonia || ""} readOnly/>
</div>

<div className="form-group">
<label>Código Postal</label>
<input type="text" value={boleta?.propietario_cp || ""} readOnly/>
</div>

<div className="form-group">
<label>Municipio</label>
<input type="text" value={boleta?.propietario_municipio || ""} readOnly/>
</div>

<div className="form-group"><label>Estado</label><input type="text" value={boleta?.propietario_estado || ""} readOnly/>
</div>
</div>

{/* =====================
VEHICULO
===================== */}
<div className="section-title">Vehículo</div>
<div className="form-grid">
<div className="form-group">
<label>Marca</label>
<input type="text" value={boleta?.marca || ""} readOnly/>
</div>

<div className="form-group">
<label>Modelo</label>
<input type="text" value={boleta?.modelo || ""} readOnly/>
</div>

<div className="form-group">
<label>Placas</label>
<input type="text" value={boleta?.placas || ""} readOnly/>
</div>

<div className="form-group">
<label>Estado</label>
<input type="text" value={boleta?.estado|| ""} readOnly/>
</div>

<div className="form-group">
<label>Tipo Vehículo</label>
<input type="text" value={boleta?.clase_vehiculo || ""} readOnly/>
</div>

<div className="form-group">
<label>Número Motor</label>
<input type="text"  value={boleta?.numero_motor || ""} readOnly/>
</div>

<div className="form-group">
<label>Color</label>
<input type="text"  value={boleta?.color || ""} readOnly/>
</div>

<div className="form-group">
<label>Número Serie</label>
<input type="text"  value={boleta?.numero_serie || ""} readOnly/>
</div></div>

{/* =====================
GARANTÍA
===================== */}

<div className="section-title">Garantía</div>
<div className="form-grid">
<div className="form-group">
<label>Licencia</label>
<input type="text"   value={boleta?.licencia || ""}readOnly/>
</div>

<div className="form-group">
<label>Tarjeta Circulación</label>
<input type="text"  value={boleta?.tarjeta_circulacion || ""} readOnly/>
</div>

<div className="form-group">
<label>Placas Garantía</label>
<input type="text"  value={boleta?.placas_garantia || ""} readOnly/>
</div>

<div className="form-group">
<label>Año</label>
<input type="number"  value={boleta?.anio || ""}  readOnly/>
</div>
</div>

{/* =====================
INFRACCIÓN
===================== */}

<div className="section-title">Infracción</div>
<div className="form-grid">
<div className="form-group">
<label>Motivo</label>
<input type="text"  value={boleta?.motivo || ""} readOnly/>

</div>
<div className="form-group full-width">
<label>Fundamento</label>
<input type="text"  value={boleta?.fundamento || ""} readOnly/>
</div>
<div className="form-group">
<label>Número Parte</label>
<input type="text" value={boleta?.numero_parte || ""} readOnly/>
</div>
<div className="form-group">
<label>Tipo Accidente</label>
<input type="text" value={boleta?.tipo_accidente || ""} readOnly/>
</div>
</div>

{/* =====================
OFICIAL
===================== */}
<div className="section-title">
Formuló
</div>

<div className="form-grid">
<div className="form-group">
<label>Número empleado</label>
<input type="text" value={boleta?.empleado_id || ""} readOnly/>
</div>

<div className="form-group">
<label>Oficial</label>
<input type="text" value={boleta?.empleado || ""} readOnly/>
</div>

<div className="form-group">
<label>Patrulla</label>
<input type="text"value={boleta?.patrulla || ""} readOnly/>
</div>
<div className="form-group full-width">
<label>Observaciones</label>
<input type="text" value={boleta?.observaciones|| ""} readOnly/>
</div>
</div>

{/* =====================
FIRMAS
===================== */}
<div className="section-title">Firmas</div>
<div className="form-grid">
<div className="form-group">
<label>Firma Oficial</label>

{boleta?.firma_oficial && (
    <img
        src={boleta.firma_oficial}
        alt="Firma oficial"
        className="firma-img"
    />
)}
</div>
<div className="form-group">
<label>Firma Conductor</label>

{boleta?.firma_conductor && (
    <img
        src={boleta.firma_conductor}
        alt="Firma conductor"
        className="firma-img"
    />
)}
</div>
</div>

</form>
</div>
</div>
<Footer/>
</div>
);}