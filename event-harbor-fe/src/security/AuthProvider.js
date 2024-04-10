// AuthProvider.js
import React, { createContext, useContext, useEffect, useState } from "react";
import {jwtDecode} from "jwt-decode";
import {logout} from "../users/Logout";
import {useNavigate} from "react-router-dom";
import api from "./Api";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const navigate = new useNavigate();

    //Nastavení hlavičky bearer tokenu


    const [token, setToken] = useState(localStorage.getItem("token"));

    // Funkce pro aktualizaci tokenu
    const updateToken = (newToken) => {
        setToken(newToken);
        localStorage.setItem("token", newToken);
    };

    // Zde můžete prověřit platnost tokenu a případně odhlásit uživatele
    // Kontrola platnosti tokenu

    const checkTokenValidity = () => {
        const token = localStorage.getItem("token");
        if (token != null) {
            try {
                // Dekódování tokenu
                const decodedToken = jwtDecode(token);

                // Zde můžete prověřit expirační čas
                const currentTime = Date.now() / 1000; // Čas v sekundách
                if (decodedToken.exp < currentTime) {
                    navigate("/logout");
                   console.log("Token vypršel");
                } else {
                    // Token je stále platný
                    console.log("Token je platný");
                }
            } catch (error) {
                console.error("Chyba při dekódování tokenu:", error);
            }
        }

        console.log("Token z authprovidder:" + localStorage.getItem('token'))
    };



// Volání funkce při načítání aplikace nebo při změně routy
    checkTokenValidity();


    return (
        <AuthContext.Provider value={{ token, updateToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
