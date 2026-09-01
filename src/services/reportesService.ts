const API_URL = "https://back-movilidad-stw0.onrender.com";


// =====================================================
// OBTENER RESUMEN
// =====================================================

export async function obtenerResumen() {

  const response = await fetch(
    `${API_URL}/reportes/resumen`
  );

  if (!response.ok) {

    throw new Error(
      "No fue posible obtener el resumen"
    );

  }

  return await response.json();
}



// =====================================================
// OBTENER INFRACCIONES POR MES
// =====================================================

export async function obtenerPorMes() {

  const response = await fetch(
    `${API_URL}/reportes/por-mes`
  );

  if (!response.ok) {

    throw new Error(
      "No fue posible obtener el reporte mensual"
    );

  }

  return await response.json();
}



// =====================================================
// OBTENER INFRACCIONES POR MOTIVO
// =====================================================

export async function obtenerPorMotivo() {

  const response = await fetch(
    `${API_URL}/reportes/por-motivo`
  );

  if (!response.ok) {

    throw new Error(
      "No fue posible obtener el reporte por motivo"
    );

  }

  return await response.json();
}



// =====================================================
// OBTENER INFRACCIONES POR AGENTE
// =====================================================

export async function obtenerPorAgente() {

  const response = await fetch(
    `${API_URL}/reportes/por-agente`
  );

  if (!response.ok) {

    throw new Error(
      "No fue posible obtener el reporte por agente"
    );

  }

  return await response.json();
}



// =====================================================
// DESCARGAR REPORTE CSV
// =====================================================

export async function descargarReporte(
  tipo: string
) {

  const response = await fetch(
    `${API_URL}/reportes/csv/${tipo}`,
    {
      method: "GET",
    }
  );


  if (!response.ok) {

    throw new Error(
      "No fue posible generar el reporte"
    );

  }


  const blob = await response.blob();


  const url =
    window.URL.createObjectURL(blob);


  const link =
    document.createElement("a");


  link.href = url;


  link.download =
    `reporte_${tipo}.csv`;


  document.body.appendChild(link);


  link.click();


  link.remove();


  window.URL.revokeObjectURL(url);

}