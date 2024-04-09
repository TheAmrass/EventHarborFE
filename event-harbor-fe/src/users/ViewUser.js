import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import api from "../security/Api";

function ViewUser(props) {

    const[user, setUser]=useState({
        name:"",
        password:"",
        email:"",
        registered: "",
        lastLogged: "",
        role: ""

    })

    const params = useParams();
    const userId = params.id;
    console.log("User ID: " + userId)

    useEffect(() => {
        loadUser()
    }, []);

    const loadUser = async () => {
        const result = await api.get(`/user/${userId}`)
        console.log(result.data)
        setUser(result.data);
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow border rounded p-4 mt-2">
                    <h2 className="text-center m-4">Detail uživatele</h2>
                    <div className="card">
                        <div className="card-header">
                            Detail uživatele s id: {user.userId}
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">
                                    <b>Jméno: </b>
                                    {user.name}
                                </li>
                                <li className="list-group-item">
                                    <b>E-mail: </b>
                                    {user.email}
                                </li>
                                <li className="list-group-item">
                                    <b>Role: </b>
                                    {user.role}
                                </li>
                                <li className="list-group-item">
                                    <b>Registrován: </b>
                                    {user.registered}
                                </li>
                                <li className="list-group-item">
                                    <b>Poslední přihlášení: </b>
                                    {user.lastLogged}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <Link to={"/users"} className={"btn btn-primary my-2"}>Zpět na přehled uživatel</Link>
                </div>
            </div>
        </div>
    );
}

export default ViewUser;