import "./Login.css";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import loginImage from "../../assets/no.jpg";
import logo from "../../assets/logo.png";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // =========================
  // SI YA HAY SESIÓN
  // =========================
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const role = Number(localStorage.getItem("user_role"));
    const mustChange =
      localStorage.getItem("must_change_password") === "true";

    if (mustChange) {
      navigate("/cambiar-password", {
        replace: true,
      });
      return;
    }

    switch (role) {
      case 1:
        navigate("/admin", {
          replace: true,
        });
        break;
      case 2:
        navigate("/agentes/form", {
          replace: true,
        });
        break;
      default:
        toast.error("Rol no válido");
        break;
    }
  }, [navigate, location.pathname]);

  // =========================
  // LOGIN
  // =========================
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("https://back-movilidad-stw0.onrender.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();
      console.log("Respuesta del login:", data);

      // =========================
      // ERRORES DEL LOGIN
      // =========================
      if (!res.ok) {
        if (res.status === 401) {
          toast.error(
            data.detail ||
            data.message ||
            "Correo o contraseña incorrectos"
          );
          return;
        }

        if (res.status === 403) {
          toast.error(
            data.detail ||
            data.message ||
            "Usuario inactivo"
          );
          return;
        }

        toast.error(
          data.detail ||
          data.message ||
          "Error del servidor"
        );
        return;
      }

      // =========================
      // VERIFICAR USUARIO
      // =========================
      if (!data.user) {
        toast.error("Respuesta inválida del servidor.");
        console.error("Respuesta del login:", data);
        return;
      }

      // =========================
      // OBTENER ROL
      // =========================
      const role = Number(data.user.role_id);

      if (Number.isNaN(role)) {
        toast.error("Rol inválido");
        return;
      }

      // =========================
      // GUARDAR SESIÓN
      // =========================
      localStorage.setItem("token", data.access_token);
      localStorage.setItem("token_type", data.token_type);
      localStorage.setItem("user_id", String(data.user.id));
      localStorage.setItem("user_name", data.user.name);
      localStorage.setItem("user_email", data.user.email);
      localStorage.setItem("user_role", String(role));
      localStorage.setItem(
        "must_change_password",
        String(data.must_change_password)
      );
      localStorage.setItem("user", JSON.stringify(data.user));

      toast.success(`Bienvenido ${data.user.name}`);

      // =========================
      // CAMBIAR CONTRASEÑA
      // =========================
      if (data.must_change_password) {
        navigate("/cambiar-password", {
          replace: true,
        });
        return;
      }

      // =========================
      // REDIRECCIÓN
      // =========================
      switch (role) {
        case 1:
          navigate("/admin", {
            replace: true,
          });
          break;
        case 2:
          navigate("/agentes/form", {
            replace: true,
          });
          break;
        default:
          toast.error("Rol no válido");
          break;
      }
    } catch (error) {
      console.error("Error de conexión:", error);
      toast.error("Error conectando al servidor");
    }
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <div className="login-content">
          {/* IZQUIERDA */}
          <div className="login-left">
            <img src={loginImage} alt="Login" />
          </div>
          {/* DERECHA */}
          <div className="login-right">
            <div className="login-card">
              <img
                src={logo}
                alt="Logo"
                className="logo"
              />
              <h1>Bienvenido</h1>
              <form onSubmit={handleLogin}>
                <div className="input-group">
                  <label>Correo</label>
                  <input
                    type="email"
                    placeholder="Ingresa tu correo"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="input-group">
                  <label>Contraseña</label>
                  <div className="password-container">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Ingresa tu contraseña"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      aria-label="Mostrar u ocultar contraseña"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        // OJO OCULTO
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="24px"
                          viewBox="0 -960 960 960"
                          width="24px"
                          fill="#E63289"
                        >
                          <path d="m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z" />
                        </svg>
                      ) : (
                        // OJO VISIBLE
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="24px"
                          viewBox="0 -960 960 960"
                          width="24px"
                          fill="#E63289"
                        >
                          <path d="M480-320q-75 0-127.5-52.5T300-500q0-75 52.5-127.5T480-680q75 0 127.5 52.5T660-500q0 75-52.5 127.5T480-320Zm0-80q42 0 71-29t29-71q0-42-29-71t-71-29q-42 0-71 29t-29 71q0 42 29 71t71 29Zm0 160q-151 0-269-83.5T40-500q51-117 169-200.5T480-784q151 0 269 83.5T920-500q-51 117-169 200.5T480-240Zm0-80q118 0 210-58.5T820-500q-38-83-130-141.5T480-700q-118 0-210 58.5T140-500q38 83 130 141.5T480-320Z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
                <div className="forgot-password">
                <a
                  href="/recuperar-password"
                  className="forgot-password"
                >
                  ¿Olvidaste tu contraseña?
                </a>
                </div>
                <button type="submit">
                  Iniciar sesión
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;