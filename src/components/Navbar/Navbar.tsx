import "./navbar.css";
import logo from "../../assets/logo.png";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface MenuItem {
  id: string;
  label: string;
  path: string;
  icon: React.ReactNode;
}

const menuItems: MenuItem[] = [
  // Agrega aquí las opciones del menú cuando las tengas
];

export default function Navbar() {
  const [active, setActive] = useState<string | null>(null);

  const navigate = useNavigate();

  const cerrarSesion = () => {
    console.log("Cerrando sesión");

    localStorage.clear();

    navigate("/", { replace: true });
  };


  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img
          src={logo}
          alt="Logo"
          className="logo"
        />
      </div>

      <ul className="nav-links">
        {menuItems.map((item) => (
          <li key={item.id}>
            <button
              className={`nav-btn ${
                active === item.id ? "active" : ""
              }`}
              onClick={() => {
                setActive(item.id);
                navigate(item.path);
              }}
            >
              {item.icon}
              {item.label}
            </button>
          </li>
        ))}

        <li>
          <button
            className="nav-btn logout"
            onClick={cerrarSesion}
          >
            Cerrar Sesión
          </button>
          
        </li>
      </ul>
    </nav>
  );
}