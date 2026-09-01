import "./Home.css";

import { useEffect, useState } from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

import Navbar from "../../components/Navbar/NavbarAdmin";
import Footer from "../../components/Footer/Footer";

import {
  obtenerResumen,
  obtenerPorMes,
  obtenerPorMotivo,
  obtenerPorAgente,
  descargarReporte,
} from "../../services/reportesService";


// =====================================================
// INTERFACES
// =====================================================

interface Resumen {
  total_boletas: number;
  boletas_mes: number;
  agentes_activos: number;
  promedio_diario: number;
}

interface Reporte {
  nombre: string;
  cantidad: number;
}


// =====================================================
// COMPONENTE
// =====================================================

export default function Home() {
  // =====================================================
  // ESTADOS
  // =====================================================

  const [resumen, setResumen] = useState<Resumen>({
    total_boletas: 0,
    boletas_mes: 0,
    agentes_activos: 0,
    promedio_diario: 0,
  });


  const [porMes, setPorMes] = useState<Reporte[]>([]);

  const [porMotivo, setPorMotivo] = useState<Reporte[]>([]);

  const [porAgente, setPorAgente] = useState<Reporte[]>([]);

  const [cargando, setCargando] = useState(true);

  const [descargando, setDescargando] = useState<string | null>(null);


  // =====================================================
  // COLORES DE LAS GRÁFICAS
  // =====================================================

  const colores = [
    "#2A3086",
    "#E63289",
    "#92C4D7",
    "#10b981",
    "#f59e0b",
    "#ef4444",
  ];


  // =====================================================
  // CARGAR REPORTES
  // =====================================================

  useEffect(() => {

    const cargarReportes = async () => {

      try {

        setCargando(true);

        const [
          resumenData,
          mesData,
          motivoData,
          agenteData,
        ] = await Promise.all([

          obtenerResumen(),

          obtenerPorMes(),

          obtenerPorMotivo(),

          obtenerPorAgente(),

        ]);


        setResumen(resumenData);

        setPorMes(mesData);

        setPorMotivo(motivoData);

        setPorAgente(agenteData);

      } catch (error) {

        console.error(
          "Error cargando reportes:",
          error
        );

      } finally {

        setCargando(false);

      }

    };


    cargarReportes();

  }, []);


  // =====================================================
  // DESCARGAR CSV
  // =====================================================

  const handleDescargarReporte = async (
    tipo: string
  ) => {

    try {

      setDescargando(tipo);

      await descargarReporte(tipo);

    } catch (error) {

      console.error(
        "Error descargando reporte:",
        error
      );

      alert(
        "No fue posible descargar el reporte."
      );

    } finally {

      setDescargando(null);

    }

  };


  // =====================================================
  // RETURN
  // =====================================================

  return (

    <div className="usuario-root">

      {/* =================================================
          NAVBAR
      ================================================= */}

      <Navbar />

        <main className="contenido">

  <div className="contenedor-interno">

    {/* =================================================
        HERO
    ================================================= */}

    <div className="hero">

      <h1 className="hero-title">
        Bienvenido
      </h1>

    </div>

        </div>



        {/* =================================================
            ESTADÍSTICAS
        ================================================= */}

        <section className="estadisticas">


          {/* TOTAL */}

          <div className="estadistica-card">

            <span className="estadistica-titulo">
              Total de boletas
            </span>

            <strong className="estadistica-numero">

              {cargando
                ? "..."
                : resumen.total_boletas}

            </strong>

          </div>



          {/* MES */}

          <div className="estadistica-card">

            <span className="estadistica-titulo">
              Boletas este mes
            </span>

            <strong className="estadistica-numero">

              {cargando
                ? "..."
                : resumen.boletas_mes}

            </strong>

          </div>



          {/* AGENTES */}

          <div className="estadistica-card">

            <span className="estadistica-titulo">
              Agentes activos
            </span>

            <strong className="estadistica-numero">

              {cargando
                ? "..."
                : resumen.agentes_activos}

            </strong>

          </div>



          {/* PROMEDIO */}

          <div className="estadistica-card">

            <span className="estadistica-titulo">
              Promedio diario
            </span>

            <strong className="estadistica-numero">

              {cargando
                ? "..."
                : resumen.promedio_diario}

            </strong>

          </div>


        </section>



        {/* =================================================
            GRÁFICAS
        ================================================= */}

        <section className="graficas">


          {/* =================================================
              POR MES
          ================================================= */}

          <div className="grafica-card">

            <h2>
              Infracciones por mes
            </h2>


            <div className="grafica">

              <ResponsiveContainer
                width="100%"
                height={300}
              >

                <BarChart
                  data={porMes}
                >

                  <CartesianGrid
                    strokeDasharray="3 3"
                  />

                  <XAxis
                    dataKey="nombre"
                  />

                  <YAxis />

                  <Tooltip />


                  <Bar
                    dataKey="cantidad"
                    fill="#2A3086"
                    radius={[
                      5,
                      5,
                      0,
                      0,
                    ]}
                  />

                </BarChart>

              </ResponsiveContainer>

            </div>

          </div>



          {/* =================================================
              POR MOTIVO
          ================================================= */}

          <div className="grafica-card">

            <h2>
              Infracciones por motivo
            </h2>


            <div className="grafica">

              <ResponsiveContainer
                width="100%"
                height={300}
              >

                <PieChart>

                  <Pie
                    data={porMotivo}
                    dataKey="cantidad"
                    nameKey="nombre"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                  >

                    {porMotivo.map(
                      (_, index) => (

                        <Cell
                          key={`cell-${index}`}
                          fill={
                            colores[
                              index %
                              colores.length
                            ]
                          }
                        />

                      )
                    )}

                  </Pie>


                  <Tooltip />

                  <Legend />

                </PieChart>

              </ResponsiveContainer>

            </div>

          </div>



          {/* =================================================
              POR AGENTE
          ================================================= */}

          <div className="grafica-card grafica-ancha">

            <h2>
              Infracciones por agente
            </h2>


            <div className="grafica">

              <ResponsiveContainer
                width="100%"
                height={300}
              >

                <BarChart
                  data={porAgente}
                >

                  <CartesianGrid
                    strokeDasharray="3 3"
                  />

                  <XAxis
                    dataKey="nombre"
                  />

                  <YAxis />

                  <Tooltip />


                  <Bar
                    dataKey="cantidad"
                    fill="#E63289"
                    radius={[
                      5,
                      5,
                      0,
                      0,
                    ]}
                  />

                </BarChart>

              </ResponsiveContainer>

            </div>

          </div>


        </section>



        {/* =================================================
            REPORTES CSV
        ================================================= */}

        <section className="reportes">


          <div className="reportes-header">

            <h2>
              Reportes
            </h2>

            <p>
              Descarga la información
              de las infracciones en formato CSV.
            </p>

          </div>



          <div className="reportes-grid">


            {/* =================================================
                REPORTE GENERAL
            ================================================= */}

            <button
              className="reporte-card"
              onClick={() =>
                handleDescargarReporte(
                  "general"
                )
              }
              disabled={
                descargando === "general"
              }
            >

              <span className="reporte-icono">
                📄
              </span>

              <span className="reporte-titulo">
                Reporte general
              </span>

              <span className="reporte-descripcion">
                Todas las boletas de infracción
              </span>

              <span className="reporte-descargar">

                {descargando === "general"
                  ? "Generando..."
                  : "Descargar CSV"}

              </span>

            </button>



            {/* =================================================
                REPORTE POR MES
            ================================================= */}

            <button
              className="reporte-card"
              onClick={() =>
                handleDescargarReporte(
                  "por-mes"
                )
              }
              disabled={
                descargando === "por-mes"
              }
            >

              <span className="reporte-icono">
                📊
              </span>

              <span className="reporte-titulo">
                Reporte mensual
              </span>

              <span className="reporte-descripcion">
                Infracciones agrupadas por mes
              </span>

              <span className="reporte-descargar">

                {descargando === "por-mes"
                  ? "Generando..."
                  : "Descargar CSV"}

              </span>

            </button>



            {/* =================================================
                REPORTE POR MOTIVO
            ================================================= */}

            <button
              className="reporte-card"
              onClick={() =>
                handleDescargarReporte(
                  "por-motivo"
                )
              }
              disabled={
                descargando === "por-motivo"
              }
            >

              <span className="reporte-icono">
                ⚠️
              </span>

              <span className="reporte-titulo">
                Reporte por motivo
              </span>

              <span className="reporte-descripcion">
                Infracciones según el motivo
              </span>

              <span className="reporte-descargar">

                {descargando === "por-motivo"
                  ? "Generando..."
                  : "Descargar CSV"}

              </span>

            </button>



            {/* =================================================
                REPORTE POR AGENTE
            ================================================= */}

            <button
              className="reporte-card"
              onClick={() =>
                handleDescargarReporte(
                  "por-agente"
                )
              }
              disabled={
                descargando === "por-agente"
              }
            >

              <span className="reporte-icono">
                👮
              </span>

              <span className="reporte-titulo">
                Reporte por agente
              </span>

              <span className="reporte-descripcion">
                Infracciones realizadas por agente
              </span>

              <span className="reporte-descargar">

                {descargando === "por-agente"
                  ? "Generando..."
                  : "Descargar CSV"}

              </span>

            </button>



            {/* =================================================
                REPORTE POR VEHÍCULO
            ================================================= */}

            <button
              className="reporte-card"
              onClick={() =>
                handleDescargarReporte(
                  "por-vehiculo"
                )
              }
              disabled={
                descargando === "por-vehiculo"
              }
            >

              <span className="reporte-icono">
                🚗
              </span>

              <span className="reporte-titulo">
                Reporte por vehículo
              </span>

              <span className="reporte-descripcion">
                Infracciones según tipo de vehículo
              </span>

              <span className="reporte-descargar">

                {descargando === "por-vehiculo"
                  ? "Generando..."
                  : "Descargar CSV"}

              </span>

            </button>


          </div>


        </section>
                  

      </main>


      {/* =================================================
          FOOTER
      ================================================= */}

      <Footer />

    </div>

  );
}