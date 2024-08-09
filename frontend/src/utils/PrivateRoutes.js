import { Outlet, Navigate } from "react-router-dom";
import config from "../config";
import { tokenHandler } from "../middlewares/tokenHandler";

function PrivateRoutes() {
    const token = window.localStorage.getItem('token');
    return (
        tokenHandler.isTokenExpired(token) ? <Navigate to={config.routes.admin_login} /> : <Outlet />
    )
}

export default PrivateRoutes;