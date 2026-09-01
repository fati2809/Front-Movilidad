import {useState,useEffect} from "react";
import SignaturePad from "../../components/SignaturePad";
import {crearBoleta,actualizarBoleta,obtenerBoletaPorId,enviarCodigoCorreo,verificarCodigoCorreo} from "../../services/boletaService";
import Footer from "../../components/Footer/Footer";
import {obtenerMarcas,obtenerModelos,obtenerEstados,obtenerClasesVehiculo,obtenerTiposVehiculo,  obtenerMotivos} from "../../services/catalogoService";
import toast from "react-hot-toast";
import "./Form.css";
import NavbarAdmin from "../../components/Navbar/NavbarAdmin";
import { useParams } from "react-router-dom";

export default function FormEdit(){

  const { id } = useParams();  
// =================================
// DATOS GENERALES
// =================================

const [fecha,setFecha] = useState("");
const [hora,setHora] = useState("");
const [lugar,setLugar] = useState("");
const [correoVerificado, setCorreoVerificado] = useState(false);
const [codigoCorreo, setCodigoCorreo] = useState("");
const [, setEnviandoCodigo] = useState(false);

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

const [propietarioNombre,setPropietarioNombre] =useState("");
const [propietarioCalle,setPropietarioCalle] =useState("");
const [propietarioNumero,setPropietarioNumero] =useState("");
const [propietarioNumeroInterior,setPropietarioNumeroInterior] = useState("");
const [propietarioColonia,setPropietarioColonia] = useState("");
const [propietarioCP,setPropietarioCP] =useState("");
const [propietarioMunicipio,setPropietarioMunicipio] = useState("");
const [propietarioEstado,setPropietarioEstado] = useState("");

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

const [motivoCatalogoId,setMotivoCatalogoId] =useState<number|null>(null);
const [fundamento,setFundamento] =useState("");
const [numeroParte,setNumeroParte] =useState("");
const [tipoAccidente,setTipoAccidente] =useState("");

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
const [firmaKey] = useState(0);
// =================================
// FIRMAS
// =================================

const [firmaOficial,setFirmaOficial] =useState("");
const [firmaConductor,setFirmaConductor] =useState("");

// =================================
// CATALOGOS
// =================================

const [marcas,setMarcas] =useState<any[]>([]);
const [modelos,setModelos] =useState<any[]>([]);
const [estados,setEstados] =useState<any[]>([]);
const [motivos,setMotivos] =useState<any[]>([]);
const [anio,setAnio] = useState<number | null>(null);
const [clasesVehiculo, setClasesVehiculo] = useState<any[]>([]);
const [claseVehiculoId, setClaseVehiculoId] = useState<number>(0);
const [tiposVehiculo, setTiposVehiculo] = useState<any[]>([]);

// =================================
// CARGAR BOLETA PARA EDITAR
// =================================

useEffect(()=>{

  const cargarBoleta = async()=>{

    if (
    !id ||
    marcas.length === 0 ||
    estados.length === 0 ||
    motivos.length === 0 ||
    clasesVehiculo.length === 0
){
    return;
}

    try{

      const response = await obtenerBoletaPorId(Number(id));

      const b = response.data;
      const marca = marcas.find(
  (m) => m.nombre === b.marca
);

const estadoVehiculo = estados.find(
  (e) => e.nombre === b.estado
);

const clase = clasesVehiculo.find(
  (c) => c.nombre === b.clase_vehiculo
);

const motivo = motivos.find(
  (m) => m.descripcion.trim().toLowerCase() ===
         b.motivo.trim().toLowerCase()
);
       // Buscar la clave del estado por el nombre
        const estadoConductor = estados.find(
        (e) => e.nombre === b.conductor_estado
        );

        const estadoPropietario = estados.find(
        (e) => e.nombre === b.propietario_estado
        );
        

      // GENERALES
      setFecha(b.fecha);
      setHora(b.hora);
      setLugar(b.lugar);


      // CONDUCTOR
      setConductorNombre(b.conductor_nombre || "");
      setConductorCalle(b.conductor_calle || "");
      setConductorNumero(b.conductor_numero || "");
      setConductorNumeroInterior(b.conductor_numero_interior || "");
      setConductorColonia(b.conductor_colonia || "");
      setConductorCP(b.conductor_cp || "");
      setConductorMunicipio(b.conductor_municipio || "");
      setConductorEstado(estadoConductor?.clave || "");
      setTelefono(b.conductor_telefono || "");
      setCorreo(b.conductor_correo || "");


      // PROPIETARIO
      setPropietarioNombre(b.propietario_nombre || "");
      setPropietarioCalle(b.propietario_calle || "");
      setPropietarioNumero(b.propietario_numero || "");
      setPropietarioNumeroInterior(b.propietario_numero_interior || "");
      setPropietarioColonia(b.propietario_colonia || "");
      setPropietarioCP(b.propietario_cp || "");
      setPropietarioMunicipio(b.propietario_municipio || "");
      setPropietarioEstado(estadoPropietario?.clave || "");


      // VEHICULO

      if (marca) {
    setMarcaId(marca.id);

    const responseModelos = await obtenerModelos(marca.id);
    setModelos(responseModelos.data);

    const modelo = responseModelos.data.find(
        (m: any) => m.nombre === b.modelo
    );

    setModeloId(modelo?.id || 0);
}

setEstadoClave(estadoVehiculo?.clave || "");

if (clase) {
    setClaseVehiculoId(clase.id);

    const responseTipos = await obtenerTiposVehiculo(clase.id);
    setTiposVehiculo(responseTipos.data);

    const tipo = responseTipos.data.find(
        (t: any) => t.nombre === b.tipo_vehiculo
    );

    setTipoVehiculoId(tipo?.id || 0);
}

setMotivoCatalogoId(motivo?.id || null);

    
      setPlacas(b.placas || "");
      setNumeroMotor(b.numero_motor || "");
      setColor(b.color || "");
      setNumeroSerie(b.numero_serie || "");


      // GARANTIA

      setLicencia(b.licencia || "");
      setTarjetaCirculacion(b.tarjeta_circulacion || "");
      setPlacasGarantia(b.placas_garantia || "");
      setAnio(b.anio || null);


      // INFRACCION

      setMotivoCatalogoId(
        b.motivo_catalogo_id || null
      );

      setFundamento(b.fundamento || "");
      setNumeroParte(b.numero_parte || "");
      setTipoAccidente(b.tipo_accidente || "");


      // OFICIAL

      setPatrulla(b.patrulla || "");
      setObservaciones(b.observaciones || "");


      // FIRMAS

      setFirmaOficial(b.firma_oficial || "");
      setFirmaConductor(b.firma_conductor || "");


      // correo ya viene validado porque existe

      setCorreoVerificado(true);


    }catch(error){

      console.error(
        "Error cargando boleta:",
        error
      );

      showError(
        "No se pudo cargar la boleta"
      );

    }

  };


  cargarBoleta();


},[
  id,
  marcas,
  estados,
  motivos,
  clasesVehiculo
]);

// =================================
// FECHA Y HORA AUTOMÃTICA
// ================================

useEffect(()=>{

const ahora = new Date();
const anio = ahora.getFullYear();
const mes =String( ahora.getMonth()+1).padStart(2,"0");
const dia = String(ahora.getDate()).padStart(2,"0");
  setFecha(`${anio}-${mes}-${dia}`);
  setAnio(anio);
const horas =String(ahora.getHours()).padStart(2,"0");
const minutos = String(ahora.getMinutes()).padStart(2,"0");
  setHora(`${horas}:${minutos}`);
},[]);

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

const enviarCodigo = async () => {

  if (!correo) {
  showError("Ingrese un correo.");
  return;
}

  try {

    setEnviandoCodigo(true);

    await enviarCodigoCorreo(correo);

    showSuccess("Se envió un código al correo.");

  } catch (error) {

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

  } catch (error) {

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
  if(!firmaOficial){
    showError("La firma del oficial es obligatoria");
    return;}
  if(!firmaConductor){
    showError("La firma del conductor es obligatoria");
    return;}
    if (!correoVerificado) {
  showError("Debe verificar el correo antes de guardar la boleta.");
  return;
}

  const boleta = {
    // ==========================
    // GENERALES
    // ==========================
    lugar,fecha,hora,

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
    conductor_correo:correo,

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

    motivo_catalogo_id:motivoCatalogoId,
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

    let response;

if(id){

 response = await actualizarBoleta(
    Number(id),
    boleta
 );

}else{

 response = await crearBoleta(
    boleta
 );

}
    console.log("Respuesta backend:",response.data);
    showSuccess("Boleta actualizada correctamente");
    
  }catch(error:any){

    console.error("Error creando boleta:",error.response?.data || error);
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

<div className="section-title">Lugar y Fecha*</div>
<div className="form-grid">
<div className="form-group">
<label>Lugar*</label>
<input
type="text"
maxLength={250}
value={lugar}
onChange={(e)=>
setLugar(e.target.value)}required/>
</div>

<div className="form-group">
<label>Hora*</label>
<input
type="time"
value={hora}
readOnly
required/>
</div>

<div className="form-group">
<label>Fecha*</label>
<input
type="date"
value={fecha}
readOnly
required/>
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
  required/>
</div>
<div className="form-group">
<label>
Telefono*
</label>
<input
type="tel"
value={telefono}
maxLength={10}
placeholder="10 dÃ­gitos"
onChange={(e)=>{
const valor =
e.target.value.replace(
/\D/g,
""
);
setTelefono(
valor.slice(0,10)
);
}}
required
/>
</div>
<div className="form-group">

    <label>Correo*</label>

    <div className="input-button-group">

        <input
            type="email"
            value={correo}
            placeholder="correo@gmail.com"
            onChange={(e) => {
                setCorreo(e.target.value);
                setCorreoVerificado(false);
            }}
            required
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
<label>Calle*</label>
<input
  type="text"
  maxLength={120}
  value={conductorCalle}
  onChange={(e)=>setConductorCalle(e.target.value)}
  required
/>
</div>

<div className="form-group">
<label>Número Exterior*</label>
<input
type="text"
value={conductorNumero}
onChange={(e)=>
setConductorNumero(
e.target.value)}required/>
</div>
<div className="form-group">
<label>Número Interior</label>
<input
type="text"
value={conductorNumeroInterior}
onChange={(e)=>setConductorNumeroInterior(e.target.value)}/>
</div>

<div className="form-group">
<label>Colonia*</label>
<input
type="text"
value={conductorColonia}
onChange={(e)=>
setConductorColonia(e.target.value)}required/></div>

<div className="form-group">
<label>Código Postal*</label>
<input
  type="text"
  maxLength={5}
  pattern="[0-9]{5}"
  value={conductorCP}
  onChange={(e)=>{
    const valor = e.target.value.replace(/\D/g,"");
    setConductorCP(valor.slice(0,5));
  }}
  required
/>
</div>

<div className="form-group">
<label>Municipio*</label>
<input type="text"
value={conductorMunicipio}
onChange={(e)=>setConductorMunicipio(e.target.value)}required/>
</div>

<div className="form-group">
<label>Estado*</label>
<select
value={conductorEstado}
onChange={(e)=>setConductorEstado(e.target.value)}required >
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
<div className="form-grid">
<div className="form-group">
<label>Nombre del Propietario*</label>
<input
  type="text"
  maxLength={120}
  value={propietarioNombre}
  onChange={(e)=>setPropietarioNombre(e.target.value)}required
  />
</div>
</div>

<div className="section-title">Dirección del Propietario</div>
<div className="form-grid">
<div className="form-group">
<label>Calle*</label>
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
<label>Tipo de vehí­culo*</label>
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
<label>Motivo*</label>
<select
value={
motivoCatalogoId ?? ""}
onChange={(e)=>setMotivoCatalogoId(e.target.value?
Number(e.target.value):null)}>
<option value="">Seleccione...</option>{
motivos.map(
(motivo)=>(
<option
key={motivo.id}
value={motivo.id}>
{motivo.descripcion}
</option>
))}

</select>
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
  BOTÃ“N GUARDAR
  ========================= */}

<div className="button-container">
<button 
type="submit" 
className="btn-submit"
>
{
 id 
 ? "Actualizar Boleta"
 : "Guardar Boleta"
}
</button>
</div>
</form>
</div>
</div>
<Footer />
</div>
);}