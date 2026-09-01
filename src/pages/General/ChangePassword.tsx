import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import "./password.css";

const API_URL = "https://back-movilidad-stw0.onrender.com";


export default function ChangePassword() {

  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  const validatePassword = (password:string) => {

    const errors:string[] = [];

    if(password.length < 8)
      errors.push("mínimo 8 caracteres");

    if(!/[A-Z]/.test(password))
      errors.push("una mayúscula");

    if(!/[a-z]/.test(password))
      errors.push("una minúscula");

    if(!/[0-9]/.test(password))
      errors.push("un número");

    if(!/[!@#$%^&*(),.?":{}|<>]/.test(password))
      errors.push("un carácter especial");

    return errors;
  };


  const handleSubmit = async()=>{

    setError("");

    if(!password || !confirm){
      setError("Completa todos los campos.");
      return;
    }


    const passwordErrors = validatePassword(password);


    if(passwordErrors.length > 0){

      setError(
        "La contraseña necesita: " +
        passwordErrors.join(", ")
      );

      return;
    }


    if(password !== confirm){

      setError(
        "Las contraseñas no coinciden."
      );

      return;
    }


    const token = localStorage.getItem("token");


    console.log("TOKEN ENVIADO:", token);


    if(!token){

      setError(
        "No existe sesión activa. Inicia sesión nuevamente."
      );

      return;
    }


    try{

      setLoading(true);


      const response = await fetch(
        `${API_URL}/users/change-password`,
        {
          method:"PATCH",

          headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
          },

          body:JSON.stringify({
            password
          })
        }
      );


      const data = await response.json();


      console.log("RESPUESTA:", data);


      if(!response.ok){

        setError(
          data.detail ||
          "No se pudo actualizar la contraseña."
        );

        return;
      }


      localStorage.setItem(
        "must_change_password",
        "false"
      );


      const user = JSON.parse(
        localStorage.getItem("user") || "{}"
      );


      user.must_change_password = false;


      localStorage.setItem(
        "user",
        JSON.stringify(user)
      );


      toast.success(
        "Contraseña actualizada correctamente"
      );


      const role = Number(
        localStorage.getItem("user_role")
      );


      if(role === 1){

        navigate("/admin");

      }else if(role === 2){

        navigate("/agentes/form");

      }else{

        navigate("/");

      }


    }catch(error){

      console.error(error);

      setError(
        "Error conectando con el servidor."
      );

    }finally{

      setLoading(false);

    }

  };


  return(

    <div className="password-overlay">

      <div className="password-modal">


        <div className="password-header">

          <div className="password-icon">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#cb2476"><path d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm0-80h480v-400H240v400Zm296.5-143.5Q560-327 560-360t-23.5-56.5Q513-440 480-440t-56.5 23.5Q400-393 400-360t23.5 56.5Q447-280 480-280t56.5-23.5ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80ZM240-160v-400 400Z"/></svg>
          </div>


          <h2 className="password-title">
            Cambiar contraseña
          </h2>


          <p className="password-subtitle">
            Por seguridad debes actualizar tu contraseña antes de continuar.
          </p>


        </div>



        <div className="password-form">


          <div className="password-group">

            <label>
              Nueva contraseña
            </label>


            <div className="password-input-container">


              <input
                type={
                  showPassword
                  ? "text"
                  : "password"
                }
                placeholder="********"
                value={password}
                onChange={
                  e=>setPassword(
                    e.target.value
                  )
                }
              />


              <button
                type="button"
                className="eye-button"
                onClick={()=>
                  setShowPassword(
                    !showPassword
                  )
                }
              >

                <span className="material-symbols-outlined">
                  {showPassword ? "visibility_off" : "visibility"}
                </span>

              </button>


            </div>


          </div>



          <div className="password-group">


            <label>
              Confirmar contraseña
            </label>


            <div className="password-input-container">


              <input
                type={
                  showConfirm
                  ? "text"
                  : "password"
                }
                placeholder="********"
                value={confirm}
                onChange={
                  e=>setConfirm(
                    e.target.value
                  )
                }
              />


              <button
                type="button"
                className="eye-button"
                onClick={()=>
                  setShowConfirm(
                    !showConfirm
                  )
                }
              >

                <span className="material-symbols-outlined">
                  {showConfirm ? "visibility_off" : "visibility"}
                </span>

              </button>


            </div>


          </div>



          {
            error &&
            <p className="password-error">
              {error}
            </p>
          }



          <button
            className="password-btn"
            onClick={handleSubmit}
            disabled={loading}
          >

            {
              loading
              ? "Actualizando..."
              : "Actualizar contraseña"
            }

          </button>


        </div>


      </div>


    </div>

  );

}