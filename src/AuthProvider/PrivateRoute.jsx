import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "./AuthProvider";


const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext)
    const location = useLocation()
    // console.log(location.pathname)
    if (loading) {
        return <div className="grid justify-items-center">
            <progress className="progress w-56"></progress>
        </div>
    }
    return children
};

export default PrivateRoute;