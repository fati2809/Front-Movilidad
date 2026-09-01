import axios from "axios";

const API_URL = "https://back-movilidad-stw0.onrender.com";

export const obtenerMarcas = () => {
  return axios.get(`${API_URL}/catalogos/marcas`);
};

export const obtenerModelos = (marcaId: number) => {
  return axios.get(`${API_URL}/catalogos/modelos/${marcaId}`);
};

export const obtenerEstados = () => {
  return axios.get(`${API_URL}/catalogos/estados`);
};

export const obtenerClasesVehiculo = () => {
  return axios.get(`${API_URL}/catalogos/clases-vehiculo`);
};

export const obtenerTiposVehiculo = (claseId: number) => {
  return axios.get(`${API_URL}/catalogos/tipos-vehiculo/${claseId}`);
};

export const obtenerMotivos = () => {
  return axios.get(`${API_URL}/catalogos/motivos`);
};

export const obtenerCodigoPostal = (cp: string) => {
  return axios.get(
    `${API_URL}/catalogos/codigo-postal/${cp}`
  );
};