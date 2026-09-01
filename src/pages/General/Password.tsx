import { useState } from "react";
import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import "./password.css";

const API_URL = "https://back-movilidad-stw0.onrender.com";


export default function Password(){

    const navigate = useNavigate();


    const [password,setPassword] = useState("");
    const [confirm,setConfirm] = useState("");

    const [loading,setLoading] = useState(false);
    const [error,setError] = useState("");


    const handleSubmit = async()=>{


        setError("");


        if(!password || !confirm){

            setError(
                "Completa todos los campos"
            );

            return;
        }


        if(password.length < 8){

            setError(
                "La contraseña debe tener mínimo 8 caracteres"
            );

            return;
        }


        if(password !== confirm){

            setError(
                "Las contraseñas no coinciden"
            );

            return;
        }



        try{

            setLoading(true);


            const token =
                localStorage.getItem("token");



            const response = await fetch(
                `${API_URL}/users/change-password`,
                {

                    method:"PATCH",

                    headers:{
                        "Content-Type":"application/json",

                        Authorization:
                        `Bearer ${token}`
                    },


                    body:JSON.stringify({

                        password

                    })
                }
            );



            const data =
                await response.json();



            if(!response.ok){

                setError(
                    data.detail ||
                    "Error actualizando contraseña"
                );

                return;
            }



            localStorage.setItem(
                "must_change_password",
                "false"
            );


            toast.success(
                "Contraseña actualizada correctamente"
            );



            const role =
                Number(
                    localStorage.getItem(
                        "user_role"
                    )
                );



            if(role === 1){

                navigate("/admin");

            }
            else if(role === 2){

                navigate("/agentes/form");

            }
            else{

                navigate("/");

            }



        }catch(error){

            console.error(error);

            setError(
                "Error conectando con el servidor"
            );


        }finally{

            setLoading(false);

        }

    };



    return(

        <div className="password-page">


            <div className="password-card">


                <h1>
                    Cambiar contraseña
                </h1>


                <p>
                    Por seguridad debes actualizar tu contraseña.
                </p>



                <label>
                    Nueva contraseña
                </label>


                <input
                    type="password"
                    placeholder="********"
                    value={password}
                    onChange={
                        e=>setPassword(
                            e.target.value
                        )
                    }
                />



                <label>
                    Confirmar contraseña
                </label>


                <input
                    type="password"
                    placeholder="********"
                    value={confirm}
                    onChange={
                        e=>setConfirm(
                            e.target.value
                        )
                    }
                />



                {
                    error &&
                    <p className="password-error">
                        {error}
                    </p>
                }



                <button
                    onClick={handleSubmit}
                    disabled={loading}
                >

                    {
                        loading
                        ?
                        "Actualizando..."
                        :
                        "Actualizar contraseña"
                    }


                </button>



            </div>


        </div>

    );

}