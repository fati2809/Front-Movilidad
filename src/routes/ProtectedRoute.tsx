import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRouteProps {
  allowedRoles?: number[];
  allowPasswordChange?: boolean;
}

function tokenExpirado(token: string): boolean {
  try {
    const payload = token.split(".")[1];
    const base64Payload = payload
      .replace(/-/g, "+")
      .replace(/_/g, "/")
      .padEnd(Math.ceil(payload.length / 4) * 4, "=");
    const datos = JSON.parse(atob(base64Payload));

    return typeof datos.exp === "number" && datos.exp * 1000 <= Date.now();
  } catch {
    return true;
  }
}

export default function ProtectedRoute({
  allowedRoles,
  allowPasswordChange = false,
}: ProtectedRouteProps) {
  const token = localStorage.getItem("token");
  const role = Number(localStorage.getItem("user_role"));
  const mustChangePassword =
    localStorage.getItem("must_change_password") === "true";

  if (!token || tokenExpirado(token)) {
    localStorage.clear();
    return <Navigate to="/" replace />;
  }

  if (mustChangePassword && !allowPasswordChange) {
    return <Navigate to="/cambiar-password" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    localStorage.clear();
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}