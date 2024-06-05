import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";

function Logout(props) {
    let navigate = useNavigate();

    if(localStorage.getItem('token')){
        try {
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            localStorage.removeItem('role');
            // console.log("Token: " + localStorage.getItem('token'));
            console.log("Uživatel byl úspěšně odhlášen");
            window.location.reload();
        } catch (e) {
            console.log("Chyba při odhlašování uživatele", e.response.data.message)
        }
    }

    useEffect(() =>{
        navigate("/")},[]
    )

    return (
        <div>
        </div>
    );
}

export default Logout;

