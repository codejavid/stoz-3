import { createContext, useState, useContext, useEffect } from "react";
import api from "../services/api";


const AuthContext = createContext();

export const useAuth = () => {

    const context = useContext(AuthContext);

    if(!context){
        throw new Error("useAuth must be used within authprovider");
    }

    return context;

}


export const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    const register = async(name, email, password) => {

        try{

           const { data } = await api.post("/auth/register", {name, email, password});
           localStorage.setItem("token", data.token);
           setUser(data);
           return {success:true, data};

        }catch(error){
            return { success:false, error:error || "Registration failed"}
        }


    }

    const login = async( email, password) => {

        try{

           const { data } = await api.post("/auth/login", { email, password});
           localStorage.setItem("token", data.token);
           setUser(data);
           return {success:true, data};

        }catch(error){
            return { success:false, error:error || "Registration failed"}
        }


    }

    const logout = async( email, password) => {
        localStorage.removeItem("token");
        setUser(null);
    }


    const value = {
        user,
        register,
        login,
        logout
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )


}