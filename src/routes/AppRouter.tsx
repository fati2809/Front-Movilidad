import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";


import Login from "../pages/General/Login";
import Form from "../pages/Agentes/Form";
import Home from "../pages/Admin/Home";
import Formadm from "../pages/Admin/Form";
import Detalle from "../pages/Admin/Detalle";
import Detalleid from "../pages/Admin/Detalleid";
import ChangePassword from "../pages/General/ChangePassword";
import FormEdit from "../pages/Admin/FormEdit";
import Usuarios from "../pages/Admin/Usuarios";
import EditarUsuario from "../pages/Admin/EditarUsuario";
import DetalleUsuario from "../pages/Admin/DetalleUsuario";
import CrearUsuario from "../pages/Admin/CrearUsuario";
import RecuperarPassword from "../pages/General/RecuperarPassword";
import ProtectedRoute from "./ProtectedRoute";
export default function AppRouter() {

    return (

        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={<Login />}
                />

                <Route
                    path="/cambiar-password"
                    element={<ProtectedRoute allowPasswordChange />}
                >
                    <Route index element={<ChangePassword />} />
                </Route>

                <Route element={<ProtectedRoute allowedRoles={[2]} />}>
                    <Route
                        path="/agentes/form"
                        element={<Form />}
                    />
                </Route>

                <Route element={<ProtectedRoute allowedRoles={[1]} />}>
                    <Route
                        path="/admin"
                        element={<Home />}
                    />

                    <Route
                        path="/admin/realizar-infraccion"
                        element={<Formadm />}
                    />

                    <Route
                        path="/admin/detalle"
                        element={<Detalle />}
                    />

                    <Route
                        path="/admin/detalle/:id"
                        element={<Detalleid />}
                    />

                    <Route
                        path="/admin/editar-infraccion/:id"
                        element={<FormEdit />}
                    />

                    <Route
                        path="/admin/usuarios"
                        element={<Usuarios />}
                    />

                    <Route
                        path="/admin/editar-usuario/:id"
                        element={<EditarUsuario />}
                    />

                    <Route
                        path="/admin/usuario/:id"
                        element={<DetalleUsuario />}
                    />

                    <Route
                        path="/admin/crear-usuario"
                        element={<CrearUsuario />}
                    />
                </Route>

                <Route
                    path="/recuperar-password"
                    element={<RecuperarPassword />}
                />
            </Routes>

        </BrowserRouter>

    );

}