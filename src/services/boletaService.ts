import axios from "axios";

const API_URL = "https://back-movilidad-stw0.onrender.com";


// ==========================
// CREAR BOLETA
// ==========================
export const crearBoleta = (datos: any) => {
  return axios.post(
    `${API_URL}/boletas`,
    datos
  );
};


// ==========================
// LISTAR BOLETAS
// ==========================
export const obtenerBoletas = () => {
  return axios.get(
    `${API_URL}/boletas`
  );
};


// ==========================
// OBTENER BOLETA POR ID
// ==========================
export const obtenerBoletaPorId = (
  id: number
) => {
  return axios.get(
    `${API_URL}/boletas/${id}`
  );
};


// ==========================
// ACTUALIZAR BOLETA
// ==========================
export const actualizarBoleta = (
  id: number,
  datos: any
) => {

  return axios.put(
    `${API_URL}/boletas/${id}`,
    datos
  );

};


// ==========================
// ELIMINAR BOLETA
// ==========================
export const eliminarBoleta = (
  id: number
) => {

  return axios.delete(
    `${API_URL}/boletas/${id}`
  );

};


// ==========================
// PDF BOLETA
// ==========================
export const descargarPdfBoleta = (
  id:number
)=>{

  return axios.get(
    `${API_URL}/boletas/${id}/pdf`,
    {
      responseType:"blob"
    }
  );

};



// ==========================
// CORREO
// ==========================
export const enviarCodigoCorreo = (
  correo: string
) => {

  return axios.post(
    `${API_URL}/correo/enviar-codigo`,
    {
      correo,
    }
  );

};


export const verificarCodigoCorreo = (
  correo: string,
  codigo: string
) => {

  return axios.post(
    `${API_URL}/correo/verificar-codigo`,
    {
      correo,
      codigo,
    }
  );

};