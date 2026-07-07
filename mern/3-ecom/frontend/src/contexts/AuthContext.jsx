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


    useEffect(() => {
        const token = localStorage.getItem("token");

        if(token){
            fetchUserProfile();
        }else{
            setLoading(false);
        }
    }, []);


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

    const fetchUserProfile = async() => {

        try{ 

            const {data} = await api.get("/auth/profile");
            setUser(data);

        }catch(error){
            localStorage.removeItem("token");
        }finally{
            setLoading(false);
        }

    }

    const logout = async( email, password) => {
        localStorage.removeItem("token");
        setUser(null);
    }


    const value = {
        user,
        loading,
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