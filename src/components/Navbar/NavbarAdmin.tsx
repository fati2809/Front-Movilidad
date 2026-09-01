import "./NavbarAdmin.css";
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
  {
    id:"inicio",
    label:"Inicio",
    path:"/admin",
    icon:(
      <svg
        width="20"
        height="20"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 -4 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 10.5L12 3l9 7.5"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5 9.5V21h14V9.5"
        />
      </svg>
    )
  },
  {
    id:"infracciones",
    label:"Infracciones",
    path:"/admin/detalle",
    icon:(
      <svg
        width="20"
        height="20"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 5h6M9 9h6M9 13h6M9 17h6"
        />
        <rect
          x="5"
          y="3"
          width="14"
          height="18"
          rx="2"
        />
      </svg>
    )
  },
  {
    id:"usuarios",
    label:"Usuarios",
    path:"/admin/usuarios",
    icon:(
      <svg
        width="20"
        height="20"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"
        />
        <circle
          cx="9"
          cy="7"
          r="4"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M22 21v-2a4 4 0 0 0-3-3.87"
        />
      </svg>
    )
  },
];
export default function NavbarAdmin(){
  const [active,setActive] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const cerrarSesion = ()=>{
    console.log("Cerrando sesión...");
    localStorage.clear();
    setMenuOpen(false);
    navigate("/",{
      replace:true
    });
  };

  const handleNavigate = (item: MenuItem) => {
    setActive(item.id);
    setMenuOpen(false);
    navigate(item.path);
  };

  return (
    <nav className={`navbar ${menuOpen ? "menu-open" : ""}`}>
      <div className="navbar-left">
        <img
          src={logo}
          alt="Logo"
          className="logo"
        />
      </div>

      <button
        type="button"
        className="menu-toggle"
        aria-label="Abrir menú"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span />
        <span />
        <span />
      </button>

      <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
        {
          menuItems.map((item)=>(
            <li key={item.id}>
              <button
                type="button"
                className={
                  `nav-btn ${
                    active === item.id
                    ? "active"
                    : ""
                  }`
                }
                onClick={() => handleNavigate(item)}
              >
                {item.icon}
                {item.label}
              </button>
            </li>
          ))
        }
        <li>
          <button
            type="button"
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