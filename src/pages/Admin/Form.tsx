import {useState,useEffect} from "react";
import SignaturePad from "../../components/SignaturePad";
import {crearBoleta,enviarCodigoCorreo,verificarCodigoCorreo} from "../../services/boletaService";
import Footer from "../../components/Footer/Footer";
import {obtenerMarcas,obtenerModelos,obtenerEstados,obtenerClasesVehiculo,obtenerTiposVehiculo,  obtenerMotivos,obtenerCodigoPostal} from "../../services/catalogoService";
import toast from "react-hot-toast";
import "./Form.css";
import NavbarAdmin from "../../components/Navbar/NavbarAdmin";
interface CatalogoItem {
  id: number;
  nombre: string;
  clave: string;
  descripcion?: string;
}

const LOCALIDADES = [
  "La Cañada",
  "Saldarriaga",
  "La Pradera",
  "Fraccionamiento Zibata",
  "Paseos del Marqués",
  "El mirador",
  "Real Solare",
  "Amazcala",
  "Fraccionamiento Hacienda la cruz",
  "Colinas de la Piedad",
  "General Lázaro Cárdenas (El Colorado)",
  "Villas la Piedad",
  "La Griega",
  "Ganadería Los Encinos",
  "Santa Cruz",
  "Fraccionamiento Zakia",
  "La Piedad (San Miguel Colorado)",
  "San Isidro Miranda",
  "Chichimequillas",
  "Atongo",
  "Jesús María",
  "Rincones del Marqués",
  "Alfajayucan",
  "Tierra Blanca",
  "Palo Alto",
];

const obtenerFechaHoraActual = () => {
  const ahora = new Date();
  const anio = ahora.getFullYear();
  const mes = String(ahora.getMonth() + 1).padStart(2, "0");
  const dia = String(ahora.getDate()).padStart(2, "0");
  const horas = String(ahora.getHours()).padStart(2, "0");
  const minutos = String(ahora.getMinutes()).padStart(2, "0");
  return {
    fecha: `${anio}-${mes}-${dia}`,
    hora: `${horas}:${minutos}`,
    anio,
  };
};
export default function NewSolicitudadm(){
// =================================
// DATOS GENERALES
// =================================
const [fecha,setFecha] = useState(() => obtenerFechaHoraActual().fecha);
const [hora,setHora] = useState(() => obtenerFechaHoraActual().hora);
const [lugar,setLugar] = useState("");
const [lugarAlternativo, setLugarAlternativo] = useState("");
const [correoVerificado, setCorreoVerificado] = useState(false);
const [codigoCorreo, setCodigoCorreo] = useState("");
const [, setEnviandoCodigo] = useState(false);
const lugarFinal = lugar === "OTRA" ? lugarAlternativo.trim() : lugar.trim();
const showSuccess = (message:string)=>{
  toast.success(message,{
    style:{
      background:"#FFFFFF",
      color:"#2A3086",
      border:"2px solid #92C4D7",
      borderRadius:"14px",
      fontFamily:"DM Sans, sans-serif",
    },
    iconTheme:{
      primary:"#E63289",
      secondary:"#FFFFFF",
    },
  });
};
const showError = (message:string)=>{
  toast.error(message,{
    style:{
      background:"#FFFFFF",
      color:"#2A3086",
      border:"2px solid #E63289",
      borderRadius:"14px",
      fontFamily:"DM Sans, sans-serif",
    },
  });
};
// =================================
// CONDUCTOR
// =================================
const [conductorNombre,setConductorNombre] =useState("");
const [conductorCalle,setConductorCalle] =useState("");
const [conductorNumero,setConductorNumero] =useState("");
const [conductorNumeroInterior,setConductorNumeroInterior] =useState("");
const [conductorColonia,setConductorColonia] =useState("");
const [conductorCP,setConductorCP] =useState("");
const [conductorMunicipio,setConductorMunicipio] =useState("");
const [conductorEstado,setConductorEstado] =useState("");
const [telefono,setTelefono] =useState("");
const [correo,setCorreo] =useState("");
// =================================
// PROPIETARIO
// =================================
const [conductorEsPropietario, setConductorEsPropietario] = useState(false);
const [propietarioNombre,setPropietarioNombre] =useState("");
const [propietarioCalle,setPropietarioCalle] =useState("");
const [propietarioNumero,setPropietarioNumero] =useState("");
const [propietarioNumeroInterior,setPropietarioNumeroInterior] = useState("");
const [propietarioColonia,setPropietarioColonia] = useState("");
const [propietarioCP,setPropietarioCP] =useState("");
const [propietarioMunicipio,setPropietarioMunicipio] = useState("");
const [propietarioEstado,setPropietarioEstado] = useState("");
/* eslint-disable react-hooks/set-state-in-effect */
useEffect(() => {
  if (!conductorEsPropietario) return;
  setPropietarioNombre(conductorNombre);
  setPropietarioCalle(conductorCalle);
  setPropietarioNumero(conductorNumero);
  setPropietarioNumeroInterior(conductorNumeroInterior);
  setPropietarioColonia(conductorColonia);
  setPropietarioCP(conductorCP);
  setPropietarioMunicipio(conductorMunicipio);
  setPropietarioEstado(conductorEstado);
}, [
  conductorEsPropietario,
  conductorNombre,
  conductorCalle,
  conductorNumero,
  conductorNumeroInterior,
  conductorColonia,
  conductorCP,
  conductorMunicipio,
  conductorEstado
]);
/* eslint-enable react-hooks/set-state-in-effect */
// =================================
// VEHICULO
// =================================
const [marcaId,setMarcaId] =useState<number>(0);
const [modeloId,setModeloId] =useState<number>(0);
const [estadoClave,setEstadoClave] =useState("");
const [tipoVehiculoId,setTipoVehiculoId] =useState<number>(0);
const [placas,setPlacas] =useState("");
const [numeroMotor,setNumeroMotor] =useState("");
const [color,setColor] =useState("");
const [numeroSerie,setNumeroSerie] =useState("");
// =================================
// GARANTIA
// ================================
const [licencia,setLicencia] =useState("");
const [tarjetaCirculacion,setTarjetaCirculacion] =useState("");
const [placasGarantia,setPlacasGarantia] =useState("");
// =================================
// INFRACCION
// =================================
const [motivosSeleccionados,setMotivosSeleccionados] =useState<number[]>([]);
const [fundamento,setFundamento] =useState("");
const [numeroParte,setNumeroParte] =useState("");
const [tipoAccidente,setTipoAccidente] =useState("");

const toggleMotivo = (id: number) => {
  setMotivosSeleccionados((prev) =>
    prev.includes(id)
      ? prev.filter((motivoId) => motivoId !== id)
      : [...prev, id]
  );
};
// =================================
// OFICIAL
// =================================
const [empleadoId] = useState<number>(
    Number(localStorage.getItem("user_id"))
);
const [nombreOficial] = useState<string>(
    localStorage.getItem("user_name") || ""
);
const [patrulla,setPatrulla] = useState("");
const [observaciones,setObservaciones] = useState("");
const [firmaKey, setFirmaKey] = useState(0);
// =================================
// FIRMAS
// =================================
const [firmaOficial,setFirmaOficial] =useState("");
const [firmaConductor,setFirmaConductor] =useState("");
// =================================
// CATALOGOS
// =================================
const [marcas,setMarcas] =useState<CatalogoItem[]>([]);
const [modelos,setModelos] =useState<CatalogoItem[]>([]);
const [estados,setEstados] =useState<CatalogoItem[]>([]);
const [motivos,setMotivos] =useState<CatalogoItem[]>([]);
const [anio,setAnio] = useState<number | null>(() => obtenerFechaHoraActual().anio);
const [clasesVehiculo, setClasesVehiculo] = useState<CatalogoItem[]>([]);
const [claseVehiculoId, setClaseVehiculoId] = useState<number>(0);
const [tiposVehiculo, setTiposVehiculo] = useState<CatalogoItem[]>([]);
// =================================
// FECHA Y HORA AUTOMÃTICA
// ================================
// =================================
// CARGAR CATALOGOS
// =================================
useEffect(() => {
  const cargarCatalogos = async () => {
    try {
      const marcasResponse = await obtenerMarcas();
      const estadosResponse = await obtenerEstados();
      const clasesResponse = await obtenerClasesVehiculo();
      const motivosResponse = await obtenerMotivos();
      setMarcas(marcasResponse.data);
      setEstados(estadosResponse.data);
      setClasesVehiculo(clasesResponse.data);
      setMotivos(motivosResponse.data);
    } catch (error) {
      console.error("Error cargando catálogos", error);
    }
  };
  cargarCatalogos();
}, []);
// =================================
// CARGAR MODELOS POR MARCA
// =================================
useEffect(()=>{
  const cargarModelos = async()=>{
    if(marcaId === 0){
      setModelos([]);
      setModeloId(0);
      return;}
    try{
      const response =await obtenerModelos(marcaId);
      setModelos(response.data);
    }catch(error){
      console.error("Error cargando modelos",error);
      setModelos([]);}};
  cargarModelos();
},[marcaId]);
// =================================
// CARGAR TIPOS POR CLASE
// =================================
useEffect(() => {
  const cargarTipos = async () => {
    if (claseVehiculoId === 0) {
      setTiposVehiculo([]);
      setTipoVehiculoId(0);
      return;
    }
    try {
      const response = await obtenerTiposVehiculo(claseVehiculoId);
      console.log(response.data);
      setTiposVehiculo(response.data);
    } catch (error) {
      console.error("Error cargando tipos", error);
      setTiposVehiculo([]);
    }
  };
  cargarTipos();
}, [claseVehiculoId]);
// =================================
// BUSCAR DIRECCIÓN POR CÓDIGO POSTAL
// =================================
const buscarCodigoPostal = async (cp: string) => {
  if (cp.length !== 5) {
    return;
  }
  try {
    const response = await obtenerCodigoPostal(cp);
    const data = response.data;
    console.log("Información del CP:", data);
    if (!data.encontrado) {
      throw new Error("Código postal no encontrado");
    }
    // =========================
    // MUNICIPIO
    // =========================
    setConductorMunicipio(
      data.municipio || ""
    );
    // =========================
    // ESTADO
    // =========================
    const estadoEncontrado = estados.find(
      (estado) =>
        estado.nombre
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "") ===
        data.estado
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
    );
    if (estadoEncontrado) {
      setConductorEstado(
        estadoEncontrado.clave
      );
    } else {
      setConductorEstado("");
    }
  } catch (error) {
    console.error(
      "Error consultando código postal:",
      error
    );
    setConductorMunicipio("");
    setConductorEstado("");
    showError(
      "Código postal no encontrado"
    );
  }
};
const limpiarFormulario = () => {
  // ==========================
  // GENERALES
  // ==========================
  setLugar("");
  setLugarAlternativo("");
  const ahora = new Date();
  const anioActual = ahora.getFullYear();
  const mes = String(ahora.getMonth() + 1).padStart(2, "0");
  const dia = String(ahora.getDate()).padStart(2, "0");
  const horas = String(ahora.getHours()).padStart(2, "0");
  const minutos = String(ahora.getMinutes()).padStart(2, "0");
  setFecha(`${anioActual}-${mes}-${dia}`);
  setHora(`${horas}:${minutos}`);
  setAnio(anioActual);
  // ==========================
  // CONDUCTOR
  // ==========================
  setConductorNombre("");
  setConductorCalle("");
  setConductorNumero("");
  setConductorNumeroInterior("");
  setConductorColonia("");
  setConductorMunicipio("");
  setConductorEstado("");
  setConductorCP("");
  setTelefono("");
  setCorreo("");
  // ==========================
  // PROPIETARIO
  // ==========================
  setPropietarioNombre("");
  setPropietarioCalle("");
  setPropietarioNumero("");
  setPropietarioNumeroInterior("");
  setPropietarioColonia("");
  setPropietarioMunicipio("");
  setPropietarioEstado("");
  setPropietarioCP("");
  // ==========================
  // VEHÍCULO
  // ==========================
  setMarcaId(0);
  setModeloId(0);
  setClaseVehiculoId(0);      // si agregaste Clase
  setTipoVehiculoId(0);
  setEstadoClave("");
  setPlacas("");
  setNumeroMotor("");
  setColor("");
  setNumeroSerie("");
  // ==========================
  // GARANTÍA
  // ==========================
  setLicencia("");
  setTarjetaCirculacion("");
  setPlacasGarantia("");
  // ==========================
  // INFRACCIÓN
  // ==========================
  setMotivosSeleccionados([]);
  setFundamento("");
  setNumeroParte("");
  setTipoAccidente("");
  // ==========================
  // OFICIAL
  // ==========================
  setPatrulla("");
  setObservaciones("");
  // ==========================
  // FIRMAS
  // ==========================
  setFirmaOficial("");
  setFirmaConductor("");
  setFirmaKey((prev) => prev + 1);
  // ==========================
  // LISTAS DEPENDIENTES
  // ==========================
  setModelos([]);
  setTiposVehiculo([]);
};
const enviarCodigo = async () => {
  if (!correo) {
  showError("Ingrese un correo.");
  return;
}
  try {
    setEnviandoCodigo(true);
    await enviarCodigoCorreo(correo);
    showSuccess("Se envió un código al correo.");
  } catch {
    showError("No fue posible enviar el código.");
  } finally {
    setEnviandoCodigo(false);
  }
};
const verificarCodigo = async () => {
  try {
    await verificarCodigoCorreo(
      correo,
      codigoCorreo
    );
    setCorreoVerificado(true);
    showSuccess("Correo verificado correctamente.");
  } catch {
    showError("Código incorrecto.");
  }
};
// =================================
// GUARDAR BOLETA
// ================================
const handleSubmit = async(
  e: React.FormEvent<HTMLFormElement>
)=>{ e.preventDefault();
  const form = e.currentTarget;
  if(!form.checkValidity()){
    form.reportValidity();
    return;}
  if (!lugarFinal) {
    showError("La localidad es obligatoria.");
    return;
  }
  if (!conductorNombre.trim()) {
    showError("El nombre del conductor es obligatorio.");
    return;
  }
  if (!telefono.trim()) {
    showError("El teléfono del conductor es obligatorio.");
    return;
  }
  if (!marcaId || !modeloId || !placas.trim() || !estadoClave || !claseVehiculoId || !tipoVehiculoId) {
    showError("Los datos principales del vehículo son obligatorios.");
    return;
  }
  if (!motivosSeleccionados.length) {
    showError("Seleccione al menos un motivo de infracción.");
    return;
  }
  if(!firmaOficial){
    showError("La firma del oficial es obligatoria");
    return;}
  if(!firmaConductor){
    showError("La firma del conductor es obligatoria");
    return;}
  if (correo && !correoVerificado) {
    showError("Debe verificar el correo antes de guardar la boleta.");
    return;
  }
  const boleta = {
    // ==========================
    // GENERALES
    // ==========================
    lugar: lugarFinal,
    fecha,
    hora,
    // ==========================
    // CONDUCTOR
    // ==========================
    conductor_nombre:conductorNombre,
    conductor_calle:conductorCalle,
    conductor_numero:conductorNumero,
    conductor_numero_interior:conductorNumeroInterior,
    conductor_colonia:conductorColonia,
    conductor_municipio:conductorMunicipio,
    conductor_estado:conductorEstado,
    conductor_cp:conductorCP,
    conductor_telefono:telefono,
    conductor_correo: correo || null,
    // ==========================
    // PROPIETARIO
    // ==========================
    propietario_nombre:propietarioNombre,
    propietario_calle:propietarioCalle,
    propietario_numero:propietarioNumero,
    propietario_numero_interior:propietarioNumeroInterior,
    propietario_colonia:propietarioColonia,
    propietario_municipio:propietarioMunicipio,
    propietario_estado:propietarioEstado,
    propietario_cp:propietarioCP,
    // ==========================
    // VEHICULO
    // ==========================
    marca_id:marcaId,
    modelo_id:modeloId,
    placas,
    estado_clave:estadoClave,
    tipo_vehiculo_id:tipoVehiculoId,
    numero_motor:numeroMotor,
    color,
    numero_serie:numeroSerie,
    // ==========================
    // GARANTIA
    // ==========================
    licencia,
    tarjeta_circulacion:tarjetaCirculacion,
    placas_garantia:placasGarantia,
    anio,
    // ==========================
    // INFRACCION
    // ==========================
    motivo_catalogo_id: motivosSeleccionados[0] ?? null,
    motivos_catalogo_ids: motivosSeleccionados.length ? motivosSeleccionados : null,
    fundamento,
    numero_parte:numeroParte,
    tipo_accidente:tipoAccidente,
    // ==========================
    // OFICIAL
    // ==========================
    empleado_id:empleadoId,
    patrulla,observaciones,
    // ==========================
    // FIRMAS
    // ==========================
    firma_oficial:firmaOficial,
    firma_conductor:firmaConductor
  };
  try{
    const response = await crearBoleta(boleta);
    console.log("Respuesta backend:",response.data);
    showSuccess("Boleta guardada correctamente");
    limpiarFormulario();
  }catch(error){
    console.error("Error creando boleta:", error);
    showError("Error al guardar la boleta");
  }
};
return (
<div className="solicitud-page">
  <NavbarAdmin></NavbarAdmin>
<div className="solicitud-container">
<div className="solicitud-card">
<h1 className="solicitud-title">Boleta de Infracción</h1><br/>
<form
className="solicitud-form"
onSubmit={handleSubmit}
noValidate>
{/* =========================
    LUGAR Y FECHA
========================= */}
<div className="section-title">Lugar y Fecha</div>
<div className="form-grid">
<div className="form-group">
  <label>Localidad</label>
  <select
    value={lugar}
    onChange={(e) => setLugar(e.target.value)}
  >
    <option value="">Seleccione una localidad...</option>
    {LOCALIDADES.map((localidad) => (
      <option key={localidad} value={localidad}>
        {localidad}
      </option>
    ))}
    <option value="OTRA">Otra localidad...</option>
  </select>
  {lugar === "OTRA" && (
    <input
      type="text"
      value={lugarAlternativo}
      onChange={(e) => setLugarAlternativo(e.target.value)}
      placeholder="Escriba la localidad"
      style={{ marginTop: "0.5rem" }}
    />
  )}
</div>
<div className="form-group">
<label>Hora</label>
<div className="static-value">{hora}</div>
</div>
<div className="form-group">
<label>Fecha</label>
<div className="static-value">{fecha}</div>
</div>
</div>
<div className="form-grid">
  <div className="form-group full-width">
    <label>Lugar registrado</label>
    <div className="static-value">{lugarFinal || "Sin localidad"}</div>
  </div>
</div>
{/* =========================
    CONDUCTOR
========================= */}
<div className="section-title">Conductor</div>
<div className="form-grid">
<div className="form-group">
<label>Nombre del Conductor*</label>
<input
  type="text"
  maxLength={120}
  value={conductorNombre}
  onChange={(e)=>setConductorNombre(e.target.value)}
  required
/>
</div>
<div className="form-group">
<label>Teléfono*</label>
<input
type="tel"
value={telefono}
maxLength={10}
placeholder="10 dígitos"
onChange={(e)=>{
const valor = e.target.value.replace(/\D/g, "");
setTelefono(valor.slice(0,10));
}}
required
/>
</div>
<div className="form-group">
    <label>Correo</label>
    <div className="input-button-group">
        <input
            type="email"
            value={correo}
            placeholder="correo@gmail.com"
            onChange={(e) => {
                setCorreo(e.target.value);
                setCorreoVerificado(false);
            }}
        />
        <button
            type="button"
            className="btn-small"
            onClick={enviarCodigo}
            disabled={!correo || correoVerificado}
        >
            {correoVerificado ? "✓ Verificado" : "Enviar código"}
        </button>
    </div>
{!correoVerificado && (
<div className="form-group">
  <br></br>
    <label>Código de verificación</label>
    <div className="input-button-group">
        <input
            type="text"
            maxLength={6}
            placeholder="Ingrese el código"
            value={codigoCorreo}
            onChange={(e)=>setCodigoCorreo(e.target.value)}
        />
        <button
            type="button"
            className="btn-small"
            onClick={verificarCodigo}
        >
            Verificar
        </button>
    </div>
</div>
)}
</div>
</div>
{/* =========================
  DIRECCIÃ“N CONDUCTOR
  ========================= */}
<div className="section-title">Dirección del Conductor</div>
<div className="form-grid">
<div className="form-group">
<label>Calle</label>
<input
  type="text"
  maxLength={120}
  value={conductorCalle}
  onChange={(e)=>setConductorCalle(e.target.value)}
/>
</div>
<div className="form-group">
<label>Número Exterior</label>
<input
type="text"
value={conductorNumero}
onChange={(e)=>
setConductorNumero(
e.target.value)}/>
</div>
<div className="form-group">
<label>Número Interior</label>
<input
type="text"
value={conductorNumeroInterior}
onChange={(e)=>setConductorNumeroInterior(e.target.value)}/>
</div>
<div className="form-group">
<label>Colonia</label>
<input
type="text"
value={conductorColonia}
onChange={(e)=>
setConductorColonia(e.target.value)}/></div>
<div className="form-group">
<label>Código Postal</label>
<input 
  type="text" 
  maxLength={5} 
  pattern="[0-9]{5}" 
  value={conductorCP} 
  onChange={(e) => {
    const valor = e.target.value
      .replace(/\D/g, "")
      .slice(0, 5);
    setConductorCP(valor);
    if (valor.length === 5) {
      buscarCodigoPostal(valor);
    }
  }} 
/>
</div>
<div className="form-group">
<label>Municipio</label>
<input type="text"
value={conductorMunicipio}
onChange={(e)=>setConductorMunicipio(e.target.value)}/>
</div>
<div className="form-group">
<label>Estado</label>
<select
value={conductorEstado}
onChange={(e)=>setConductorEstado(e.target.value)}>
<option value="">Seleccione...</option>
{estados.map((estado)=>(
<option
key={estado.clave}
value={estado.clave} >
{estado.nombre}
</option>
))}
</select>
</div>
</div>
{/* =========================
  PROPIETARIO
  ========================= */}
<div className="section-title">Propietario</div>
<div className="checkbox-container">
  <label className="checkbox-label">
    <input
      type="checkbox"
      checked={conductorEsPropietario}
      onChange={(e) => {
        const marcado = e.target.checked;
        setConductorEsPropietario(marcado);
        if (!marcado) {
          setPropietarioNombre("");
          setPropietarioCalle("");
          setPropietarioNumero("");
          setPropietarioNumeroInterior("");
          setPropietarioColonia("");
          setPropietarioCP("");
          setPropietarioMunicipio("");
          setPropietarioEstado("");
        }
      }}
    />
    <span className="custom-checkbox"></span>
    <span className="checkbox-text">
      El conductor es el propietario
    </span>
  </label>
</div>
<div className="form-grid">
<div className="form-group">
<label>Nombre del Propietario</label>
<input
  type="text"
  maxLength={120}
  value={propietarioNombre}
  onChange={(e)=>setPropietarioNombre(e.target.value)}
  />
</div>
</div>
<div className="section-title">Dirección del Propietario</div>
<div className="form-grid">
<div className="form-group">
<label>Calle</label>
<input
type="text"
value={propietarioCalle}
onChange={(e)=>setPropietarioCalle(e.target.value)}/>
</div>
<div className="form-group">
<label>Número Exterior*</label>
<input
type="text"
value={propietarioNumero}
onChange={(e)=>setPropietarioNumero(e.target.value)} />
</div>
<div className="form-group">
<label>Número Interior</label>
<input
type="text"
value={propietarioNumeroInterior}
onChange={(e)=>setPropietarioNumeroInterior(e.target.value)} />
</div>
<div className="form-group">
<label> Colonia </label>
<input
type="text"
value={propietarioColonia}
onChange={(e)=>setPropietarioColonia(e.target.value)}
/></div>
<div className="form-group">
<label>Código Postal</label>
<input
type="text"
maxLength={5}
value={propietarioCP}
onChange={(e)=>setPropietarioCP( e.target.value)}/></div>
<div className="form-group">
<label>Municipio</label>
<input
type="text"
value={propietarioMunicipio}
onChange={(e)=>setPropietarioMunicipio(e.target.value
)}/></div>
<div className="form-group">
<label>Estado</label>
<select
value={propietarioEstado}
onChange={(e)=>setPropietarioEstado(e.target.value)}>
<option value="">Seleccione...</option>{
estados.map(
(estado)=>(
<option
key={estado.clave}
value={estado.clave}>
{estado.nombre}
</option>))}
</select></div></div>
{/* =========================
  VEHÃCULO
  ========================= */}
<div className="section-title">Vehí­culo</div>
<div className="form-grid">
<div className="form-group">
<label>Marca*</label>
<select
value={marcaId}
onChange={(e)=>{
const id = Number(e.target.value);
setMarcaId(id);
setModeloId(0); }} required>
<option value={0}>Seleccione...</option>{
marcas.map(
(marca)=>(
<option
key={marca.id}
value={marca.id}>
{marca.nombre}
</option>
))}
</select></div>
<div className="form-group">
<label>Modelo*</label>
<select
value={modeloId}
onChange={(e)=>
setModeloId(
Number(e.target.value))}required> 
<option value={0}>Seleccione...</option>{
modelos.map(
(modelo)=>(
<option
key={modelo.id}
value={modelo.id}>
{modelo.nombre}
</option> ))}
</select></div>
<div className="form-group">
<label>Placas*</label>
<input
  type="text"
  maxLength={10}
  value={placas}
  onChange={(e)=>
  setPlacas(
  e.target.value.toUpperCase()
  )}required/>
</div>
<div className="form-group">
<label>Estado*</label>
<select
value={estadoClave}
onChange={(e)=>
setEstadoClave(
e.target.value)} required>
<option value="">Seleccione...</option>{
estados.map(
(estado)=>(
<option
key={estado.clave}
value={estado.clave}>
{estado.nombre}
</option>
))}</select></div>
<div className="form-group">
<label>Clase de vehículo*</label>
<select
    value={claseVehiculoId}
    onChange={(e) => {
        const id = Number(e.target.value);
        setClaseVehiculoId(id);
        setTipoVehiculoId(0);
    }}
    required
>
<option value={0}>Seleccione...</option>
{clasesVehiculo.map((clase) => (
<option
    key={clase.id}
    value={clase.id}>
    {clase.nombre}
</option>))}
</select></div>
<div className="form-group">
<label>Tipo de vehículo*</label>
<select
value={tipoVehiculoId}
onChange={(e)=>
setTipoVehiculoId(
Number(e.target.value)
)}required>
<option value={0}>Seleccione...</option>{
tiposVehiculo.map(
(tipo)=>(
<option
key={tipo.id}
value={tipo.id}>
{tipo.nombre}
</option>
))}
</select></div>
<div className="form-group">
<label>Número de Motor</label>
<input
  type="text"
  maxLength={15}
  value={numeroMotor}
  onChange={(e)=>setNumeroMotor(e.target.value)}/>
</div>
<div className="form-group">
<label>Color</label>
<input
  type="text"
  maxLength={20}
  value={color}
  onChange={(e)=>
  setColor(e.target.value)}/>
  </div>
<div className="form-group">
<label>Número de Serie</label>
<input
  type="text"
  maxLength={20}
  value={numeroSerie}
  onChange={(e)=>setNumeroSerie(e.target.value)} />
</div></div>
{/* =========================
  GARANTÃA
  ========================= */}
<div className="section-title">Garantía</div>
<div className="form-grid">
<div className="form-group">
<label>Licencia No.</label>
<input
  type="text"
  maxLength={20}
  value={licencia}
  onChange={(e)=>setLicencia(e.target.value)}/>
</div>
<div className="form-group">
<label>Tarjeta de Circulación</label>
<input
  type="text"
  maxLength={30}
  value={tarjetaCirculacion}
  onChange={(e)=>setTarjetaCirculacion(e.target.value)}/>
</div>
<div className="form-group">
<label>Placas Garantí­a</label>
<input
  type="text"
  maxLength={10}
  value={placasGarantia}
  onChange={(e)=>setPlacasGarantia(e.target.value.toUpperCase())}/>
</div>
<div className="form-group">
<label>Año</label>
<input
type="number"
value={anio ?? ""}
onChange={(e)=>{const value =e.target.value;
setAnio(
value ?
Number(value)
:null);}}/>
</div></div>
{/* =========================
  INFRACCIÃ“N
  ========================= */}
<div className="section-title">Motivo de la Infracción</div>
<div className="form-grid">
<div className="form-group full-width">
<label>Motivos de infracción</label>
<div className="checkbox-list">
  {motivos.map((motivo) => {
    const checked = motivosSeleccionados.includes(motivo.id);
    return (
      <label key={motivo.id} className="checkbox-item">
        <input
          type="checkbox"
          checked={checked}
          onChange={() => toggleMotivo(motivo.id)}
        />
        <span>{motivo.descripcion}</span>
      </label>
    );
  })}
</div>
</div>
<div className="form-group full-width">
<label>Fundamento</label>
<textarea
rows={3}
value={fundamento}
onChange={(e)=>setFundamento(e.target.value)}/>
</div>
<div className="form-group">
<label>Número de Parte</label>
<input
type="text"
value={numeroParte}
onChange={(e)=>setNumeroParte(e.target.value)}/>
</div>
<div className="form-group">
<label>Tipo Accidente</label>
<input
type="text"
value={tipoAccidente}
onChange={(e)=>setTipoAccidente(e.target.value)}/>
</div></div>
{/* =========================
  FORMULÃ“
  ========================= */}
<div className="section-title">Formuló</div>
<div className="form-grid">
<div className="form-group">
<label>Número de empleado</label>
<input
type="text"
value={empleadoId}
readOnly
/>
</div>
<div className="form-group">
<label>Oficial</label>
<input
type="text"
value={nombreOficial}
readOnly
/>
</div>
<div className="form-group">
<label>Número de Patrulla</label>
<input
type="text"
value={patrulla}
onChange={(e)=>setPatrulla(e.target.value)}/>
</div>
<div className="form-group full-width">
<label>Observaciones</label>
<textarea
rows={4}
value={observaciones}
onChange={(e)=>setObservaciones(e.target.value)}/>
</div></div>
{/* =========================
  FIRMAS
  ========================= */}
<div className="section-title">Firmas</div>
<div className="form-grid">
<div className="form-group">
<label>Oficial</label>
<input
type="text"
value={nombreOficial}
readOnly
/>
<SignaturePad
key={`oficial-${firmaKey}`}
label="Firma del Oficial"
onChange={setFirmaOficial}
/>
</div>
<div className="form-group">
<label>Conductor</label>
<input
type="text"
value={conductorNombre}
readOnly
/>
<SignaturePad
key={`conductor-${firmaKey}`}
label="Firma del Conductor"
onChange={setFirmaConductor}
/>
</div>
</div>
{/* ========================
  BOTON GUARDAR
  ========================= */}
<div className="button-container">
<button type="submit" className="btn-submit">Guardar Boleta </button>
</div>
</form>
</div>
</div>
<Footer />
</div>
);}