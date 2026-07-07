import {Navigate} from "react-router-dom";
import {useAuth} from "../contexts/AuthContext";


const ProtectedRoute = ({children, requireAdmin = false}) => {

    const {user, loading} = useAuth();

    if(loading){
        return(
        <div className="flex justify-center items-center h-64">
            <div className="text-xl">Loading...</div>
        </div>
        )
    }

    if(!user){
        return <Navigate to="/login"/>
    }

    if(requireAdmin && !user.isAdmin){
        return <Navigate to="/login"/>
    }

    return children;



}

export default ProtectedRoute;