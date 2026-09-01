import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import logo from "../../assets/logo.png";
import "./RecuperarPassword.css";

function RecuperarPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [cargando, setCargando] = useState(false);

  const handleRecuperar = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setCargando(true);

      const res = await fetch(
        "https://back-movilidad-stw0.onrender.com/users/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(
          data.detail ||
          "No fue posible recuperar la contraseña"
        );
        return;
      }

      toast.success(
        "Se ha enviado una contraseña temporal a tu correo"
      );

      navigate("/");

    } catch (error) {
      console.error(error);

      toast.error(
        "Error conectando con el servidor"
      );

    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="recuperar-container">
      <div className="recuperar-card">

        <img
          src={logo}
          alt="Logo"
          className="recuperar-logo"
        />

        <h1>Recuperar contraseña</h1>

        <p>
          Ingresa el correo electrónico asociado
          a tu cuenta y te enviaremos una contraseña
          temporal.
        </p>

        <form onSubmit={handleRecuperar}>

          <div className="recuperar-input-group">
            <label>Correo electrónico</label>

            <input
              type="email"
              placeholder="Ingresa tu correo"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
            />
          </div>

          <button
            type="submit"
            disabled={cargando}
          >
            {cargando
              ? "Enviando..."
              : "Enviar contraseña temporal"}
          </button>

        </form>

        <button
          type="button"
          className="volver-login"
          onClick={() => navigate("/")}
        >
          Volver al inicio de sesión
        </button>

      </div>
    </div>
  );
}

export default RecuperarPassword;